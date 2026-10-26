
import { withSupabase } from "@supabase/server";
import "@supabase/functions-js/edge-runtime.d.ts";

type RateLimitResult = {
  allowed: boolean;
  request_count: number;
  retry_after_seconds: number;
};

type VoteResult = {
  status: "ok" | "cooldown" | "inactive";
  created?: boolean;
  rating?: number | null;
  votes?: number;
  retry_after_seconds?: number;
};

function jsonResponse(
  body: Record<string, unknown>,
  status = 200,
): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
  });
}

function isNonNegativeInteger(value: unknown): value is number {
  return Number.isInteger(value) && (value as number) >= 0;
}

function isPositiveInteger(value: unknown): value is number {
  return Number.isInteger(value) && (value as number) > 0;
}

function isValidRating(value: unknown): value is number | null {
  return (
    value === null ||
    (typeof value === "number" &&
      Number.isFinite(value) &&
      value >= 1 &&
      value <= 5)
  );
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

async function hashFingerprint(
  fingerprint: string,
  secret: string,
): Promise<string> {
  const binarySecret = atob(secret);
  const secretBytes = Uint8Array.from(
    binarySecret,
    (character) => character.charCodeAt(0),
  );

  if (secretBytes.length < 32) {
    throw new Error("Invalid HMAC secret configuration.");
  }

  const key = await crypto.subtle.importKey(
    "raw",
    secretBytes,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );

  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(fingerprint),
  );

  return Array.from(new Uint8Array(signature))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

Deno.serve(
  withSupabase(
    { auth: ["publishable", "secret"] },
    async (req, ctx) => {
      if (req.method !== "POST") {
        return jsonResponse(
          { status: "error", message: "Method not allowed." },
          405,
        );
      }

      let body: unknown;

      try {
        body = await req.json();
      } catch {
        return jsonResponse(
          { status: "error", message: "Invalid request body." },
          400,
        );
      }

      if (!isRecord(body)) {
        return jsonResponse(
          { status: "error", message: "Invalid request body." },
          400,
        );
      }

      const fieldId = body.fieldId;
      const rating = body.rating;
      const fingerprint = body.fingerprint;

      if (
        typeof fieldId !== "string" ||
        fieldId.trim().length === 0 ||
        fieldId.length > 128 ||
        typeof rating !== "number" ||
        !Number.isInteger(rating) ||
        rating < 1 ||
        rating > 5 ||
        typeof fingerprint !== "string" ||
        fingerprint.trim().length === 0 ||
        fingerprint.length > 128
      ) {
        return jsonResponse(
          { status: "error", message: "Invalid vote details." },
          400,
        );
      }

      const secret = Deno.env.get("FIELD_VOTE_HMAC_SECRET");

      if (!secret) {
        console.error("FIELD_VOTE_HMAC_SECRET is not configured.");

        return jsonResponse(
          { status: "error", message: "Voting is temporarily unavailable." },
          500,
        );
      }

      try {
        const keyHash = await hashFingerprint(fingerprint, secret);

        const {
          data: limitData,
          error: limitError,
        } = await ctx.supabaseAdmin.rpc("consume_field_vote_rate_limit", {
          p_key_hash: keyHash,
        });

        if (limitError) {
          console.error("Rate-limit RPC failed.");

          return jsonResponse(
            {
              status: "error",
              message: "Voting is temporarily unavailable.",
            },
            500,
          );
        }

        if (
          !isRecord(limitData) ||
          typeof limitData.allowed !== "boolean" ||
          !isNonNegativeInteger(limitData.request_count) ||
          (limitData.allowed &&
            (limitData.request_count < 1 ||
              limitData.request_count > 10 ||
              limitData.retry_after_seconds !== 0)) ||
          (!limitData.allowed &&
            (limitData.request_count < 10 ||
              !isPositiveInteger(limitData.retry_after_seconds)))
        ) {
          console.error("Vote rate-limit RPC returned an invalid response.");

          return jsonResponse(
            {
              status: "error",
              message: "Voting is temporarily unavailable.",
            },
            500,
          );
        }

        const rateLimit = limitData as unknown as RateLimitResult;

        if (!rateLimit.allowed) {
          return jsonResponse({
            status: "rate_limited",
            retry_after_seconds: rateLimit.retry_after_seconds,
          });
        }

        const {
          data: voteData,
          error: voteError,
        } = await ctx.supabaseAdmin.rpc("submit_field_vote", {
          p_field_id: fieldId,
          p_rating: rating,
          p_fingerprint: fingerprint,
        });

        if (voteError) {
          console.error("Vote submission RPC failed.");

          return jsonResponse(
            {
              status: "error",
              message: "Voting is temporarily unavailable.",
            },
            500,
          );
        }

        if (
          !isRecord(voteData) ||
          typeof voteData.status !== "string" ||
          !["ok", "cooldown", "inactive"].includes(voteData.status)
        ) {
          console.error("Vote submission RPC returned an invalid response.");

          return jsonResponse(
            {
              status: "error",
              message: "Voting is temporarily unavailable.",
            },
            500,
          );
        }

        const vote = voteData as unknown as VoteResult;

        if (
          vote.status === "ok" &&
          (!isValidRating(vote.rating) ||
            !isNonNegativeInteger(vote.votes) ||
            typeof vote.created !== "boolean")
        ) {
          console.error("Vote submission RPC returned invalid success data.");

          return jsonResponse(
            {
              status: "error",
              message: "Voting is temporarily unavailable.",
            },
            500,
          );
        }

        if (
          vote.status === "cooldown" &&
          !isPositiveInteger(vote.retry_after_seconds)
        ) {
          console.error("Vote submission RPC returned an invalid cooldown.");

          return jsonResponse(
            {
              status: "error",
              message: "Voting is temporarily unavailable.",
            },
            500,
          );
        }

        if (vote.status === "ok") {
          return jsonResponse({
            status: "ok",
            message: "¡Gracias por tu voto!",
            rating: vote.rating,
            votes: vote.votes,
            created: vote.created,
          });
        }

        if (vote.status === "cooldown") {
          return jsonResponse({
            status: "cooldown",
            retry_after_seconds: vote.retry_after_seconds,
          });
        }

        return jsonResponse({ status: "inactive" });
      } catch {
        console.error("Unexpected vote endpoint error.");

        return jsonResponse(
          {
            status: "error",
            message: "Voting is temporarily unavailable.",
          },
          500,
        );
      }
    },
  ),
);

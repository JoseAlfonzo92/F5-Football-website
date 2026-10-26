import { supabase } from "./supabase.js";

export async function getRatings() {
    const { data, error } = await supabase
        .from("field_ratings")
        .select("*");

    if (error) {
        console.error(error);
        return {};
    }

    const ratingsMap = {};

    data.forEach(row => {
        ratingsMap[row.field_id] = {
            rating: Number(row.average_rating),
            votes: row.total_votes
        };
    });

    return ratingsMap;
}


function formatVoteWaitTime(seconds, includeMinutes = false) {
  const minutes = Math.max(1, Math.ceil(seconds / 60));

  const units = [
    { size: 43200, singular: "mes", plural: "meses" },
    { size: 10080, singular: "semana", plural: "semanas" },
    { size: 1440, singular: "día", plural: "días" },
    { size: 60, singular: "hora", plural: "horas" },
  ];

  if (includeMinutes && minutes < 60) {
    return `${minutes} ${minutes === 1 ? "minuto" : "minutos"}`;
  }

  for (const unit of units) {
    if (minutes >= unit.size) {
      const amount = Math.ceil(minutes / unit.size);
      return `${amount} ${amount === 1 ? unit.singular : unit.plural}`;
    }
  }

  return "1 hora";
}


export async function submitRating(fieldId, rating) {
  let fingerprint = localStorage.getItem("vote_fingerprint");

  if (!fingerprint) {
    fingerprint = crypto.randomUUID();
    localStorage.setItem("vote_fingerprint", fingerprint);
  }

  const { data, error } = await supabase.functions.invoke(
    "submit-field-vote",
    {
      body: {
        fieldId,
        rating,
        fingerprint,
      },
    },
  );

  if (error) {
    console.error("Vote submission failed.");
    throw new Error(
      "No se pudo enviar tu voto. Intentá de nuevo más tarde.",
    );
  }

  if (
    !data ||
    typeof data !== "object" ||
    Array.isArray(data) ||
    typeof data.status !== "string"
  ) {
    throw new Error(
      "No se pudo enviar tu voto. Intentá de nuevo más tarde.",
    );
  }

  if (data.status === "ok") {
    if (
      !(data.rating === null ||
        (typeof data.rating === "number" &&
          Number.isFinite(data.rating) &&
          data.rating >= 1 &&
          data.rating <= 5)) ||
      !Number.isInteger(data.votes) ||
      data.votes < 0 ||
      typeof data.message !== "string"
    ) {
      throw new Error(
        "No se pudo enviar tu voto. Intentá de nuevo más tarde.",
      );
    }

    return {
      message: data.message,
      rating: data.rating,
      votes: data.votes,
    };
  }

  if (data.status === "cooldown") {
    if (
      !Number.isInteger(data.retry_after_seconds) ||
      data.retry_after_seconds <= 0
    ) {
      throw new Error(
        "No se pudo enviar tu voto. Intentá de nuevo más tarde.",
      );
    }

    const text = formatVoteWaitTime(data.retry_after_seconds);

    throw new Error(`Podés cambiar tu voto en ${text}`);
  }

  if (data.status === "rate_limited") {
    if (
      !Number.isInteger(data.retry_after_seconds) ||
      data.retry_after_seconds <= 0
    ) {
      throw new Error(
        "No se pudo enviar tu voto. Intentá de nuevo más tarde.",
      );
    }

    const text = formatVoteWaitTime(
      data.retry_after_seconds,
      true,
    );

    throw new Error(
      `Hiciste demasiados intentos. Probá de nuevo en ${text}.`,
    );
  }

  if (data.status === "inactive") {
    throw new Error(
      "Esta cancha no está disponible para recibir votos.",
    );
  }

  throw new Error(
    "No se pudo enviar tu voto. Intentá de nuevo más tarde.",
  );
}

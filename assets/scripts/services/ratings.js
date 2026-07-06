import { fields } from "../data/fields.js";
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

export async function applyLiveRatings() {
    const ratings = await getRatings();

    fields.forEach(field => {
        const liveRating = ratings[field.id];

        if (liveRating) {
            field.rating = liveRating.rating;
            field.votes = liveRating.votes;
        } else {
            field.votes = 0;
        }
    });
}

export async function submitRating(fieldId, rating) {

    const fingerprint = localStorage.getItem("vote_fingerprint") || crypto.randomUUID();

    localStorage.setItem("vote_fingerprint", fingerprint);

    const { data: existingVote } =
        await supabase
            .from("field_votes")
            .select("*")
            .eq("field_id", fieldId)
            .eq("fingerprint", fingerprint)
            .maybeSingle();

    if (!existingVote) {

    const { error } =
        await supabase
            .from("field_votes")
            .insert({
                field_id: fieldId,
                rating,
                fingerprint
            });

    if (error) throw error;


    await new Promise(resolve =>
        setTimeout(resolve, 300)
    );

    const {
        data: updatedRating,
        error: ratingError
    } = await supabase
        .from("field_ratings")
        .select("*")
        .eq("field_id", fieldId)
        .single();

    if (ratingError) {
        throw ratingError;
    }

    return {
        message: "¡Gracias por tu voto!",
        rating: Number(
            updatedRating.average_rating
        ),
        votes:
            updatedRating.total_votes
    };
}

    const now = new Date();

    const lastUpdated = new Date(existingVote.last_updated);

    const minutesPassed = (now - lastUpdated) / 1000 / 60;

    const waitTimes = [
    60,          // 1 hour
    1440,        // 1 day
    10080,       // 1 week
    43200        // 1 month
        ];

    const requiredWait =
    waitTimes[
        Math.min(
            existingVote.update_count,
            waitTimes.length - 1
        )
    ];

    if (minutesPassed < requiredWait) {

        const remaining =
            requiredWait - minutesPassed;

        let text;

        if (remaining >= 43200) {
            const months = Math.ceil(remaining / 43200);
            text = `${months} ${months === 1 ? "mes" : "meses"}`;

        } else if (remaining >= 10080) {
            const weeks = Math.ceil(remaining / 10080);
            text = `${weeks} ${weeks === 1 ? "semana" : "semanas"}`;

        } else if (remaining >= 1440) {
            const days = Math.ceil(remaining / 1440);
            text = `${days} ${days === 1 ? "día" : "días"}`;

        } else {
            const hours = Math.ceil(remaining / 60);
            text = `${hours} ${hours === 1 ? "hora" : "horas"}`;
        }

        throw new Error(
            `Podés cambiar tu voto en ${text}`
        );
    }

    const { error } =
        await supabase
            .from("field_votes")
            .update({
                rating,
                update_count:
                    existingVote.update_count + 1,
                last_updated:
                    new Date().toISOString()
            })
            .eq("id", existingVote.id);

    if (error) throw error;

    const { data: updatedRating, error: ratingError } =
    await supabase
        .from("field_ratings")
        .select("*")
        .eq("field_id", fieldId)
        .single();

if (ratingError) {
    throw ratingError;
}

return {
    message: "¡Gracias por tu voto!",
    rating: Number(updatedRating.average_rating),
    votes: updatedRating.total_votes
};
}
import { supabase } from "./supabase.js";


/* ============================================
   GET PLAYER AVAILABILITY
============================================ */

export async function getPlayerAvailability(userId) {

    const {
        data,
        error
    } = await supabase
        .from("player_availability")
        .select(`
            id,
            user_id,
            available_date,
            start_time,
            end_time,
            zone,
            status,
            created_at
        `)
        .eq("user_id", userId)
        .eq("status", "available")
        .order("available_date", {
            ascending: true
        })
        .order("start_time", {
            ascending: true
        });

    if (error) {

        console.error(
            "Error getting player availability:",
            error
        );

        throw error;
    }

    return data || [];
}


/* ============================================
   GET CURRENT PLAYER AVAILABILITY
============================================ */

export async function getCurrentPlayerAvailability() {

    const {
        data: {
            user
        },
        error: userError
    } = await supabase.auth.getUser();

    if (userError || !user) {
        return [];
    }

    return getPlayerAvailability(user.id);
}


/* ============================================
   CREATE PLAYER AVAILABILITY
============================================ */

export async function createPlayerAvailability({
    availableDate,
    startTime,
    endTime,
    zone
}) {

    const {
        data: {
            user
        },
        error: userError
    } = await supabase.auth.getUser();

    if (userError || !user) {

        throw new Error(
            "No hay una sesión activa."
        );
    }

    if (!availableDate || !startTime || !endTime) {

        throw new Error(
            "Completá la fecha y el horario."
        );
    }

    if (startTime >= endTime) {

        throw new Error(
            "La hora de finalización debe ser posterior a la hora de inicio."
        );
    }

    const {
        data,
        error
    } = await supabase
        .from("player_availability")
        .insert({
            user_id: user.id,
            available_date: availableDate,
            start_time: startTime,
            end_time: endTime,
            zone: zone?.trim() || null,
            status: "available"
        })
        .select()
        .single();

    if (error) {

        console.error(
            "Error creating player availability:",
            error
        );

        throw error;
    }

    return data;
}


/* ============================================
   CANCEL PLAYER AVAILABILITY
============================================ */

export async function cancelPlayerAvailability(
    availabilityId
) {

    const {
        data: {
            user
        },
        error: userError
    } = await supabase.auth.getUser();

    if (userError || !user) {

        throw new Error(
            "No hay una sesión activa."
        );
    }

    const {
        data,
        error
    } = await supabase
        .from("player_availability")
        .update({
            status: "cancelled"
        })
        .eq("id", availabilityId)
        .eq("user_id", user.id)
        .select()
        .single();

    if (error) {

        console.error(
            "Error cancelling player availability:",
            error
        );

        throw error;
    }

    return data;
}
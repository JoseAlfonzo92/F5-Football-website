import { supabase } from "./supabase.js";


/* ============================================
   GET CURRENT USER
   ============================================ */

async function getCurrentUser() {

    const {
        data: {
            user
        },
        error
    } = await supabase.auth.getUser();


    if (error || !user) {
        return null;
    }


    return user;
}


/* ============================================
   CHECK IF FIELD IS FAVORITE
   ============================================ */

export async function isFavorite(fieldId) {

    const user =
        await getCurrentUser();


    if (!user) {
        return false;
    }


    const {
        data,
        error
    } = await supabase
        .from("favorite_fields")
        .select("id")
        .eq("user_id", user.id)
        .eq("field_id", fieldId)
        .maybeSingle();


    if (error) {

        console.error(
            "Error checking favorite:",
            error
        );

        throw error;
    }


    return Boolean(data);
}


/* ============================================
   GET USER FAVORITE FIELDS
   ============================================ */

export async function getFavoriteFields() {

    const user =
        await getCurrentUser();


    if (!user) {
        return [];
    }


    const {
        data,
        error
    } = await supabase
        .from("favorite_fields")
        .select("field_id")
        .eq("user_id", user.id);


    if (error) {

        console.error(
            "Error loading favorite fields:",
            error
        );

        throw error;
    }


    return data.map(
        favorite => favorite.field_id
    );
}


/* ============================================
   TOGGLE FAVORITE
   ============================================ */

export async function toggleFavorite(fieldId) {

    const user =
        await getCurrentUser();


    if (!user) {

        throw new Error(
            "Necesitás iniciar sesión para guardar una cancha."
        );
    }


    const {
        data: existingFavorite,
        error: checkError
    } = await supabase
        .from("favorite_fields")
        .select("id")
        .eq("user_id", user.id)
        .eq("field_id", fieldId)
        .maybeSingle();


    if (checkError) {

        console.error(
            "Error checking favorite:",
            checkError
        );

        throw checkError;
    }


    /* ----------------------------------------
       REMOVE FAVORITE
       ---------------------------------------- */

    if (existingFavorite) {

        const {
            error
        } = await supabase
            .from("favorite_fields")
            .delete()
            .eq("id", existingFavorite.id);


        if (error) {

            console.error(
                "Error removing favorite:",
                error
            );

            throw error;
        }


        return false;
    }


    /* ----------------------------------------
       ADD FAVORITE
       ---------------------------------------- */

    const {
        error
    } = await supabase
        .from("favorite_fields")
        .insert({
            user_id: user.id,
            field_id: fieldId
        });


    if (error) {

        console.error(
            "Error adding favorite:",
            error
        );

        throw error;
    }


    return true;
}
import { supabase } from "./supabase.js";


/* ============================================
   GET CURRENT PROFILE
   ============================================ */

export async function getCurrentProfile() {

    const {
        data: {
            user
        },
        error: userError
    } = await supabase.auth.getUser();


    if (userError || !user) {
        return null;
    }


    const {
        data,
        error
    } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();


    if (error) {

        console.error(
            "Error getting profile:",
            error
        );

        throw error;
    }


    return data;
}


/* ============================================
   CHECK USERNAME
   ============================================ */

export async function isUsernameAvailable(
    username,
    currentUserId
) {

    const {
        data,
        error
    } = await supabase
        .from("profiles")
        .select("id")
        .eq("username", username)
        .neq("id", currentUserId)
        .maybeSingle();


    if (error) {

        console.error(
            "Error checking username:",
            error
        );

        throw error;
    }


    return !data;
}


/* ============================================
   UPDATE PROFILE
   ============================================ */

export async function updateProfile({
    username,
    displayName
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


    const {
        data,
        error
    } = await supabase
        .from("profiles")
        .update({
            username,
            display_name: displayName
        })
        .eq("id", user.id)
        .select()
        .single();


    if (error) {

        console.error(
            "Error updating profile:",
            error
        );

        throw error;
    }


    return data;
}

 
/* ============================================ 
   GET CURRENT PLAYER PROFILE 
============================================ */ 
 
export async function getCurrentPlayerProfile() { 
 
    const { 
        data: { 
            user 
        }, 
        error: userError 
    } = await supabase.auth.getUser(); 
 
    if (userError || !user) { 
        return null; 
    } 
 
    const { 
        data, 
        error 
    } = await supabase 
        .from("player_profiles") 
        .select("*") 
        .eq("user_id", user.id) 
        .maybeSingle(); 
 
    if (error) { 
 
        console.error( 
            "Error getting player profile:", 
            error 
        ); 
 
        throw error; 
    } 
 
    return data; 
} 
 
 
/* ============================================ 
   UPDATE PLAYER PROFILE 
============================================ */ 
 
export async function updatePlayerProfile({ 
    position, 
    zone, 
    level, 
    isPublic 
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
 
    const { 
        data, 
        error 
    } = await supabase 
        .from("player_profiles") 
        .upsert( 
            { 
                user_id: user.id, 
                position, 
                zone, 
                level, 
                is_public: isPublic, 
                updated_at: new Date().toISOString() 
            }, 
            { 
                onConflict: "user_id" 
            } 
        ) 
        .select() 
        .single(); 
 
    if (error) { 
 
        console.error( 
            "Error updating player profile:", 
            error 
        ); 
 
        throw error; 
    } 
 
    return data; 
}

/* ============================================
   GET PUBLIC PLAYER PROFILES
============================================ */

export async function getPublicPlayers() {

    const {
        data,
        error
    } = await supabase
        .from("player_profiles")
        .select(`
            user_id,
            position,
            zone,
            level,
            profiles (
                display_name,
                username,
                avatar_url
            )
        `)
        .eq("is_public", true);

    if (error) {

        console.error(
            "Error getting public players:",
            error
        );

        throw error;
    }

    return data;
}
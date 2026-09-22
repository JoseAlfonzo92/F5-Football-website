import { supabase } from "./supabase.js";

// GET CURRENT USER
export async function getCurrentUser() {

    const {
        data: { user },
        error
    } = await supabase.auth.getUser();

    if (error) {
        console.error("Error getting current user:", error);
        return null;
    }

    return user;
}

// GET CURRENT SESSION
export async function getCurrentSession() {

    const {
        data: { session },
        error
    } = await supabase.auth.getSession();

    if (error) {
        console.error("Error getting current session:", error);
        return null;
    }

    return session;
}

// SIGN UP
export async function signUp({
    email,
    password,
    username,
    displayName
}) {

    const confirmationRedirect =
        `${window.location.origin}/F5%20Futbol%205/pages/email-confirmed.html`;


    const {
        data,
        error
    } = await supabase.auth.signUp({

        email,

        password,

        options: {

            emailRedirectTo:
                confirmationRedirect,

            data: {
                username,
                display_name: displayName
            }
        }
    });


    if (error) {

        console.error(
            "Sign up error:",
            error
        );

        throw error;
    }


    return data;
}

// SIGN IN
export async function signIn(email, password) {

    const {
        data,
        error
    } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    if (error) {
        console.error("Sign in error:", error);
        throw error;
    }

    return data;
}

// SIGN OUT
export async function signOut() {

    const {
        error
    } = await supabase.auth.signOut();

    if (error) {
        console.error("Sign out error:", error);
        throw error;
    }
}

// GET CURRENT PROFILE
/* export async function getCurrentProfile() {

    const user = await getCurrentUser();

    if (!user) {
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
        console.error("Error getting profile:", error);
        return null;
    }

    return data;
} */

// AUTH STATE LISTENER
export function onAuthStateChange(callback) {

    return supabase.auth.onAuthStateChange(
        (event, session) => {

            callback(event, session);

        }
    );
}
import {
    getCurrentUser
} from "../services/auth.js";


export async function initEmailConfirmedPage() {

    const user =
        await getCurrentUser();


    if (!user) {

        console.warn(
            "No authenticated user found after email confirmation."
        );

        return;
    }


    const displayNameElement =
        document.getElementById(
            "confirmed-display-name"
        );


    const usernameElement =
        document.getElementById(
            "confirmed-username"
        );


    const userContainer =
        document.getElementById(
            "email-confirmed-user"
        );


    const displayName =
        user.user_metadata?.display_name ||
        user.user_metadata?.username ||
        "usuario";


    const username =
        user.user_metadata?.username ||
        "";


    if (displayNameElement) {

        displayNameElement.textContent =
            displayName;
    }


    if (usernameElement) {

        usernameElement.textContent =
            username
                ? `@${username}`
                : "";
    }


    if (userContainer) {

        userContainer.hidden = false;
    }
}
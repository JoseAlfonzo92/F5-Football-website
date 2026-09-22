import {
    getCurrentUser,
    signOut,
    onAuthStateChange
} from "../services/auth.js";

import {
    getCurrentProfile
} from "../services/profiles.js";

/* ============================================
   UPDATE AUTH UI
   ============================================ */

function updateAuthUI(profile) {

    const loggedIn = Boolean(profile);


    /* ========================================
       DESKTOP
       ======================================== */

    const desktopRegister =
        document.getElementById("desktop-auth-nav");

    const desktopLogin =
        document.getElementById("desktop-login-nav");

    const desktopUser =
        document.getElementById("desktop-user-nav");

    const desktopLogout =
        document.getElementById("desktop-logout-nav");


    /* ========================================
       MOBILE
       ======================================== */

    const mobileRegister =
        document.getElementById("mobile-register-nav");

    const mobileLogin =
        document.getElementById("mobile-login-nav");

    const mobileUser =
        document.getElementById("mobile-user-nav");

    const mobileLogout =
        document.getElementById("mobile-logout-nav");


    /* ========================================
       DESKTOP UI
       ======================================== */

    if (desktopRegister) {

        desktopRegister.hidden = loggedIn;
    }


    if (desktopLogin) {

        desktopLogin.hidden = loggedIn;
    }


    if (desktopUser) {

        desktopUser.hidden = !loggedIn;

        if (loggedIn) {

            const link =
                desktopUser.querySelector("a");

            if (link) {

                link.textContent =
                    profile.display_name ||
                    profile.username ||
                    "Mi cuenta";
            }
        }
    }


    if (desktopLogout) {

        desktopLogout.hidden = !loggedIn;
    }


    /* ========================================
       MOBILE UI
       ======================================== */

    if (mobileRegister) {

        mobileRegister.hidden = loggedIn;
    }


    if (mobileLogin) {

        mobileLogin.hidden = loggedIn;
    }


    if (mobileUser) {

        mobileUser.hidden = !loggedIn;

        if (loggedIn) {

            const link =
                mobileUser.querySelector("a");

            if (link) {

                link.textContent =
                    profile.display_name ||
                    profile.username ||
                    "Mi cuenta";
            }
        }
    }


    if (mobileLogout) {

        mobileLogout.hidden = !loggedIn;
    }
}


/* ============================================
   REFRESH AUTH UI
   ============================================ */

async function refreshAuthUI() {

    const user =
        await getCurrentUser();


    /* ----------------------------------------
       LOGGED OUT
       ---------------------------------------- */

    if (!user) {

        updateAuthUI(null);

        return;
    }


    /* ----------------------------------------
       LOGGED IN
       ---------------------------------------- */

    const profile =
        await getCurrentProfile();


    if (!profile) {

        console.warn(
            "Authenticated user found, but profile could not be loaded."
        );

        return;
    }


    updateAuthUI(profile);
}


/* ============================================
   LOGOUT
   ============================================ */

async function handleLogout() {

    try {

        await signOut();

        updateAuthUI(null);

        window.location.href =
            "index.html";

    } catch (error) {

        console.error(
            "Logout error:",
            error
        );

        alert(
            "No pudimos cerrar tu sesión. Intentá nuevamente."
        );
    }
}


/* ============================================
   INITIALIZE
   ============================================ */

export function initAuthNav() {


    /* ----------------------------------------
       LOGOUT BUTTONS
       ---------------------------------------- */

    const desktopLogoutButton =
        document.getElementById(
            "desktop-logout-button"
        );


    const mobileLogoutButton =
        document.getElementById(
            "mobile-logout-button"
        );


    if (desktopLogoutButton) {

        desktopLogoutButton.addEventListener(
            "click",
            handleLogout
        );
    }


    if (mobileLogoutButton) {

        mobileLogoutButton.addEventListener(
            "click",
            handleLogout
        );
    }


    /* ----------------------------------------
       INITIAL SESSION
       ---------------------------------------- */

    refreshAuthUI();


    /* ----------------------------------------
       AUTH STATE CHANGES
       ---------------------------------------- */

    onAuthStateChange(
        async (event, session) => {

            console.log(
                "AUTH EVENT:",
                event
            );


            if (!session) {

                updateAuthUI(null);

                return;
            }


            await refreshAuthUI();
        }
    );
}
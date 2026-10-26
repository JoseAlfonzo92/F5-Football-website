import { getCurrentUser, signOut, onAuthStateChange } from "../services/auth.js";
import { getCurrentProfile } from "../services/profiles.js";
import { supabase } from "../services/supabase.js";

// UPDATE AUTH UI

function updateAuthUI(profile) {
    const loggedIn = Boolean(profile);

    const ids = {
        desktopRegister: "desktop-auth-nav",
        desktopLogin: "desktop-login-nav",
        desktopUser: "desktop-user-nav",
        desktopLogout: "desktop-logout-nav",
        mobileRegister: "mobile-register-nav",
        mobileLogin: "mobile-login-nav",
        mobileUser: "mobile-user-nav",
        mobileLogout: "mobile-logout-nav",
    };

    // Account-required links
    [
        "desktop-teams-nav",
        "desktop-players-nav",
        "mobile-teams-nav",
        "mobile-players-nav",
    ].forEach((id) => {
        const item = document.getElementById(id);
        if (item) item.hidden = !loggedIn;
    });

    // Register and login should only appear when signed out
    [
        ids.desktopRegister,
        ids.desktopLogin,
        ids.mobileRegister,
        ids.mobileLogin,
    ].forEach((id) => {
        const item = document.getElementById(id);
        if (item) item.hidden = loggedIn;
    });

    // Profile and logout should only appear when signed in
    [
        ids.desktopUser,
        ids.desktopLogout,
        ids.mobileUser,
        ids.mobileLogout,
    ].forEach((id) => {
        const item = document.getElementById(id);
        if (item) item.hidden = !loggedIn;
    });

    // Update account display names
    if (loggedIn) {
        [ids.desktopUser, ids.mobileUser].forEach((id) => {
            const item = document.getElementById(id);
            const link = item?.querySelector("a");

            if (link) {
                link.textContent =
                    profile.display_name ||
                    profile.username ||
                    "Mi cuenta";
            }
        });
    }
}


// UPDATE ADMIN NAVIGATION

async function updateAdminNav(user) {
    const adminNavItems = [
        "desktop-admin-nav",
        "mobile-admin-nav"
    ];

    // Hide links by default until authorization is confirmed.
    adminNavItems.forEach((id) => {
        const item = document.getElementById(id);

        if (item) {
            item.hidden = true;
        }
    });

    if (!user) {
        return;
    }

    try {
        const { data: isAdmin, error } = await supabase.rpc(
            "is_fulsap_admin"
        );

        if (error) {
            console.error(
                "Could not verify admin permissions:",
                error
            );
            return;
        }

        if (isAdmin === true) {
            adminNavItems.forEach((id) => {
                const item = document.getElementById(id);

                if (item) {
                    item.hidden = false;
                }
            });
        }
    } catch (error) {
        console.error(
            "Admin navigation error:",
            error
        );
    }
}


// REFRESH AUTH UI

// REFRESH AUTH UI

async function refreshAuthUI() {
    const user = await getCurrentUser();

    // Always refresh admin navigation, including when logged out.
    await updateAdminNav(user);

    // LOGGED OUT
    if (!user) {
        updateAuthUI(null);
        return;
    }

    // LOGGED IN
    const profile = await getCurrentProfile();

    if (!profile) {
        console.warn(
            "Authenticated user found, but profile could not be loaded."
        );
        return;
    }

    updateAuthUI(profile);
}


// LOGOUT

async function handleLogout() {

    try {

        await signOut();

        updateAuthUI(null);

        const isNestedPage =
            window.location.pathname.includes("/pages/");

        window.location.href = isNestedPage
            ? "../index.html"
            : "index.html";

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


// INITIALIZE

export function initAuthNav() {


    //LOGOUT BUTTONS

    const desktopLogoutButton = document.getElementById("desktop-logout-button");
    const mobileLogoutButton = document.getElementById("mobile-logout-button");

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


    // INITIAL SESSION

    refreshAuthUI();


    // AUTH STATE CHANGES

   // AUTH STATE CHANGES

    onAuthStateChange((event, session) => {
        console.log("AUTH EVENT:", event);

        // Defer the async work until the auth callback has finished.
        setTimeout(() => {
            refreshAuthUI().catch((error) => {
                console.error("Error refreshing auth UI:", error);
            });
        }, 0);
    });
}
import { getCurrentUser, signOut } from "../services/auth.js";
import { getUserTeams } from "./teams.js";
import { getCurrentProfile, getCurrentPlayerProfile, isUsernameAvailable, updateProfile, updatePlayerProfile} from "../services/profiles.js";

import { getFavoriteFields, toggleFavorite} from "../services/favorites.js";
import { getCurrentPlayerAvailability, createPlayerAvailability, cancelPlayerAvailability} from "../services/player-availability.js";

import { getPendingTeamInvitations, acceptTeamInvitation, rejectTeamInvitation} from "./team.js";
import { getFields } from "./fieldsRenderer.js";

let currentPlayerProfile = null;
let currentPlayerAvailability = [];
/* ============================================
   HELPERS
   ============================================ */

function getElement(id) {
    return document.getElementById(id);
}


function showMessage(
    message,
    type = ""
) {

    const element =
        getElement("profile-message");


    if (!element) return;


    element.textContent = message;
    element.className =
        `profile-message ${type}`.trim();


    element.hidden = false;
}


function hideMessage() {

    const element =
        getElement("profile-message");


    if (!element) return;


    element.hidden = true;
}

/* ============================================
   WELCOME
   ============================================ */

/* function showWelcome(profile) {

    const welcome =
        getElement("profile-welcome");

    const welcomeName =
        getElement("welcome-display-name");

    const profileCard =
        getElement("profile-card");


    if (!welcome) return;


    if (welcomeName) {

        welcomeName.textContent =
            profile.display_name ||
            profile.username ||
            "usuario";
    }


    welcome.hidden = false;


    if (profileCard) {
        profileCard.hidden = true;
    }
}


function hideWelcome() {

    const welcome =
        getElement("profile-welcome");

    const profileCard =
        getElement("profile-card");


    if (welcome) {
        welcome.hidden = true;
    }


    if (profileCard) {
        profileCard.hidden = false;
    }
} */


/* ============================================
   DISPLAY PROFILE
   ============================================ */

function renderProfile(profile) {

    const profileCard =
    getElement("profile-card");

if (profileCard) {
    profileCard.hidden = false;
}

    const displayName =
        getElement("profile-display-name");

    const username =
        getElement("profile-username");

    const email =
        getElement("profile-email");

    const memberSince =
    getElement("profile-created-at");


    if (displayName) {

        displayName.textContent =
            profile.display_name || "—";
    }


    if (username) {

        username.textContent =
            profile.username
                ? `@${profile.username}`
                : "—";
    }


    if (email) {

        email.textContent =
            profile.email || "—";
    }


    if (memberSince) {

        const date =
            new Date(profile.created_at);


        memberSince.textContent =
            new Intl.DateTimeFormat(
                "es-AR",
                {
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                }
            ).format(date);
    }


    /* EDIT INPUTS */

    const editDisplayName =
        getElement("edit-display-name");

    const editUsername =
        getElement("edit-username");


    if (editDisplayName) {

        editDisplayName.value =
            profile.display_name || "";
    }


    if (editUsername) {

        editUsername.value =
            profile.username || "";
    }
}


/* ============================================
   RENDER PLAYER PROFILE
============================================ */

function renderPlayerProfile(playerProfile) {

    const positionInput =
        getElement("player-position");

    const zoneInput =
        getElement("player-zone");

    const levelInput =
        getElement("player-level");

    const publicInput =
        getElement("player-is-public");


    const positionDisplay =
        getElement("player-profile-position");

    const zoneDisplay =
        getElement("player-profile-zone");

    const levelDisplay =
        getElement("player-profile-level");

    const publicDisplay =
        getElement("player-profile-public");


    if (!positionInput ||
        !zoneInput ||
        !levelInput ||
        !publicInput ||
        !positionDisplay ||
        !zoneDisplay ||
        !levelDisplay ||
        !publicDisplay) {

        return;
    }


    /* NO PLAYER PROFILE YET */

    if (!playerProfile) {

        positionInput.value = "";
        zoneInput.value = "";
        levelInput.value = "";
        publicInput.checked = true;

        positionDisplay.textContent = "No especificada";
        zoneDisplay.textContent = "No especificada";
        levelDisplay.textContent = "No especificado";
        publicDisplay.textContent = "Sí";

        return;
    }


    /* LOAD FORM VALUES */

    positionInput.value =
        playerProfile.position || "";

    zoneInput.value =
        playerProfile.zone || "";

    levelInput.value =
        playerProfile.level || "";

    publicInput.checked =
        playerProfile.is_public !== false;


    /* LOAD DISPLAY VALUES */

    positionDisplay.textContent =
        playerProfile.position || "No especificada";

    zoneDisplay.textContent =
        playerProfile.zone || "No especificada";

    levelDisplay.textContent =
        playerProfile.level || "No especificado";

    publicDisplay.textContent =
        playerProfile.is_public
            ? "Sí"
            : "No";
}



/* ============================================
   SAVE PLAYER PROFILE
============================================ */

async function handlePlayerProfileSubmit(event) {

    console.log("PLAYER PROFILE SUBMIT");

    event.preventDefault();

    console.log("PLAYER PROFILE DEFAULT PREVENTED");


    const positionInput =
        getElement("player-position");

    const zoneInput =
        getElement("player-zone");

    const levelInput =
        getElement("player-level");

    const publicInput =
        getElement("player-is-public");

    const message =
        getElement("player-profile-message");

    const display =
        getElement("player-profile-display");

    const form =
        getElement("player-profile-form");


    if (!positionInput ||
        !zoneInput ||
        !levelInput ||
        !publicInput) {

        console.log(
            "PLAYER PROFILE ELEMENTS MISSING"
        );

        return;
    }


    try {

        console.log(
            "CALLING UPDATE PLAYER PROFILE"
        );


        const updatedPlayerProfile =
            await updatePlayerProfile({

                position:
                    positionInput.value || null,

                zone:
                    zoneInput.value.trim() || null,

                level:
                    levelInput.value || null,

                isPublic:
                    publicInput.checked

            });

            currentPlayerProfile =
    updatedPlayerProfile;


        console.log(
            "PLAYER PROFILE UPDATED",
            updatedPlayerProfile
        );


        /* UPDATE DISPLAY */

        renderPlayerProfile(
            updatedPlayerProfile
        );


        /* SHOW DISPLAY */

        if (display) {
            display.hidden = false;
        }


        /* HIDE FORM */

        if (form) {
            form.hidden = true;
        }


        /* MESSAGE */

        if (message) {

            message.textContent =
                "Información de jugador guardada correctamente.";

            message.hidden = false;

            setTimeout(() => {

                message.hidden = true;

            }, 3000);
        }


    } catch (error) {

        console.error(
            "Error saving player profile:",
            error
        );


        if (message) {

            message.textContent =
                "No se pudo guardar la información de jugador.";

            message.hidden = false;
        }
    }
}


/* ============================================
   EDIT PLAYER PROFILE
============================================ */

function handleEditPlayerProfile() {

    const display =
        getElement("player-profile-display");

    const form =
        getElement("player-profile-form");

    const message =
        getElement("player-profile-message");


    if (display) {
        display.hidden = true;
    }

    if (form) {
        form.hidden = false;
    }

    if (message) {
        message.hidden = true;
    }
}


/* ============================================
   CANCEL PLAYER PROFILE EDIT
============================================ */

function handleCancelPlayerProfile() {

    const display =
        getElement("player-profile-display");

    const form =
        getElement("player-profile-form");

    const message =
        getElement("player-profile-message");


    /* RESTORE SAVED VALUES */

    if (currentPlayerProfile) {

        renderPlayerProfile(
            currentPlayerProfile
        );

    } else {

        renderPlayerProfile(null);

    }


    /* SHOW DISPLAY */

    if (display) {
        display.hidden = false;
    }


    /* HIDE FORM */

    if (form) {
        form.hidden = true;
    }


    if (message) {
        message.hidden = true;
    }
}



/* ============================================
   VIEW MODE
   ============================================ */

function showViewMode() {

    const view =
        getElement("profile-card");

    const edit =
        getElement("profile-edit");

    if (view) {
        view.hidden = false;
    }

    if (edit) {
        edit.hidden = true;
    }

    hideMessage();
}


/* ============================================
   EDIT MODE
   ============================================ */

function showEditMode() {

    const view =
        getElement("profile-card");

    const edit =
        getElement("profile-edit");

    if (view) {
        view.hidden = true;
    }

    if (edit) {
        edit.hidden = false;
    }

    hideMessage();
}


/* ============================================
   VALIDATE USERNAME
   ============================================ */

function validateUsername(username) {

    if (!username) {

        return "El nombre de usuario es obligatorio.";
    }


    if (username.length < 3) {

        return "El nombre de usuario debe tener al menos 3 caracteres.";
    }


    if (username.length > 30) {

        return "El nombre de usuario no puede superar los 30 caracteres.";
    }


    if (!/^[a-zA-Z0-9_.]+$/.test(username)) {

        return "El nombre de usuario solo puede contener letras, números, puntos y guiones bajos.";
    }


    return null;
}


/* ============================================
   SAVE PROFILE
   ============================================ */

async function handleProfileSubmit(event) {

    event.preventDefault();


    const displayName =
        getElement("edit-display-name")
            ?.value
            .trim();


    const username =
        getElement("edit-username")
            ?.value
            .trim();


    const saveButton =
        getElement("profile-save");


    const user =
        await getCurrentUser();


    if (!user) {

        showMessage(
            "Tu sesión ha expirado. Iniciá sesión nuevamente.",
            "error"
        );

        return;
    }


    /* VALIDATE DISPLAY NAME */

    if (!displayName) {

        showMessage(
            "El nombre para mostrar es obligatorio.",
            "error"
        );

        return;
    }


    if (displayName.length > 50) {

        showMessage(
            "El nombre para mostrar no puede superar los 50 caracteres.",
            "error"
        );

        return;
    }


    /* VALIDATE USERNAME */

    const usernameError =
        validateUsername(username);


    if (usernameError) {

        showMessage(
            usernameError,
            "error"
        );

        return;
    }


    try {

        if (saveButton) {

            saveButton.disabled = true;
            saveButton.textContent =
                "Guardando...";
        }


        /* CHECK USERNAME */

        const available =
            await isUsernameAvailable(
                username,
                user.id
            );


        if (!available) {

            showMessage(
                "Ese nombre de usuario ya está en uso.",
                "error"
            );

            return;
        }


        /* UPDATE */

        const updatedProfile =
            await updateProfile({
                username,
                displayName
            });


        renderProfile(
            updatedProfile
        );


        showViewMode();


        showMessage(
            "Tu perfil fue actualizado correctamente.",
            "success"
        );


    } catch (error) {

        console.error(
            "Profile update error:",
            error
        );


        showMessage(
            error.message ||
            "No pudimos actualizar tu perfil.",
            "error"
        );


    } finally {

        if (saveButton) {

            saveButton.disabled = false;
            saveButton.textContent =
                "Guardar cambios";
        }
    }
}


/* ============================================
   SAVED FIELDS
   ============================================ */

async function renderSavedFields(favoriteIds) {

    const loading =
        getElement("saved-fields-loading");

    const empty =
        getElement("saved-fields-empty");

    const grid =
        getElement("saved-fields-grid");


    if (loading) {
        loading.hidden = true;
    }


    if (!grid || !empty) {
        return;
    }


const fields = await getFields();

const favoriteFields =
    fields.filter(field =>
        favoriteIds.includes(field.id)
    );


    /* ----------------------------------------
       EMPTY STATE
       ---------------------------------------- */

    if (!favoriteFields.length) {

        grid.hidden = true;
        empty.hidden = false;

        return;
    }


    /* ----------------------------------------
       RENDER CAROUSEL
       ---------------------------------------- */

    empty.hidden = true;
    grid.hidden = false;


    let html = `
        <div class="saved-fields-carousel-wrapper">

            <button
                type="button"
                class="saved-fields-arrow saved-fields-left"
                aria-label="Anterior"
            >
                ‹
            </button>

            <div class="saved-fields-carousel">
    `;


    favoriteFields.forEach(field => {

        html += `
            <a
                href="field.html?id=${field.id}"
                class="saved-field-card"
                data-field-id="${field.id}"
            >

                <div class="saved-field-image">

                    <img
                        src="${field.image}"
                        alt="${field.name}"
                        loading="lazy"
                        decoding="async"
                        width="400"
                        height="250"
                    >


                    <button
                        type="button"
                        class="favorite-button saved-field-favorite is-favorite"
                        data-field-id="${field.id}"
                        aria-label="Quitar de mis canchas guardadas"
                        aria-pressed="true"
                    >
                        <span data-icon="heart">
                            ♥
                        </span>
                    </button>


                    ${
                        field.type
                            ? `
                                <span class="saved-field-type">
                                    ${
                                        field.type === "semi-techada"
                                            ? "Semi techada"
                                            : field.type.charAt(0).toUpperCase() +
                                              field.type.slice(1)
                                    }
                                </span>
                              `
                            : ""
                    }

                </div>


                <div class="saved-field-content">

                    <div class="saved-field-top">

                        <h4>
                            ${field.name}
                        </h4>

                        <span class="saved-field-rating">
                            ${
                                field.votes
                                    ? `★ ${field.rating.toFixed(1)}`
                                    : "Sin votos"
                            }
                        </span>

                    </div>


                    <p class="saved-field-location">
                        ${field.location}
                    </p>


                    <p class="saved-field-price">
                        $${field.priceFrom.toLocaleString("es-AR")}
                        -
                        $${field.priceTo.toLocaleString("es-AR")}
                    </p>

                </div>

            </a>
        `;
    });


    html += `
            </div>


            <button
                type="button"
                class="saved-fields-arrow saved-fields-right"
                aria-label="Siguiente"
            >
                ›
            </button>

        </div>
    `;


    grid.innerHTML = html;


    /* ----------------------------------------
       INITIALIZE FAVORITE BUTTONS
       ---------------------------------------- */

    initSavedFieldFavoriteButtons();


    /* ----------------------------------------
       CAROUSEL CONTROLS
       ---------------------------------------- */

    const carousel =
        grid.querySelector(
            ".saved-fields-carousel"
        );

    const btnLeft =
        grid.querySelector(
            ".saved-fields-left"
        );

    const btnRight =
        grid.querySelector(
            ".saved-fields-right"
        );


    if (
        carousel &&
        btnLeft &&
        btnRight
    ) {

        const scrollAmount = 320;


        btnLeft.addEventListener(
            "click",
            () => {

                carousel.scrollBy({
                    left: -scrollAmount,
                    behavior: "smooth"
                });

            }
        );


        btnRight.addEventListener(
            "click",
            () => {

                carousel.scrollBy({
                    left: scrollAmount,
                    behavior: "smooth"
                });

            }
        );


        /* ------------------------------------
           ARROW VISIBILITY
           ------------------------------------ */

        const updateArrows = () => {

            const scrollLeft =
                carousel.scrollLeft;

            const maxScroll =
                carousel.scrollWidth -
                carousel.clientWidth;


            btnLeft.style.opacity =
                scrollLeft <= 30
                    ? "0.35"
                    : "1";


            btnRight.style.opacity =
                scrollLeft >= maxScroll - 30
                    ? "0.35"
                    : "1";


            /*
             * If everything fits inside
             * the container, hide arrows.
             */

            const hasOverflow =
                maxScroll > 10;


            btnLeft.style.visibility =
                hasOverflow
                    ? "visible"
                    : "hidden";


            btnRight.style.visibility =
                hasOverflow
                    ? "visible"
                    : "hidden";
        };


        carousel.addEventListener(
            "scroll",
            updateArrows
        );


        setTimeout(
            updateArrows,
            350
        );


        window.addEventListener(
            "resize",
            updateArrows
        );
    }
}


/* ============================================
   MY TEAMS
============================================ */

function renderProfileTeams(userTeams) {

    const loading =
        getElement("profile-teams-loading");

    const empty =
        getElement("profile-teams-empty");

    const grid =
        getElement("profile-teams-grid");


    if (loading) {
        loading.hidden = true;
    }


    if (!grid || !empty) {
        return;
    }


    /*
     * Only keep memberships that
     * contain a valid team.
     */

    const teams =
        userTeams
            .filter(item => item.teams)
            .map(item => ({
                membershipId:
                    item.id,

                role:
                    item.role,

                joinedAt:
                    item.joined_at,

                ...item.teams
            }));


    /* ----------------------------------------
       EMPTY STATE
    ---------------------------------------- */

    if (!teams.length) {

        grid.hidden = true;
        empty.hidden = false;

        return;
    }


    /* ----------------------------------------
       RENDER CAROUSEL
    ---------------------------------------- */

    empty.hidden = true;
    grid.hidden = false;


    let html = `
        <div class="saved-fields-carousel-wrapper">

            <button
                type="button"
                class="saved-fields-arrow saved-fields-left profile-teams-left"
                aria-label="Anterior"
            >
                ‹
            </button>

            <div class="saved-fields-carousel profile-teams-carousel">
    `;


    teams.forEach(team => {

        const role =
            team.role === "captain"
                ? "Capitán"
                : "Jugador";


        const logo =
            team.logo_url ||
            "";


        html += `

            <article
                class="saved-field-card profile-team-card"
                data-team-id="${team.id}"
            >

                <a
                    href="team.html?id=${team.id}"
                    class="profile-team-card-link"
                >

                    <div class="saved-field-image profile-team-image">

                        ${
                            logo
                                ? `
                                    <img
                                        src="${logo}"
                                        alt="${team.name}"
                                        loading="lazy"
                                        decoding="async"
                                        width="400"
                                        height="250"
                                    >
                                  `
                                : `
                                    <div class="profile-team-placeholder">
                                        <span data-icon="users"></span>
                                    </div>
                                  `
                        }

                    </div>


                    <div class="saved-field-content">

                        <div class="saved-field-top">

                            <h4>
                                ${team.name}
                            </h4>

                            <span class="saved-field-rating">
                                ${role}
                            </span>

                        </div>


                        ${
                            team.description
                                ? `
                                    <p class="saved-field-location">
                                        ${team.description}
                                    </p>
                                  `
                                : ""
                        }


                        <p class="saved-field-price">

                            ${
                                team.zone
                                    ? team.zone
                                    : ""
                            }

                            ${
                                team.zone &&
                                team.level
                                    ? " · "
                                    : ""
                            }

                            ${
                                team.level
                                    ? team.level
                                    : ""
                            }

                        </p>

                    </div>

                </a>

            </article>

        `;
    });


    html += `

            </div>


            <button
                type="button"
                class="saved-fields-arrow saved-fields-right profile-teams-right"
                aria-label="Siguiente"
            >
                ›
            </button>

        </div>

    `;


    grid.innerHTML = html;


    /* ----------------------------------------
       CAROUSEL CONTROLS
    ---------------------------------------- */

    const carousel =
        grid.querySelector(
            ".profile-teams-carousel"
        );

    const btnLeft =
        grid.querySelector(
            ".profile-teams-left"
        );

    const btnRight =
        grid.querySelector(
            ".profile-teams-right"
        );


    if (
        !carousel ||
        !btnLeft ||
        !btnRight
    ) {
        return;
    }


    const scrollAmount = 320;


    btnLeft.addEventListener(
        "click",
        () => {

            carousel.scrollBy({
                left: -scrollAmount,
                behavior: "smooth"
            });

        }
    );


    btnRight.addEventListener(
        "click",
        () => {

            carousel.scrollBy({
                left: scrollAmount,
                behavior: "smooth"
            });

        }
    );


    /* ----------------------------------------
       ARROW VISIBILITY
    ---------------------------------------- */

    const updateArrows = () => {

        const scrollLeft =
            carousel.scrollLeft;

        const maxScroll =
            carousel.scrollWidth -
            carousel.clientWidth;


        btnLeft.style.opacity =
            scrollLeft <= 30
                ? "0.35"
                : "1";


        btnRight.style.opacity =
            scrollLeft >= maxScroll - 30
                ? "0.35"
                : "1";


        const hasOverflow =
            maxScroll > 10;


        btnLeft.style.visibility =
            hasOverflow
                ? "visible"
                : "hidden";


        btnRight.style.visibility =
            hasOverflow
                ? "visible"
                : "hidden";
    };


    carousel.addEventListener(
        "scroll",
        updateArrows
    );


    setTimeout(
        updateArrows,
        350
    );


    window.addEventListener(
        "resize",
        updateArrows
    );
}


/* ============================================
   SAVED FIELD FAVORITE BUTTONS
   ============================================ */

function initSavedFieldFavoriteButtons() {

    const buttons =
        document.querySelectorAll(
            ".saved-field-favorite"
        );


    buttons.forEach(button => {

        button.addEventListener(
            "click",
            async event => {

                /*
                 * Prevent the click from
                 * opening the field page.
                 */

                event.preventDefault();
                event.stopPropagation();


                if (button.disabled) {
                    return;
                }


                const fieldId =
                    button.dataset.fieldId;


                try {

                    button.disabled = true;


                    const favorite =
                        await toggleFavorite(
                            fieldId
                        );


                    /*
                     * Since this is the
                     * "saved fields" page,
                     * removing the favorite
                     * should remove the card.
                     */

                    if (!favorite) {

                        const card =
                            button.closest(
                                ".saved-field-card"
                            );


                        if (card) {

                            card.remove();

                        }


                        /*
                         * Check if there are
                         * any cards remaining.
                         */

                        const remaining =
                            document.querySelectorAll(
                                ".saved-field-card"
                            );


                        if (!remaining.length) {

                            const empty =
                                getElement(
                                    "saved-fields-empty"
                                );

                            const grid =
                                getElement(
                                    "saved-fields-grid"
                                );


                            if (grid) {
                                grid.hidden = true;
                            }


                            if (empty) {
                                empty.hidden = false;
                            }
                        }

                    }


                } catch (error) {

                    console.error(
                        "Saved field favorite error:",
                        error
                    );


                    alert(
                        error.message ||
                        "No pudimos actualizar tus canchas guardadas."
                    );


                } finally {

                    button.disabled = false;
                }
            }
        );
    });
}


/* ============================================
   TEAM INVITATIONS
============================================ */

let currentTeamInvitations = [];


async function loadTeamInvitations(
    userId
) {

    const loading =
        getElement(
            "team-invitations-loading"
        );

    const empty =
        getElement(
            "team-invitations-empty"
        );

    const list =
        getElement(
            "team-invitations-list"
        );


    if (!loading || !empty || !list) {
        return;
    }


    try {

        loading.hidden = false;
        empty.hidden = true;
        list.hidden = true;


        currentTeamInvitations =
            await getPendingTeamInvitations(
                userId
            );


        renderTeamInvitations();


    } catch (error) {

        console.error(
            "Error loading team invitations:",
            error
        );


        loading.hidden = true;

        list.hidden = false;

        list.innerHTML = `
            <p class="profile-message error">
                No pudimos cargar tus invitaciones.
            </p>
        `;
    }
}


function renderTeamInvitations() {

    const loading =
        getElement(
            "team-invitations-loading"
        );

    const empty =
        getElement(
            "team-invitations-empty"
        );

    const list =
        getElement(
            "team-invitations-list"
        );


    if (!loading || !empty || !list) {
        return;
    }


    loading.hidden = true;


    if (!currentTeamInvitations.length) {

        list.hidden = true;
        empty.hidden = false;

        return;
    }


    empty.hidden = true;
    list.hidden = false;


    list.innerHTML =
        currentTeamInvitations
            .map(invitation => {

                const teamName =
                    invitation.teams?.name ||
                    "Equipo";


                const date =
                    new Date(
                        invitation.created_at
                    );


                const formattedDate =
                    new Intl.DateTimeFormat(
                        "es-AR",
                        {
                            day: "numeric",
                            month: "long",
                            year: "numeric"
                        }
                    ).format(date);


                return `
                    <article
                        class="team-invitation-card"
                        data-invitation-id="${invitation.id}"
                    >

                        <div
                            class="team-invitation-info"
                        >

                            <strong>
                                ${teamName}
                            </strong>

                            <span>
                                Te invitó a formar parte de su equipo.
                            </span>

                            <small>
                                ${formattedDate}
                            </small>

                        </div>


                        <div
                            class="team-invitation-actions"
                        >

                            <button
                                type="button"
                                class="btn-primary team-invitation-accept"
                                data-invitation-id="${invitation.id}"
                            >
                                Aceptar
                            </button>


                            <button
                                type="button"
                                class="profile-action team-invitation-reject"
                                data-invitation-id="${invitation.id}"
                            >
                                Rechazar
                            </button>

                        </div>

                    </article>
                `;

            })
            .join("");
}


async function handleTeamInvitationAction(
    invitationId,
    action,
    card
) {

    if (!invitationId || !card) {
        return;
    }


    const buttons =
        card.querySelectorAll(
            "button"
        );


    buttons.forEach(button => {
        button.disabled = true;
    });


    try {

        if (action === "accept") {

            await acceptTeamInvitation(
                invitationId
            );

        } else if (action === "reject") {

            await rejectTeamInvitation(
                invitationId
            );

        }


        currentTeamInvitations =
            currentTeamInvitations.filter(
                invitation =>
                    invitation.id !==
                    invitationId
            );


        renderTeamInvitations();


    } catch (error) {

        console.error(
            "Team invitation action error:",
            error
        );


        buttons.forEach(button => {
            button.disabled = false;
        });


        alert(
            error.message ||
            "No pudimos procesar la invitación."
        );
    }
}


function initTeamInvitations() {

    const list =
        getElement(
            "team-invitations-list"
        );


    if (!list) {
        return;
    }


    list.addEventListener(
        "click",
        async event => {

            const acceptButton =
                event.target.closest(
                    ".team-invitation-accept"
                );


            const rejectButton =
                event.target.closest(
                    ".team-invitation-reject"
                );


            if (
                !acceptButton &&
                !rejectButton
            ) {
                return;
            }


            const button =
                acceptButton ||
                rejectButton;


            const invitationId =
                button.dataset.invitationId;


            const card =
                button.closest(
                    ".team-invitation-card"
                );


            const action =
                acceptButton
                    ? "accept"
                    : "reject";


            await handleTeamInvitationAction(
                invitationId,
                action,
                card
            );
        }
    );
}



/* ============================================
   INITIALIZE
   ============================================ */

export async function initProfilePage() {

    const loading = getElement("profile-loading");
    const errorMessage = getElement("profile-error");
    const editButton = getElement("profile-edit-button");
    const cancelButton = getElement("profile-cancel");
    const form = getElement("profile-edit-form");


    try {

        const user =
            await getCurrentUser();


        if (!user) {

            window.location.href =
                "login.html";

            return;
        }


        const profile =
            await getCurrentProfile();

currentPlayerProfile =
    await getCurrentPlayerProfile();


        if (!profile) {

            throw new Error(
                "Profile not found."
            );
        }


        /*
         * The profiles table does not
         * contain email, so get it from
         * Supabase Auth.
         */

        profile.email =
            user.email;


        renderProfile(profile);

renderPlayerProfile(
    currentPlayerProfile
);

        
/* ========================================
   TEAM INVITATIONS
======================================== */

initTeamInvitations();

await loadTeamInvitations(
    user.id
);

        /* ========================================
   LOAD SAVED FIELDS
   ======================================== */

const favoriteIds =
    await getFavoriteFields();

await renderSavedFields(
    favoriteIds
);

/* ========================================
   LOAD MY TEAMS
======================================== */

const userTeams =
    await getUserTeams(
        user.id
    );

renderProfileTeams(
    userTeams
);

        /* ========================================
   WELCOME
   ======================================== */

const welcomeSeenKey =
    `fulsap_welcome_seen_${user.id}`;

const welcomeSeen =
    localStorage.getItem(
        welcomeSeenKey
    );


/* if (!welcomeSeen) {

    showWelcome(profile);

} else {

    const profileCard =
        getElement("profile-card");

    if (profileCard) {
        profileCard.hidden = false;
    }
} */

/* const welcomeContinue =
    getElement("welcome-continue");


if (welcomeContinue) {

    welcomeContinue.addEventListener(
        "click",
        () => {

            localStorage.setItem(
                `fulsap_welcome_seen_${user.id}`,
                "true"
            );

            hideWelcome();

        }
    );
}
 */
        if (loading) {
            loading.hidden = true;
        }


        if (errorMessage) {
            errorMessage.hidden = true;
        }


 /*        if (localStorage.getItem(`fulsap_welcome_seen_${user.id}`)) {

    showViewMode();

} */


        /* EDIT */

        if (editButton) {

            editButton.addEventListener(
                "click",
                showEditMode
            );
        }


        /* CANCEL */

        if (cancelButton) {

            cancelButton.addEventListener(
                "click",
                showViewMode
            );
        }


       /* SAVE */

if (form) {

    form.addEventListener(
        "submit",
        handleProfileSubmit
    );
}


/* SAVE PLAYER PROFILE */
const playerProfileForm =
    getElement("player-profile-form");

if (playerProfileForm) {

    console.log(
        "PLAYER PROFILE FORM LISTENER ATTACHED"
    );

    playerProfileForm.addEventListener(
        "submit",
        handlePlayerProfileSubmit
    );
}


/* EDIT PLAYER PROFILE */

const playerProfileEditButton =
    getElement("player-profile-edit");

if (playerProfileEditButton) {

    console.log(
        "PLAYER PROFILE EDIT LISTENER ATTACHED"
    );

    playerProfileEditButton.addEventListener(
        "click",
        handleEditPlayerProfile
    );
}


/* CANCEL PLAYER PROFILE EDIT */

const playerProfileCancelButton =
    getElement("player-profile-cancel");

if (playerProfileCancelButton) {

    console.log(
        "PLAYER PROFILE CANCEL LISTENER ATTACHED"
    );

    playerProfileCancelButton.addEventListener(
        "click",
        handleCancelPlayerProfile
    );
}

    } catch (error) {

        console.error(
            "Profile page error:",
            error
        );


        if (loading) {
            loading.hidden = true;
        }


        if (errorMessage) {

            errorMessage.textContent =
                "No pudimos cargar tu información.";

            errorMessage.hidden = false;
        }
    }

    const logoutButton =
    getElement("profile-logout-button");

if (logoutButton) {

    logoutButton.addEventListener(
        "click",
        async () => {

            try {

                logoutButton.disabled = true;
                logoutButton.textContent =
                    "Cerrando sesión...";

                const { signOut } =
                    await import("../services/auth.js");

                await signOut();

                window.location.href =
                    "../index.html";

            } catch (error) {

                console.error(
                    "Profile logout error:",
                    error
                );

                logoutButton.disabled = false;
                logoutButton.textContent =
                    "Cerrar sesión";

                showMessage(
                    "No pudimos cerrar tu sesión. Intentá nuevamente.",
                    "error"
                );
            }
        }
    );
}

initPlayerAvailability();
}


async function handlePlayerAvailabilitySubmit(
    event
) {

    event.preventDefault();


    const dateInput =
        document.querySelector(
            "#player-availability-date"
        );

    const startInput =
        document.querySelector(
            "#player-availability-start"
        );

    const endInput =
        document.querySelector(
            "#player-availability-end"
        );

    const zoneInput =
        document.querySelector(
            "#player-availability-zone"
        );

    const submitButton =
        document.querySelector(
            "#player-availability-submit"
        );

    const message =
        document.querySelector(
            "#player-availability-message"
        );


    if (
        !dateInput ||
        !startInput ||
        !endInput ||
        !submitButton
    ) {
        return;
    }


    try {

        submitButton.disabled = true;

        message.hidden = true;


        await createPlayerAvailability({
            availableDate:
                dateInput.value,

            startTime:
                startInput.value,

            endTime:
                endInput.value,

            zone:
                zoneInput?.value || ""
        });


        dateInput.value = "";
        startInput.value = "";
        endInput.value = "";

        if (zoneInput) {
            zoneInput.value = "";
        }


        message.textContent =
            "Disponibilidad agregada correctamente.";

        message.hidden = false;


        await loadPlayerAvailability();


    } catch (error) {

        console.error(
            "Error creating player availability:",
            error
        );


        message.textContent =
            error.message ||
            "No se pudo agregar la disponibilidad.";

        message.hidden = false;


    } finally {

        submitButton.disabled = false;

    }
}


async function handlePlayerAvailabilityCancel(
    availabilityId
) {

    if (!availabilityId) {
        return;
    }


    try {

        await cancelPlayerAvailability(
            availabilityId
        );

        await loadPlayerAvailability();


    } catch (error) {

        console.error(
            "Error cancelling player availability:",
            error
        );

    }
}


function initPlayerAvailability() {

    const form =
        document.querySelector(
            "#player-availability-form"
        );

    const list =
        document.querySelector(
            "#player-availability-list"
        );


    if (form) {

        form.addEventListener(
            "submit",
            handlePlayerAvailabilitySubmit
        );

    }


    if (list) {

        list.addEventListener(
            "click",
            async event => {

                const button =
                    event.target.closest(
                        ".player-availability-cancel"
                    );

                if (!button) {
                    return;
                }


                const availabilityId =
                    button.dataset.availabilityId;


                button.disabled = true;


                await handlePlayerAvailabilityCancel(
                    availabilityId
                );

            }
        );

    }


    loadPlayerAvailability();

}


/* ============================================
   PLAYER AVAILABILITY
============================================ */

async function loadPlayerAvailability() {

    const list =
        document.querySelector(
            "#player-availability-list"
        );

    if (!list) {
        return;
    }

    try {

        currentPlayerAvailability =
            await getCurrentPlayerAvailability();

        renderPlayerAvailability();

    } catch (error) {

        console.error(
            "Error loading player availability:",
            error
        );

    }
}


function renderPlayerAvailability() {

    const list =
        document.querySelector(
            "#player-availability-list"
        );

    if (!list) {
        return;
    }


    if (!currentPlayerAvailability.length) {

        list.innerHTML = `
            <p class="no-results">
                No tenés disponibilidades cargadas.
            </p>
        `;

        return;
    }


    list.innerHTML =
        currentPlayerAvailability
            .map(availability => {

                const date =
                    new Date(
                        `${availability.available_date}T00:00:00`
                    );

                const formattedDate =
                    date.toLocaleDateString(
                        "es-AR",
                        {
                            weekday: "long",
                            day: "numeric",
                            month: "long"
                        }
                    );


                return `

                    <article
                        class="player-availability-card"
                    >

                        <div
                            class="player-availability-info"
                        >

                            <strong>
                                ${formattedDate}
                            </strong>

                            <span>
                                ${availability.start_time.slice(0, 5)}
                                -
                                ${availability.end_time.slice(0, 5)}
                            </span>

                            ${
                                availability.zone
                                    ? `
                                        <span>
                                            ${availability.zone}
                                        </span>
                                      `
                                    : ""
                            }

                        </div>


                        <button
                            type="button"
                            class="btn-clear player-availability-cancel"
                            data-availability-id="${availability.id}"
                        >
                            Cancelar
                        </button>

                    </article>

                `;

            })
            .join("");
}
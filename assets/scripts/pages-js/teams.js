import { getCurrentUser } from "../services/auth.js";
import { supabase } from "../services/supabase.js";

/* ============================================
   HELPERS
   ============================================ */

function getElement(id) {
    return document.getElementById(id);
}


function showMessage(message, type = "") {

    const element =
        getElement("teams-message");

    if (!element) return;

    element.textContent = message;

    element.className =
        `teams-message ${type}`.trim();

    element.hidden = false;
}


function hideMessage() {

    const element =
        getElement("teams-message");

    if (!element) return;

    element.hidden = true;
}


/* ============================================
   LOAD USER TEAMS
   ============================================ */

export async function getUserTeams(userId) {

    const {
        data,
        error
    } = await supabase
        .from("team_members")
        .select(`
            id,
            role,
            joined_at,
            teams (
                id,
                name,
                description,
                logo_url,
                zone,
                level,
                created_by,
                created_at
            )
        `)
        .eq("user_id", userId)
        .order("joined_at", {
            ascending: false
        });


    if (error) {

        console.error(
            "Error loading teams:",
            error
        );

        throw error;
    }


    return data || [];
}


/* ============================================
   RENDER TEAMS
   ============================================ */

function renderTeams(teamMemberships) {

    const loading =
        getElement("teams-loading");

    const empty =
        getElement("teams-empty");

    const grid =
        getElement("teams-grid");


    if (loading) {
        loading.hidden = true;
    }


    if (!empty || !grid) {
        return;
    }


    /* ----------------------------------------
       EMPTY STATE
       ---------------------------------------- */

    if (!teamMemberships.length) {

        grid.hidden = true;
        empty.hidden = false;

        return;
    }


    /* ----------------------------------------
       TEAMS
       ---------------------------------------- */

    empty.hidden = true;
    grid.hidden = false;


    grid.innerHTML =
        teamMemberships
            .map(membership => {

                const team =
                    membership.teams;

                if (!team) {
                    return "";
                }


                const levelLabels = {

                    beginner:
                        "Principiante",

                    intermediate:
                        "Intermedio",

                    advanced:
                        "Avanzado",

                    competitive:
                        "Competitivo"

                };


                const level =
                    levelLabels[team.level] ||
                    "Sin nivel";


                const role =
                    membership.role === "captain"
                        ? "Capitán"
                        : "Jugador";


                return `

                    <article
                        class="team-card"
                        data-team-id="${team.id}"
                    >

                        <div class="team-card-logo">

                            ${
                                team.logo_url

                                    ? `
                                        <img
                                            src="${team.logo_url}"
                                            alt="${team.name}"
                                            loading="lazy"
                                        >
                                      `

                                    : `
                                        <span data-icon="users"></span>
                                      `
                            }

                        </div>


                        <div class="team-card-content">

                            <div class="team-card-header">

                                <h3>
                                    ${team.name}
                                </h3>

                                <span class="team-card-role">
                                    ${role}
                                </span>

                            </div>


                            ${
                                team.description

                                    ? `
                                        <p class="team-card-description">
                                            ${team.description}
                                        </p>
                                      `

                                    : ""
                            }


                            <div class="team-card-meta">

                                ${
                                    team.zone

                                        ? `
                                            <span>
                                                ${team.zone}
                                            </span>
                                          `

                                        : ""
                                }

                                <span>
                                    ${level}
                                </span>

                            </div>


                            <a
                                href="team.html?id=${team.id}"
                                class="btn-primary team-card-button"
                            >
                                Ver equipo
                            </a>

                        </div>

                    </article>

                `;
            })
            .join("");
}


/* ============================================
   CREATE TEAM
   ============================================ */

async function handleCreateTeam(event) {

    event.preventDefault();

    hideMessage();


    const name =
        getElement("team-name")
            ?.value
            .trim();


    const description =
        getElement("team-description")
            ?.value
            .trim();


    const zone =
        getElement("team-zone")
            ?.value
            .trim();


    const level =
        getElement("team-level")
            ?.value;


    const submitButton =
        getElement("team-create-submit");


    /* ----------------------------------------
       VALIDATION
       ---------------------------------------- */

    if (!name) {

        showMessage(
            "El nombre del equipo es obligatorio.",
            "error"
        );

        return;
    }


    if (name.length > 50) {

        showMessage(
            "El nombre del equipo no puede superar los 50 caracteres.",
            "error"
        );

        return;
    }


    try {

        if (submitButton) {

            submitButton.disabled = true;

            submitButton.textContent =
                "Creando...";
        }


        const user =
            await getCurrentUser();


        if (!user) {

            window.location.href =
                "login.html";

            return;
        }


        /* ----------------------------------------
           CREATE TEAM
           ---------------------------------------- */

        const {
            data: team,
            error: teamError
        } = await supabase
            .from("teams")
            .insert({

                name,
                description:
                    description || null,

                zone:
                    zone || null,

                level:
                    level || null,

                created_by:
                    user.id

            })
            .select()
            .single();


        if (teamError) {
            throw teamError;
        }


        /* ----------------------------------------
           ADD CREATOR AS CAPTAIN
           ---------------------------------------- */

       /*  const {
            error: memberError
        } = await supabase
            .from("team_members")
            .insert({

                team_id:
                    team.id,

                user_id:
                    user.id,

                role:
                    "captain"

            });


        if (memberError) {
            throw memberError;
        }
 */

        /* ----------------------------------------
           RESET FORM
           ---------------------------------------- */

        const form =
            getElement("team-create-form");


        if (form) {
            form.reset();
        }


        showCreateTeam(false);


        /* ----------------------------------------
           RELOAD
           ---------------------------------------- */

        const teams =
            await getUserTeams(user.id);


        renderTeams(teams);


        showMessage(
            "Tu equipo fue creado correctamente.",
            "success"
        );


    } catch (error) {

        console.error(
            "Create team error:",
            error
        );


        showMessage(
            error.message ||
            "No pudimos crear tu equipo.",
            "error"
        );


    } finally {

        if (submitButton) {

            submitButton.disabled = false;

            submitButton.textContent =
                "Crear equipo";
        }
    }
}


/* ============================================
   CREATE TEAM UI
   ============================================ */

function showCreateTeam(show) {

    const create =
        getElement("team-create");

    const empty =
        getElement("teams-empty");

    const grid =
        getElement("teams-grid");


    if (create) {
        create.hidden = !show;
    }


    if (show) {

        if (empty) {
            empty.hidden = true;
        }

        if (grid) {
            grid.hidden = true;
        }

    }
}


/* ============================================
   INITIALIZE
   ============================================ */

export async function initTeamsPage() {

    const loading =
        getElement("teams-loading");


    try {

        const user =
            await getCurrentUser();


        if (!user) {

            window.location.href =
                "login.html";

            return;
        }


        const teams =
            await getUserTeams(
                user.id
            );


        renderTeams(teams);


        /* CREATE */

        const createButton =
            getElement("create-team-button");


        if (createButton) {

            createButton.addEventListener(
                "click",
                () => showCreateTeam(true)
            );
        }


        /* CANCEL */

        const cancelButton =
            getElement("team-create-cancel");


        if (cancelButton) {

            cancelButton.addEventListener(
                "click",
                () => showCreateTeam(false)
            );
        }


        /* FORM */

        const form =
            getElement("team-create-form");


        if (form) {

            form.addEventListener(
                "submit",
                handleCreateTeam
            );
        }


    } catch (error) {

        console.error(
            "Teams page error:",
            error
        );


        if (loading) {
            loading.hidden = true;
        }


        showMessage(
            "No pudimos cargar tus equipos.",
            "error"
        );
    }
}
import { supabase } from "../services/supabase.js";


/* ============================================
   HELPERS
   ============================================ */

function getElement(id) {

    return document.getElementById(id);

}


/* ============================================
   LOAD TEAMS
   ============================================ */

async function getTeams() {

    const {
        data,
        error
    } = await supabase
        .from("teams")
        .select(`
            id,
            name,
            description,
            logo_url,
            zone,
            level,
            created_by,
            created_at,
            team_members (
                id
            )
        `)
        .order("created_at", {
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
   LEVEL LABEL
   ============================================ */

function getLevelLabel(level) {

    const labels = {

        beginner:
            "Principiante",

        intermediate:
            "Intermedio",

        advanced:
            "Avanzado",

        competitive:
            "Competitivo"

    };


    return labels[level] ||
        "Sin nivel";

}


/* ============================================
   RENDER TEAMS
   ============================================ */

function renderTeams(teams) {

    const grid =
        getElement("all-teams-grid");

    const empty =
        getElement("all-teams-empty");

    const loading =
        getElement("all-teams-loading");


    if (loading) {

        loading.hidden = true;

    }


    if (!grid || !empty) {

        return;

    }


    if (!teams.length) {

        grid.hidden = true;
        empty.hidden = false;

        return;

    }


    empty.hidden = true;
    grid.hidden = false;


    grid.innerHTML = teams
        .map(team => {

            const memberCount =
                team.team_members?.length || 0;


            return `

                <article
                    class="all-team-card"
                    data-team-id="${team.id}"
                >

                    <div class="all-team-card-header">

                        <div class="all-team-logo">

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

                    </div>


                    <div class="all-team-card-content">

                        <h2>
                            ${team.name}
                        </h2>


                        <p class="all-team-description">

                            ${
                                team.description ||
                                "Este equipo todavía no tiene una descripción."
                            }

                        </p>


                        <div class="all-team-meta">

                            <span>
                                ${team.zone || "Zona no especificada"}
                            </span>

                            <span>
                                ${getLevelLabel(team.level)}
                            </span>

                        </div>


                        <div class="all-team-members">

                            <span
                                data-icon="users"
                            ></span>

                            <span>
                                ${memberCount}
                                ${
                                    memberCount === 1
                                        ? "jugador"
                                        : "jugadores"
                                }
                            </span>

                        </div>

                    </div>


                    <div class="all-team-card-actions">

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


    /*
     * Icons are injected by main.js.
     * Dispatching this event allows the icon
     * system to react if necessary.
     */

    document.dispatchEvent(
        new CustomEvent("teams-rendered")
    );

}


/* ============================================
   SEARCH
   ============================================ */

function initTeamSearch(teams) {

    const input =
        getElement("teams-search");


    if (!input) {

        return;

    }


    input.addEventListener(
        "input",
        () => {

            const search =
                input.value
                    .trim()
                    .toLowerCase();


            if (!search) {

                renderTeams(teams);

                return;

            }


            const filtered =
                teams.filter(team => {

                    return (

                        team.name
                            ?.toLowerCase()
                            .includes(search)

                        ||

                        team.description
                            ?.toLowerCase()
                            .includes(search)

                        ||

                        team.zone
                            ?.toLowerCase()
                            .includes(search)

                    );

                });


            renderTeams(filtered);

        }
    );

}


/* ============================================
   INITIALIZE
   ============================================ */

export async function initAllTeamsPage() {

    try {

        const teams =
            await getTeams();


        renderTeams(teams);

        initTeamSearch(teams);


    } catch (error) {

        console.error(
            "All teams page error:",
            error
        );


        const loading =
            getElement("all-teams-loading");


        if (loading) {

            loading.hidden = true;

        }


        const message =
            getElement("all-teams-message");


        if (message) {

            message.textContent =
                "No pudimos cargar los equipos.";

            message.className =
                "teams-message error";

            message.hidden = false;

        }

    }

}
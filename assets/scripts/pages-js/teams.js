import { getCurrentUser } from "../services/auth.js";
import { supabase } from "../services/supabase.js";

// HELPERS

function getElement(id) {
    return document.getElementById(id);
}

function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, (character) => {
        const entities = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        };

        return entities[character];
    });
}

function showMessage(message, type = "") {
    const element = getElement("teams-message");

    if (!element) return;

    element.textContent = message;
    element.className = `teams-message ${type}`.trim();
    element.hidden = false;
}

function hideMessage() {
    const element = getElement("teams-message");

    if (!element) return;

    element.hidden = true;
}


// LOAD USER TEAMS

export async function getUserTeams(userId) {
    const { data, error } = await supabase
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
                created_at,
                is_active
            )
        `)
        .eq("user_id", userId)
        .order("joined_at", {
            ascending: false
        });

    if (error) {
        console.error("Error loading teams:", error);
        throw error;
    }

    return data || [];
}


// RENDER TEAMS

function renderTeams(teamMemberships) {
    const loading = getElement("teams-loading");
    const empty = getElement("teams-empty");
    const grid = getElement("teams-grid");

    if (loading) {
        loading.hidden = true;
    }

    if (!empty || !grid) {
        return;
    }

    if (!teamMemberships.length) {
        grid.hidden = true;
        empty.hidden = false;
        return;
    }

    empty.hidden = true;
    grid.hidden = false;

    const levelLabels = {
        beginner: "Principiante",
        intermediate: "Intermedio",
        advanced: "Avanzado",
        competitive: "Competitivo"
    };

    grid.innerHTML = teamMemberships
        .map((membership) => {
            const team = membership.teams;

            if (!team) {
                return "";
            }

            const isActive = team.is_active !== false;

            const level =
                levelLabels[team.level] || "Sin nivel";

            const role =
                membership.role === "captain"
                    ? "Capitán"
                    : "Jugador";

            const teamId = escapeHTML(team.id);
            const teamName = escapeHTML(team.name);
            const description = escapeHTML(team.description);
            const logoUrl = escapeHTML(team.logo_url);
            const zone = escapeHTML(team.zone);

            return `
                <article
                    class="team-card${isActive ? "" : " team-card-inactive"}"
                    data-team-id="${teamId}"
                >
                    <div class="team-card-logo">
                        ${
                            team.logo_url
                                ? `
                                    <img
                                        src="${logoUrl}"
                                        alt="${teamName}"
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
                            <h3>${teamName}</h3>

                            <span class="team-card-role">
                                ${role}
                            </span>
                        </div>

                        ${
                            !isActive
                                ? `
                                    <span class="team-card-status team-card-status-inactive">
                                        Equipo inactivo
                                    </span>
                                `
                                : ""
                        }

                        ${
                            team.description
                                ? `
                                    <p class="team-card-description">
                                        ${description}
                                    </p>
                                `
                                : ""
                        }

                        <div class="team-card-meta">
                            ${
                                team.zone
                                    ? `<span>${zone}</span>`
                                    : ""
                            }

                            <span>${level}</span>
                        </div>

                        <a
                            href="team.html?id=${teamId}"
                            class="btn-primary team-card-button"
                        >
                            Ver equipo
                        </a>
                    </div>
                </article>
            `;
        })
        .join("");

    // Refresh icons if the project uses an icon-rendering library.
    if (window.lucide?.createIcons) {
        window.lucide.createIcons();
    }
}


// CREATE TEAM

async function handleCreateTeam(event) {
    event.preventDefault();
    hideMessage();

    const name =
        getElement("team-name")?.value.trim();

    const description =
        getElement("team-description")?.value.trim();

    const zone =
        getElement("team-zone")?.value.trim();

    const level =
        getElement("team-level")?.value;

    const submitButton =
        getElement("team-create-submit");

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
            submitButton.textContent = "Creando...";
        }

        const user = await getCurrentUser();

        if (!user) {
            window.location.href = "login.html";
            return;
        }

        const { error: teamError } = await supabase
            .from("teams")
            .insert({
                name,
                description: description || null,
                zone: zone || null,
                level: level || null,
                created_by: user.id
            });

        if (teamError) {
            throw teamError;
        }

        const form = getElement("team-create-form");

        if (form) {
            form.reset();
        }

        showCreateTeam(false);

        const teams = await getUserTeams(user.id);
        renderTeams(teams);

        showMessage(
            "Tu equipo fue creado correctamente.",
            "success"
        );
    } catch (error) {
        console.error("Create team error:", error);

        showMessage(
            error.message || "No pudimos crear tu equipo.",
            "error"
        );
    } finally {
        if (submitButton) {
            submitButton.disabled = false;
            submitButton.textContent = "Crear equipo";
        }
    }
}


// CREATE TEAM UI

function showCreateTeam(show) {
    const create = getElement("team-create");
    const empty = getElement("teams-empty");
    const grid = getElement("teams-grid");

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


// INITIALIZE

export async function initTeamsPage() {
    const loading = getElement("teams-loading");

    try {
        const user = await getCurrentUser();

        if (!user) {
            window.location.href = "login.html";
            return;
        }

        const teams = await getUserTeams(user.id);
        renderTeams(teams);

        const createButton =
            getElement("create-team-button");

        if (createButton) {
            createButton.addEventListener(
                "click",
                () => showCreateTeam(true)
            );
        }

        
const createTeamHeaderButton = getElement("create-team-header-button");

if (createTeamHeaderButton) {
    createTeamHeaderButton.addEventListener("click", () => {
        showCreateTeam(true);
    });
}


        const cancelButton =
            getElement("team-create-cancel");

        if (cancelButton) {
            cancelButton.addEventListener(
                "click",
                () => showCreateTeam(false)
            );
        }

        const form = getElement("team-create-form");

        if (form) {
            form.addEventListener(
                "submit",
                handleCreateTeam
            );
        }
    } catch (error) {
        console.error("Teams page error:", error);

        if (loading) {
            loading.hidden = true;
        }

        showMessage(
            "No pudimos cargar tus equipos.",
            "error"
        );
    }
}
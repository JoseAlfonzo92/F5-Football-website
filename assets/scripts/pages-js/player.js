import {
    getPublicPlayers
} from "../services/profiles.js";

import {
    getPlayerAvailability
} from "../services/player-availability.js";

import {
    getCurrentUser
} from "../services/auth.js";

import {
    getCaptainTeams,
    createTeamInvitation
} from "./team.js";
/* ============================================
   INIT PLAYER PAGE
============================================ */

export async function initPlayerPage() {

    const container =
        document.querySelector(
            "#player-profile-container"
        );

    const notFound =
        document.querySelector(
            "#player-not-found"
        );


    if (!container) {
        return;
    }


    /* ============================================
       GET PLAYER ID FROM URL
    ============================================ */

    const params =
        new URLSearchParams(
            window.location.search
        );

    const playerId =
        params.get("id");


    if (!playerId) {

        if (notFound) {
            notFound.hidden = false;
        }

        return;
    }


    

    /* ============================================
       LOAD PUBLIC PLAYERS
    ============================================ */

    try {

        const players =
            await getPublicPlayers();


        const player =
            players.find(
                item =>
                    item.user_id === playerId
            );


        if (!player) {

            if (notFound) {
                notFound.hidden = false;
            }

            return;
        }

            const availability =
        await getPlayerAvailability(
            player.user_id
        );


        const currentUser =
    await getCurrentUser();

let captainTeams = [];

if (currentUser) {
    captainTeams =
        await getCaptainTeams(
            currentUser.id
        );
}

console.log(
    "PLAYER INVITATION CONTEXT:",
    {
        playerId: player.user_id,
        currentUserId: currentUser?.id,
        captainTeams
    }
);

        const profile =
            player.profiles;


        const displayName =
            profile?.display_name ||
            "Jugador";


        const username =
            profile?.username ||
            "usuario";


        const firstLetter =
            displayName
                .charAt(0)
                .toUpperCase();


        /* ============================================
           RENDER PLAYER
        ============================================ */


        let invitationHtml = "";

if (
    currentUser &&
    currentUser.id !== player.user_id &&
    captainTeams.length
) {
    if (captainTeams.length === 1) {
        invitationHtml = `
            <div class="player-invitation-section">
                <h2>Invitar a este jugador</h2>

                <p>
                    Podés invitar a este jugador a formar parte de tu equipo.
                </p>

                <button
                    type="button"
                    id="player-invite-button"
                    class="player-invite-button"
                    data-team-id="${captainTeams[0].team_id}"
                >
                    Invitar a mi equipo
                </button>

                <p
                    id="player-invitation-message"
                    class="player-invitation-message"
                    hidden
                ></p>
            </div>
        `;
    } else {
        invitationHtml = `
            <div class="player-invitation-section">
                <h2>Invitar a este jugador</h2>

                <p>
                    Elegí el equipo al que querés enviar la invitación.
                </p>

                <select
                    id="player-invite-team"
                    class="player-invite-team"
                >
                    <option value="">
                        Seleccioná un equipo
                    </option>

                    ${captainTeams.map(item => `
                        <option value="${item.team_id}">
                            ${item.teams?.name || "Equipo"}
                        </option>
                    `).join("")}
                </select>

                <button
                    type="button"
                    id="player-invite-button"
                    class="player-invite-button"
                    disabled
                >
                    Invitar a mi equipo
                </button>

                <p
                    id="player-invitation-message"
                    class="player-invitation-message"
                    hidden
                ></p>
            </div>
        `;
    }
}

        container.innerHTML = `

            <article class="player-profile-card">

                <div class="player-profile-header">

                    <div class="player-profile-avatar">

                        ${
                            profile?.avatar_url
                                ? `
                                    <img
                                        src="${profile.avatar_url}"
                                        alt="${displayName}"
                                    >
                                  `
                                : `
                                    <span>
                                        ${firstLetter}
                                    </span>
                                  `
                        }

                    </div>


                    <div class="player-profile-identity">

                        <h1>
                            ${displayName}
                        </h1>

                        <p>
                            @${username}
                        </p>

                    </div>

                </div>


                <div class="player-profile-info">

                    <div class="player-profile-detail">

                        <span class="player-profile-label">
                            Posición
                        </span>

                        <span class="player-profile-value">
                            ${player.position || "No especificada"}
                        </span>

                    </div>




                    <div class="player-profile-detail">

                        <span class="player-profile-label">
                            Zona
                        </span>

                        <span class="player-profile-value">
                            ${player.zone || "No especificada"}
                        </span>

                    </div>


                    <div class="player-profile-detail">

                        <span class="player-profile-label">
                            Nivel
                        </span>

                        <span class="player-profile-value">
                            ${player.level || "No especificado"}
                        </span>

                    </div>

                </div>

                <div class="player-profile-availability">

    <h2>
        Disponibilidad
    </h2>

    ${
        availability.length
            ? `
                <div class="player-availability-list">

                    ${
                        availability
                            .map(item => {

                                const date =
                                    new Date(
                                        `${item.available_date}T00:00:00`
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
                                            class="player-availability-status"
                                        >
                                            <span></span>
                                        </div>

                                        <div
                                            class="player-availability-info"
                                        >

                                            <strong>
                                                ${formattedDate}
                                            </strong>

                                            <span>
                                                ${item.start_time.slice(0, 5)}
                                                -
                                                ${item.end_time.slice(0, 5)}
                                            </span>

                                            ${
                                                item.zone
                                                    ? `
                                                        <span>
                                                            ${item.zone}
                                                        </span>
                                                      `
                                                    : ""
                                            }

                                        </div>

                                    </article>
                                `;
                            })
                            .join("")
                    }

                </div>
              `
            : `
                <p class="player-availability-empty">
                    Este jugador no tiene disponibilidades publicadas.
                </p>
              `
    }


    ${invitationHtml}

</div>

            </article>

        `;


        const inviteButton =
    document.querySelector(
        "#player-invite-button"
    );

const inviteTeamSelect =
    document.querySelector(
        "#player-invite-team"
    );

const invitationMessage =
    document.querySelector(
        "#player-invitation-message"
    );

if (inviteTeamSelect && inviteButton) {
    inviteTeamSelect.addEventListener(
        "change",
        () => {
            inviteButton.disabled =
                !inviteTeamSelect.value;
        }
    );
}

if (inviteButton) {
    inviteButton.addEventListener(
        "click",
        async () => {
            const teamId =
                inviteTeamSelect?.value ||
                inviteButton.dataset.teamId;

            if (!teamId) {
                return;
            }

            inviteButton.disabled = true;
            inviteButton.textContent =
                "Enviando...";

            if (invitationMessage) {
                invitationMessage.hidden = true;
                invitationMessage.textContent = "";
            }

            try {
                await createTeamInvitation(
                    teamId,
                    player.user_id
                );

                if (invitationMessage) {
                    invitationMessage.textContent =
                        "Invitación enviada correctamente.";
                    invitationMessage.hidden = false;
                }

                inviteButton.textContent =
                    "Invitación enviada";
            } catch (error) {
                console.error(
                    "Error sending team invitation:",
                    error
                );

                if (invitationMessage) {
                    if (
    error?.code === "INVITATION_PENDING"
) {
                        invitationMessage.textContent =
                            "Ya existe una invitación pendiente para este jugador.";
                    } else {
                        invitationMessage.textContent =
                            "No pudimos enviar la invitación.";
                    }

                    invitationMessage.hidden = false;
                }

                inviteButton.disabled = false;
                inviteButton.textContent =
                    "Invitar a mi equipo";
            }
        }
    );
}


    } catch (error) {

        console.error(
            "Error loading player page:",
            error
        );

    }

}


import {
    getPublicPlayers
} from "../services/profiles.js";


/* ============================================
   INIT PLAYERS PAGE
============================================ */

export async function initPlayersPage() {

    const playersContainer =
        document.querySelector("#players-container");

    const playersCount =
        document.querySelector("#players-count");

    const noResults =
        document.querySelector("#players-no-results");

    const searchInput =
        document.querySelector("#players-search");

    const positionFilter =
        document.querySelector("#players-position-filter");

    const zoneFilter =
        document.querySelector("#players-zone-filter");

    const levelFilter =
        document.querySelector("#players-level-filter");

    const clearFiltersButton =
        document.querySelector("#players-clear-filters");


    if (!playersContainer) {
        return;
    }


    let players = [];


    /* ============================================
       LOAD PUBLIC PLAYERS
    ============================================ */

    try {

        players =
            await getPublicPlayers();

        console.log(
            "PUBLIC PLAYERS:",
            players
        );

    } catch (error) {

        console.error(
            "Error loading players page:",
            error
        );

        return;
    }


    /* ============================================
       RENDER PLAYERS
    ============================================ */

    function renderPlayers(playersToRender) {

        playersContainer.innerHTML = "";


        if (playersCount) {

            playersCount.textContent =
                `Jugadores encontrados: ${playersToRender.length}`;

        }


        if (!playersToRender.length) {

            if (noResults) {
                noResults.hidden = false;
            }

            return;

        }


        if (noResults) {
            noResults.hidden = true;
        }


        playersToRender.forEach(player => {

            const profile =
                player.profiles;


            const card =
                document.createElement("article");

            card.className =
                "player-card";

            card.dataset.playerId =
                player.user_id;

            card.setAttribute(
                "role",
                "link"
            );

            card.tabIndex = 0;


            const displayName =
                profile?.display_name || "Jugador";


            const username =
                profile?.username || "usuario";


            const firstLetter =
                displayName
                    .charAt(0)
                    .toUpperCase();


            card.innerHTML = `

                <div class="player-card-header">

                    <div class="player-avatar">

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


                    <div class="player-card-identity">

                        <h4>
                            ${displayName}
                        </h4>

                        <p>
                            @${username}
                        </p>

                    </div>

                </div>


                <div class="player-card-info">

                    <div class="player-card-detail">

                        <span class="player-card-label">
                            Posición
                        </span>

                        <span class="player-card-value">
                            ${player.position || "No especificada"}
                        </span>

                    </div>


                    <div class="player-card-detail">

                        <span class="player-card-label">
                            Zona
                        </span>

                        <span class="player-card-value">
                            ${player.zone || "No especificada"}
                        </span>

                    </div>


                    <div class="player-card-detail">

                        <span class="player-card-label">
                            Nivel
                        </span>

                        <span class="player-card-value">
                            ${player.level || "No especificado"}
                        </span>

                    </div>

                </div>

            `;

            card.addEventListener(
    "click",
    () => {

        window.location.href =
            `player.html?id=${encodeURIComponent(
                player.user_id
            )}`;

    }
);


card.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Enter" ||
            event.key === " "
        ) {

            event.preventDefault();

            window.location.href =
                `player.html?id=${encodeURIComponent(
                    player.user_id
                )}`;

        }

    }
);


            playersContainer.appendChild(card);

        });

    }


    /* ============================================
       FILTER PLAYERS
    ============================================ */

    function filterPlayers() {

        const searchValue =
            searchInput?.value
                .trim()
                .toLowerCase() || "";


        const positionValue =
            positionFilter?.value || "";


        const zoneValue =
            zoneFilter?.value
                .trim()
                .toLowerCase() || "";


        const levelValue =
            levelFilter?.value || "";


        const filteredPlayers =
            players.filter(player => {

                const profile =
                    player.profiles;


                const displayName =
                    profile?.display_name
                        ?.toLowerCase() || "";


                const username =
                    profile?.username
                        ?.toLowerCase() || "";


                const playerZone =
                    player.zone
                        ?.toLowerCase() || "";


                const matchesSearch =
                    !searchValue ||
                    displayName.includes(searchValue) ||
                    username.includes(searchValue);


                const matchesPosition =
                    !positionValue ||
                    player.position === positionValue;


                const matchesZone =
                    !zoneValue ||
                    playerZone.includes(zoneValue);


                const matchesLevel =
                    !levelValue ||
                    player.level === levelValue;


                return (
                    matchesSearch &&
                    matchesPosition &&
                    matchesZone &&
                    matchesLevel
                );

            });


        renderPlayers(filteredPlayers);

    }


    /* ============================================
       FILTER EVENTS
    ============================================ */

    searchInput?.addEventListener(
        "input",
        filterPlayers
    );


    positionFilter?.addEventListener(
        "change",
        filterPlayers
    );


    zoneFilter?.addEventListener(
        "input",
        filterPlayers
    );


    levelFilter?.addEventListener(
        "change",
        filterPlayers
    );


    /* ============================================
       CLEAR FILTERS
    ============================================ */

    clearFiltersButton?.addEventListener(
        "click",
        () => {

            if (searchInput) {
                searchInput.value = "";
            }

            if (positionFilter) {
                positionFilter.value = "";
            }

            if (zoneFilter) {
                zoneFilter.value = "";
            }

            if (levelFilter) {
                levelFilter.value = "";
            }


            renderPlayers(players);

        }
    );


    /* ============================================
       INITIAL RENDER
    ============================================ */

    renderPlayers(players);

}


initPlayersPage();
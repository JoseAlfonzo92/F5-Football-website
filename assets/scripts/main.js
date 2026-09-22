import { initMenu } from "./components/menu.js";
import { initDropdown } from "./components/dropdown.js";
import { initHeader } from "./components/header.js";
import { initTheme } from "./components/theme.js";
import { initFieldsFilter } from "./components/fieldsFilter.js";
import { initFieldsMap } from "./components/fieldsMap.js";
import { initFieldDetailMap } from "./components/detailedMap.js";
import { initFieldPage } from "./pages-js/field.js";
import { initGlobalSearch } from "./components/globalSearch.js";
import { initLocationFilters } from "./data/locationFilters.js";
import { renderFields } from "./pages-js/fieldsRenderer.js";
import { renderFeaturedFields, renderHomeFields } from "./pages-js/cardRenderer.js";
import { initAddFieldForm } from "./components/addFieldForm.js";
import { initContactPageForm } from "./components/contactPageForm.js";
//import { applyLiveRatings } from "./services/ratings.js";
import { initHeroAnimations } from "./animations/heroAnimations.js";
import { injectIcons } from "./utils/icons.js";
import { initRegisterPage } from "./pages-js/register.js";
import { initLoginPage } from "./pages-js/login.js";
import { initAuthNav } from "./components/authNav.js";
import { initProfilePage } from "./pages-js/profile.js";
import { initEmailConfirmedPage } from "./pages-js/emailConfirmed.js";
import { initTeamsPage } from "./pages-js/teams.js";
import { initTeamPage } from "./pages-js/team.js";
import { initAllTeamsPage } from "./pages-js/allTeams.js";
import { initPlayersPage } from "./pages-js/players.js";
import { initPlayerPage } from "./pages-js/player.js";



document.addEventListener("DOMContentLoaded", async () => {

    injectIcons();

    //await applyLiveRatings();

    // GLOBAL
    initMenu();
    initDropdown();
    initHeader();
    initTheme();
    initGlobalSearch();
    initHeroAnimations();
    initAuthNav();
    await renderFeaturedFields();
await renderHomeFields();

    // FIELDS PAGE
    if (document.querySelector("#fields-container")) {

    await renderFields();
    await initLocationFilters();
    await initFieldsFilter();
    await initFieldsMap();
}

    // FIELD DETAIL PAGE
    if (document.querySelector("#field-name")) {

    await initFieldPage();
    initFieldDetailMap();
}

    // ADD FIELD FORM PAGE
    if (
        document.querySelector(".add-field-form") ||
        document.getElementById("add-field-form")
    ) {
        initAddFieldForm();
    }

    // CONTACT PAGE
    if (
        document.querySelector(".contact-form") ||
        document.getElementById("contact-form")
    ) {
        initContactPageForm();
    }

    // REGISTER PAGE
    if (document.querySelector("#register-form")) {
        initRegisterPage();
    }

    // LOGIN PAGE
    if (document.querySelector("#login-form")) {
        initLoginPage();
    }

    // PROFILE PAGE
    if (document.querySelector("#profile-card")) {
        initProfilePage();
    }

    // TEAMS PAGE
if (document.querySelector("#teams-grid")) {
    initTeamsPage();
}

// TEAM DETAIL PAGE
if (document.querySelector("#team-detail")) {
    initTeamPage();
}

// ALL TEAMS PAGE
if (document.querySelector("#all-teams-grid")) {

    initAllTeamsPage();

}

// PLAYERS PAGE
if (document.querySelector("#players-container")) {
    initPlayersPage();
}

// PLAYER PAGE
if (
    document.querySelector(
        "#player-profile-container"
    )
) {
    initPlayerPage();
}

    // EMAIL CONFIRMED PAGE
    if (
        document.querySelector(".email-confirmed-container")
    ) {
        initEmailConfirmedPage();
    }
});
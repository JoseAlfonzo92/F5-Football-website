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
import { applyLiveRatings } from "./services/ratings.js";
import { initHeroAnimations } from "./animations/heroAnimations.js";
import { injectIcons } from "./utils/icons.js";


document.addEventListener("DOMContentLoaded", async () => {

    injectIcons();

    await applyLiveRatings();

    // GLOBAL
    initMenu();
    initDropdown();
    initHeader();
    initTheme();
    initGlobalSearch();
    initHeroAnimations();
    renderFeaturedFields();
    renderHomeFields();

    // FIELDS PAGE
    if (document.querySelector("#fields-container")) {

        renderFields();
        initLocationFilters();
        initFieldsFilter();
        initFieldsMap();
    }

    // FIELD DETAIL PAGE
    if (document.querySelector("#field-name")) {

        initFieldPage();
        initFieldDetailMap();
    }

    // ADD FIELD FORM PAGE
    if (
        document.querySelector(".add-field-form") ||
        document.getElementById("add-field-form")
    ) {
        initAddFieldForm();
    }
});
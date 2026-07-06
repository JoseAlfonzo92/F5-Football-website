import { icons } from "../utils/icons.js";

export function initTheme() {
    document.querySelector(".arrow-icon").innerHTML = icons.arrow;
    document.querySelector(".chevron-right").innerHTML = icons.chevronRight;
    document.querySelector(".map-marker").innerHTML = icons.mapMarker;
    document.querySelector(".plus-circle").innerHTML = icons.plusCircle;
    document.querySelector(".trophy").innerHTML = icons.trophy;
    //document.querySelector(".star").innerHTML = icons.star;
    //document.querySelector(".football").innerHTML = icons.football;
    //document.querySelector(".clock").innerHTML = icons.clock;
    //document.querySelector(".user-group").innerHTML = icons.userGroup;
    document.querySelector(".whatsapp").innerHTML = icons.whatsapp;
    //document.querySelector(".instagram").innerHTML = icons.instagram;
    //document.querySelector(".facebook").innerHTML = icons.facebook;
    //document.querySelector(".xTwitter").innerHTML = icons.xTwitter;
    

    


    const toggles = document.querySelectorAll(".theme-toggle");
    const root = document.documentElement;

    if (!toggles.length) return;

    // Theme already set in <head>
    let currentTheme =
        root.getAttribute("data-theme") || "light";

    updateButtons(currentTheme);

    toggles.forEach(toggle => {
        toggle.addEventListener("click", () => {

            currentTheme =
                currentTheme === "dark"
                    ? "light"
                    : "dark";

            localStorage.setItem(
                "theme",
                currentTheme
            );

            applyTheme(currentTheme);
        });
    });

    // react only if user has no manual preference
    window.matchMedia("(prefers-color-scheme: dark)")
        .addEventListener("change", e => {

            if (!localStorage.getItem("theme")) {
                applyTheme(
                    e.matches
                        ? "dark"
                        : "light"
                );
            }
        });

    function applyTheme(theme) {
        root.setAttribute(
            "data-theme",
            theme
        );

        updateButtons(theme);
    }

    function updateButtons(theme) {
        toggles.forEach(btn => {
            btn.innerHTML =
                theme === "dark"
                    ? icons.sun 
                    : icons.moon;
        });
    }
}
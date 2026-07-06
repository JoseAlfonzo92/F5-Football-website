export function initHeader() {
    initMobileMenu();
    initMobileSearch();
}

// menu
function initMobileMenu() {
    const toggle = document.getElementById("menu-toggle");
    const nav = document.getElementById("mobile-nav");
    const search = document.getElementById("mobile-search");

    if (!toggle || !nav) return;

    toggle.addEventListener("click", () => {
        const isOpening = !nav.classList.contains("active");

        // Hide search when opening menu
        if (isOpening && search) {
            search.classList.remove("active");
        }

        nav.classList.toggle("active");
        toggle.classList.toggle("active");
    });
}

// search
function initMobileSearch() {
    const btn = document.getElementById("search-toggle");
    const search = document.getElementById("mobile-search");
    const nav = document.getElementById("mobile-nav");
    const menuToggle = document.getElementById("menu-toggle");

    if (!btn || !search) return;

    btn.addEventListener("click", () => {
        const isOpening = !search.classList.contains("active");

        // Hide menu when opening search
        if (isOpening && nav) {
            nav.classList.remove("active");
        }

        if (isOpening && menuToggle) {
            menuToggle.classList.remove("active");
        }

        search.classList.toggle("active");
    });
}
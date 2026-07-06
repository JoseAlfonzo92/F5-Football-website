export function initGlobalSearch() {

    const searchInputs =
        Array.from(document.querySelectorAll(".global-search"));

    if (searchInputs.length === 0) return;

    let isSyncing = false;

    // SYNC ALL INPUTS
    searchInputs.forEach(input => {

        input.addEventListener("input", (e) => {

            if (isSyncing) return;

            const value = e.target.value;

            isSyncing = true;

            searchInputs.forEach(i => {

                if (i !== e.target) {
                    i.value = value;
                }
            });

            isSyncing = false;

            // Trigger filtering ONLY if available
            if (typeof window.updateFields === "function") {
                window.updateFields();
            }
        });
    });

    // ENTER REDIRECT
    searchInputs.forEach(input => {

        input.addEventListener("keydown", (e) => {

            if (e.key !== "Enter") return;

            const value = input.value.trim();

            if (!value) return;


            if (!document.querySelector("#fields-container")) {

                const currentPath = window.location.pathname;

                const projectRoot = currentPath.includes("/pages/")
                    ? currentPath.split("/pages/")[0]
                    : currentPath.replace(/\/[^/]*$/, "");

                window.location.href =
                    `${projectRoot}/pages/all-fields-page.html?search=${encodeURIComponent(value)}`;
            }
        });
    });
}
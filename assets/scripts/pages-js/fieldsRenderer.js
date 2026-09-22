import { supabase } from "../services/supabase.js";
import { getRatings } from "../services/ratings.js";
import { icons } from "../utils/icons.js";
import { isFavorite, toggleFavorite } from "../services/favorites.js";
import { getCurrentUser } from "../services/auth.js";


function getRatingDisplay(field) {

    if (!field.votes || field.votes === 0) {
        return "Sin votos";
    }

    return `★ ${field.rating.toFixed(1)} · ${field.votes} voto${field.votes > 1 ? "s" : ""}`;
}


function getFieldTypeTag(type) {

    switch (type) {

        case "techada":
            return `<span class="field-tag">Techada</span>`;

        case "semi-techada":
            return `<span class="field-tag semi-techada">Semi techada</span>`;

        case "abierta":
            return `<span class="field-tag abierta">Abierta</span>`;

        default:
            return "";
    }
}


/* ============================================
   FAVORITE BUTTON
   ============================================ */

function getFavoriteButton(field) {

    return `
        <button
            type="button"
            class="favorite-button"
            data-field-id="${field.id}"
            aria-label="Guardar ${field.name}"
            aria-pressed="false"
        >
            <span data-icon="heart">
                ${icons.heart || "♡"}
            </span>
        </button>
    `;
}


/* ============================================
   UPDATE FAVORITE BUTTON
   ============================================ */

function updateFavoriteButton(
    button,
    favorite
) {

    button.classList.toggle(
        "is-favorite",
        favorite
    );

    button.setAttribute(
        "aria-pressed",
        String(favorite)
    );

    button.setAttribute(
        "aria-label",
        favorite
            ? "Quitar de mis canchas guardadas"
            : "Guardar cancha"
    );

    const icon =
        button.querySelector(
            "[data-icon='heart']"
        );

    if (icon) {

        icon.innerHTML =
            favorite
                ? "♥"
                : "♡";
    }
}


/* ============================================
   INITIALIZE FAVORITES
   ============================================ */

async function initFavoriteButtons() {

    const buttons =
        document.querySelectorAll(
            ".favorite-button"
        );

    if (!buttons.length) {
        return;
    }

    const user =
        await getCurrentUser();


    /* ----------------------------------------
       LOGGED OUT
       ---------------------------------------- */

    if (!user) {

        // Don't show favorite buttons to logged-out users
        buttons.forEach(button => {
            button.remove();
        });

        return;
    }


    /* ----------------------------------------
       LOAD FAVORITES
       ---------------------------------------- */

    for (const button of buttons) {

        const fieldId =
            button.dataset.fieldId;

        try {

            const favorite =
                await isFavorite(fieldId);

            updateFavoriteButton(
                button,
                favorite
            );

        } catch (error) {

            console.error(
                "Error loading favorite state:",
                error
            );
        }
    }


    /* ----------------------------------------
       CLICK EVENTS
       ---------------------------------------- */

    buttons.forEach(button => {

        button.addEventListener(
            "click",
            async event => {

                event.preventDefault();
                event.stopPropagation();

                if (button.disabled) {
                    return;
                }

                const fieldId =
                    button.dataset.fieldId;

                try {

                    button.disabled = true;

                    const favorite =
                        await toggleFavorite(
                            fieldId
                        );

                    updateFavoriteButton(
                        button,
                        favorite
                    );

                } catch (error) {

                    console.error(
                        "Favorite error:",
                        error
                    );

                    alert(
                        error.message ||
                        "No pudimos actualizar tus canchas guardadas."
                    );

                } finally {

                    button.disabled = false;
                }
            }
        );
    });
}


export async function getFields() {

    const [{ data, error }, ratings] = await Promise.all([
        supabase
            .from("fields")
            .select(`
                id,
                name,
                province,
                city,
                zone,
                type,
                price_from,
                price_to,
                latitude,
                longitude,
                created_at,
                image_url,
                is_active
            `)
            .eq("is_active", true),

        getRatings()
    ]);

    if (error) {
        console.error("FIELDS QUERY ERROR:", error);
        return [];
    }

    return data.map(field => {

        const rating = ratings[field.id];

        return {
            ...field,
            location: [field.city, field.province]
                .filter(Boolean)
                .join(", "),
            image: field.image_url,
            priceFrom: field.price_from,
            priceTo: field.price_to,
            lat: field.latitude,
            lng: field.longitude,
            createdAt: field.created_at,
            rating: rating?.rating || 0,
            votes: rating?.votes || 0
        };
    });
}


/* ============================================
   RENDER FIELDS
   ============================================ */

export async function renderFields() {

    const container =
        document.getElementById(
            "fields-container"
        );

    if (!container) {
        return;
    }

    const fields = await getFields();


    container.innerHTML =
        fields
            .map(field => `

                <a
                    href="../pages/field.html?id=${field.id}"
                    class="fields-page-card"
                    data-id="${field.id}"
                >

                    <div class="field-image">

                        <img
                            src="${field.image}"
                            alt="${field.name}"
                            loading="lazy"
                            decoding="async"
                            width="400"
                            height="250"
                        >

                        ${getFavoriteButton(field)}

                        ${getFieldTypeTag(field.type)}

                    </div>


                    <div class="field-content">

                        <div class="field-top">

                            <h4>
                                ${icons.football}
                                ${field.name}
                            </h4>

                            <span class="rating">
                                ${getRatingDisplay(field)}
                            </span>

                        </div>


                        <p class="location">
                            ${icons.mapMarker}
                            ${field.location}
                        </p>


                        <p class="price">
                            ${icons.dollar}
                            $${field.priceFrom.toLocaleString()}
                            -
                            $${field.priceTo.toLocaleString()}
                        </p>

                    </div>

                </a>

            `)
            .join("");


    initFavoriteButtons();
}
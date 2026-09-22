import { supabase } from "../services/supabase.js";
import { getRatings } from "../services/ratings.js";
import { icons } from "../utils/icons.js";

import { isFavorite, toggleFavorite } from "../services/favorites.js";
import { getCurrentUser } from "../services/auth.js";


let fieldsPromise = null;

async function getFields() {

    if (!fieldsPromise) {
        fieldsPromise = (async () => {

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
                        image_url,
                        features,
                        extra_info,
                        field_schedule (
                            day_of_week,
                            opens_at,
                            closes_at
                        )
                    `)
                    .eq("is_active", true),

                getRatings()
            ]);

            if (error) {
                console.error("HOME FIELDS QUERY ERROR:", error);
                return [];
            }

            return data.map(field => {

                const rating = ratings[field.id];

                const weekdaySchedule =
                    field.field_schedule
                        ?.find(day =>
                            day.day_of_week >= 1 &&
                            day.day_of_week <= 5
                        );

                const weekendSchedule =
                    field.field_schedule
                        ?.find(day =>
                            day.day_of_week === 0 ||
                            day.day_of_week === 6
                        );

                return {
                    ...field,

                    location: [
                        field.city,
                        field.province
                    ]
                        .filter(Boolean)
                        .join(", "),

                    image: field.image_url,

                    priceFrom: field.price_from,
                    priceTo: field.price_to,

                    extraInfo: field.extra_info || [],

                    schedule: {
                        week: weekdaySchedule
                            ? `${weekdaySchedule.opens_at.slice(0, 5)} - ${weekdaySchedule.closes_at.slice(0, 5)}`
                            : "",

                        weekend: weekendSchedule
                            ? `${weekendSchedule.opens_at.slice(0, 5)} - ${weekendSchedule.closes_at.slice(0, 5)}`
                            : ""
                    },

                    rating: rating?.rating || 0,
                    votes: rating?.votes || 0
                };
            });

        })();
    }

    return fieldsPromise;
}

function formatPrice(price) {
    return `$${price.toLocaleString()}`;
}

function getFeatures(field, limit = 3) {
    const combined = [...field.features, ...field.extraInfo];
    return [...new Set(combined)].slice(0, limit);
}

function getRatingDisplay(field) {
    if (!field.votes || field.votes === 0) {
        return "Sin votos";
    }

    return `★ ${field.rating.toFixed(1)} · ${field.votes} voto${field.votes > 1 ? "s" : ""}`;
}

function getFieldTypeTag(type, className = "tag") {
    switch (type) {
        case "techada":
            return `<span class="${className}">Techada</span>`;

        case "semi-techada":
            return `<span class="${className} semi-techada">Semi techada</span>`;

        case "abierta":
            return `<span class="${className} abierta">Abierta</span>`;

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

function getFeaturedFields(fields, limit) {

    const ratedFields =
        fields.filter(field => field.votes > 0);

    if (ratedFields.length === 0) {
        return fields.slice(0, limit);
    }

    return [...ratedFields]
        .sort((a, b) => {

            const scoreA =
                a.rating * Math.log10(a.votes + 1);

            const scoreB =
                b.rating * Math.log10(b.votes + 1);

            return scoreB - scoreA;
        })
        .slice(0, limit);
}

// FEATURED CARD
function createFeaturedCard(field) {

    return `
        <a
            href="pages/field.html?id=${field.id}"
            class="card"
        >

            <div class="card-image">

                <img
                    src="${field.image}"
                    alt="${field.name}"
                    loading="lazy"
                    decoding="async"
                    width="400"
                    height="250"
                >

<div
    class="favorite-slot"
    data-field-id="${field.id}"
    data-field-name="${field.name}"
></div>

                ${getFieldTypeTag(
                    field.type,
                    "tag-main-cards"
                )}

            </div>


            <div class="card-body">

                <h4>
                    ${icons.football}
                    ${field.name}
                </h4>


                <p class="location">
                    ${icons.mapMarker}
                    ${field.location}
                </p>


                <p class="schedule">
                    ${icons.clock}
                    ${field.schedule.week}
                </p>


                <div class="features">

                    ${icons.star}

                    ${getFeatures(field)
                        .map(
                            feature =>
                                `<span>${feature}</span>`
                        )
                        .join("")}

                </div>


                <div class="card-footer">

                    <span class="price">
                        ${icons.dollar}
                        ${formatPrice(field.priceFrom)}
                        -
                        ${formatPrice(field.priceTo)}
                    </span>


                    <span class="rating">
                        ${getRatingDisplay(field)}
                    </span>

                </div>

            </div>

        </a>
    `;
}

// SMALL CARD
function createFieldCard(field) {
    return `
        <a href="pages/field.html?id=${field.id}" class="field-card">

           <div class="field-image">

    <img
        src="${field.image}"
        alt="${field.name}"
        loading="lazy"
        decoding="async"
        width="300"
        height="200"
    >

    <div
    class="favorite-slot"
    data-field-id="${field.id}"
    data-field-name="${field.name}"
></div>

    ${getFieldTypeTag(field.type, "tag")}

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
                    ${formatPrice(field.priceFrom)} - ${formatPrice(field.priceTo)}
                </p>

                <p class="schedule">
                    ${icons.clock}
                    ${field.schedule.week}
                </p>

                <div class="features">

                    ${icons.star}

                    ${getFeatures(field)
                        .map(feature => `<span>${feature}</span>`)
                        .join("")}

                </div>

            </div>

        </a>
    `;
}

/* ============================================
   INITIALIZE FAVORITE BUTTONS
   ============================================ */

async function initFavoriteButtons() {

    /*
       ----------------------------------------
       CHECK AUTHENTICATION
       ----------------------------------------
    */

    const user =
        await getCurrentUser();


    /*
       ----------------------------------------
       LOGGED OUT
       ----------------------------------------

       Do nothing.

       Favorite buttons are not created,
       so logged-out users won't see them.
    */

    if (!user) {
        return;
    }


    /*
       ----------------------------------------
       CREATE FAVORITE BUTTONS
       ----------------------------------------
    */

    const slots =
        document.querySelectorAll(
            ".favorite-slot"
        );


    slots.forEach(slot => {

        const fieldId =
            slot.dataset.fieldId;


slot.innerHTML =
    getFavoriteButton({
        id: fieldId,
        name: slot.dataset.fieldName || "cancha"
    });
    });


    /*
       ----------------------------------------
       GET CREATED BUTTONS
       ----------------------------------------
    */

    const buttons =
        document.querySelectorAll(
            ".favorite-button"
        );


    if (!buttons.length) {
        return;
    }


    /*
       ----------------------------------------
       LOAD CURRENT FAVORITES
       ----------------------------------------
    */

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


    /*
       ----------------------------------------
       BUTTON EVENTS
       ----------------------------------------
    */

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

export async function renderFeaturedFields(limit = 3) {

    const container =
        document.getElementById(
            "featured-fields-container"
        );

    if (!container) return;

    const fields = await getFields();

    container.innerHTML =
        getFeaturedFields(fields, limit)
            .map(createFeaturedCard)
            .join("");

    initFavoriteButtons();
}

export async function renderHomeFields(limit = 6) {

    const container =
        document.getElementById(
            "home-fields-container"
        );

    if (!container) return;

    const fields = await getFields();

    container.innerHTML =
        fields
            .slice(0, limit)
            .map(createFieldCard)
            .join("");

    initFavoriteButtons();
}
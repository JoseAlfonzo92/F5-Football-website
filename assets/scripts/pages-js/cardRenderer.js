import { fields } from "../data/fields.js";
import { icons } from "../utils/icons.js";

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

function getFeaturedFields(limit) {
    const ratedFields = fields.filter(field => field.votes > 0);

    if (ratedFields.length === 0) {
        return fields.slice(0, limit);
    }

    return [...ratedFields]
        .sort((a, b) => {
            const scoreA = a.rating * Math.log10(a.votes + 1);
            const scoreB = b.rating * Math.log10(b.votes + 1);

            return scoreB - scoreA;
        })
        .slice(0, limit);
}

// FEATURED CARD
function createFeaturedCard(field) {
    return `
        <a href="pages/field.html?id=${field.id}" class="card">
            <div class="card-image">

                <img
                    src="${field.image}"
                    alt="${field.name}"
                    loading="lazy"
                    decoding="async"
                    width="400"
                    height="250"
                >

                ${getFieldTypeTag(field.type, "tag-main-cards")}

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
                        .map(feature => `<span>${feature}</span>`)
                        .join("")}
                </div>

                <div class="card-footer">

                    <span class="price">
                        ${icons.dollar}
                        ${formatPrice(field.priceFrom)} - ${formatPrice(field.priceTo)}
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

// RENDERERS
export function renderFeaturedFields(limit = 3) {
    const container = document.getElementById("featured-fields-container");

    if (!container) return;

    container.innerHTML = getFeaturedFields(limit)
        .map(createFeaturedCard)
        .join("");
}

export function renderHomeFields(limit = 6) {
    const container = document.getElementById("home-fields-container");

    if (!container) return;

    container.innerHTML = fields
        .slice(0, limit)
        .map(createFieldCard)
        .join("");
}
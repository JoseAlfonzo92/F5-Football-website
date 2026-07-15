import { fields } from "../data/fields.js";
import { icons } from "../utils/icons.js";

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

export function renderFields() {
    const container = document.getElementById("fields-container");

    if (!container) return;

    container.innerHTML = fields.map(field => `
        <a href="../pages/field.html?id=${field.id}" class="fields-page-card" data-id="${field.id}">
            <div class="field-image">

                <img
                    src="${field.image}"
                    alt="${field.name}"
                    loading="lazy"
                    decoding="async"
                    width="400"
                    height="250"
                >

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
                    $${field.priceFrom.toLocaleString()} - $${field.priceTo.toLocaleString()}
                </p>

            </div>
        </a>
    `).join("");
}
import { supabase } from "../services/supabase.js";
import { getRatings, submitRating } from "../services/ratings.js";
import { icons } from "../utils/icons.js";

import {
    isFavorite,
    toggleFavorite
} from "../services/favorites.js";

import {
    getCurrentUser
} from "../services/auth.js";

//  HELPER FUNCTIONS

function getFieldFavoriteButton(field) {
    return `
        <button
            type="button"
            class="favorite-button field-page-favorite"
            data-field-id="${field.id}"
            aria-label="Guardar ${field.name}"
            aria-pressed="false"
            hidden
        >
            <span data-icon="heart">
                ${icons.heart || "♡"}
            </span>
        </button>
    `;
}

function renderFieldSizes(field) {
    const container = document.getElementById("field-sizes-container");
    if (!container || !field.sizes?.length) return;

    container.innerHTML = field.sizes.map(size => 
        `<span class="size-tag">${size}</span>`
    ).join("");
}

function renderAllowedBoots(field) {
    const container = document.getElementById("allowed-boots-container");
    if (!container) return;

    if (!field.allowedBoots?.length) {
        container.innerHTML = `<p class="text-muted">Información no disponible</p>`;
        return;
    }

    const bootInfo = {
        FG: {
            label: "FG - Terreno Firme",
            desc: "Canchas de pasto natural",
            icon: "leaf"
        },

        TF: {
            label: "TF - Pasto Artificial",
            desc: "Fibras cortas (Artificial)",
            icon: "board"
        },

        IN: {
            label: "IN - Indoor",
            desc: "Canchas cubiertas / lisas",
            icon: "house"
        }
    };

    let html = `<div class="boots-grid">`;

    field.allowedBoots.forEach(code => {

        const info = bootInfo[code] || {
            label: code,
            desc: "",
            icon: "shoePrints"
        };

        html += `
            <div class="boot-card">

                <div class="boot-icon">
                    ${icons[info.icon] ?? ""}
                </div>

                <div class="boot-content">
                    <strong>${info.label}</strong>
                    <small>${info.desc}</small>
                </div>

            </div>
        `;
    });

    html += `</div>`;

    container.innerHTML = html;
}

function renderAvailableJerseys(field) {
    const container = document.getElementById("available-jerseys-container");
    if (!container) return;

    if (!field.availableJerseys?.length) {
        container.innerHTML = `<p class="text-muted">No hay información de camisetas</p>`;
        return;
    }

    let html = `
        <div class="jerseys-carousel-wrapper">

            <button class="jersey-arrow jersey-left" aria-label="Anterior">
                 ${icons.chevronLeft}
            </button>

            <div class="jerseys-carousel">
    `;

    field.availableJerseys.forEach(jersey => {
        const imageUrl = jersey.image ||
            `https://res.cloudinary.com/dolmulmgp/image/upload/v1/jerseys/${jersey.code}.png`;

        html += `
            <div class="jersey-item" title="${jersey.name}">
                <img
                    src="${imageUrl}"
                    alt="${jersey.name}"
                    class="jersey-image"
                    loading="lazy"
                    onerror="
                        this.onerror = null;
                        this.src = 'https://via.placeholder.com/90x90?text=Jersey'
                    "
                >
            </div>
        `;
    });

    html += `
            </div>

            <button class="jersey-arrow jersey-right" aria-label="Siguiente">
                ${icons.chevronRight}
            </button>

        </div>
    `;

    container.innerHTML = html;

    
    const carousel = container.querySelector(".jerseys-carousel");
    const btnLeft = container.querySelector(".jersey-left");
    const btnRight = container.querySelector(".jersey-right");

    if (carousel && btnLeft && btnRight) {
        const scrollAmount = 260; 

        btnLeft.addEventListener("click", () => {
            carousel.scrollBy({
                left: -scrollAmount,
                behavior: "smooth"
            });
        });

        btnRight.addEventListener("click", () => {
            carousel.scrollBy({
                left: scrollAmount,
                behavior: "smooth"
            });
        });

        //  arrow visibility
        const updateArrows = () => {
            const scrollLeft = carousel.scrollLeft;
            const maxScroll = carousel.scrollWidth - carousel.clientWidth;

            btnLeft.style.opacity = scrollLeft <= 30 ? "0.35" : "1";
            btnRight.style.opacity = scrollLeft >= maxScroll - 30 ? "0.35" : "1";
        };

        carousel.addEventListener("scroll", updateArrows);
        setTimeout(updateArrows, 350); 
    }
}

// IMAGES FOR HERO CAROUSEL
function renderFieldHeroCarousel(field) {

    const container = document.getElementById("field-hero-carousel");

    if (!container) return;

    const images =
        field.images?.length
            ? field.images
            : [field.image];

    let html = "";

    images.forEach((image, index) => {

        html += `
            <div class="hero-slide">

                <img
                    src="${image}"
                    alt="${field.name} ${index + 1}"
                    loading="lazy"
                    class="hero-image"
                >

            </div>
        `;
    });

    container.innerHTML = html;

    // arrows

    const btnLeft = document.getElementById("hero-left");
    const btnRight = document.getElementById("hero-right");
    const scrollAmount = container.clientWidth;

    btnLeft.addEventListener("click", () => {

        container.scrollBy({
            left: -scrollAmount,
            behavior: "smooth"
        });

    });

    btnRight.addEventListener("click", () => {

        container.scrollBy({
            left: scrollAmount,
            behavior: "smooth"
        });

    });

    // arrow opacity

    const updateArrows = () => {
        const scrollLeft = container.scrollLeft;
        const maxScroll = container.scrollWidth - container.clientWidth;
        btnLeft.style.opacity = scrollLeft <= 10 ? "0.35" : "1";
        btnRight.style.opacity = scrollLeft >= maxScroll - 10 ? "0.35" : "1";
    };

    container.addEventListener("scroll", updateArrows);

    setTimeout(updateArrows, 200);
}

function initShareButtons(field) {
    const currentUrl = window.location.href;
    const shareText = `${field.name} - ${field.location}\nDesde $${field.priceFrom} - $${field.priceTo}/h\n`;

    // WhatsApp
    document.getElementById("share-whatsapp").href = 
        `https://wa.me/?text=${encodeURIComponent(shareText + currentUrl)}`;

    // Facebook
    document.getElementById("share-facebook").href = 
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;

    // Twitter (X)
    document.getElementById("share-twitter").href = 
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(currentUrl)}`;

    // Messenger
    document.getElementById("share-messenger").href = 
        `https://www.facebook.com/dialog/send?link=${encodeURIComponent(currentUrl)}&redirect_uri=${encodeURIComponent(currentUrl)}`;

    // Instagram 
    document.getElementById("share-instagram").href = 
        `https://www.instagram.com/?url=${encodeURIComponent(currentUrl)}`; 
        // Note: Instagram doesn't support good pre-filled sharing from web

    // Copy Link
    const copyBtn = document.getElementById("copy-link-btn");
    if (copyBtn) {
        copyBtn.addEventListener("click", (e) => {
            copyToClipboard(currentUrl, "Enlace copiado correctamente!", e.currentTarget);
        });
    }
}

function copyToClipboard(text, successMessage, target) {
    navigator.clipboard.writeText(text).then(() => {
        if (target) {
            const originalColor = target.style.color;
            target.style.color = "var(--color-text-buttons)";
            
            const span = target.querySelector("span");
            const originalText = span ? span.textContent : target.textContent;

            if (span) span.textContent = successMessage;
            else target.textContent = successMessage;

            // Reset after 2 seconds
            setTimeout(() => {
                target.style.color = originalColor;
                if (span) span.textContent = originalText;
                else target.textContent = originalText;
            }, 2000);
        }
    }).catch(() => {
        alert("Error al copiar el enlace");
    });
}


function getFieldTypeTag(type) {
    switch (type) {
        case "techada":
            return `<span class="tag">Techada</span>`;

        case "semi-techada":
            return `<span class="tag semi-techada">Semi techada</span>`;

        case "abierta":
            return `<span class="tag abierta">Abierta</span>`;

        default:
            return "";
    }
}

function renderSimilarFields(currentField, fields) {
    const container = document.getElementById("similar-fields-carousel");

    if (!container) return;

    const similar = fields
        .filter(f => f.id !== currentField.id)
        .filter(
            f =>
                f.province === currentField.province ||
                f.city === currentField.city
        )
        .sort((a, b) => {
            const scoreA =
                (a.province === currentField.province ? 2 : 0) +
                (a.city === currentField.city ? 3 : 0);

            const scoreB =
                (b.province === currentField.province ? 2 : 0) +
                (b.city === currentField.city ? 3 : 0);

            return scoreB - scoreA;
        })
        .slice(0, 12);

    if (similar.length === 0) {
        container.innerHTML = `
            <p class="text-muted">
                No hay canchas similares en esta zona.
            </p>
        `;
        return;
    }

    container.innerHTML = similar.map(f => `
        <a href="field.html?id=${f.id}" class="similar-field-card">

            <div class="similar-field-image">

                <img
                    src="${f.image}"
                    alt="${f.name}"
                    loading="lazy"
                >

                ${getFieldTypeTag(f.type)}

            </div>

            <div class="similar-field-info">

                <h4>${f.name}</h4>

                <p class="similar-location">
                    ${icons.mapMarker}
                    ${f.location}
                </p>

                <p class="similar-price">
                    $${f.priceFrom.toLocaleString()} - $${f.priceTo.toLocaleString()}
                </p>

            </div>

        </a>
    `).join("");

    // Arrow Controls
    const btnLeft = document.getElementById("similar-arrow-left");
    const btnRight = document.getElementById("similar-arrow-right");

    if (btnLeft && btnRight) {
        const scrollAmount = 640;
        btnLeft.addEventListener("click", () => container.scrollBy({ left: -scrollAmount, behavior: "smooth" }));
        btnRight.addEventListener("click", () => container.scrollBy({ left: scrollAmount, behavior: "smooth" }));

        const updateArrows = () => updateArrowVisibility(container, btnLeft, btnRight);
        setTimeout(updateArrows, 300);
        container.addEventListener("scroll", updateArrows);
    }
}

function updateArrowVisibility(container, btnLeft, btnRight) {
    if (!container) return;
    const scrollLeft = container.scrollLeft;
    const maxScroll = container.scrollWidth - container.clientWidth;

    btnLeft.style.opacity = scrollLeft <= 30 ? "0.35" : "1";
    btnRight.style.opacity = scrollLeft >= maxScroll - 30 ? "0.35" : "1";
}

//  WEATHER FUNCTIONS 

async function loadWeather(field) {
    const currentContainer = document.getElementById("weather-container");
    const forecastContainer = document.getElementById("weather-forecast-container");

    if (!field?.lat || !field?.lng) {
        if (currentContainer) currentContainer.innerHTML = `<p class="error-text">Ubicación no disponible</p>`;
        return;
    }

    try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${field.lat}&longitude=${field.lng}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=America/Argentina/Buenos_Aires`;

        const response = await fetch(url);
        if (!response.ok) throw new Error("Weather API error");

        const data = await response.json();

        renderCurrentWeather(data.current, currentContainer);
        if (forecastContainer) renderForecast(data.daily, forecastContainer);

    } catch (error) {
        console.warn("Weather error:", error);
        if (currentContainer) currentContainer.innerHTML = `<p class="error-text">No se pudo cargar el clima</p>`;
        if (forecastContainer) forecastContainer.innerHTML = `<p class="error-text">Pronóstico no disponible</p>`;
    }
}

function renderCurrentWeather(current, container) {
    if (!container) return;
    const weatherInfo = getWeatherInfo(current.weather_code);

    container.innerHTML = `
        <div class="weather-main">
            <div class="weather-icon">${weatherInfo.emoji}</div>
            <div>
                <strong class="temp">${Math.round(current.temperature_2m)}°C</strong>
                <small>Sensación: ${Math.round(current.apparent_temperature)}°C</small>
            </div>
        </div>
        <p class="weather-desc">${weatherInfo.description}</p>
        <div class="weather-extra">
            <span>💧 ${current.relative_humidity_2m}% Humedad</span>
            <span>🌬️ ${current.wind_speed_10m} km/h</span>
        </div>
    `;
}

function renderForecast(daily, container) {
    if (!container || !daily?.time?.length) return;

    let html = `<div class="forecast-grid">`;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < 7 && i < daily.time.length; i++) {
        const [year, month, day] = daily.time[i].split("-").map(Number);
        const forecastDate = new Date(year, month - 1, day);
        forecastDate.setHours(0, 0, 0, 0);

        const isToday = forecastDate.getTime() === today.getTime();
        const dayName = forecastDate.toLocaleDateString("es-AR", { weekday: "short" });
        const weatherInfo = getWeatherInfo(daily.weather_code[i]);

        html += `
            <div class="forecast-day ${isToday ? "today" : ""}">
                <div class="forecast-date">${isToday ? "Hoy" : dayName}</div>
                <small class="forecast-day-number">${forecastDate.getDate()}</small>
                <div class="forecast-icon">${weatherInfo.emoji}</div>
                <div class="forecast-temp">
                    <span class="max">MAX <strong>${Math.round(daily.temperature_2m_max[i])}°</strong></span>
                    <span class="min">MIN <strong>${Math.round(daily.temperature_2m_min[i])}°</strong></span>
                </div>
            </div>
        `;
    }

    html += `</div>`;
    container.innerHTML = html;
}

function getWeatherInfo(code) {
    const map = {
        0:  { emoji: "☀️", description: "Cielo despejado" },
        1:  { emoji: "🌤️", description: "Mayormente despejado" },
        2:  { emoji: "⛅", description: "Parcialmente nublado" },
        3:  { emoji: "☁️", description: "Nublado" },
        45: { emoji: "🌫️", description: "Niebla" },
        51: { emoji: "🌦️", description: "Lluvia ligera" },
        61: { emoji: "🌧️", description: "Lluvia" },
        71: { emoji: "❄️", description: "Nieve" },
        80: { emoji: "🌦️", description: "Chubascos" },
    };
    return map[code] || { emoji: "🌥️", description: "Clima variable" };
}


function updateRatingDisplay(rating, votes) {

    const ratingEl =
        document.getElementById("field-rating");

    if (!ratingEl) return;

    if (votes > 0) {

        ratingEl.innerHTML = `
            ${icons.star}
            ${Number(rating).toFixed(1)}
            <small>(
    ${votes}
    ${votes === 1 ? "voto" : "votos"}
)</small>
        `;

    } else {

        ratingEl.innerHTML =
            `<small>Sin calificaciones todavía</small>`;

    }

}

function initRatingWidget(field) {

    const stars =
        document.querySelectorAll(".vote-stars button");

    if (!stars.length) return;

    const message =
        document.getElementById("vote-message");

    function paintStars(rating) {

        stars.forEach(star => {

            const starValue =
                Number(star.dataset.rating);

            star.classList.toggle(
                "active",
                starValue <= rating
            );

        });

    }

    // Hover preview
    stars.forEach(star => {

        star.addEventListener("mouseenter", () => {

            const value =
                Number(star.dataset.rating);

            paintStars(value);

        });

    });

    // Restore state when leaving
    const container =
        document.querySelector(".vote-stars");

    container?.addEventListener("mouseleave", () => {

        const savedVote =
            Number(
                localStorage.getItem(
                    `field_vote_${field.id}`
                )
            ) || 0;

        paintStars(savedVote);

    });

    // Restore previously selected vote
    const savedVote =
        Number(
            localStorage.getItem(
                `field_vote_${field.id}`
            )
        ) || 0;

    if (savedVote) {
        paintStars(savedVote);
    }

    // Click vote
    stars.forEach(star => {

        star.addEventListener("click", async () => {

            const value =
                Number(star.dataset.rating);

            console.log(
                "STAR CLICKED",
                value
            );

            try {

                const result =
                    await submitRating(
                        field.id,
                        value
                    );

                    updateRatingDisplay(
                    result.rating,
                    result.votes
                );

        field.rating = result.rating;
        field.votes = result.votes;

                paintStars(value);

                localStorage.setItem(
                    `field_vote_${field.id}`,
                    value
                );

                if (message) {

                    message.textContent =
                        result.message;

                    message.classList.remove(
                        "error"
                    );

                    message.classList.add(
                        "success"
                    );

                }

            } catch (error) {

                console.error(
                    "Error submitting rating:",
                    error
                );

                if (message) {

                    message.textContent =
                        error.message;

                    message.classList.remove(
                        "success"
                    );

                    message.classList.add(
                        "error"
                    );

                }

            }

        });

    });

}


function getLastUpdateText(dateString) {
    if (!dateString) return "";

    const now = new Date();
    const updated = new Date(dateString);

    const hours = Math.floor((now - updated) / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);

    if (hours < 1) {
        return "Información actualizada hace menos de 1 hora";
    }

    if (hours < 24) {
        return `Información actualizada hace ${hours} hora${hours > 1 ? "s" : ""}`;
    }

    if (days < 7) {
        return `Información actualizada hace ${days} día${days > 1 ? "s" : ""}`;
    }

    if (weeks < 4) {
        return `Información actualizada hace ${weeks} semana${weeks > 1 ? "s" : ""}`;
    }

    // After 6 months show exact date instead
    if (months >= 6) {
        return `Última actualización de la información: ${updated.toLocaleDateString("es-AR")}`;
    }

    return `Información actualizada hace ${months} mes${months > 1 ? "es" : ""}`;
}


// Barbecue constants

const BARBECUE_COOK_TYPES = {
    none: {
        icon: "ban",
        text: "No está permitido hacer asado."
    },

    players: {
        icon: "userGroup",
        text: "Los jugadores cocinan por su cuenta."
    },

    venue: {
        icon: "user",
        text: "El complejo cuenta con servicio de parrillero."
    },

    both: {
        icon: "fire",
        text: "Podés cocinar por tu cuenta o contratar un parrillero."
    }
};


// Helpers

function formatPrice(value) {
    return value == null
        ? "Sin cargo"
        : `<strong>$${value.toLocaleString("es-AR")}</strong>`;
}

function barbecueItem(iconName, title, value) {
    return `
        <div class="barbecue-item">

            <div class="barbecue-icon">
                ${icons[iconName] ?? ""}
            </div>

            <div class="barbecue-content">
                <span class="barbecue-title">${title}</span>
                <span class="barbecue-value">${value}</span>
            </div>

        </div>
    `;
}


// Render

function renderBarbecue(field) {

    const container = document.getElementById("barbecue-container");

    if (!container) return;

    const barbecue = field.barbecue;

    if (!barbecue) {
        container.innerHTML = `
            <p class="text-muted">
                Información no disponible
            </p>
        `;
        return;
    }

    let html = "";

    const cook =
        BARBECUE_COOK_TYPES[barbecue.cookType] ??
        BARBECUE_COOK_TYPES.none;

    // Who cooks
    html += barbecueItem(
        cook.icon,
        "¿Quién cocina?",
        cook.text
    );

    // Grill usage
    if (
        barbecue.cookType === "players" ||
        barbecue.cookType === "both"
    ) {
        html += barbecueItem(
            "grill",
            "Uso de la parrilla",
            formatPrice(barbecue.grillFee)
        );
    }

    // Cook service
    if (
        (barbecue.cookType === "venue" ||
            barbecue.cookType === "both") &&
        barbecue.cookServiceFee != null
    ) {
        html += barbecueItem(
            "chef",
            "Servicio de parrillero",
            formatPrice(barbecue.cookServiceFee)
        );
    }

    // Additional information
    if (barbecue.notes?.length) {

        for (const note of barbecue.notes) {

            html += barbecueItem(
                "infoCircle",
                "Información",
                note
            );

        }

    }

    container.innerHTML = html;
}


async function initFieldFavoriteButton(field) {

    const button =
        document.querySelector(".field-page-favorite");

    if (!button) return;


    const user =
        await getCurrentUser();



    // LOGGED OUT

    if (!user) {

        // Remove the favorite button completely.
        button.remove();

        return;
    }



    // LOAD FAVORITE STATE


    try {

        const favorite =
            await isFavorite(field.id);

        updateFieldFavoriteButton(
            button,
            favorite
        );

    } catch (error) {

        console.error(
            "Error loading favorite state:",
            error
        );
    }



    // CLICK


    button.addEventListener(
        "click",
        async event => {

            event.preventDefault();
            event.stopPropagation();


            if (button.disabled) {
                return;
            }


            try {

                button.disabled = true;


                const favorite =
                    await toggleFavorite(
                        field.id
                    );


                updateFieldFavoriteButton(
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
}

function updateFieldFavoriteButton(button, favorite) {

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



async function getField(fieldId) {
    const [{ data: field, error }, ratings] = await Promise.all([
        supabase
            .from("fields")
            .select(`
                *,
                field_jerseys (
                    id,
                    code,
                    name,
                    image_url
                ),
                field_schedule (
                    id,
                    day_of_week,
                    opens_at,
                    closes_at
                )
            `)
            .eq("id", fieldId)
            .single(),

        getRatings()
    ]);

    if (error) {
        console.error("FIELD QUERY ERROR:", error);
        return null;
    }

    if (!field) {
        console.error("Field not found:", fieldId);
        return null;
    }

    const rating = ratings[fieldId];

    return {
        ...field,
        location: [field.city, field.province].filter(Boolean).join(", "),
        lat: field.latitude,
        lng: field.longitude,
        image: field.image_url,
        priceFrom: field.price_from,
        priceTo: field.price_to,
        extraInfo: field.extra_info,
        lastUpdate: field.last_update,
        allowedBoots: field.allowed_boots,

        rating: rating?.rating || 0,
        votes: rating?.votes || 0,

        availableJerseys: field.field_jerseys?.map(jersey => ({
            code: jersey.code,
            name: jersey.name,
            image: jersey.image_url
        })) || [],

        schedule: {
            week: field.field_schedule
                ?.filter(day => day.day_of_week >= 1 && day.day_of_week <= 5)
                .map(day => `${day.opens_at.slice(0, 5)} - ${day.closes_at.slice(0, 5)}`)[0] || "",
            weekend: field.field_schedule
                ?.filter(day => day.day_of_week === 0 || day.day_of_week === 6)
                .map(day => `${day.opens_at.slice(0, 5)} - ${day.closes_at.slice(0, 5)}`)[0] || ""
        },

        barbecue: {
            cookType: field.barbecue_cook_type,
            grillAvailable: field.grill_available,
            cookServiceAvailable: field.cook_service_available,
            grillFee: field.grill_fee,
            cookServiceFee: field.cook_service_fee,
            notes: field.barbecue_notes || []
        },

        booking: {
            phone: field.phone,
            whatsapp: field.whatsapp
        }
    };
}


async function getFieldAvailability(fieldId) {

    if (!fieldId) return [];

    const timeZone =
        "America/Argentina/Buenos_Aires";

    const now = new Date();

    /*
        Get today's date in Argentina.
        Example: 2026-10-01
    */
    const todayString =
        now.toLocaleDateString(
            "en-CA",
            {
                timeZone
            }
        );

    /*
        Use UTC only for calendar-date arithmetic.
        This avoids the browser's local timezone
        affecting the date range.
    */
    const [
        year,
        month,
        day
    ] = todayString
        .split("-")
        .map(Number);

    const todayUTC =
        new Date(
            Date.UTC(
                year,
                month - 1,
                day
            )
        );

    // Seven calendar days including today.
    
    const endDateUTC =
        new Date(todayUTC);

    endDateUTC.setUTCDate(
        endDateUTC.getUTCDate() + 6
    );

    const endDate =
        endDateUTC
            .toISOString()
            .slice(0, 10);

    /*
        Current time in Argentina.
        Used later to hide reservations
        that already finished today.
    */
    const currentTime =
        now.toLocaleTimeString(
            "en-GB",
            {
                timeZone,
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit"
            }
        );

    const {
        data,
        error
    } = await supabase
        .from("field_requests")
        .select(`
            id,
            requested_date,
            start_time,
            end_time,
            status
        `)
        .eq("field_id", fieldId)
        .eq("status", "accepted")
        .gte("requested_date", todayString)
        .lte("requested_date", endDate)
        .order("requested_date", {
            ascending: true
        })
        .order("start_time", {
            ascending: true
        });

    if (error) {

        console.error(
            "FIELD AVAILABILITY QUERY ERROR:",
            error
        );

        return [];
    }

    /*
        Remove reservations that have already ended today.

        Future dates are kept automatically.
    */
    const upcomingRequests =
        (data || []).filter(request => {

            if (
                request.requested_date ===
                todayString
            ) {
                return (
                    request.end_time >
                    currentTime
                );
            }

            return true;
        });

    console.log(
        "FIELD AVAILABILITY:",
        {
            today: todayString,
            until: endDate,
            currentTime,
            requests: upcomingRequests
        }
    );

    return upcomingRequests;
}


async function getFieldMaintenance(fieldId) {
    if (!fieldId) {
        return [];
    }

    const timeZone =
        "America/Argentina/Buenos_Aires";

    const now = new Date();

    const todayString =
        now.toLocaleDateString(
            "en-CA",
            {
                timeZone
            }
        );

    const [
        year,
        month,
        day
    ] = todayString
        .split("-")
        .map(Number);

    const todayUTC =
        new Date(
            Date.UTC(
                year,
                month - 1,
                day
            )
        );

    const endDateUTC =
        new Date(todayUTC);

    endDateUTC.setUTCDate(
        endDateUTC.getUTCDate() + 6
    );

    const endDate =
        endDateUTC
            .toISOString()
            .slice(0, 10);

    const {
        data,
        error
    } = await supabase
        .from("field_maintenance")
        .select(`
            id,
            field_id,
            maintenance_date,
            start_time,
            end_time,
            reason
        `)
        .eq("field_id", fieldId)
        .gte("maintenance_date", todayString)
        .lte("maintenance_date", endDate)
        .order("maintenance_date", {
            ascending: true
        })
        .order("start_time", {
            ascending: true
        });

    if (error) {
        console.error(
            "FIELD MAINTENANCE QUERY ERROR:",
            error
        );

        return [];
    }

    return data || [];
}


function renderFieldAvailability(
    availability,
    maintenance = []
) {

    const container =
        document.getElementById(
            "field-availability-content"
        );

    if (!container) return;

    if (!availability?.length && !maintenance?.length) {

    container.innerHTML = `
        <p class="text-muted">
            No hay reservas ni bloqueos de mantenimiento
            en los próximos días.
        </p>
    `;

    return;
}

    const timeZone =
        "America/Argentina/Buenos_Aires";

    const now = new Date();

    const todayString =
        now.toLocaleDateString(
            "en-CA",
            {
                timeZone
            }
        );

    const grouped = {};

    /*
        Group reservations by date.
    */
    /*
    Group reservations by date.
    */
    availability.forEach(request => {

        const date =
            request.requested_date;

        if (!grouped[date]) {
            grouped[date] = [];
        }

        grouped[date].push({
            type: "reservation",
            start_time: request.start_time,
            end_time: request.end_time
        });
    });


    // Group maintenance blocks by date.
    
    maintenance.forEach(block => {

        const date =
            block.maintenance_date;

        if (!grouped[date]) {
            grouped[date] = [];
        }

        grouped[date].push({
            type: "maintenance",
            start_time: block.start_time,
            end_time: block.end_time
        });
    });


    // Sort all blocked periods chronologically.

    Object.values(grouped).forEach(slots => {

        slots.sort((a, b) =>
            a.start_time.localeCompare(
                b.start_time
            )
        );
    });

    let html = "";

    Object.entries(grouped)
        .forEach(([date, slots], index) => {

            const [
                year,
                month,
                day
            ] = date
                .split("-")
                .map(Number);

            const dateObject =
                new Date(
                    Date.UTC(
                        year,
                        month - 1,
                        day
                    )
                );

            const formattedDate =
                new Intl.DateTimeFormat(
                    "es-AR",
                    {
                        timeZone: "UTC",
                        weekday: "long",
                        day: "numeric",
                        month: "long"
                    }
                ).format(dateObject);

            const isToday =
                date === todayString;

            /*
                Today is expanded automatically.
                Future dates start collapsed.
            */
            const isExpanded =
                isToday;

            const occupiedCount =
    slots.filter(
        slot => slot.type === "reservation"
    ).length;

    const maintenanceCount =
        slots.filter(
            slot => slot.type === "maintenance"
        ).length;

    const summaryParts = [];

    if (occupiedCount > 0) {
        summaryParts.push(
            occupiedCount === 1
                ? "1 horario ocupado"
                : `${occupiedCount} horarios ocupados`
        );
    }

    if (maintenanceCount > 0) {
        summaryParts.push(
            maintenanceCount === 1
                ? "1 mantenimiento"
                : `${maintenanceCount} mantenimientos`
        );
    }

    const slotsLabel =
        summaryParts.join(" · ");

            html += `
                <div
                    class="availability-day ${isExpanded ? "expanded" : ""}"
                    data-availability-day
                >

                    <button
                        type="button"
                        class="availability-day-header"
                        aria-expanded="${isExpanded}"
                    >

                        <div class="availability-day-info">

                            <h4>
                                ${isToday ? "Hoy · " : ""}
                                ${formattedDate}
                            </h4>

                            <span class="availability-day-summary">
                                ${slotsLabel}
                            </span>

                        </div>

                        <span
                            class="availability-day-arrow"
                            aria-hidden="true"
                        >
                            ›
                        </span>

                    </button>

                    <div class="availability-slots">
    <div class="availability-slots-inner">

            `;

                slots.forEach(slot => {

        const start =
            slot.start_time.slice(0, 5);

        const end =
            slot.end_time.slice(0, 5);

        if (slot.type === "maintenance") {

            html += `
                <div class="availability-slot maintenance">

                    <span class="availability-slot-time">
                        ${start} - ${end}
                    </span>

                    <span class="availability-slot-status">
                        Mantenimiento
                    </span>

                </div>
            `;

            return;
        }

        html += `
            <div class="availability-slot occupied">

                <span class="availability-slot-time">
                    ${start} - ${end}
                </span>

                <span class="availability-slot-status">
                    Ocupada
                </span>

            </div>
        `;
    });

                html += `
                                            </div>
                    </div>
                    </div>
                `;
            });

    container.innerHTML = html;

    // Toggle individual days.
    
    container
        .querySelectorAll(
            "[data-availability-day]"
        )
        .forEach(day => {

            const header =
                day.querySelector(
                    ".availability-day-header"
                );

            if (!header) return;

            header.addEventListener(
                "click",
                () => {

                    const expanded =
                        day.classList.toggle(
                            "expanded"
                        );

                    header.setAttribute(
                        "aria-expanded",
                        expanded
                    );
                }
            );
        });
}


async function getCurrentFieldStatus(fieldId, field) {

    if (!fieldId || !field) {
        return {
            status: "unknown"
        };
    }

    const timeZone =
        "America/Argentina/Buenos_Aires";

    const now = new Date();

    const date =
        now.toLocaleDateString("en-CA", {
            timeZone
        });

    const time =
        now.toLocaleTimeString("en-GB", {
            timeZone,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        });

    /// 1. CHECK ACCEPTED REQUEST
     

    const {
        data: activeRequests,
        error
    } = await supabase
        .from("field_requests")
        .select(`
            id,
            requested_date,
            start_time,
            end_time,
            status
        `)
        .eq("field_id", fieldId)
        .eq("status", "accepted")
        .eq("requested_date", date)
        .lte("start_time", time)
        .gt("end_time", time)
        .limit(1);

    if (error) {

        console.error(
            "CURRENT FIELD STATUS ERROR:",
            error
        );

        return {
            status: "unknown"
        };
    }


    // 2. OCCUPIED TAKES PRIORITY
     

    if (activeRequests?.length) {

        return {
            status: "occupied",
            request: activeRequests[0]
        };
    }


    // 3. CHECK MAINTENANCE
 

    const {
        data: maintenance,
        error: maintenanceError
    } = await supabase
        .from("field_maintenance")
        .select(`
            id,
            maintenance_date,
            start_time,
            end_time,
            reason
        `)
        .eq("field_id", fieldId)
        .eq("maintenance_date", date)
        .order("start_time", {
            ascending: true
        });

    if (maintenanceError) {

        console.error(
            "CURRENT FIELD MAINTENANCE QUERY ERROR:",
            maintenanceError
        );
    }

    const currentTime =
        time.slice(0, 8);

    const activeMaintenance =
        (maintenance || []).find(block =>
            currentTime >= block.start_time &&
            currentTime < block.end_time
        );

    if (activeMaintenance) {

        return {
            status: "maintenance",
            maintenance: activeMaintenance
        };
    }


    // 3. GET CURRENT DAY
     

    const weekday =
        new Intl.DateTimeFormat("en-US", {
            timeZone,
            weekday: "short"
        }).format(now);

    const dayMap = {
        Sun: 0,
        Mon: 1,
        Tue: 2,
        Wed: 3,
        Thu: 4,
        Fri: 5,
        Sat: 6
    };

    const dayOfWeek =
        dayMap[weekday];


    // 4. FIND TODAY'S SCHEDULE
     

    const schedule =
        field.field_schedule || [];

    const todaySchedule =
        schedule.filter(
            day => day.day_of_week === dayOfWeek
        );


    // 5. NO SCHEDULE = CLOSED
     

    if (!todaySchedule.length) {

        return {
            status: "closed"
        };
    }


    // 6. CHECK WHETHER WE ARE WITHIN HOURS
     
    const isOpen =
        todaySchedule.some(day => {

            const opens =
                day.opens_at.slice(0, 8);

            const closes =
                day.closes_at.slice(0, 8);

            // Normal schedule
            if (opens <= closes) {

                return (
                    currentTime >= opens &&
                    currentTime < closes
                );
            }

            // Overnight schedule
            return (
                currentTime >= opens ||
                currentTime < closes
            );
        });


    if (isOpen) {

        return {
            status: "available"
        };
    }


    // 7. OUTSIDE OPERATING HOURS
     

    return {
        status: "closed"
    };
}


    function renderCurrentFieldStatus(result) {

        const text =
            document.getElementById(
                "availability-status-text"
            );

        const indicator =
            document.getElementById(
                "availability-status-indicator"
            );

        const countdown =
            document.getElementById(
                "availability-countdown"
            );

        if (!text || !indicator || !countdown) return;

        indicator.classList.remove(
        "available",
        "occupied",
        "maintenance",
        "closed",
        "unknown"
        );

        countdown.textContent = "";

        if (result.status === "occupied") {

            text.textContent = "Ocupada";

            indicator.classList.add("occupied");

            if (result.request) {
                startFieldCountdown(
                    result.request.end_time
                );
            }

            return;
        }

    if (result.status === "maintenance") {

        text.textContent = "Mantenimiento";

        indicator.classList.add("maintenance");

        if (result.maintenance) {
            startFieldCountdown(
                result.maintenance.end_time
            );
        }

        return;
    }

        if (result.status === "available") {

            text.textContent = "Disponible";

            indicator.classList.add("available");

            return;
        }

        if (result.status === "closed") {

            text.textContent = "Cerrada";

            indicator.classList.add("closed");

            return;
        }

        text.textContent =
            "Disponibilidad no disponible";

        indicator.classList.add("unknown");
    }


    let fieldCountdownInterval = null;

    function startFieldCountdown(endTime) {

        const countdown =
            document.getElementById(
                "availability-countdown"
            );

        if (!countdown || !endTime) return;

        if (fieldCountdownInterval) {
            clearInterval(fieldCountdownInterval);
        }

        function updateCountdown() {

            const timeZone =
                "America/Argentina/Buenos_Aires";

            const now = new Date();

            const argentinaDateTime =
                new Intl.DateTimeFormat(
                    "en-CA",
                    {
                        timeZone,
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        hourCycle: "h23"
                    }
                ).formatToParts(now);

            const parts = {};

            argentinaDateTime.forEach(part => {
                if (part.type !== "literal") {
                    parts[part.type] = part.value;
                }
            });

            const currentSeconds =
                (
                    Number(parts.hour) * 3600 +
                    Number(parts.minute) * 60 +
                    Number(parts.second)
                );

            const [
                endHour,
                endMinute,
                endSecond = 0
            ] = endTime
                .split(":")
                .map(Number);

            const endSeconds =
                endHour * 3600 +
                endMinute * 60 +
                endSecond;

            let remainingSeconds =
                endSeconds -
                currentSeconds;

            /*
            * If the end time has passed, the
            * current status is no longer active.
            */
            if (remainingSeconds <= 0) {

                countdown.textContent = "";

                clearInterval(
                    fieldCountdownInterval
                );

                window.location.reload();

                return;
            }

            const hours =
                Math.floor(
                    remainingSeconds / 3600
                );

            const minutes =
                Math.floor(
                    (remainingSeconds % 3600) / 60
                );

            const seconds =
                remainingSeconds % 60;

            const formattedHours =
                String(hours).padStart(2, "0");

            const formattedMinutes =
                String(minutes).padStart(2, "0");

            const formattedSeconds =
                String(seconds).padStart(2, "0");

            countdown.textContent =
                `Termina en ${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
        }

        updateCountdown();

        fieldCountdownInterval =
            setInterval(
                updateCountdown,
                1000
            );
    }

    async function getSimilarFields(currentFieldId) {
        const { data, error } = await supabase
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
                is_active
            `)
            .eq("is_active", true)
            .neq("id", currentFieldId);

        if (error) {
            console.error("SIMILAR FIELDS QUERY ERROR:", error);
            return [];
        }

        return data.map(field => ({
            ...field,
            image: field.image_url,
            priceFrom: field.price_from,
            priceTo: field.price_to
        }));
    }


    //  MAIN FUNCTION 

export async function initFieldPage() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    const field = await getField(id);

    if (!field) {
        console.error("Field not found:", id);
        return;
    }

    document.title = `${field.name} | Fulsap - Detalle de Cancha`;

    document
        .querySelector('meta[name="description"]')
        .setAttribute(
            "content",
            `${field.name} en ${field.city}. Consultá precios, horarios, ubicación, fotos, calificaciones y datos de contacto en Fulsap.`
        );

    // Cache DOM Elements
    const dom = {
        name: document.getElementById("field-name"),
        image: document.getElementById("field-image"),
        rating: document.getElementById("field-rating"),
        location: document.getElementById("field-location"),
        address: document.getElementById("field-address"),
        description: document.getElementById("field-description"),
        priceWeek: document.getElementById("price-week"),
        priceWeekend: document.getElementById("price-weekend"),
        priceFrom: document.getElementById("price-from"),
        scheduleWeek: document.getElementById("schedule-week"),
        scheduleWeekend: document.getElementById("schedule-weekend"),
        features: document.getElementById("features-container"),
        buffet: document.getElementById("buffet-container"),
        extraInfo: document.getElementById("extra-info-container"),
        mapEl: document.getElementById("field-map"),
        mapAddress: document.getElementById("map-address"),
        lastUpdate: document.getElementById("field-last-update"),
        availabilityStatus: document.getElementById("field-availability-status"),
        availabilityStatusIndicator: document.getElementById("availability-status-indicator"),
        availabilityStatusText: document.getElementById("availability-status-text"),
        availabilityContent: document.getElementById("field-availability-content")
    };

        // Basic Info
    if (dom.name) {

    let tag = "";

    switch (field.type) {
        case "techada":
            tag = '<span class="tag">Techada</span>';
            break;

        case "semi-techada":
            tag = '<span class="tag semi-techada">Semi techada</span>';
            break;

        case "abierta":
            tag = '<span class="tag abierta">Abierta</span>';
            break;
    }

    dom.name.innerHTML = `
        <span class="field-name-text">
            ${field.name}
        </span>

        ${tag}

        ${getFieldFavoriteButton(field)}
    `;
}
    
    if (dom.image) {
        dom.image.loading = "lazy";
        dom.image.alt = `${field.name} - ${field.location}`;
        dom.image.src = field.image;
    }

    if (dom.rating) {

    if (field.votes > 0) {

        const voteLabel =
            field.votes === 1
                ? "voto"
                : "votos";

        dom.rating.innerHTML = `
            ${icons.star}
            ${field.rating.toFixed(1)}
            <small>(${field.votes} ${voteLabel})</small>
        `;

    } else {

        dom.rating.innerHTML = `
            <small>Sin calificaciones todavía</small>
        `;

    }
    }
    
    if (dom.location) dom.location.innerHTML = `${icons.mapMarker} ${field.location}`;
    if (dom.address) dom.address.textContent = field.address || "";
    if (dom.description) dom.description.textContent = field.description || "";

    if (dom.lastUpdate && field.lastUpdate) {
        dom.lastUpdate.innerHTML = `
            ${icons.arrowsRotate}
            ${getLastUpdateText(field.lastUpdate)}
        `;
    }

    // Prices & Schedule
    if (dom.priceWeek) dom.priceWeek.textContent = `$${field.priceFrom}`;
    if (dom.priceWeekend) dom.priceWeekend.textContent = `$${field.priceTo}`;
    if (dom.priceFrom) dom.priceFrom.textContent = `$${field.priceFrom}`;

    if (dom.scheduleWeek) dom.scheduleWeek.textContent = field.schedule.week;
    if (dom.scheduleWeekend) dom.scheduleWeekend.textContent = field.schedule.weekend;

    // Field availability
    if (dom.availabilityContent) {

        const availability =
        await getFieldAvailability(field.id);

    const maintenance =
        await getFieldMaintenance(field.id);

    console.log(
        "FIELD MAINTENANCE:",
        maintenance
    );

    renderFieldAvailability(
        availability,
        maintenance
    );
    }


    // Current field status
    if (dom.availabilityStatusText) {

        const currentStatus =
        await getCurrentFieldStatus(
            field.id,
            field
        );

        renderCurrentFieldStatus(currentStatus);
    }

 

    // Lists
    if (dom.features) dom.features.innerHTML = field.features?.map(f => `<span>${f}</span>`).join("") || "";
    if (dom.buffet) dom.buffet.innerHTML = field.buffet?.map(item => `<span>${item}</span>`).join("") || "";
    if (dom.extraInfo) dom.extraInfo.innerHTML = field.extraInfo?.map(info => `<p>${info}</p>`).join("") || "";

    // Render Sections
    renderFieldSizes(field);
    renderAllowedBoots(field);
    renderAvailableJerseys(field);
    renderFieldHeroCarousel(field);
    renderBarbecue(field)

    

    // Booking
    const cleanPhone = (field.booking.phone || field.booking.whatsapp || "").replace(/\D/g, "");
    const message = `Hola! Quiero consultar disponibilidad para ${field.name} (${field.location})`;

    const phoneLink = document.getElementById("booking-phone");
    if (phoneLink && cleanPhone) {
        phoneLink.href = `tel:+${cleanPhone}`;
        phoneLink.innerHTML = `${icons.phone} Llamar`;
    }

    const whatsappBtn = document.getElementById("booking-whatsapp");
    if (whatsappBtn) whatsappBtn.href = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;

        const sizesEl = document.getElementById("booking-sizes");
    if (sizesEl) {
        sizesEl.innerHTML = `
            ${icons.users}
            ${field.sizes.join(" / ")}
        `;
    }

    const surfaceEl = document.getElementById("booking-surface");

    if (surfaceEl) {
        surfaceEl.innerHTML = `
            ${icons.shoePrints}
            ${field.surface.join(" / ")}
        `;
    }
    
    

    // Map
    if (dom.mapEl) {
        dom.mapEl.dataset.lat = field.lat;
        dom.mapEl.dataset.lng = field.lng;
        dom.mapEl.dataset.name = field.name;
    }
    if (dom.mapAddress) dom.mapAddress.textContent = field.address || "";

    // Non-critical features (delayed for better initial load)
    setTimeout(async () => {
        loadWeather(field);

        const similarFields = await getSimilarFields(field.id);
        renderSimilarFields(field, similarFields);

        initShareButtons(field);
    }, 80);


    // Calculate distance
    function showDistanceToField(field) {
    const distanceEl = document.getElementById("field-distance");

    if (!distanceEl || !field.lat || !field.lng) return;

    if (!navigator.geolocation) {
        distanceEl.style.display = "none";
        return;
    }

    // Loading state
    distanceEl.innerHTML = `
    ${icons.userWalking}
    <span>Calculando distancia...</span>`;
    distanceEl.style.display = "inline-flex";

    navigator.geolocation.getCurrentPosition(
        (position) => {
            const userLat = position.coords.latitude;
            const userLng = position.coords.longitude;
            const accuracy = Math.round(position.coords.accuracy);

            const distanceKm = calculateDistance(
                userLat,
                userLng,
                Number(field.lat),
                Number(field.lng)
            );

            let displayText;

            if (distanceKm < 1) {
                displayText = `Aprox. a ${Math.round(distanceKm * 1000)} metros desde tu ubicación`;
            } else if (distanceKm < 10) {
                displayText = `Aprox. a ${distanceKm.toFixed(1)} km desde tu ubicación`;
            } else {
                displayText = `Aprox. a ${Math.round(distanceKm)} km desde tu ubicación`;
            }

            if (accuracy <= 100) {
                displayText += ` (±${accuracy} m)`;
            }

            distanceEl.innerHTML = `
                ${icons.userWalking}
                <span>${displayText}</span>
            `;
        },
        (err) => {
            console.warn("Geolocation error:", err);
            distanceEl.style.display = "none";
        },
        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 60000
        }
    );
    }

    function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371.0088; 

    const toRad = deg => deg * Math.PI / 180;

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; 
    }

    showDistanceToField(field);
    initRatingWidget(field);
    initFieldFavoriteButton(field);

}
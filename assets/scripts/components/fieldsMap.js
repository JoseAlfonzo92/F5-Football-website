import { fields } from "../data/fields.js";
import { icons } from "../utils/icons.js";

export function initFieldsMap() {
    const mapContainer = document.getElementById("map-container");
    if (!mapContainer) return;

    const cards = Array.from(document.querySelectorAll(".fields-page-card"));
    const locationToggle = document.getElementById("use-location-toggle");

    const fieldMap = new Map(fields.map(field => [field.id, field]));

    // Default view centered on Argentina
    const map = L.map("map-container").setView([-34.6037, -58.3816], 11);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap"
    }).addTo(map);

    let markers = [];
    let userMarker = null;
    let userLocation = null;
    let routingControl = null;

    function clearMarkers() {
        markers.forEach(marker => map.removeLayer(marker));
        markers = [];
    }

    function clearRoute() {
        if (routingControl) {
            map.removeControl(routingControl);
            routingControl = null;
        }
    }

    // USER LOCATION ICON
    function enableUserLocation() {
        if (!navigator.geolocation) return;

        navigator.geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                userLocation = [latitude, longitude];

                if (userMarker) map.removeLayer(userMarker);

                userMarker = L.marker(userLocation, {
                    icon: L.divIcon({
                        className: "user-location-icon",
                        html: `
                            <div class="user-location-marker">
                                <span class="user-location-pulse"></span>
                                <span class="user-location-icon-svg">
                                    ${icons.userWalking}
                                </span>
                            </div>
                        `,
                        iconSize: [42, 42],
                        iconAnchor: [21, 42],
                        popupAnchor: [0, -45]
                    })
                })
                .addTo(map)
                .bindPopup("Tu ubicación actual", {
                    offset: [0, -10],        
                    closeButton: false,
                    className: 'user-popup'
                })
                .openPopup();   

                map.setView(userLocation, 14);
            },
            err => {
                console.warn("Location error:", err);
                alert("No se pudo obtener tu ubicación");
            }
        );
    }

    function disableUserLocation() {
        userLocation = null;
        if (userMarker) {
            map.removeLayer(userMarker);
            userMarker = null;
        }
        clearRoute();
    }

    // ROUTE
    function createRoute(lat, lng) {
        if (!userLocation) return;

        clearRoute();

        routingControl = L.Routing.control({
            waypoints: [
                L.latLng(userLocation[0], userLocation[1]),
                L.latLng(lat, lng)
            ],
            routeWhileDragging: false,
            show: false,
            addWaypoints: false,
            draggableWaypoints: false,
            fitSelectedRoutes: true,
            createMarker: () => null,
            lineOptions: {
                styles: [{ color: 'var(--color-primary)', weight: 6, opacity: 0.8 }]
            }
        }).addTo(map);

        setTimeout(() => {
            document.querySelectorAll('.leaflet-routing-container').forEach(el => {
                el.style.display = 'none';
            });
        }, 500);
    }

    // MARKERS
    function renderMarkers() {
        clearMarkers();
        const bounds = [];

        cards.forEach(card => {
            if (card.classList.contains("hidden")) return;

            const field = fieldMap.get(card.dataset.id);
            if (!field?.lat || !field?.lng) return;

    const popupHTML = `
    <a
        href="field.html?id=${field.id}"
        class="field-popup-link"
        aria-label="Ver detalles de ${field.name}"
    >
        <div class="field-popup">

            <img
                src="${field.image}"
                alt="${field.name}"
                class="field-popup-image"
                loading="lazy"
            >

            <div class="field-popup-body">

                <p class="field-popup-info">

                    <span class="field-popup-title">
                        ${field.name}
                    </span>

                    <span class="field-popup-line">
                        ${icons.mapMarker}
                        ${field.zone}, ${field.city}
                    </span>

                    <span class="field-popup-line">
                        ${icons.football}
                        ${field.sizes?.join(" / ") || "Sin información"}

                        <span class="field-popup-dot">•</span>

                        ${icons.shoePrints}
                        ${field.surface?.[0] || "Sin información"}

                        <span class="field-popup-dot">•</span>

                        ${icons.dollar}
                        <span class="field-popup-price">
                            $${field.priceFrom.toLocaleString()}
                        </span>
                    </span>

                </p>

            </div>

        </div>
    </a>
`;

            const marker = L.marker([field.lat, field.lng])
                .addTo(map)
                .bindPopup(popupHTML, {
                    className: "field-popup-wrapper",
                    maxWidth: 280
                });

            marker.on("click", () => {
                card.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

                card.style.boxShadow = "0 0 0 3px var(--color-primary)";

                setTimeout(() => {
                    card.style.boxShadow = "";
                }, 1800);

                if (userLocation) {
                    createRoute(field.lat, field.lng);
                }
            });

            markers.push(marker);
            bounds.push([field.lat, field.lng]);
        });

        if (bounds.length > 0) {
            map.fitBounds(bounds, {
                padding: [60, 60]
            });
        }
    }

    // Observers and Event Listeners
    const observer = new MutationObserver(() => renderMarkers());
    cards.forEach(card => observer.observe(card, { attributes: true, attributeFilter: ["class"] }));

    locationToggle?.addEventListener("change", e => {
        if (e.target.checked) enableUserLocation();
        else disableUserLocation();
    });

    const mapBtn = document.getElementById("map-view-btn");
    mapBtn?.addEventListener("click", () => setTimeout(() => map.invalidateSize(), 300));

    // Initialize
    renderMarkers();
    if (locationToggle?.checked) enableUserLocation();
}
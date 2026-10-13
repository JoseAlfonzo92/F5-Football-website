import { getCurrentUser } from "../services/auth.js";
import { supabase } from "../services/supabase.js";

let confirmedReservations = [];

let fieldMaintenance = [];

// GET FIELD REQUESTS
async function getFieldRequests(fieldIds) {

    if (!fieldIds || fieldIds.length === 0) {
        return [];
    }

    const { data, error } = await supabase
        .from("field_requests")
        .select(`
            id,
            field_id,
            team_id,
            requested_date,
            start_time,
            end_time,
            message,
            status,
            created_at,
            responded_at
        `)
        .in("field_id", fieldIds)
        .eq("status", "pending")
        .order("requested_date", {
            ascending: true
        })
        .order("start_time", {
            ascending: true
        });

    if (error) {
        console.error(
            "FIELD OWNER REQUESTS ERROR:",
            error
        );

        return [];
    }

    console.log(
        "FIELD OWNER REQUESTS:",
        data
    );

    return data || [];
}

async function getConfirmedFieldReservations(fieldIds) {
    if (!fieldIds || fieldIds.length === 0) {
        return [];
    }

    const { data, error } = await supabase
        .from("field_requests")
        .select(`
            id,
            field_id,
            team_id,
            requested_date,
            start_time,
            end_time,
            customer_name,
            customer_phone,
            message,
            status,
            created_at
        `)
        .in("field_id", fieldIds)
        .eq("status", "accepted")
        .order("requested_date", { ascending: true })
        .order("start_time", { ascending: true });

    if (error) {
        console.error(
            "FIELD OWNER CONFIRMED RESERVATIONS ERROR:",
            error
        );

        return [];
    }

    console.log(
        "FIELD OWNER CONFIRMED RESERVATIONS:",
        data
    );

    return data || [];
}


// RENDER CONFIRMED RESERVATIONS

function renderConfirmedReservations(
    reservations,
    ownedFields,
    container,
    emptyState
) {
    if (!container) return;

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const todayString =
        today.getFullYear() +
        "-" +
        String(today.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(today.getDate()).padStart(2, "0");

    // Remove past reservations
    const upcomingReservations =
        (reservations || []).filter(
            reservation =>
                reservation.requested_date >= todayString
        );

    if (upcomingReservations.length === 0) {
        container.innerHTML = "";

        if (emptyState) {
            emptyState.style.display = "block";
        }

        return;
    }

    // Group reservations by date
    const reservationsByDate = {};

    upcomingReservations.forEach(reservation => {

        if (!reservationsByDate[reservation.requested_date]) {
            reservationsByDate[reservation.requested_date] = [];
        }

        reservationsByDate[reservation.requested_date].push(
            reservation
        );
    });

    const sortedDates =
        Object.keys(reservationsByDate).sort();

    let html = `
        <div class="field-owner-reservation-days">
    `;

    sortedDates.forEach((dateString, index) => {

        const dateReservations =
            reservationsByDate[dateString];

        const isToday =
            dateString === todayString;

        const dateParts =
            dateString.split("-").map(Number);

        const date =
            new Date(
                dateParts[0],
                dateParts[1] - 1,
                dateParts[2]
            );

        const weekday =
            date.toLocaleDateString(
                "es-AR",
                { weekday: "long" }
            );

        const dayNumber =
            date.getDate();

        const month =
            date.toLocaleDateString(
                "es-AR",
                { month: "long" }
            );

        const formattedWeekday =
            weekday.charAt(0).toUpperCase() +
            weekday.slice(1);

        const formattedMonth =
            month.charAt(0).toUpperCase() +
            month.slice(1);

        html += `
            <article
                class="field-owner-reservation-day
                ${isToday ? "today" : ""}"
            >

                <button
                    type="button"
                    class="field-owner-reservation-day-header"
                    aria-expanded="${isToday ? "true" : "false"}"
                >

                    <div class="field-owner-reservation-date">

                        <span class="field-owner-reservation-weekday">
                            ${isToday ? "Hoy" : formattedWeekday}
                        </span>

                        <span class="field-owner-reservation-day-number">
                            ${dayNumber}
                        </span>

                        <span class="field-owner-reservation-month">
                            ${formattedMonth}
                        </span>

                    </div>

                    <div class="field-owner-reservation-day-meta">

                        <span class="field-owner-reservation-count">
                            ${dateReservations.length}
                            ${dateReservations.length === 1
                                ? "reserva"
                                : "reservas"}
                        </span>

                        <span
                            class="field-owner-reservation-chevron"
                            aria-hidden="true"
                        >
                            ›
                        </span>

                    </div>

                </button>

                <div
                    class="field-owner-reservation-day-content"
                    ${isToday ? "" : "hidden"}
                >

                    <div class="field-owner-reservation-day-list">

                        ${dateReservations.map(reservation => {

                            const field =
                                (ownedFields || []).find(
                                    field =>
                                        field.id ===
                                        reservation.field_id
                                );

                            const fieldName =
                                field?.name ||
                                "Cancha";

                            const isManualReservation =
                                !reservation.team_id;

                            const reservationTitle =
                                isManualReservation
                                    ? (
                                        reservation.customer_name ||
                                        "Reserva externa"
                                    )
                                    : "Reserva de equipo";

                            const reservationType =
                                isManualReservation
                                    ? "Reserva externa"
                                    : "Reserva de equipo";

                            return `
    <article
        class="field-owner-reservation-item"
        data-reservation-id="${reservation.id}"
    >

                                    <div
                                        class="field-owner-reservation-item-time"
                                    >
                                        <strong>
                                            ${reservation.start_time.slice(0, 5)}
                                        </strong>

                                        <span>
                                            -
                                        </span>

                                        <strong>
                                            ${reservation.end_time.slice(0, 5)}
                                        </strong>
                                    </div>


                                    <div
                                        class="field-owner-reservation-item-info"
                                    >

                                        <h3>
                                            ${reservationTitle}
                                        </h3>

                                        <p>
                                            ${fieldName}
                                        </p>

                                        <span
                                            class="field-owner-reservation-type"
                                        >
                                            ${reservationType}
                                        </span>

                                        ${
                                            isManualReservation &&
                                            reservation.customer_phone
                                                ? `
                                                    <p>
                                                        Tel:
                                                        ${reservation.customer_phone}
                                                    </p>
                                                `
                                                : ""
                                        }

                                        ${
                                            reservation.message
                                                ? `
                                                    <p>
                                                        ${reservation.message}
                                                    </p>
                                                `
                                                : ""
                                        }

                                    </div>

                                    </div>

                                   <div class="field-owner-reservation-actions">

    <button
        type="button"
        class="edit-field-reservation"
        data-reservation-id="${reservation.id}"
    >
        Editar
    </button>

    <button
        type="button"
        class="cancel-field-reservation"
        data-reservation-id="${reservation.id}"
    >
        Cancelar reserva
    </button>

</div>

                                </article>
                            `;

                        }).join("")}

                    </div>

                </div>

            </article>
        `;
    });

    html += `
        </div>
    `;

    container.innerHTML = html;

    if (emptyState) {
        emptyState.style.display = "none";
    }

    initReservationDayAccordion(container);
}


// RESERVATION DAY ACCORDION

function initReservationDayAccordion(container) {

    const headers =
        container.querySelectorAll(
            ".field-owner-reservation-day-header"
        );

    headers.forEach(header => {

        header.addEventListener("click", () => {

            const day =
                header.closest(
                    ".field-owner-reservation-day"
                );

            const content =
                day?.querySelector(
                    ".field-owner-reservation-day-content"
                );

            if (!day || !content) return;

            const isOpen =
                header.getAttribute("aria-expanded") === "true";

            header.setAttribute(
                "aria-expanded",
                String(!isOpen)
            );

            day.classList.toggle(
                "expanded",
                !isOpen
            );

            if (isOpen) {
                content.hidden = true;
            } else {
                content.hidden = false;
            }

        });

    });
}


// GET TEAMS FOR FIELD REQUESTS

async function getRequestTeams(fieldRequests) {

    if (!fieldRequests || fieldRequests.length === 0) {
        return [];
    }

    const teamIds = [
        ...new Set(
            fieldRequests.map(
                request => request.team_id
            )
        )
    ];

    if (teamIds.length === 0) {
        return [];
    }

    const {
        data,
        error
    } = await supabase
        .from("teams")
        .select(`
            id,
            name,
            logo_url
        `)
        .in("id", teamIds);

    if (error) {

        console.error(
            "FIELD OWNER REQUEST TEAMS ERROR:",
            error
        );

        return [];
    }

    console.log(
        "FIELD OWNER REQUEST TEAMS:",
        data
    );

    return data || [];
}

    // RENDER FIELD REQUESTS

async function respondToFieldRequest(requestId, status) {
    if (!requestId) {
        console.error("Missing request ID");
        return;
    }

    if (!["accepted", "rejected"].includes(status)) {
        console.error("Invalid request status:", status);
        return;
    }

    console.log(
        "RESPONDING TO FIELD REQUEST:",
        {
            requestId,
            status
        }
    );


      //  CHECK RESERVATION CONFLICT BEFORE ACCEPTING
      

    if (status === "accepted") {

        const { data: request, error: requestError } =
            await supabase
                .from("field_requests")
                .select(`
                    id,
                    field_id,
                    requested_date,
                    start_time,
                    end_time,
                    status
                `)
                .eq("id", requestId)
                .single();

        if (requestError) {

            console.error(
                "FIELD REQUEST LOAD ERROR:",
                requestError
            );

            alert(
                "No se pudo comprobar la disponibilidad de la cancha."
            );

            return;
        }

        const conflict =
            await hasReservationConflict(
                request.field_id,
                request.requested_date,
                request.start_time,
                request.end_time
            );

        if (conflict) {

            console.warn(
                "FIELD REQUEST ACCEPTANCE BLOCKED: RESERVATION CONFLICT",
                request
            );

            alert(
                "No se puede aceptar la solicitud porque ya existe una reserva confirmada que se superpone con ese horario."
            );

            return;
        }

        const maintenanceConflict =
    await hasMaintenanceConflict(
        request.field_id,
        request.requested_date,
        request.start_time,
        request.end_time
    );

if (maintenanceConflict) {
    console.warn(
        "FIELD REQUEST ACCEPTANCE BLOCKED: MAINTENANCE CONFLICT",
        request
    );

    alert(
        "No se puede aceptar la solicitud porque la cancha tiene un bloqueo de mantenimiento en ese horario."
    );

    return;
}
    }


      //  UPDATE REQUEST
      

    const { data, error } = await supabase
        .from("field_requests")
        .update({
            status: status,
            responded_at: new Date().toISOString()
        })
        .eq("id", requestId)
        .select()
        .single();

    if (error) {

        console.error(
            "FIELD REQUEST RESPONSE ERROR:",
            error
        );

        alert(
            "No se pudo actualizar la solicitud."
        );

        return;
    }

    console.log(
        "FIELD REQUEST UPDATED:",
        data
    );

    window.location.reload();
}


async function hasReservationConflict(
    fieldId,
    requestedDate,
    startTime,
    endTime,
    excludeReservationId = null
) {
    let query = supabase
        .from("field_requests")
        .select("id")
        .eq("field_id", fieldId)
        .eq("requested_date", requestedDate)
        .eq("status", "accepted")
        .lt("start_time", endTime)
        .gt("end_time", startTime);

    if (excludeReservationId) {
        query = query.neq("id", excludeReservationId);
    }

    const { data, error } = await query;

    if (error) {
        console.error("RESERVATION CONFLICT CHECK ERROR:", error);
        throw error;
    }

    return data.length > 0;
}


async function hasMaintenanceConflict(
    fieldId,
    maintenanceDate,
    startTime,
    endTime,
    excludeMaintenanceId = null
) {
    let query = supabase
        .from("field_maintenance")
        .select("id")
        .eq("field_id", fieldId)
        .eq("maintenance_date", maintenanceDate)
        .lt("start_time", endTime)
        .gt("end_time", startTime);

    if (excludeMaintenanceId) {
        query = query.neq("id", excludeMaintenanceId);
    }

    const { data, error } = await query;

    if (error) {
        console.error(
            "MAINTENANCE CONFLICT CHECK ERROR:",
            error
        );
        throw error;
    }

    return data.length > 0;
}

function initFieldReservationEditForm() {
    const form = document.getElementById(
        "field-reservation-edit-form"
    );

    if (!form) {
        return;
    }

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const reservationId = document.getElementById(
            "edit-reservation-id"
        ).value;

        const requestedDate = document.getElementById(
            "edit-reservation-date"
        ).value;

        const startTime = document.getElementById(
            "edit-reservation-start"
        ).value;

        const endTime = document.getElementById(
            "edit-reservation-end"
        ).value;

        const message = document.getElementById(
            "edit-reservation-message"
        ).value.trim();

        const errorElement = document.getElementById(
            "field-reservation-edit-error"
        );

        const saveButton = document.getElementById(
            "save-field-reservation-edit"
        );

        errorElement.hidden = true;
        errorElement.textContent = "";

        /*
         * BASIC VALIDATION
         */

        if (!reservationId) {
            errorElement.textContent =
                "No se pudo identificar la reserva.";

            errorElement.hidden = false;
            return;
        }

        if (!requestedDate || !startTime || !endTime) {
            errorElement.textContent =
                "Completá la fecha y el horario.";

            errorElement.hidden = false;
            return;
        }

        if (endTime <= startTime) {
            errorElement.textContent =
                "La hora de finalización debe ser posterior a la hora de inicio.";

            errorElement.hidden = false;
            return;
        }

        // FIND ORIGINAL RESERVATION
         

        const reservation = confirmedReservations.find(
            item => item.id === reservationId
        );

        if (!reservation) {
            errorElement.textContent =
                "No se encontró la reserva.";

            errorElement.hidden = false;
            return;
        }

        
        //CHECK CONFLICT
         

        saveButton.disabled = true;
        saveButton.textContent = "Guardando...";

        try {

            const hasConflict = await hasReservationConflict(
                reservation.field_id,
                requestedDate,
                startTime,
                endTime,
                reservationId
            );

            if (hasConflict) {
                errorElement.textContent =
                    "Ese horario ya está ocupado por otra reserva.";

                errorElement.hidden = false;

                return;
            }

            const maintenanceConflict =
            await hasMaintenanceConflict(
                reservation.field_id,
                requestedDate,
                startTime,
                endTime
            );

            if (maintenanceConflict) {
                errorElement.textContent =
                    "Ese horario no está disponible porque la cancha tiene un bloqueo de mantenimiento.";

                errorElement.hidden = false;
                return;
            }

            
            // UPDATE RESERVATION
             

            await updateFieldReservation(
                reservationId,
                requestedDate,
                startTime,
                endTime,
                message
            );

            
            //CLOSE AND REFRESH
             

            closeFieldReservationEditModal();

            window.location.reload();

        } catch (error) {

            console.error(
                "EDIT FIELD RESERVATION ERROR:",
                error
            );

            errorElement.textContent =
                "No se pudo actualizar la reserva. Intentá nuevamente.";

            errorElement.hidden = false;

        } finally {

            saveButton.disabled = false;
            saveButton.textContent = "Guardar cambios";
        }
    });
}


async function updateFieldReservation(
    reservationId,
    requestedDate,
    startTime,
    endTime,
    message
) {
    if (!reservationId) {
        throw new Error("Falta el ID de la reserva.");
    }

    const { error } = await supabase
        .from("field_requests")
        .update({
            requested_date: requestedDate,
            start_time: startTime,
            end_time: endTime,
            message: message || null
        })
        .eq("id", reservationId);

    if (error) {
        console.error("UPDATE FIELD RESERVATION ERROR:", error);
        throw error;
    }
}

async function cancelFieldReservation(reservationId) {
    if (!reservationId) {
        throw new Error("Falta el ID de la reserva.");
    }

    const { error } = await supabase
        .from("field_requests")
        .update({
            status: "cancelled"
        })
        .eq("id", reservationId);

    if (error) {
        console.error(
            "CANCEL FIELD RESERVATION ERROR:",
            error
        );
        throw error;
    }
}

async function createManualReservation({
    fieldId,
    requestedDate,
    startTime,
    endTime,
    customerName,
    customerPhone,
    message
}) {

    if (
        !fieldId ||
        !requestedDate ||
        !startTime ||
        !endTime
    ) {
        throw new Error(
            "Completá la cancha, fecha y horario."
        );
    }

    if (endTime <= startTime) {
        throw new Error(
            "El horario de finalización debe ser posterior al horario de inicio."
        );
    }

    const conflict =
        await hasReservationConflict(
            fieldId,
            requestedDate,
            startTime,
            endTime
        );

    if (conflict) {
        throw new Error(
            "Ya existe una reserva confirmada que se superpone con ese horario."
        );
    }

    const maintenanceConflict =
    await hasMaintenanceConflict(
        fieldId,
        requestedDate,
        startTime,
        endTime
    );

if (maintenanceConflict) {
    throw new Error(
        "Ese horario no está disponible porque la cancha tiene un bloqueo de mantenimiento."
    );
}

    console.log(
        "CREATING MANUAL RESERVATION:",
        {
            fieldId,
            requestedDate,
            startTime,
            endTime,
            customerName,
            customerPhone,
            message
        }
    );

    const {
        data,
        error
    } = await supabase
        .from("field_requests")
        .insert({
            field_id: fieldId,
            team_id: null,
            requested_date: requestedDate,
            start_time: startTime,
            end_time: endTime,
            customer_name:
                customerName || null,
            customer_phone:
                customerPhone || null,
            message:
                message || null,
            status: "accepted"
        })
        .select()
        .single();

    if (error) {

        console.error(
            "MANUAL RESERVATION ERROR:",
            error
        );

        throw error;
    }

    console.log(
        "MANUAL RESERVATION CREATED:",
        data
    );

    return data;
}

function initManualReservationForm(
    ownedFields
) {

    const form =
        document.getElementById(
            "field-owner-manual-reservation-form"
        );

    const fieldSelect =
        document.getElementById(
            "manual-reservation-field"
        );

    const dateInput =
        document.getElementById(
            "manual-reservation-date"
        );

    const feedback =
        document.getElementById(
            "manual-reservation-feedback"
        );

    const submitButton =
        document.getElementById(
            "manual-reservation-submit"
        );

    if (
        !form ||
        !fieldSelect ||
        !dateInput ||
        !feedback ||
        !submitButton
    ) {
        return;
    }



    // POPULATE FIELDS

    fieldSelect.innerHTML = `
        <option value="">
            Seleccioná una cancha
        </option>

        ${(ownedFields || []).map(field => `
            <option value="${field.id}">
                ${field.name || "Cancha sin nombre"}
            </option>
        `).join("")}
    `;



    // MINIMUM DATE = TODAY

    const today =
        new Date()
            .toLocaleDateString(
                "en-CA",
                {
                    timeZone:
                        "America/Argentina/Buenos_Aires"
                }
            );

    dateInput.min = today;



    // SUBMIT


    form.addEventListener(
        "submit",
        async event => {

            event.preventDefault();


            feedback.hidden = true;
            feedback.textContent = "";


            const fieldId =
                fieldSelect.value;

            const requestedDate =
                dateInput.value;

            const startTime =
                document.getElementById(
                    "manual-reservation-start"
                ).value;

            const endTime =
                document.getElementById(
                    "manual-reservation-end"
                ).value;

            const customerName =
                document.getElementById(
                    "manual-reservation-customer"
                ).value.trim();

            const customerPhone =
                document.getElementById(
                    "manual-reservation-phone"
                ).value.trim();

            const message =
                document.getElementById(
                    "manual-reservation-message"
                ).value.trim();



            // BASIC VALIDATION


            if (
                !fieldId ||
                !requestedDate ||
                !startTime ||
                !endTime
            ) {

                feedback.textContent =
                    "Completá la cancha, fecha y horario.";

                feedback.hidden = false;

                return;
            }


            if (endTime <= startTime) {

                feedback.textContent =
                    "El horario de finalización debe ser posterior al horario de inicio.";

                feedback.hidden = false;

                return;
            }


            submitButton.disabled = true;

            submitButton.textContent =
                "Guardando...";


            try {

                await createManualReservation({
                    fieldId,
                    requestedDate,
                    startTime,
                    endTime,
                    customerName,
                    customerPhone,
                    message
                });


                feedback.textContent =
                    "Reserva agregada correctamente.";

                feedback.hidden = false;


                form.reset();

                dateInput.min = today;


                
                   // Reload so the owner dashboard reflects the new reservation.
                
                setTimeout(
                    () => {
                        window.location.reload();
                    },
                    700
                );


            } catch (error) {

                console.error(
                    "MANUAL RESERVATION SUBMIT ERROR:",
                    error
                );

                feedback.textContent =
                    error.message ||
                    "No se pudo agregar la reserva.";

                feedback.hidden = false;

            } finally {

                submitButton.disabled = false;

                submitButton.textContent =
                    "Agregar reserva";
            }

        }
    );
}


function populateMaintenanceFieldSelect(ownedFields) {
    const select = document.getElementById(
        "maintenance-field"
    );

    if (!select) {
        return;
    }

    select.innerHTML = `
        <option value="">
            Seleccioná una cancha
        </option>
    `;

    ownedFields.forEach(field => {
        const option = document.createElement("option");

        option.value = field.id;
        option.textContent = field.name;

        select.appendChild(option);
    });
}


async function createFieldMaintenance(
    fieldId,
    maintenanceDate,
    startTime,
    endTime,
    reason
) {
    if (!fieldId) {
        throw new Error("Falta seleccionar una cancha.");
    }

    const {
        data: { user },
        error: userError
    } = await supabase.auth.getUser();

    if (userError) {
        console.error(
            "GET USER FOR MAINTENANCE ERROR:",
            userError
        );
        throw userError;
    }

    if (!user) {
        throw new Error(
            "Tenés que iniciar sesión para crear un bloqueo."
        );
    }

    const { error } = await supabase
        .from("field_maintenance")
        .insert({
            field_id: fieldId,
            maintenance_date: maintenanceDate,
            start_time: startTime,
            end_time: endTime,
            reason: reason || null,
            created_by: user.id
        });

    if (error) {
        console.error(
            "CREATE FIELD MAINTENANCE ERROR:",
            error
        );
        throw error;
    }
}

async function deleteFieldMaintenance(
    maintenanceId
) {
    if (!maintenanceId) {
        throw new Error(
            "Falta el ID del mantenimiento."
        );
    }

    const { error } = await supabase
        .from("field_maintenance")
        .delete()
        .eq("id", maintenanceId);

    if (error) {
        console.error(
            "DELETE FIELD MAINTENANCE ERROR:",
            error
        );
        throw error;
    }
}


async function updateFieldMaintenance(
    maintenanceId,
    maintenanceDate,
    startTime,
    endTime,
    reason
) {
    if (!maintenanceId) {
        throw new Error(
            "Falta el ID del mantenimiento."
        );
    }

    const { error } = await supabase
        .from("field_maintenance")
        .update({
            maintenance_date: maintenanceDate,
            start_time: startTime,
            end_time: endTime,
            reason: reason || null
        })
        .eq("id", maintenanceId);

    if (error) {
        console.error(
            "UPDATE FIELD MAINTENANCE ERROR:",
            error
        );
        throw error;
    }
}

function initFieldMaintenanceForm() {
    const form = document.getElementById(
        "field-maintenance-form"
    );

    if (!form) {
        return;
    }

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const fieldId = document.getElementById(
            "maintenance-field"
        ).value;

        const maintenanceDate = document.getElementById(
            "maintenance-date"
        ).value;

        const startTime = document.getElementById(
            "maintenance-start"
        ).value;

        const endTime = document.getElementById(
            "maintenance-end"
        ).value;

        const reason = document.getElementById(
            "maintenance-reason"
        ).value.trim();

        const errorElement = document.getElementById(
            "field-maintenance-error"
        );

        const submitButton = document.getElementById(
            "create-field-maintenance"
        );

        errorElement.hidden = true;
        errorElement.textContent = "";

        if (!fieldId) {
            errorElement.textContent =
                "Seleccioná una cancha.";
            errorElement.hidden = false;
            return;
        }

        if (!maintenanceDate || !startTime || !endTime) {
            errorElement.textContent =
                "Completá la fecha y el horario.";
            errorElement.hidden = false;
            return;
        }

        if (endTime <= startTime) {
            errorElement.textContent =
                "La hora de finalización debe ser posterior a la hora de inicio.";
            errorElement.hidden = false;
            return;
        }

        submitButton.disabled = true;
        submitButton.textContent = "Bloqueando...";

        try {
            
            const hasConflict = await hasReservationConflict(
                fieldId,
                maintenanceDate,
                startTime,
                endTime
            );

            if (hasConflict) {
                errorElement.textContent =
                    "Ese horario ya está ocupado por una reserva confirmada.";
                errorElement.hidden = false;
                return;
            }

            const hasMaintenanceConflictResult =
    await hasMaintenanceConflict(
        fieldId,
        maintenanceDate,
        startTime,
        endTime
    );

if (hasMaintenanceConflictResult) {
    errorElement.textContent =
        "Ese horario ya está bloqueado por otro mantenimiento.";
    errorElement.hidden = false;
    return;
}

            await createFieldMaintenance(
                fieldId,
                maintenanceDate,
                startTime,
                endTime,
                reason
            );

            form.reset();

            alert(
                "El horario fue bloqueado correctamente."
            );

        } catch (error) {
            console.error(
                "CREATE FIELD MAINTENANCE FORM ERROR:",
                error
            );

            errorElement.textContent =
                "No se pudo crear el bloqueo. Intentá nuevamente.";
            errorElement.hidden = false;

        } finally {
            submitButton.disabled = false;
            submitButton.textContent = "Bloquear horario";
        }
    });
}

function initFieldMaintenanceEditForm() {
    const form = document.getElementById(
        "field-maintenance-edit-form"
    );

    if (!form) {
        return;
    }

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const maintenanceId =
            form.dataset.maintenanceId;

        const maintenance = fieldMaintenance.find(
            item => item.id === maintenanceId
        );

        if (!maintenance) {
            console.error(
                "FIELD MAINTENANCE NOT FOUND:",
                maintenanceId
            );
            return;
        }

        const maintenanceDate =
            document.getElementById(
                "edit-maintenance-date"
            ).value;

        const startTime =
            document.getElementById(
                "edit-maintenance-start"
            ).value;

        const endTime =
            document.getElementById(
                "edit-maintenance-end"
            ).value;

        const reason =
            document.getElementById(
                "edit-maintenance-reason"
            ).value.trim();

        const errorElement =
            document.getElementById(
                "edit-field-maintenance-error"
            );

        const saveButton =
            document.getElementById(
                "save-field-maintenance-edit"
            );

        errorElement.hidden = true;
        errorElement.textContent = "";

        if (
            !maintenanceDate ||
            !startTime ||
            !endTime
        ) {
            errorElement.textContent =
                "Completá la fecha y el horario.";

            errorElement.hidden = false;

            return;
        }

        if (endTime <= startTime) {
            errorElement.textContent =
                "La hora de finalización debe ser posterior a la hora de inicio.";

            errorElement.hidden = false;

            return;
        }

        saveButton.disabled = true;
        saveButton.textContent = "Guardando...";

                try {

                const reservationConflict =
                    await hasReservationConflict(
                        maintenance.field_id,
                        maintenanceDate,
                        startTime,
                        endTime
                    );

                if (reservationConflict) {
                    errorElement.textContent =
                        "Ese horario ya está ocupado por una reserva confirmada.";

                    errorElement.hidden = false;

                    return;
                }

                const maintenanceConflict =
    await hasMaintenanceConflict(
        maintenance.field_id,
        maintenanceDate,
        startTime,
        endTime,
        maintenanceId
    );

if (maintenanceConflict) {
    errorElement.textContent =
        "Ese horario ya está bloqueado por otro mantenimiento.";

    errorElement.hidden = false;

    return;
}

                await updateFieldMaintenance(
                    maintenanceId,
                    maintenanceDate,
                    startTime,
                    endTime,
                    reason
                );

            window.location.reload();

        } catch (error) {
            console.error(
                "UPDATE FIELD MAINTENANCE FORM ERROR:",
                error
            );

            errorElement.textContent =
                "No se pudo actualizar el bloqueo. Intentá nuevamente.";

            errorElement.hidden = false;

        } finally {
            saveButton.disabled = false;
            saveButton.textContent =
                "Guardar cambios";
        }
    });
}


async function getFieldMaintenance(fieldIds) {
    if (!fieldIds || fieldIds.length === 0) {
        return [];
    }

    const { data, error } = await supabase
        .from("field_maintenance")
        .select(`
            id,
            field_id,
            maintenance_date,
            start_time,
            end_time,
            reason,
            created_by,
            created_at
        `)
        .in("field_id", fieldIds)
        .order("maintenance_date", {
            ascending: true
        })
        .order("start_time", {
            ascending: true
        });

    if (error) {
        console.error(
            "GET FIELD MAINTENANCE ERROR:",
            error
        );
        throw error;
    }

    return data || [];
}

function renderFieldMaintenance(
    maintenanceList,
    ownedFields
) {
    const container = document.getElementById(
        "field-maintenance-list"
    );

    const emptyState = document.getElementById(
        "field-maintenance-empty"
    );

    if (!container || !emptyState) {
        return;
    }

    container.innerHTML = "";

    if (
        !maintenanceList ||
        maintenanceList.length === 0
    ) {
        emptyState.hidden = false;
        return;
    }

    emptyState.hidden = true;

    maintenanceList.forEach(maintenance => {
        const field = ownedFields.find(
            item => item.id === maintenance.field_id
        );

        const fieldName =
            field?.name || "Cancha";

        const article = document.createElement("article");

        article.className =
            "field-owner-maintenance-item";

        article.dataset.maintenanceId =
            maintenance.id;

        const formattedDate =
            new Date(
                `${maintenance.maintenance_date}T00:00:00`
            ).toLocaleDateString(
                "es-AR",
                {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric"
                }
            );

        const startTime =
            maintenance.start_time.slice(0, 5);

        const endTime =
            maintenance.end_time.slice(0, 5);

        article.innerHTML = `
            <div class="field-owner-maintenance-info">

                <h3>
                    ${fieldName}
                </h3>

                <p>
                    <strong>Fecha:</strong>
                    ${formattedDate}
                </p>

                <p>
                    <strong>Horario:</strong>
                    ${startTime}–${endTime}
                </p>

                ${
                    maintenance.reason
                        ? `
                            <p>
                                <strong>Motivo:</strong>
                                ${maintenance.reason}
                            </p>
                        `
                        : ""
                }

            </div>

            <div class="field-owner-maintenance-actions">

                <button
                    type="button"
                    class="edit-field-maintenance"
                    data-maintenance-id="${maintenance.id}"
                >
                    Editar
                </button>

                <button
                    type="button"
                    class="delete-field-maintenance"
                    data-maintenance-id="${maintenance.id}"
                >
                    Eliminar
                </button>

            </div>
        `;

        container.appendChild(article);
    });
}

//FIELD OWNER PAGE INIT

export async function initFieldOwnerPage() {

    const user = await getCurrentUser();

    if (!user) {

        window.location.href =
            "../pages/login.html";

        return;
    }

    console.log(
        "Field owner dashboard",
        user.id
    );

    // LOAD FIELD SUBMISSIONS

    const {
        data: submissions,
        error: submissionsError
    } = await supabase
        .from("field_submissions")
        .select(`
            id,
            created_at,
            status,
            name,
            address,
            city,
            province,
            payment_status
        `)
        .eq(
            "submitted_by",
            user.id
        )
        .order(
            "created_at",
            {
                ascending: false
            }
        );


    if (submissionsError) {

        console.error(
            "FIELD OWNER SUBMISSIONS ERROR:",
            submissionsError
        );

        return;
    }

    console.log(
        "FIELD OWNER SUBMISSIONS:",
        submissions
    );

    // LOAD OWNED FIELDS

    const {
        data: ownedFields,
        error: fieldsError
    } = await supabase
        .from("fields")
        .select(`
            id,
            name,
            address,
            city,
            province,
            is_active,
            subscription_expires_at
        `)
        .eq(
            "owner_id",
            user.id
        )
        .order(
            "name",
            {
                ascending: true
            }
        );


    if (fieldsError) {

        console.error(
            "FIELD OWNER FIELDS ERROR:",
            fieldsError
        );

        return;
    }

    console.log(
    "FIELD OWNER FIELDS:",
    ownedFields
    );


    // LOAD PENDING FIELD REQUESTS

    const fieldIds = (ownedFields || []).map(
        field => field.id
    );

    const fieldRequests = await getFieldRequests(fieldIds);
    const requestTeams = await getRequestTeams(fieldRequests);

    confirmedReservations =
    await getConfirmedFieldReservations(fieldIds);

    fieldMaintenance =
    await getFieldMaintenance(fieldIds);

    initManualReservationForm( ownedFields || [] );

    initFieldReservationEditForm();

    initFieldMaintenanceForm();

    initFieldMaintenanceEditForm();

    populateMaintenanceFieldSelect(ownedFields);

    

    // GET UI CONTAINERS

    const fieldsContainer =
        document.querySelector("#field-owner-fields");

    const submissionsContainer =
        document.querySelector("#field-owner-submissions");

    const requestsContainer =
        document.querySelector("#field-owner-requests");

    const requestsEmptyState =
        document.querySelector("#field-owner-requests-empty");

    const emptyState =
        document.querySelector("#field-owner-empty");

    const reservationsContainer =
        document.querySelector("#field-owner-reservations");

    const reservationsEmptyState =
        document.querySelector("#field-owner-reservations-empty");

    // RENDER OWNED FIELDS

    if (
        fieldsContainer &&
        ownedFields &&
        ownedFields.length > 0
    ) {

        fieldsContainer.innerHTML = `

            <div class="field-owner-subsection">

                
                <div class="field-owner-subsection-header">
                    <h3>Mis canchas aprobadas</h3>
                    <a href="../pages/add-field.html" class="btn-primary">
                        + Agregar otra cancha
                    </a>
                </div>


                <div class="field-owner-fields-list">

                ${ownedFields.map(field => {

                                    const fieldStatus =
                                        field.is_active
                                            ? "Activa"
                                            : "Inactiva";


                                return `
                <article
                    class="field-owner-field-card"
                >

                    <div
                        class="field-owner-field-info"
                    >

                        <h3>
                            ${field.name || "Cancha sin nombre"}
                        </h3>

                        <p>
                            ${field.address || "Dirección no especificada"}
                        </p>

                        <p>
                            ${field.city || ""}
                            ${field.province ? `, ${field.province}` : ""}
                        </p>

                    </div>


                    <div
                        class="field-owner-field-status"
                    >

                        <span>
                            ${fieldStatus}
                        </span>

                    </div>


                    <div
                        class="field-owner-field-actions"
                    >

                        <a
                            href="edit-field.html?id=${encodeURIComponent(field.id)}"
                            class="field-owner-edit-button"
                        >
                            Editar cancha
                        </a>

                    </div>

                </article>
            `;

                                }).join("")}

                </div>

            </div>

        `;

    } else if (fieldsContainer) {

        fieldsContainer.innerHTML = "";

    }

    // FIELD OWNER EMPTY STATE

    if (emptyState) {
        emptyState.hidden =
            ownedFields &&
            ownedFields.length > 0;

        console.log("FIELD OWNER EMPTY DEBUG:", {
            ownedFieldsLength: ownedFields?.length,
            emptyStateHidden: emptyState?.hidden,
            display: emptyState
                ? window.getComputedStyle(emptyState).display
                : null,
            fieldCards: document.querySelectorAll("#field-owner-fields > *").length
        });
    }

    // RENDER SUBMISSIONS

    if (
        submissionsContainer &&
        submissions &&
        submissions.length > 0
    ) {

        submissionsContainer.innerHTML = `

            <div class="field-owner-subsection">

                <div class="field-owner-subsection-header">
                    <h3>Solicitudes</h3>
                </div>

                <div class="field-owner-submissions-list">

                    ${submissions.map(submission => {

                        const submissionStatus =
                            submission.status === "pending"
                                ? "Pendiente de aprobación"
                                : submission.status === "approved"
                                    ? "Aprobada"
                                    : submission.status === "rejected"
                                        ? "Rechazada"
                                        : submission.status;


                        return `
                            <article
                                class="field-owner-submission-card"
                            >

                                <div
                                    class="field-owner-submission-info"
                                >

                                    <h3>
                                        ${submission.name || "Cancha sin nombre"}
                                    </h3>

                                    <p>
                                        ${submission.address || "Dirección no especificada"}
                                    </p>

                                </div>


                                <div
                                    class="field-owner-submission-status"
                                >

                                    <span>
                                        ${submissionStatus}
                                    </span>

                                </div>

                            </article>
                        `;

                    }).join("")}

                </div>

            </div>

        `;

    } else if (submissionsContainer) {

        submissionsContainer.innerHTML = "";

    }


    if (
        requestsContainer &&
        fieldRequests &&
        fieldRequests.length > 0
    ) {

    requestsContainer.innerHTML = `

        <div class="field-owner-requests-list">

            ${fieldRequests.map(request => {

                const field =
                    (ownedFields || []).find(
                        field =>
                            field.id === request.field_id
                    );

                const fieldName =
                    field?.name ||
                    "Cancha";

                    const team =
                        (requestTeams || []).find(
                            team =>
                                team.id === request.team_id
                        );

                    const teamName =
                        team?.name ||
                        "Equipo";

                return `
                    <article
                        class="field-owner-request-card"
                    >

                        <div
                            class="field-owner-request-info"
                        >

                            <h3>
                                ${teamName}
                            </h3>

                            <p>
                                Cancha: ${fieldName}
                            </p>

                            <p>
                                Fecha:
                                ${request.requested_date}
                            </p>

                            <p>
                                Horario:
                                ${request.start_time.slice(0, 5)}
                                -
                                ${request.end_time.slice(0, 5)}
                            </p>

                            ${
                                request.message
                                    ? `
                                        <p>
                                            Mensaje:
                                            ${request.message}
                                        </p>
                                    `
                                    : ""
                            }

                        </div>

                        <div
                            class="field-owner-request-status"
                        >

                            <span>
                                Pendiente
                            </span>

                        </div>

                        <div class="field-request-actions">
                    <button
                        class="accept-field-request"
                        data-request-id="${request.id}">
                        Aceptar
                    </button>

                    <button
                        class="reject-field-request"
                        data-request-id="${request.id}">
                        Rechazar
                    </button>
                </div>

                    </article>
                `;

            }).join("")}

        </div>

    `;

        if (requestsEmptyState) {
            requestsEmptyState.style.display = "none";
        }

    } else {

        if (requestsContainer) {
            requestsContainer.innerHTML = "";
        }

        if (requestsEmptyState) {
            requestsEmptyState.style.display = "block";
        }

    }


    // RENDER CONFIRMED RESERVATIONS
    if (
        reservationsContainer &&
        confirmedReservations &&
        confirmedReservations.length > 0
    ) {
        renderConfirmedReservations(
            confirmedReservations,
            ownedFields,
            reservationsContainer,
            reservationsEmptyState
        );
        
    } else {
        if (reservationsContainer) {
            reservationsContainer.innerHTML = "";
        }

        if (reservationsEmptyState) {
            reservationsEmptyState.style.display = "block";
        }
    }


    // RENDER FIELD MAINTENANCE
    renderFieldMaintenance(
        fieldMaintenance,
        ownedFields
    );

}


document.addEventListener(
    "click",
    async (event) => {

        const editMaintenanceButton = event.target.closest(
    ".edit-field-maintenance"
);

if (editMaintenanceButton) {
    const maintenanceId =
        editMaintenanceButton.dataset.maintenanceId;

    const maintenance = fieldMaintenance.find(
        item => item.id === maintenanceId
    );

    if (!maintenance) {
        console.error(
            "FIELD MAINTENANCE NOT FOUND:",
            maintenanceId
        );
        return;
    }

    document.getElementById(
        "edit-maintenance-date"
    ).value = maintenance.maintenance_date;

    document.getElementById(
        "edit-maintenance-start"
    ).value =
        maintenance.start_time.slice(0, 5);

    document.getElementById(
        "edit-maintenance-end"
    ).value =
        maintenance.end_time.slice(0, 5);

    document.getElementById(
        "edit-maintenance-reason"
    ).value =
        maintenance.reason || "";

    const errorElement = document.getElementById(
        "edit-field-maintenance-error"
    );

    errorElement.hidden = true;
    errorElement.textContent = "";

    const modal = document.getElementById(
        "field-maintenance-edit-modal"
    );

    document.getElementById(
        "field-maintenance-edit-form"
    ).dataset.maintenanceId = maintenanceId;

    modal.hidden = false;

    return;
}

const closeMaintenanceModalButton = event.target.closest(
    "#close-field-maintenance-edit-modal"
);

const cancelMaintenanceEditButton = event.target.closest(
    "#cancel-field-maintenance-edit"
);

if (
    closeMaintenanceModalButton ||
    cancelMaintenanceEditButton
) {
    const modal = document.getElementById(
        "field-maintenance-edit-modal"
    );

    if (modal) {
        modal.hidden = true;
    }

    return;
}

        const deleteMaintenanceButton = event.target.closest(
    ".delete-field-maintenance"
);

if (deleteMaintenanceButton) {
    const maintenanceId =
        deleteMaintenanceButton.dataset.maintenanceId;

    const maintenance = fieldMaintenance.find(
        item => item.id === maintenanceId
    );

    if (!maintenance) {
        console.error(
            "FIELD MAINTENANCE NOT FOUND:",
            maintenanceId
        );
        return;
    }

    const confirmed = window.confirm(
        "¿Querés eliminar este bloqueo de mantenimiento?"
    );

    if (!confirmed) {
        return;
    }

    console.log(
        "DELETING FIELD MAINTENANCE:",
        maintenance
    );

    deleteMaintenanceButton.disabled = true;
    deleteMaintenanceButton.textContent =
        "Eliminando...";

    try {
        await deleteFieldMaintenance(
            maintenanceId
        );

        window.location.reload();

    } catch (error) {
        console.error(
            "DELETE FIELD MAINTENANCE ERROR:",
            error
        );

        deleteMaintenanceButton.disabled = false;
        deleteMaintenanceButton.textContent =
            "Eliminar";

        alert(
            "No se pudo eliminar el bloqueo. Intentá nuevamente."
        );
    }

    return;
}


        const cancelReservationButton = event.target.closest(
    ".cancel-field-reservation"
);

if (cancelReservationButton) {
    const reservationId =
        cancelReservationButton.dataset.reservationId;

    const reservation = confirmedReservations.find(
        item => item.id === reservationId
    );

    if (!reservation) {
        console.error(
            "CONFIRMED RESERVATION NOT FOUND:",
            reservationId
        );
        return;
    }

    const confirmed = window.confirm(
        "¿Querés cancelar esta reserva? El horario quedará disponible nuevamente."
    );

    if (!confirmed) {
        return;
    }

    console.log(
        "CANCELLING FIELD RESERVATION:",
        reservation
    );

    cancelReservationButton.disabled = true;
    cancelReservationButton.textContent = "Cancelando...";

    try {
        await cancelFieldReservation(reservationId);

        window.location.reload();

    } catch (error) {
        console.error(
            "CANCEL FIELD RESERVATION ERROR:",
            error
        );

        cancelReservationButton.disabled = false;
        cancelReservationButton.textContent =
            "Cancelar reserva";

        alert(
            "No se pudo cancelar la reserva. Intentá nuevamente."
        );
    }

    return;
}

        const acceptButton =
            event.target.closest(
                ".accept-field-request"
            );

        const rejectButton =
            event.target.closest(
                ".reject-field-request"
            );

            const editButton =
    event.target.closest(
        ".edit-field-reservation"
    );

    const closeEditButton = event.target.closest(
    "#close-field-reservation-edit"
);

const cancelEditButton = event.target.closest(
    "#cancel-field-reservation-edit"
);

if (closeEditButton || cancelEditButton) {
    closeFieldReservationEditModal();
    return;
}


         if (editButton) {
    const reservationId = editButton.dataset.reservationId;

    const reservation = confirmedReservations.find(
        item => item.id === reservationId
    );

    if (!reservation) {
        console.error(
            "CONFIRMED RESERVATION NOT FOUND:",
            reservationId
        );
        return;
    }

    console.log("EDITING FIELD RESERVATION:", reservation);

    const modal = document.getElementById(
        "field-reservation-edit-modal"
    );

    const reservationIdInput = document.getElementById(
        "edit-reservation-id"
    );

    const dateInput = document.getElementById(
        "edit-reservation-date"
    );

    const startInput = document.getElementById(
        "edit-reservation-start"
    );

    const endInput = document.getElementById(
        "edit-reservation-end"
    );

    const messageInput = document.getElementById(
        "edit-reservation-message"
    );

    reservationIdInput.value = reservation.id;
    dateInput.value = reservation.requested_date;
    startInput.value = reservation.start_time;
    endInput.value = reservation.end_time;
    messageInput.value = reservation.message || "";

    modal.hidden = false;

    return;
}

        if (acceptButton) {

            const requestId =
                acceptButton.dataset.requestId;

            await respondToFieldRequest(
                requestId,
                "accepted"
            );

            return;
        }

        if (rejectButton) {

            const requestId =
                rejectButton.dataset.requestId;

            await respondToFieldRequest(
                requestId,
                "rejected"
            );
        }
    }
);


function closeFieldReservationEditModal() {
    const modal = document.getElementById(
        "field-reservation-edit-modal"
    );

    if (!modal) {
        return;
    }

    modal.hidden = true;
}
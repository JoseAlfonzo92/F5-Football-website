import { getCurrentUser } from "../services/auth.js";
import { supabase } from "../services/supabase.js";

export async function initEditFieldPage() {

    const loading = document.querySelector("#edit-field-loading");
    const errorContainer = document.querySelector("#edit-field-error");
    const form = document.querySelector("#edit-field-form");

    // AUTHENTICATION
     const user = await getCurrentUser();

     if (!user) {

        window.location.href =
            "../pages/login.html";

        return;
    }

    console.log(
        "Edit field user:",
        user.id
    );


    // GET FIELD ID FROM URL
    const params = new URLSearchParams(window.location.search);
    const fieldId = params.get("id");

    console.log(
        "Edit field ID:",
        fieldId
    );

    if (!fieldId) {

        if (loading) {
            loading.style.display = "none";
        }

        if (errorContainer) {

            errorContainer.textContent =
                "No se especificó una cancha.";

            errorContainer.style.display =
                "block";
        }

        return;
    }
    
    // LOAD OWNED FIELD

    const {
        data: field,
        error
    } = await supabase
        .from("fields")
        .select(`
            id,
            name,
            description,
            location,
            province,
            city,
            zone,
            address,
            type,
            price_from,
            price_to,
            latitude,
            longitude,
            image_url,
            images,
            allowed_boots,
            features,
            sizes,
            surface,
            buffet,
            extra_info,
            barbecue_cook_type,
            grill_available,
            cook_service_available,
            grill_fee,
            cook_service_fee,
            barbecue_notes,
            phone,
            whatsapp,
            field_schedule (
            id,
            day_of_week,
            opens_at,
            closes_at
        )
    `)
        .eq(
            "id",
            fieldId
        )
        .eq(
            "owner_id",
            user.id
        )
        .maybeSingle();


    if (error) {

        console.error(
            "EDIT FIELD LOAD ERROR:",
            error
        );

        if (loading) {
            loading.style.display = "none";
        }

        if (errorContainer) {

            errorContainer.textContent =
                "No se pudo cargar la cancha.";

            errorContainer.style.display =
                "block";
        }

        return;
    }


    if (!field) {

        console.warn(
            "FIELD NOT FOUND OR NOT OWNED BY USER"
        );

        if (loading) {
            loading.style.display = "none";
        }

        if (errorContainer) {

            errorContainer.textContent =
                "No tenés permiso para editar esta cancha.";

            errorContainer.style.display =
                "block";
        }

        return;
    }


    console.log(
        "EDIT FIELD:",
        field
    );


    // POPULATE FORM
    const setValue = (
        selector,
        value
    ) => {

        const element =
            document.querySelector(
                selector
            );

        if (!element) {
            return;
        }

        element.value =
            value ?? "";
    };


    setValue("#edit-field-name", field.name);
    setValue("#edit-field-description", field.description);
    setValue("#edit-field-address", field.address);
    setValue("#edit-field-city", field.city);
    setValue("#edit-field-province", field.province);
    setValue("#edit-field-zone", field.zone);
    setValue("#edit-field-phone", field.phone);
    setValue("#edit-field-whatsapp", field.whatsapp);
    setValue("#edit-field-price-from", field.price_from);
    setValue("#edit-field-price-to", field.price_to);
    setValue("#edit-field-type", field.type);

    // Arrays are stored in Supabase.
    // For now, display as comma-separated values.
    setValue(
        "#edit-field-surface",
        Array.isArray(field.surface)
            ? field.surface.join(", ")
            : field.surface
    );

    setValue(
        "#edit-field-sizes",
        Array.isArray(field.sizes)
            ? field.sizes.join(", ")
            : field.sizes
    );

    setValue(
        "#edit-field-features",
        Array.isArray(field.features)
            ? field.features.join(", ")
            : field.features
    );

    setValue(
        "#edit-field-extra-info",
        Array.isArray(field.extra_info)
            ? field.extra_info.join(", ")
            : field.extra_info
    );

    setValue(
        "#edit-field-barbecue-cook-type",
        field.barbecue_cook_type || "none"
    );

    setValue(
        "#edit-field-grill-available",
        field.grill_available ? "true" : "false"
    );

    setValue(
        "#edit-field-cook-service-available",
        field.cook_service_available
            ? "true"
            : "false"
    );

    setValue(
        "#edit-field-grill-fee",
        field.grill_fee ?? ""
    );

    setValue(
        "#edit-field-cook-service-fee",
        field.cook_service_fee ?? ""
    );

    setValue(
        "#edit-field-barbecue-notes",
        Array.isArray(field.barbecue_notes)
            ? field.barbecue_notes.join(", ")
            : field.barbecue_notes ?? ""
    );

    // LOAD FIELD SCHEDULE

    const schedule =
        field.field_schedule || [];


    // Monday-Friday
    const weekdaySchedule =
        schedule.find(
            day => day.day_of_week >= 1 &&
                day.day_of_week <= 5
        );


    // Saturday-Sunday
    const weekendSchedule =
        schedule.find(
            day =>
                day.day_of_week === 0 ||
                day.day_of_week === 6
        );


    setValue(
        "#edit-field-week-open",
        weekdaySchedule?.opens_at?.slice(0, 5)
    );


    setValue(
        "#edit-field-week-close",
        weekdaySchedule?.closes_at?.slice(0, 5)
    );


    setValue(
        "#edit-field-weekend-open",
        weekendSchedule?.opens_at?.slice(0, 5)
    );


    setValue(
        "#edit-field-weekend-close",
        weekendSchedule?.closes_at?.slice(0, 5)
    );


    // SHOW FORM

    if (loading) {
        loading.style.display = "none";
    }

    if (form) {
        form.style.display = "block";
    }


    // SAVE CHANGES

    form.addEventListener("submit", async (event) => {

        event.preventDefault();

        const submitButton = form.querySelector('button[type="submit"]');

        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = "Guardando...";
        }

        const updatedField = {
            name: document.querySelector("#edit-field-name").value.trim(),
            description: document.querySelector("#edit-field-description").value.trim(),
            address: document.querySelector("#edit-field-address").value.trim(),
            city: document.querySelector("#edit-field-city").value.trim(),
            province: document.querySelector("#edit-field-province").value.trim(),
            zone: document.querySelector("#edit-field-zone").value.trim(),
            phone: document.querySelector("#edit-field-phone").value.trim(),
            whatsapp: document.querySelector("#edit-field-whatsapp").value.trim(),

            price_from:
                document.querySelector("#edit-field-price-from").value
                    ? Number(
                        document.querySelector("#edit-field-price-from").value
                    )
                    : null,

            price_to:
                document.querySelector("#edit-field-price-to").value
                    ? Number(
                        document.querySelector("#edit-field-price-to").value
                    )
                    : null,

            type:
                document.querySelector("#edit-field-type").value.trim(),

            surface:
                document.querySelector("#edit-field-surface").value
                    .split(",")
                    .map(value => value.trim())
                    .filter(Boolean),

            sizes:
                document.querySelector("#edit-field-sizes").value
                    .split(",")
                    .map(value => value.trim())
                    .filter(Boolean),

            features:
                document.querySelector("#edit-field-features").value
                    .split(",")
                    .map(value => value.trim())
                    .filter(Boolean),

            extra_info:
                document.querySelector("#edit-field-extra-info").value
                    .split(",")
                    .map(value => value.trim())
                    .filter(Boolean),

                    
             barbecue_cook_type:
                document.querySelector(
                    "#edit-field-barbecue-cook-type"
                ).value,

            grill_available:
                document.querySelector(
                    "#edit-field-grill-available"
                ).value === "true",

            cook_service_available:
                document.querySelector(
                    "#edit-field-cook-service-available"
                ).value === "true",

            grill_fee:
                document.querySelector(
                    "#edit-field-grill-fee"
                ).value
                    ? Number(
                        document.querySelector(
                            "#edit-field-grill-fee"
                        ).value
                    )
                    : 0,

            cook_service_fee:
                document.querySelector(
                    "#edit-field-cook-service-fee"
                ).value
                    ? Number(
                        document.querySelector(
                            "#edit-field-cook-service-fee"
                        ).value
                    )
                    : 0,

            barbecue_notes:
                document.querySelector(
                    "#edit-field-barbecue-notes"
                ).value
                    .split(",")
                    .map(value => value.trim())
                    .filter(Boolean),


        };


        console.log(
            "UPDATING FIELD:",
            updatedField
        );


        const {
            error: updateError
        } = await supabase
            .from("fields")
            .update(updatedField)
            .eq("id", fieldId)
            .eq("owner_id", user.id);


        if (updateError) {

            console.error(
                "EDIT FIELD UPDATE ERROR:",
                updateError
            );

            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = "Guardar cambios";
            }

            if (errorContainer) {

                errorContainer.textContent =
                    "No se pudieron guardar los cambios.";

                errorContainer.style.display =
                    "block";
            }

            return;
        }

        // SAVE FIELD SCHEDULE

        const weekOpen =
            document.querySelector("#edit-field-week-open").value;

        const weekClose =
            document.querySelector("#edit-field-week-close").value;

        const weekendOpen =
            document.querySelector("#edit-field-weekend-open").value;

        const weekendClose =
            document.querySelector("#edit-field-weekend-close").value;


        console.log("UPDATING FIELD SCHEDULE:", {
            weekOpen,
            weekClose,
            weekendOpen,
            weekendClose
        });


        // Remove existing schedule for this field

        const {
            error: deleteScheduleError
        } = await supabase
            .from("field_schedule")
            .delete()
            .eq("field_id", fieldId);


            if (deleteScheduleError) {

        console.error(
            "FIELD SCHEDULE DELETE ERROR:",
            deleteScheduleError
        );

        if (submitButton) {
            submitButton.disabled = false;
            submitButton.textContent = "Guardar cambios";
        }

        if (errorContainer) {

            errorContainer.textContent =
                "La cancha se actualizó, pero no se pudieron guardar los horarios.";

            errorContainer.style.display =
                "block";
        }

        return;
    }


        // Build new schedule rows

        const scheduleRows = [];


        // Monday-Friday
        if (weekOpen && weekClose) {

            for (let day = 1; day <= 5; day++) {

                scheduleRows.push({
                    field_id: fieldId,
                    day_of_week: day,
                    opens_at: weekOpen,
                    closes_at: weekClose
                });

            }

        }


        // Saturday-Sunday
        if (weekendOpen && weekendClose) {

            scheduleRows.push(
                {
                    field_id: fieldId,
                    day_of_week: 6,
                    opens_at: weekendOpen,
                    closes_at: weekendClose
                },
                {
                    field_id: fieldId,
                    day_of_week: 0,
                    opens_at: weekendOpen,
                    closes_at: weekendClose
                }
            );

        }


        // Insert new schedule

        if (scheduleRows.length) {

            const {
                error: insertScheduleError
            } = await supabase
                .from("field_schedule")
                .insert(scheduleRows);


            if (insertScheduleError) {

                console.error(
                    "FIELD SCHEDULE INSERT ERROR:",
                    insertScheduleError
                );

                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.textContent = "Guardar cambios";
                }

                if (errorContainer) {

                    errorContainer.textContent =
                        "La cancha se actualizó, pero no se pudieron guardar los horarios.";

                    errorContainer.style.display =
                        "block";
                }

                return;
            }

        }


        console.log(
            "FIELD UPDATED SUCCESSFULLY"
        );


        if (submitButton) {
            submitButton.disabled = false;
            submitButton.textContent = "Guardar cambios";
        }

        alert(
            "Los cambios se guardaron correctamente."
        );

    });

}
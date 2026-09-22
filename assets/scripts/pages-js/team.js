import { getCurrentUser } from "../services/auth.js";
import { supabase } from "../services/supabase.js";
import { getFields } from "../pages-js/fieldsRenderer.js";
import { icons } from "../utils/icons.js";

let fields = [];

/* ============================================
   HELPERS
   ============================================ */

function getElement(id) {

    return document.getElementById(id);

}

function showMessage(message, type = "") {

    const element = getElement("team-message");
    if (!element) return;
    element.textContent = message;
    element.className = `teams-message ${type}`.trim();
    element.hidden = false;

}

function hideMessage() {

    const element = getElement("team-message");
    if (!element) return;
    element.hidden = true;

}

/* ============================================
   LOAD TEAMS FOR CHALLENGES
   ============================================ */

async function getChallengeTeams(challenges) {

    const teamIds = [
        ...new Set(
            challenges.flatMap(challenge => [
                challenge.challenger_team_id,
                challenge.challenged_team_id
            ])
        )
    ];


    if (!teamIds.length) {
        return {};
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
            "Error loading challenge teams:",
            error
        );

        throw error;

    }


    return (data || []).reduce(
        (result, team) => {

            result[team.id] =
                team;

            return result;

        },
        {}
    );

}


/* ============================================
   GET USER'S CAPTAIN TEAMS
============================================ */

export async function getCaptainTeams(userId) {

    const {
        data,
        error
    } = await supabase
        .from("team_members")
        .select(`
            team_id,
            role,
            teams (
                id,
                name
            )
        `)
        .eq("user_id", userId)
        .eq("role", "captain");


    if (error) {

        console.error(
            "Error loading captain teams:",
            error
        );

        throw error;

    }


    return data || [];

}


/* ============================================
   RENDER CHALLENGER TEAMS
============================================ */

function renderChallengeTeams(
    captainTeams,
    currentTeamId
) {

    const select = getElement("challenge-team");

    if (!select) return;


    select.innerHTML = `
        <option value="">
            Seleccionar equipo
        </option>
    `;


    captainTeams
        .filter(
            item =>
                item.team_id !== currentTeamId
        )
        .forEach(item => {

            const option =
                document.createElement("option");


            option.value =
                item.team_id;


            option.textContent =
                item.teams?.name ||
                "Equipo";


            select.appendChild(option);

        });

}


/* ============================================
   GET TEAM ID
   ============================================ */

function getTeamIdFromUrl() {

    const params =
        new URLSearchParams(
            window.location.search
        );

    return params.get("id");

}


/* ============================================
   LOAD TEAM
   ============================================ */

async function getTeam(teamId) {

    const {
        data,
        error
    } = await supabase
        .from("teams")
        .select(`
            id,
            name,
            description,
            logo_url,
            zone,
            level,
            created_by,
            created_at
        `)
        .eq("id", teamId)
        .single();


    if (error) {

        console.error(
            "Error loading team:",
            error
        );

        throw error;

    }


    return data;

}


/* ============================================
   LOAD MEMBERS
   ============================================ */

async function getTeamMembers(teamId) {

    const {
        data,
        error
    } = await supabase
        .from("team_members")
        .select(`
            id,
            user_id,
            role,
            joined_at,
            profiles (
                id,
                username,
                display_name,
                avatar_url
            )
        `)
        .eq("team_id", teamId)
        .order("role", {
            ascending: true
        })
        .order("joined_at", {
            ascending: true
        });


    if (error) {

        console.error(
            "Error loading team members:",
            error
        );

        throw error;

    }


    return data || [];

}


/* ============================================
   LOAD AVAILABILITY
   ============================================ */

async function getTeamAvailability(teamId) {

    const {
        data,
        error
    } = await supabase
        .from("team_availability")
        .select(`
            id,
            team_id,
            available_date,
            start_time,
            end_time,
            field_id,
            status,
            created_at
        `)
        .eq("team_id", teamId)
        .order("available_date", {
            ascending: true
        })
        .order("start_time", {
            ascending: true
        });


    if (error) {

        console.error(
            "Error loading team availability:",
            error
        );

        throw error;

    }


    return data || [];

}


/* ============================================
   LOAD TEAM WEEKLY SCHEDULE
============================================ */
async function getTeamSchedule(teamId) {

    const {
        data,
        error
    } = await supabase
        .from("team_schedules")
        .select(`
            id,
            team_id,
            day_of_week,
            start_time,
            end_time,
            field_id,
            created_at
        `)
        .eq("team_id", teamId)
        .order("day_of_week", {
            ascending: true
        })
        .order("start_time", {
            ascending: true
        });

    if (error) {

        console.error(
            "Error loading team schedule:",
            error
        );

        throw error;

    }

    return data || [];

}


/* ============================================
   COMPARE TEAM WEEKLY SCHEDULES
============================================ */
function normalizeTime(time) {

    if (!time) {
        return "";
    }

    return time.slice(0, 5);

}

function getScheduleField(fieldId) {

    if (!fieldId) {
        return null;
    }

    return fields.find(
        field =>
            String(field.id) === String(fieldId)
    ) || null;

}

function getFieldName(fieldId) {

    const field =
        getScheduleField(fieldId);

    return field?.name ||
        "Cualquier cancha";

}


/*
 * Two schedule entries are field-compatible when:
 *
 * 1. Both use the same field
 * 2. One of them allows any field
 *
 * If both have different fixed fields,
 * the time still overlaps, but the field
 * will be reported separately.
 */

function getFieldCompatibility(
    firstFieldId,
    secondFieldId
) {

    if (!firstFieldId || !secondFieldId) {

        return {
            compatible: true,
            exact: false
        };

    }


    if (
        String(firstFieldId) ===
        String(secondFieldId)
    ) {

        return {
            compatible: true,
            exact: true
        };

    }


    return {
        compatible: false,
        exact: false
    };

}


/*
 * Find the overlapping portion between
 * two schedule ranges.
 *
 * Example:
 *
 * Team A: 18:00 → 22:00
 * Team B: 20:00 → 23:00
 *
 * Result:
 *
 * 20:00 → 22:00
 */

function getScheduleOverlap(
    first,
    second
) {

    if (
        Number(first.day_of_week) !==
        Number(second.day_of_week)
    ) {

        return null;

    }


    const firstStart =
        timeToMinutes(
            normalizeTime(first.start_time)
        );

    const firstEnd =
        timeToMinutes(
            normalizeTime(first.end_time)
        );


    const secondStart =
        timeToMinutes(
            normalizeTime(second.start_time)
        );

    const secondEnd =
        timeToMinutes(
            normalizeTime(second.end_time)
        );


    const overlapStart =
        Math.max(
            firstStart,
            secondStart
        );


    const overlapEnd =
        Math.min(
            firstEnd,
            secondEnd
        );


    /*
     * We only recommend complete
     * one-hour match windows.
     */

    if (
        overlapEnd -
        overlapStart < 60
    ) {

        return null;

    }


    /*
     * Calculate complete one-hour
     * slots inside the overlap.
     */

    const slots = [];


    for (
        let minutes = overlapStart;
        minutes + 60 <= overlapEnd;
        minutes += 60
    ) {

        slots.push({

            start:
                minutesToTime(minutes),

            end:
                minutesToTime(
                    minutes + 60
                )

        });

    }


    if (!slots.length) {
        return null;
    }


    const fieldCompatibility =
        getFieldCompatibility(
            first.field_id,
            second.field_id
        );


    return {

        dayOfWeek:
            Number(first.day_of_week),

        slots,

        fieldCompatible:
            fieldCompatibility.compatible,

        exactField:
            fieldCompatibility.exact,

        firstFieldId:
            first.field_id || null,

        secondFieldId:
            second.field_id || null

    };

}


 // Compare two complete weekly schedules.
 

function findScheduleMatches(
    firstSchedule,
    secondSchedule
) {

    const matches = [];


    firstSchedule.forEach(
        first => {

            secondSchedule.forEach(
                second => {

                    const overlap =
                        getScheduleOverlap(
                            first,
                            second
                        );


                    if (overlap) {

                        matches.push(
                            overlap
                        );

                    }

                }
            );

        }
    );


     // Merge identical day/time matches.
    const uniqueMatches = [];


    matches.forEach(match => {

        match.slots.forEach(slot => {

            const existing =
                uniqueMatches.find(
                    item =>
                        item.dayOfWeek ===
                            match.dayOfWeek &&
                        item.start ===
                            slot.start &&
                        item.end ===
                            slot.end
                );


            if (!existing) {

                uniqueMatches.push({

                    dayOfWeek:
                        match.dayOfWeek,

                    start:
                        slot.start,

                    end:
                        slot.end,

                    exactField:
                        match.exactField,

                    fieldCompatible:
                        match.fieldCompatible,

                    firstFieldId:
                        match.firstFieldId,

                    secondFieldId:
                        match.secondFieldId

                });

            } else {

                
                 //If another combination produces a better field match, preserve it.
                 

                if (
                    match.exactField &&
                    !existing.exactField
                ) {

                    existing.exactField =
                        true;

                    existing.fieldCompatible =
                        true;

                    existing.firstFieldId =
                        match.firstFieldId;

                    existing.secondFieldId =
                        match.secondFieldId;

                }

            }

        });

    });


    /*
     * Put exact field matches first,
     * then compatible matches,
     * then other time overlaps.
     */

    uniqueMatches.sort(
        (a, b) => {

            if (
                a.exactField !==
                b.exactField
            ) {

                return a.exactField
                    ? -1
                    : 1;

            }


            if (
                a.fieldCompatible !==
                b.fieldCompatible
            ) {

                return a.fieldCompatible
                    ? -1
                    : 1;

            }


            if (
                a.dayOfWeek !==
                b.dayOfWeek
            ) {

                return (
                    a.dayOfWeek -
                    b.dayOfWeek
                );

            }


            return a.start.localeCompare(
                b.start
            );

        }
    );


    return uniqueMatches;

}


/* ============================================
   SCHEDULE RECOMMENDATIONS
============================================ */
function getScheduleRecommendationContainer() {

    let container =
        getElement(
            "challenge-schedule-recommendations"
        );


    if (container) {
        return container;
    }


    const challengeForm =
        getElement(
            "team-challenge-form"
        );


    if (!challengeForm) {
        return null;
    }


    container =
        document.createElement("div");


    container.id =
        "challenge-schedule-recommendations";


    container.className =
        "challenge-schedule-recommendations";


    /*
     * Put recommendations before
     * the message textarea.
     */

    const message =
        getElement(
            "challenge-message"
        );


    if (
        message &&
        message.parentElement
    ) {

        message.parentElement.before(
            container
        );

    } else {

        challengeForm.prepend(
            container
        );

    }


    return container;

}


function renderScheduleRecommendations(
    matches
) {

    const container =
        getScheduleRecommendationContainer();


    if (!container) {
        return;
    }


    if (!matches.length) {

        container.innerHTML = `

            <div class="challenge-schedule-no-match">

                <strong>
                    No encontramos horarios coincidentes
                </strong>

                <p>
                    Los equipos no tienen un horario semanal
                    en común. Podés enviar igualmente una
                    propuesta.
                </p>

            </div>

        `;

        container.hidden = false;

        return;

    }


    /*
     * Show a maximum of six recommendations
     * so the challenge form stays compact.
     */

    const recommendations =
        matches.slice(0, 6);


    container.innerHTML = `

        <div class="challenge-schedule-match">

            <strong>
                Horarios recomendados
            </strong>

            <p>
                Estos horarios coinciden con la
                disponibilidad semanal de ambos equipos.
            </p>

            <div class="challenge-schedule-match-list">

                ${
                    recommendations
                        .map(match => {

                            let fieldText =
                                "";


                            if (
                                match.exactField
                            ) {

                                fieldText =
                                    `
                                        <span>
                                            ${getFieldName(
                                                match.firstFieldId
                                            )}
                                        </span>
                                    `;

                            } else if (
                                match.fieldCompatible
                            ) {

                                fieldText =
                                    `
                                        <span>
                                            Cancha a definir
                                        </span>
                                    `;

                            } else {

                                fieldText =
                                    `
                                        <span>
                                            Canchas diferentes
                                        </span>
                                    `;

                            }


                            return `

                                <button
                                    type="button"
                                    class="challenge-schedule-recommendation"
                                    data-day="${match.dayOfWeek}"
                                    data-start="${match.start}"
                                    data-end="${match.end}"
                                >

                                    <span class="challenge-schedule-recommendation-day">

                                        ${dayNames[match.dayOfWeek]}

                                    </span>


                                    <span class="challenge-schedule-recommendation-time">

                                        ${match.start}
                                        –
                                        ${match.end}

                                    </span>


                                    ${fieldText}

                                </button>

                            `;

                        })
                        .join("")
                }

            </div>

        </div>

    `;


    container.hidden = false;


    /*
     * Clicking a recommendation will
     * automatically prepare the challenge
     * message with the suggested time.
     */

    container
        .querySelectorAll(
            ".challenge-schedule-recommendation"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const day =
                        button.dataset.day;

                    const start =
                        button.dataset.start;

                    const end =
                        button.dataset.end;


                    const dayName =
                        dayNames[day];


                    const message =
                        getElement(
                            "challenge-message"
                        );


                    if (message) {

                        const current =
                            message.value.trim();


                        const recommendation =
                            `Propongo jugar el ${dayName} de ${start} a ${end}.`;


                        if (!current) {

                            message.value =
                                recommendation;

                        } else if (
                            !current.includes(
                                recommendation
                            )
                        ) {

                            message.value =
                                `${current}\n\n${recommendation}`;

                        }

                    }


                    
                     // Visual selection.
                    

                    container
                        .querySelectorAll(
                            ".challenge-schedule-recommendation"
                        )
                        .forEach(
                            item =>
                                item.classList.remove(
                                    "selected"
                                )
                        );


                    button.classList.add(
                        "selected"
                    );

                }
            );

        });

}


/* ============================================
   DAY NAMES
============================================ */

const dayNames = {

    0: "Domingo",

    1: "Lunes",

    2: "Martes",

    3: "Miércoles",

    4: "Jueves",

    5: "Viernes",

    6: "Sábado"

};


/* ============================================
   TIME HELPERS
============================================ */

function timeToMinutes(time) {

    const [
        hours,
        minutes
    ] = time.split(":").map(Number);


    return (
        hours * 60 +
        minutes
    );

}


function minutesToTime(minutes) {

    const hours =
        Math.floor(
            minutes / 60
        );

    const remainingMinutes =
        minutes % 60;


    return `${String(hours).padStart(2, "0")}:${String(remainingMinutes).padStart(2, "0")}`;

}

/* ============================================
   SHOW SCHEDULE CREATOR
============================================ */

function showScheduleCreator(show) {

    const form =
        getElement(
            "team-schedule-create"
        );

    const button =
        getElement(
            "add-schedule-button"
        );


    if (form) {
        form.hidden = !show;
    }


    if (button) {
        button.hidden = show;
    }

}



/* ============================================
   CREATE WEEKLY SCHEDULE
============================================ */

async function handleScheduleSubmit(
    event,
    teamId
) {

    event.preventDefault();

    hideMessage();


    const dayOfWeek =
        getElement(
            "schedule-day"
        )?.value;


    const startTime =
        getElement(
            "schedule-start"
        )?.value;


    const endTime =
        getElement(
            "schedule-end"
        )?.value;


    const fieldId =
        getElement(
            "schedule-field"
        )?.value;


    const submitButton =
        getElement(
            "schedule-submit"
        );


    if (
        dayOfWeek === "" ||
        !startTime ||
        !endTime
    ) {

        showMessage(
            "Completá el día y el horario.",
            "error"
        );

        return;

    }


    if (startTime >= endTime) {

        showMessage(
            "La hora de finalización debe ser posterior a la hora de inicio.",
            "error"
        );

        return;

    }


    /*
     * A match lasts one hour.
     * Therefore the schedule must contain
     * at least one complete one-hour slot.
     */

    const duration =
        timeToMinutes(endTime) -
        timeToMinutes(startTime);


    if (duration < 60) {

        showMessage(
            "El horario debe permitir al menos un partido de una hora.",
            "error"
        );

        return;

    }


    /*
     * Only complete one-hour blocks are useful.
     *
     * Example:
     *
     * 18:00 → 20:00 = valid
     * 18:00 → 19:00 = valid
     * 18:00 → 19:30 = rejected
     */

    if (duration % 60 !== 0) {

        showMessage(
            "Los horarios deben estar divididos en bloques de una hora.",
            "error"
        );

        return;

    }


    try {

        if (submitButton) {

            submitButton.disabled = true;

            submitButton.textContent =
                "Guardando...";

        }


        const {
            error
        } = await supabase
            .from("team_schedules")
            .insert({

                team_id:
                    teamId,

                day_of_week:
                    Number(dayOfWeek),

                start_time:
                    startTime,

                end_time:
                    endTime,

                field_id:
                    fieldId || null

            });


        if (error) {
            throw error;
        }


        const form =
            getElement(
                "team-schedule-form"
            );


        if (form) {
            form.reset();
        }


        showScheduleCreator(false);


        const schedule =
            await getTeamSchedule(
                teamId
            );


        renderTeamSchedule(
            schedule
        );


        showMessage(
            "El horario fue agregado correctamente.",
            "success"
        );


    } catch (error) {

        console.error(
            "Schedule error:",
            error
        );


        showMessage(
            error.message ||
            "No pudimos guardar el horario.",
            "error"
        );


    } finally {

        if (submitButton) {

            submitButton.disabled = false;

            submitButton.textContent =
                "Agregar horario";

        }

    }

}


/* ============================================
   RENDER TEAM WEEKLY SCHEDULE
============================================ */

function renderTeamSchedule(schedule) {

    const loading =
        getElement(
            "team-schedule-loading"
        );

    const empty =
        getElement(
            "team-schedule-empty"
        );

    const list =
        getElement(
            "team-schedule-list"
        );


    if (loading) {
        loading.hidden = true;
    }


    if (!list || !empty) {
        return;
    }


    if (!schedule.length) {

        list.hidden = true;
        empty.hidden = false;

        return;

    }


    empty.hidden = true;
    list.hidden = false;


    const dayNames = {

        0: "Domingo",

        1: "Lunes",

        2: "Martes",

        3: "Miércoles",

        4: "Jueves",

        5: "Viernes",

        6: "Sábado"

    };


    /*
     * Each schedule range is divided into
     * one-hour match slots.
     */

    list.innerHTML =
        schedule
            .map(item => {

                const start =
                    item.start_time.slice(0, 5);

                const end =
                    item.end_time.slice(0, 5);


                const field =
                    item.field_id
                        ? fields.find(
                            field =>
                                field.id === item.field_id
                        )
                        : null;


                const fieldName =
                    field?.name ||
                    "Cualquier cancha";


                const startMinutes =
                    timeToMinutes(start);

                const endMinutes =
                    timeToMinutes(end);


                const slots = [];


                for (
                    let minutes = startMinutes;
                    minutes + 60 <= endMinutes;
                    minutes += 60
                ) {

                    const slotStart =
                        minutesToTime(minutes);

                    const slotEnd =
                        minutesToTime(
                            minutes + 60
                        );


                    slots.push(`
                        <div class="team-schedule-slot">

                            <span class="team-schedule-time">
                                ${slotStart} – ${slotEnd}
                            </span>

                        </div>
                    `);

                }


                /*
                 * If the range is shorter than one hour,
                 * still display the original range.
                 */

                if (!slots.length) {

                    slots.push(`
                        <div class="team-schedule-slot">

                            <span class="team-schedule-time">
                                ${start} – ${end}
                            </span>

                        </div>
                    `);

                }


                return `

                    <div
                        class="team-schedule-day"
                        data-day="${item.day_of_week}"
                    >

                        <div class="team-schedule-day-header">

                            <strong>
                                ${dayNames[item.day_of_week]}
                            </strong>

                            <span>
                                ${fieldName}
                            </span>

                        </div>


                        <div class="team-schedule-slots">

                            ${slots.join("")}

                        </div>

                    </div>

                `;

            })
            .join("");

}

/* ============================================
   LOAD TEAM CHALLENGES
   ============================================ */

async function getTeamChallenges(teamId) {

    const {
        data,
        error
    } = await supabase
        .from("team_challenges")
        .select(`
    id,
    challenger_team_id,
    challenged_team_id,
    availability_id,
    status,
    message,
    created_at,
    responded_at,
    proposed_day_of_week,
    proposed_start_time,
    proposed_end_time,
    proposed_field_id
`)
        .or(
            `challenger_team_id.eq.${teamId},challenged_team_id.eq.${teamId}`
        )
        .order("created_at", {
            ascending: false
        });


    if (error) {

        console.error(
            "Error loading team challenges:",
            error
        );

        throw error;

    }


    return data || [];

}


/* ============================================
   LOAD TEAM MATCHES
============================================ */

async function getTeamMatches(teamId) {

    const {
        data,
        error
    } = await supabase
        .from("team_matches")
        .select(`
            id,
            challenge_id,
            home_team_id,
            away_team_id,
            match_day_of_week,
            scheduled_date,
            start_time,
            end_time,
            field_id,
            status,
            home_score,
            away_score,
            created_at,
            completed_at
        `)
        .or(
            `home_team_id.eq.${teamId},away_team_id.eq.${teamId}`
        )
        .order("created_at", {
            ascending: false
        });

        console.log("TEAM MATCHES QUERY:", {
    teamId,
    data,
    error
});

    if (error) {

        console.error(
            "Error loading team matches:",
            error
        );

        throw error;

    }

    return data || [];

}

 /* ============================================
    RECORD TEAM MATCH RESULT
 ============================================ */

 async function recordTeamMatchResult(
     matchId,
     teamId,
     homeScore,
     awayScore
 ) {

     if (!matchId || !teamId) {

         console.error(
             "Match ID and team ID are required."
         );

         return;

     }

     try {

         /* ----------------------------------------
            GET CURRENT USER
         ---------------------------------------- */

         const {
             data: {
                 user
             }
         } = await supabase.auth.getUser();


         if (!user) {

             console.error(
                 "User must be logged in to record a match result."
             );

             return;

         }


         /* ----------------------------------------
            CHECK CAPTAIN
         ---------------------------------------- */

         const captain =
             await isCaptain(
                 teamId,
                 user.id
             );


         if (!captain) {

             console.error(
                 "Only team captains can record match results."
             );

             return;

         }


         /* ----------------------------------------
            VALIDATE SCORES
         ---------------------------------------- */

         const home =
             Number(homeScore);

         const away =
             Number(awayScore);


         if (
             !Number.isInteger(home) ||
             !Number.isInteger(away) ||
             home < 0 ||
             away < 0
         ) {

             console.error(
                 "Match scores must be non-negative integers."
             );

             return;

         }


         /* ----------------------------------------
            UPDATE MATCH
         ---------------------------------------- */

         const {
             error
         } = await supabase
             .from("team_matches")
             .update({

                 home_score: home,
                 away_score: away,
                 status: "played",
                 completed_at:
                     new Date().toISOString()

             })
             .eq(
                 "id",
                 matchId
             )
             .eq(
                 "status",
                 "scheduled"
             );


         if (error) {

             console.error(
                 "Error recording team match result:",
                 error
             );

             throw error;

         }


         console.log(
             "Team match result recorded:",
             {
                 matchId,
                 homeScore: home,
                 awayScore: away
             }
         );


     } catch (error) {

         console.error(
             "Error recording team match result:",
             error
         );

     }

 }


/* ============================================
   CANCEL TEAM MATCH
   ============================================ */

async function cancelTeamMatch(
    matchId,
    teamId
) {

    if (!matchId || !teamId) {
        return;
    }

    try {

        const {
            data: {
                user
            }
        } = await supabase.auth.getUser();


        if (!user) {
            console.error(
                "User must be logged in to cancel a match."
            );

            return;
        }


        const captain =
            await isCaptain(
                teamId,
                user.id
            );


        if (!captain) {
            console.error(
                "Only team captains can cancel matches."
            );

            return;
        }


        const confirmed =
            window.confirm(
                "¿Querés cancelar este partido?"
            );


        if (!confirmed) {
            return;
        }


        const {
            error
        } = await supabase
            .from("team_matches")
            .update({
                status: "cancelled"
            })
            .eq("id", matchId)
            .eq("status", "scheduled");


        if (error) {

            console.error(
                "Error cancelling team match:",
                error
            );

            throw error;
        }


        console.log(
            "Team match cancelled:",
            matchId
        );

    } catch (error) {

        console.error(
            "Error cancelling team match:",
            error
        );

    }

}


/* ============================================
   LOAD MATCH TEAMS
============================================ */

async function getMatchTeams(matches) {

    const teamIds = [
        ...new Set(
            matches.flatMap(match => [
                match.home_team_id,
                match.away_team_id
            ])
        )
    ];

    if (!teamIds.length) {
        return {};
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
            "Error loading match teams:",
            error
        );

        throw error;

    }

    return (data || []).reduce(
        (result, team) => {

            result[team.id] = team;

            return result;

        },
        {}
    );

}


/* ============================================
   RENDER TEAM MATCHES
============================================ */

function renderMatches(
    matches,
    teamId,
    teamsById = {},
    isCaptain = false
) {

     console.log("RENDER MATCHES:", {
        teamId,
        matches,
        teamsById
    });

    const loading =
        getElement(
            "team-matches-loading"
        );

    const empty =
        getElement(
            "team-matches-empty"
        );

    const list =
        getElement(
            "team-matches-list"
        );

    /* ----------------------------------------
       HIDE LOADING
    ---------------------------------------- */

    if (loading) {
        loading.hidden = true;
    }

    /* ----------------------------------------
       CHECK ELEMENTS
    ---------------------------------------- */

    if (!list || !empty) {
        return;
    }

    /* ----------------------------------------
       EMPTY STATE
    ---------------------------------------- */

    if (!matches.length) {

        list.hidden = true;
        empty.hidden = false;

        return;

    }

    empty.hidden = true;
    list.hidden = false;

    /* ----------------------------------------
       STATUS LABELS
    ---------------------------------------- */

    const statusLabels = {

        scheduled:
            "Programado",

        played:
            "Jugado",

        cancelled:
            "Cancelado"

    };

    const statusIcons = {

        scheduled:
            "🟡",

        played:
            "🟢",

        cancelled:
            "⚪"

    };

    /* ----------------------------------------
       BUILD MATCH CARDS
    ---------------------------------------- */

    list.innerHTML =
        matches
            .map(match => {

                const homeTeam =
                    teamsById[
                        match.home_team_id
                    ];

                const awayTeam =
                    teamsById[
                        match.away_team_id
                    ];

                const homeTeamName =
                    homeTeam?.name ||
                    "Equipo";

                const awayTeamName =
                    awayTeam?.name ||
                    "Equipo";

                /* --------------------------------
                   DAY
                -------------------------------- */

                const dayName =
                    dayNames[
                        Number(
                            match.match_day_of_week
                        )
                    ] ||
                    "Día a definir";

                /* --------------------------------
                   TIME
                -------------------------------- */

                const startTime =
                    match.start_time
                        ? String(
                            match.start_time
                        ).slice(0, 5)
                        : "";

                const endTime =
                    match.end_time
                        ? String(
                            match.end_time
                        ).slice(0, 5)
                        : "";

                const timeDisplay =
                    startTime &&
                    endTime
                        ? `${startTime}–${endTime}`
                        : "Horario a definir";

                /* --------------------------------
                   FIELD
                -------------------------------- */

                const field =
                    match.field_id
                        ? fields.find(
                            field =>
                                String(
                                    field.id
                                ) ===
                                String(
                                    match.field_id
                                )
                        )
                        : null;

                const fieldName =
                    field?.name ||
                    "Cancha a definir";

                /* --------------------------------
                   STATUS
                -------------------------------- */

                const status =
                    statusLabels[
                        match.status
                    ] ||
                    match.status ||
                    "Desconocido";

                const statusIcon =
                    statusIcons[
                        match.status
                    ] ||
                    "⚪";

                /* --------------------------------
                   SCORE
                -------------------------------- */

                let scoreDisplay = "";

                if (
                    match.home_score !== null &&
                    match.away_score !== null
                ) {

                    scoreDisplay = `
                        <div class="team-match-score">
                            <strong>
                                ${match.home_score}
                            </strong>
                            <span>–</span>
                            <strong>
                                ${match.away_score}
                            </strong>
                        </div>
                    `;

                }


               let matchActions = "";

if (
    isCaptain &&
    match.status === "scheduled"
) {

    matchActions = `
        <div class="team-match-actions">

            <button
                type="button"
                class="team-match-result-button"
                data-match-id="${match.id}"
            >
                Registrar resultado
            </button>

            <button
                type="button"
                class="team-match-cancel-button"
                data-match-id="${match.id}"
            >
                Cancelar partido
            </button>

        </div>
    `;

}


                /* --------------------------------
                   CARD
                -------------------------------- */

                return `

                    <article
                        class="team-match-card"
                        data-match-id="${match.id}"
                        data-status="${match.status}"
                    >

                        <div
                            class="team-match-teams"
                        >

                            <div
                                class="team-match-team"
                            >

                                ${
                                    homeTeam?.logo_url
                                        ? `
                                            <img
                                                src="${homeTeam.logo_url}"
                                                alt="${homeTeamName}"
                                                loading="lazy"
                                            >
                                        `
                                        : `
                                            <span
                                                class="team-match-team-icon"
                                                data-icon="users"
                                            ></span>
                                        `
                                }

                                <strong>
                                    ${homeTeamName}
                                </strong>

                            </div>

                            ${scoreDisplay}

                            ${
                                !scoreDisplay
                                    ? `
                                        <span
                                            class="team-match-vs"
                                        >
                                            VS
                                        </span>
                                    `
                                    : ""
                            }

                            <div
                                class="team-match-team"
                            >

                                ${
                                    awayTeam?.logo_url
                                        ? `
                                            <img
                                                src="${awayTeam.logo_url}"
                                                alt="${awayTeamName}"
                                                loading="lazy"
                                            >
                                        `
                                        : `
                                            <span
                                                class="team-match-team-icon"
                                                data-icon="users"
                                            ></span>
                                        `
                                }

                                <strong>
                                    ${awayTeamName}
                                </strong>

                            </div>

                        </div>

                        <div
                            class="team-match-details"
                        >

                            <span
                                class="team-match-date"
                            >
                                ${icons.calendar} ${dayName} · ${timeDisplay}
                            </span>

                            <span
                                class="team-match-field"
                            >
                                ${icons.mapMarker} ${fieldName}
                            </span>

                        </div>

                        <div
                            class="team-match-status"
                            data-status="${match.status}"
                        >

                            <span
                                class="team-match-status-icon"
                                aria-hidden="true"
                            >
                                ${statusIcon}
                            </span>

                            <span>
                                ${status}
                            </span>

                            <span>
                            ${matchActions}
                            </span>

                        </div>

                    </article>

                `;

            })
            .join("");

}


/* ============================================
   REFRESH TEAM MATCHES
============================================ */

async function refreshTeamMatches(teamId) {

    try {

        const matches =
            await getTeamMatches(
                teamId
            );

        const matchTeams =
            await getMatchTeams(
                matches
            );

        const user =
            await getCurrentUser();

        let userIsCaptain = false;

        if (user) {

            userIsCaptain =
                await isCaptain(
                    teamId,
                    user.id
                );
        }

        renderMatches(
            matches,
            teamId,
            matchTeams,
            userIsCaptain
        );

    } catch (error) {

        console.error(
            "Error refreshing team matches:",
            error
        );

    }

}


/* ============================================
   RENDER TEAM
   ============================================ */

function renderTeam(team) {

    const detail =
        getElement("team-detail");

    if (detail) {
        detail.hidden = false;
    }


    const name =
        getElement("team-name");

    const description =
        getElement("team-description");

    const zone =
        getElement("team-zone");

    const level =
        getElement("team-level");

    const logo =
        getElement("team-logo");


    if (name) {
        name.textContent =
            team.name;
    }


    if (description) {

        description.textContent =
            team.description ||
            "Este equipo todavía no tiene una descripción.";

    }


    if (zone) {

        zone.textContent =
            team.zone ||
            "Zona no especificada";

    }


    const levelLabels = {

        beginner:
            "Principiante",

        intermediate:
            "Intermedio",

        advanced:
            "Avanzado",

        competitive:
            "Competitivo"

    };


    if (level) {

        level.textContent =
            levelLabels[team.level] ||
            "Sin nivel";

    }


    if (logo) {

        if (team.logo_url) {

            logo.innerHTML = `
                <img
                    src="${team.logo_url}"
                    alt="${team.name}"
                    loading="lazy"
                >
            `;

        } else {

            logo.innerHTML =
                `<span data-icon="users"></span>`;

        }

    }

}


/* ============================================
   RENDER MEMBERS
   ============================================ */

function renderMembers(members) {

    const loading =
        getElement("team-members-loading");

    const empty =
        getElement("team-members-empty");

    const list =
        getElement("team-members-list");

    const count =
        getElement("team-member-count");


    if (loading) {
        loading.hidden = true;
    }


    if (count) {

        count.textContent =
            members.length;

    }


    if (!list || !empty) {
        return;
    }


    if (!members.length) {

        list.hidden = true;
        empty.hidden = false;

        return;

    }


    empty.hidden = true;
    list.hidden = false;


    list.innerHTML =
        members
            .map(member => {

                const profile =
                    member.profiles;

                const displayName =
                    profile?.display_name ||
                    profile?.username ||
                    "Jugador";


                const username =
                    profile?.username
                        ? `@${profile.username}`
                        : "";


                const role =
                    member.role === "captain"
                        ? "Capitán"
                        : "Jugador";


                return `

                    <div
                        class="team-member-card"
                        data-user-id="${member.user_id}"
                    >

                        <div class="team-member-avatar">

                            ${
                                profile?.avatar_url

                                    ? `
                                        <img
                                            src="${profile.avatar_url}"
                                            alt="${displayName}"
                                            loading="lazy"
                                        >
                                      `

                                    : `
                                        <span data-icon="user"></span>
                                      `
                            }

                        </div>


                        <div class="team-member-info">

                            <strong>
                                ${displayName}
                            </strong>

                            ${
                                username
                                    ? `
                                        <span>
                                            ${username}
                                        </span>
                                      `
                                    : ""
                            }

                        </div>


                        <span class="team-member-role">
                            ${role}
                        </span>

                    </div>

                `;

            })
            .join("");

}


/* ============================================
   RENDER AVAILABILITY
   ============================================ */

function renderAvailability(availability) {

    const loading =
        getElement(
            "team-availability-loading"
        );

    const empty =
        getElement(
            "team-availability-empty"
        );

    const list =
        getElement(
            "team-availability-list"
        );


    if (loading) {
        loading.hidden = true;
    }


    if (!list || !empty) {
        return;
    }


    if (!availability.length) {

        list.hidden = true;
        empty.hidden = false;

        return;

    }


    empty.hidden = true;
    list.hidden = false;


    list.innerHTML =
        availability
            .map(item => {

                const date =
                    new Date(
                        `${item.available_date}T00:00:00`
                    );


                const formattedDate =
                    new Intl.DateTimeFormat(
                        "es-AR",
                        {
                            weekday: "long",
                            day: "numeric",
                            month: "long"
                        }
                    ).format(date);


                const field =
                    item.field_id
                        ? fields.find(
                            field =>
                                field.id === item.field_id
                        )
                        : null;


                const fieldName =
                    field?.name ||
                    "Cualquier cancha";


                return `

                    <div class="team-availability-card">

                        <div class="team-availability-date">

                            <strong>
                                ${formattedDate}
                            </strong>

                            <span>
                                ${item.start_time.slice(0, 5)}
                                –
                                ${item.end_time.slice(0, 5)}
                            </span>

                        </div>


                        <div class="team-availability-field">

                            ${fieldName}

                        </div>

                    </div>

                `;

            })
            .join("");

}


/* ============================================
   RENDER CHALLENGES
============================================ */

function renderChallenges(
    challenges,
    teamId,
    teamsById = {}
) {

    const loading =
        getElement(
            "team-challenges-loading"
        );

    const empty =
        getElement(
            "team-challenges-empty"
        );

    const list =
        getElement(
            "team-challenges-list"
        );


    /* ----------------------------------------
       HIDE LOADING
    ---------------------------------------- */

    if (loading) {
        loading.hidden = true;
    }


    /* ----------------------------------------
       CHECK ELEMENTS
    ---------------------------------------- */

    if (!list || !empty) {
        return;
    }


    /* ----------------------------------------
       EMPTY STATE
    ---------------------------------------- */

    if (!challenges.length) {

        list.hidden = true;
        empty.hidden = false;

        return;

    }


    empty.hidden = true;
    list.hidden = false;


    /* ----------------------------------------
       DAY LABELS
    ---------------------------------------- */

    const dayLabels = {

        0: "Domingo",
        1: "Lunes",
        2: "Martes",
        3: "Miércoles",
        4: "Jueves",
        5: "Viernes",
        6: "Sábado"

    };


    /* ----------------------------------------
       STATUS LABELS
    ---------------------------------------- */

    const statusLabels = {

        pending:
            "Pendiente",

        accepted:
            "Aceptado",

        rejected:
            "Rechazado",

        cancelled:
            "Cancelado",

        expired:
            "Expirado"

    };


    /* ----------------------------------------
       STATUS ICONS
    ---------------------------------------- */

    const statusIcons = {

        pending:
            "🟡",

        accepted:
            "🟢",

        rejected:
            "🔴",

        cancelled:
            "⚪",

        expired:
            "⚫"

    };


    /* ----------------------------------------
       FORMAT TIME
    ---------------------------------------- */

    function formatTime(time) {

        if (!time) {
            return "";
        }


        return String(time)
            .slice(0, 5);

    }


    /* ----------------------------------------
       BUILD CHALLENGE CARDS
    ---------------------------------------- */

    list.innerHTML =
        challenges
            .map(challenge => {

                /* --------------------------------
                   DETERMINE DIRECTION
                -------------------------------- */

                const isIncoming =
                    String(
                        challenge.challenged_team_id
                    ) ===
                    String(teamId);


                const otherTeamId =
                    isIncoming
                        ? challenge.challenger_team_id
                        : challenge.challenged_team_id;


                const otherTeam =
                    teamsById[
                        otherTeamId
                    ];


                const otherTeamName =
                    otherTeam?.name ||
                    "Equipo";


                const direction =
                    isIncoming
                        ? "Desafío recibido de"
                        : "Desafío enviado a";


                /* --------------------------------
                   DAY
                -------------------------------- */

                const dayName =
                    dayLabels[
                        Number(
                            challenge.proposed_day_of_week
                        )
                    ] ||
                    "Día a definir";


                /* --------------------------------
                   TIME
                -------------------------------- */

                const startTime =
                    formatTime(
                        challenge.proposed_start_time
                    );


                const endTime =
                    formatTime(
                        challenge.proposed_end_time
                    );


                const timeDisplay =
                    startTime &&
                    endTime
                        ? `${startTime}–${endTime}`
                        : "Horario a definir";


                /* --------------------------------
                   FIELD
                -------------------------------- */

                const field =
                    challenge.proposed_field_id
                        ? fields.find(
                            field =>
                                String(
                                    field.id
                                ) ===
                                String(
                                    challenge.proposed_field_id
                                )
                        )
                        : null;


                const fieldName =
                    field?.name ||
                    "Cancha a definir";


                /* --------------------------------
                   STATUS
                -------------------------------- */

                const status =
                    statusLabels[
                        challenge.status
                    ] ||
                    challenge.status ||
                    "Desconocido";


                const statusIcon =
                    statusIcons[
                        challenge.status
                    ] ||
                    "⚪";


                /* --------------------------------
                   ACTIONS
                -------------------------------- */

                let actions = "";


                if (
                    challenge.status ===
                    "pending"
                ) {

                    /* ----------------------------
                       INCOMING
                    ---------------------------- */

                    if (isIncoming) {

                        actions = `

                            <div
                                class="team-challenge-actions"
                            >

                                <button
                                    type="button"
                                    class="btn-primary challenge-accept"
                                    data-challenge-id="${challenge.id}"
                                >
                                    Aceptar
                                </button>


                                <button
                                    type="button"
                                    class="profile-action challenge-reject"
                                    data-challenge-id="${challenge.id}"
                                >
                                    Rechazar
                                </button>

                            </div>

                        `;

                    }


                    /* ----------------------------
                       OUTGOING
                    ---------------------------- */

                    else {

                        actions = `

                            <div
                                class="team-challenge-actions"
                            >

                                <button
                                    type="button"
                                    class="profile-action challenge-cancel"
                                    data-challenge-id="${challenge.id}"
                                >
                                    Cancelar desafío
                                </button>

                            </div>

                        `;

                    }

                }


                /* --------------------------------
                   CARD
                -------------------------------- */

                return `

                    <article
                        class="team-challenge-card"
                        data-challenge-id="${challenge.id}"
                        data-direction="${isIncoming ? "incoming" : "outgoing"}"
                        data-status="${challenge.status}"
                    >

                        <div
                            class="team-challenge-info"
                        >

                            <div
                                class="team-challenge-heading"
                            >

                                <span
                                    class="team-challenge-direction"
                                >
                                    ${icons.football} ${direction}
                                </span>


                                <strong
                                    class="team-challenge-team"
                                >
                                    ${otherTeamName}
                                </strong>

                            </div>


                            <div
                                class="team-challenge-match-details"
                            >

                                <span
                                    class="team-challenge-date"
                                >
                                    ${icons.calendar} ${dayName} · ${timeDisplay}
                                </span>


                                <span
                                    class="team-challenge-field"
                                >
                                    ${icons.mapMarker} ${fieldName}
                                </span>

                            </div>

                        </div>


                        <div
                            class="team-challenge-status"
                            data-status="${challenge.status}"
                        >

                            <span
                                class="team-challenge-status-icon"
                                aria-hidden="true"
                            >
                                ${statusIcon}
                            </span>

                            <span>
                                ${status}
                            </span>

                        </div>


                        ${actions}

                    </article>

                `;

            })
            .join("");


    /* ========================================
       ACCEPT
    ======================================== */

    list
        .querySelectorAll(
            ".challenge-accept"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                async () => {

                    button.disabled = true;

                    button.textContent =
                        "Aceptando...";


                    await handleChallengeResponse(
                        button.dataset.challengeId,
                        "accepted",
                        teamId
                    );

                }
            );

        });


    /* ========================================
       REJECT
    ======================================== */

    list
        .querySelectorAll(
            ".challenge-reject"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                async () => {

                    button.disabled = true;

                    button.textContent =
                        "Rechazando...";


                    await handleChallengeResponse(
                        button.dataset.challengeId,
                        "rejected",
                        teamId
                    );

                }
            );

        });


    /* ========================================
       CANCEL
    ======================================== */

    list
        .querySelectorAll(
            ".challenge-cancel"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                async () => {

                    const confirmed =
                        window.confirm(
                            "¿Querés cancelar este desafío?"
                        );


                    if (!confirmed) {
                        return;
                    }


                    button.disabled = true;

                    button.textContent =
                        "Cancelando...";


                    await handleChallengeResponse(
                        button.dataset.challengeId,
                        "cancelled",
                        teamId
                    );

                }
            );

        });

}




/* ============================================
   RESPOND TO CHALLENGE
============================================ */

/* ============================================
   RESPOND / CANCEL CHALLENGE
============================================ */

async function handleChallengeResponse(
    challengeId,
    newStatus,
    teamId
) {

    hideMessage();

    try {

        /* ----------------------------------------
           CURRENT USER
        ---------------------------------------- */

        const user =
            await getCurrentUser();


        if (!user) {

            showMessage(
                "Tu sesión expiró. Volvé a iniciar sesión.",
                "error"
            );

            return;

        }


        /* ----------------------------------------
           LOAD CHALLENGE
        ---------------------------------------- */

        const {
            data: challenge,
            error: challengeError
        } = await supabase
            .from("team_challenges")
            .select(`
                id,
                challenger_team_id,
                challenged_team_id,
                status,
                created_at
            `)
            .eq("id", challengeId)
            .single();


        if (challengeError) {
            throw challengeError;
        }


        if (!challenge) {

            throw new Error(
                "No encontramos este desafío."
            );

        }


        /* ----------------------------------------
           CANCEL VALIDATION
        ---------------------------------------- */

        if (
            newStatus === "cancelled" &&
            challenge.status !== "pending"
        ) {

            showMessage(
                "Este desafío ya no está pendiente.",
                "error"
            );

            return;

        }


        /* ----------------------------------------
           UPDATE CHALLENGE
        ---------------------------------------- */

        const updateData = {

            status:
                newStatus,

            responded_at:
                newStatus === "accepted" ||
                newStatus === "rejected"
                    ? new Date().toISOString()
                    : null

        };


        /*
         * Record who cancelled the challenge.
         */

        if (newStatus === "cancelled") {

            updateData.cancelled_by =
                user.id;

        }


        const {
            error: updateError
        } = await supabase
            .from("team_challenges")
            .update(updateData)
            .eq("id", challengeId);


        if (updateError) {
            throw updateError;
        }


        /* ----------------------------------------
           APPLY ANTI-SPAM COOLDOWN
        ---------------------------------------- */

        if (newStatus === "cancelled") {

            const createdAt =
                new Date(
                    challenge.created_at
                );


            const now =
                new Date();


            const elapsedMinutes =
                (
                    now.getTime() -
                    createdAt.getTime()
                ) /
                (1000 * 60);


            /*
             * If the user cancels within
             * 2 minutes, apply a 10-minute
             * cooldown.
             */

            if (elapsedMinutes <= 2) {

                const cooldownUntil =
                    new Date(
                        now.getTime() +
                        10 * 60 * 1000
                    );


                const {
                    error: cooldownError
                } = await supabase
                    .from(
                        "team_challenge_cooldowns"
                    )
                    .upsert({

                        user_id:
                            user.id,

                        cooldown_until:
                            cooldownUntil.toISOString(),

                        reason:
                            "Desafío cancelado demasiado rápido",

                        updated_at:
                            now.toISOString()

                    });


                if (cooldownError) {
                    throw cooldownError;
                }

            }

        }


        /* ----------------------------------------
           RELOAD CHALLENGES
        ---------------------------------------- */

        const challenges =
            await getTeamChallenges(
                teamId
            );


        const challengeTeams =
            await getChallengeTeams(
                challenges
            );


        renderChallenges(
            challenges,
            teamId,
            challengeTeams
        );


        /* ----------------------------------------
           SUCCESS MESSAGE
        ---------------------------------------- */

        const messages = {

            accepted:
                "Desafío aceptado correctamente.",

            rejected:
                "Desafío rechazado.",

            cancelled:
                "Desafío cancelado."

        };


        showMessage(
            messages[newStatus] ||
            "Desafío actualizado.",
            "success"
        );


    } catch (error) {

        console.error(
            "Challenge response error:",
            error
        );


        showMessage(
            error.message ||
            "No pudimos actualizar el desafío.",
            "error"
        );

    }

}




/* ============================================
   LOAD FIELD OPTIONS
============================================ */

function renderFieldOptions() {

    const availabilitySelect =
        getElement(
            "availability-field"
        );


    const scheduleSelect =
        getElement(
            "schedule-field"
        );


    const challengeFieldSelect =
        getElement(
            "challenge-field"
        );


    fields.forEach(field => {

        
         // TEAM AVAILABILITY
         

        if (availabilitySelect) {

            const option =
                document.createElement("option");


            option.value =
                field.id;


            option.textContent =
                field.name;


            availabilitySelect.appendChild(
                option
            );

        }


        
         // TEAM WEEKLY SCHEDULE
         

        if (scheduleSelect) {

            const option =
                document.createElement("option");


            option.value =
                field.id;


            option.textContent =
                field.name;


            scheduleSelect.appendChild(
                option
            );

        }


        
         // CHALLENGE PROPOSED FIELD
         

        if (challengeFieldSelect) {

            const option =
                document.createElement("option");


            option.value =
                field.id;


            option.textContent =
                field.name;


            challengeFieldSelect.appendChild(
                option
            );

        }

    });

}




/* ============================================
   CHECK CAPTAIN
   ============================================ */

async function isCaptain(
    teamId,
    userId
) {

    const {
        data,
        error
    } = await supabase
        .from("team_members")
        .select("role")
        .eq("team_id", teamId)
        .eq("user_id", userId)
        .maybeSingle();


    if (error) {

        console.error(
            "Error checking team role:",
            error
        );

        throw error;

    }


    return data?.role === "captain";

}


/* ============================================
   CREATE TEAM INVITATION
   ============================================ */

export async function createTeamInvitation(
    teamId,
    invitedUserId
) {

    const {
        data: {
            user
        },
        error: userError
    } = await supabase.auth.getUser();

    if (userError || !user) {

        throw new Error(
            "No hay una sesión activa."
        );

    }

    const {
        data,
        error
    } = await supabase
        .from("team_invitations")
        .insert({
            team_id: teamId,
            invited_user_id: invitedUserId,
            invited_by: user.id
        })
        .select()
        .single();

   if (error) {
    if (error.code === "23505") {
        const duplicateError =
            new Error(
                "Ya existe una invitación pendiente para este jugador."
            );

        duplicateError.code =
            "INVITATION_PENDING";

        throw duplicateError;
    }

    console.error(
        "Error creating team invitation:",
        error
    );

    throw error;
}

    return data;
}


/* ============================================
   TEAM INVITATIONS
============================================ */

export async function getPendingTeamInvitations(
    userId
) {

    const {
        data,
        error
    } = await supabase
        .from("team_invitations")
        .select(`
            id,
            team_id,
            invited_by,
            status,
            created_at,
            teams (
                id,
                name
            )
        `)
        .eq("invited_user_id", userId)
        .eq("status", "pending")
        .order("created_at", {
            ascending: false
        });

    if (error) {

        console.error(
            "Error loading team invitations:",
            error
        );

        throw error;
    }

    return data || [];
}


export async function acceptTeamInvitation(
    invitationId
) {

    const {
        error
    } = await supabase.rpc(
        "accept_team_invitation",
        {
            invitation_id:
                invitationId
        }
    );

    if (error) {

        console.error(
            "Error accepting team invitation:",
            error
        );

        throw error;
    }
}


export async function rejectTeamInvitation(
    invitationId
) {

    const {
        error
    } = await supabase.rpc(
        "reject_team_invitation",
        {
            invitation_id:
                invitationId
        }
    );

    if (error) {

        console.error(
            "Error rejecting team invitation:",
            error
        );

        throw error;
    }
}



/* ============================================
   SHOW AVAILABILITY CREATOR
   ============================================ */

function showAvailabilityCreator(show) {

    const form =
        getElement(
            "team-availability-create"
        );

    const button =
        getElement(
            "add-availability-button"
        );


    if (form) {
        form.hidden = !show;
    }


    if (button) {
        button.hidden = show;
    }

}

/* ============================================
   SHOW CHALLENGE CREATOR
============================================ */

function showChallengeCreator(show) {

    const form =
        getElement(
            "team-challenge-create"
        );

    if (form) {
        form.hidden = !show;
    }

}


/* ============================================
   POPULATE CHALLENGE AVAILABILITY
============================================ */

function renderChallengeAvailability(
    availability
) {

    const select =
        getElement(
            "challenge-availability"
        );


    if (!select) return;


    select.innerHTML = `
        <option value="">
            Seleccionar horario
        </option>
    `;


    availability.forEach(item => {

        const date =
            new Date(
                `${item.available_date}T00:00:00`
            );


        const formattedDate =
            new Intl.DateTimeFormat(
                "es-AR",
                {
                    weekday: "long",
                    day: "numeric",
                    month: "long"
                }
            ).format(date);


        const option =
            document.createElement("option");


        option.value =
            item.id;


        option.textContent =
            `${formattedDate} — ${item.start_time.slice(0, 5)} – ${item.end_time.slice(0, 5)}`;


        select.appendChild(option);

    });

}



/* ============================================
   REALTIME TEAM CHALLENGES
============================================ */

let teamChallengesChannel = null;
let teamMatchesChannel = null;


/* --------------------------------------------
   SUBSCRIBE TO CHALLENGE UPDATES
-------------------------------------------- */

function subscribeToTeamChallenges(teamId) {

    /* ----------------------------------------
       REMOVE PREVIOUS SUBSCRIPTION
    ---------------------------------------- */

    if (teamChallengesChannel) {

        supabase.removeChannel(
            teamChallengesChannel
        );

        teamChallengesChannel = null;

    }


    if (!teamId) {
        return;
    }


    /* ----------------------------------------
       CREATE CHANNEL
    ---------------------------------------- */

    teamChallengesChannel =
        supabase
            .channel(
                `team-challenges-${teamId}`
            )


            /* --------------------------------
               INSERTS
            -------------------------------- */

            .on(
                "postgres_changes",
                {
                    event: "INSERT",
                    schema: "public",
                    table: "team_challenges"
                },
                async payload => {

                    const challenge =
                        payload.new;


                    const belongsToTeam =
                        String(
                            challenge.challenger_team_id
                        ) ===
                        String(teamId) ||

                        String(
                            challenge.challenged_team_id
                        ) ===
                        String(teamId);


                    if (!belongsToTeam) {
                        return;
                    }


                    await refreshTeamChallenges(
                        teamId
                    );

                }
            )


            /* --------------------------------
               UPDATES
            -------------------------------- */

            .on(
                "postgres_changes",
                {
                    event: "UPDATE",
                    schema: "public",
                    table: "team_challenges"
                },
                async payload => {

                    const challenge =
                        payload.new;


                    const belongsToTeam =
                        String(
                            challenge.challenger_team_id
                        ) ===
                        String(teamId) ||

                        String(
                            challenge.challenged_team_id
                        ) ===
                        String(teamId);


                    if (!belongsToTeam) {
                        return;
                    }


                    console.log(
                        "Challenge updated in realtime:",
                        challenge
                    );


                    await refreshTeamChallenges(
                        teamId
                    );

                }
            )


            /* --------------------------------
               DELETE
            -------------------------------- */

            .on(
                "postgres_changes",
                {
                    event: "DELETE",
                    schema: "public",
                    table: "team_challenges"
                },
                async payload => {

                    const challenge =
                        payload.old;


                    const belongsToTeam =
                        String(
                            challenge.challenger_team_id
                        ) ===
                        String(teamId) ||

                        String(
                            challenge.challenged_team_id
                        ) ===
                        String(teamId);


                    if (!belongsToTeam) {
                        return;
                    }


                    await refreshTeamChallenges(
                        teamId
                    );

                }
            )


            /* --------------------------------
               SUBSCRIBE
            -------------------------------- */

            .subscribe(
                status => {

                    console.log(
                        "Team challenges realtime:",
                        status
                    );

                }
            );

}


/* ============================================
   REALTIME TEAM MATCHES
============================================ */

function subscribeToTeamMatches(teamId) {

    /* ----------------------------------------
       REMOVE PREVIOUS SUBSCRIPTION
    ---------------------------------------- */

    if (teamMatchesChannel) {

        supabase.removeChannel(
            teamMatchesChannel
        );

        teamMatchesChannel = null;

    }

    if (!teamId) {
        return;
    }

    /* ----------------------------------------
       CREATE CHANNEL
    ---------------------------------------- */

    teamMatchesChannel =
        supabase
            .channel(
                `team-matches-${teamId}`
            )

            /* --------------------------------
               INSERTS
            -------------------------------- */

            .on(
                "postgres_changes",
                {
                    event: "INSERT",
                    schema: "public",
                    table: "team_matches"
                },
                async payload => {

                    const match =
                        payload.new;

                    const belongsToTeam =
                        String(
                            match.home_team_id
                        ) ===
                        String(teamId) ||

                        String(
                            match.away_team_id
                        ) ===
                        String(teamId);

                    if (!belongsToTeam) {
                        return;
                    }

                    console.log(
                        "Match created in realtime:",
                        match
                    );

                    await refreshTeamMatches(
                        teamId
                    );

                }
            )

            /* --------------------------------
               UPDATES
            -------------------------------- */

            .on(
                "postgres_changes",
                {
                    event: "UPDATE",
                    schema: "public",
                    table: "team_matches"
                },
                async payload => {

                    const match =
                        payload.new;

                    const belongsToTeam =
                        String(
                            match.home_team_id
                        ) ===
                        String(teamId) ||

                        String(
                            match.away_team_id
                        ) ===
                        String(teamId);

                    if (!belongsToTeam) {
                        return;
                    }

                    console.log(
                        "Match updated in realtime:",
                        match
                    );

                    await refreshTeamMatches(
                        teamId
                    );

                }
            )

            /* --------------------------------
               DELETES
            -------------------------------- */

            .on(
                "postgres_changes",
                {
                    event: "DELETE",
                    schema: "public",
                    table: "team_matches"
                },
                async payload => {

                    const match =
                        payload.old;

                    const belongsToTeam =
                        String(
                            match.home_team_id
                        ) ===
                        String(teamId) ||

                        String(
                            match.away_team_id
                        ) ===
                        String(teamId);

                    if (!belongsToTeam) {
                        return;
                    }

                    await refreshTeamMatches(
                        teamId
                    );

                }
            )

            /* --------------------------------
               SUBSCRIBE
            -------------------------------- */

            .subscribe(
                status => {

                    console.log(
                        "Team matches realtime:",
                        status
                    );

                }
            );

}

/* ============================================
   REFRESH TEAM CHALLENGES
============================================ */

async function refreshTeamChallenges(teamId) {

    try {

        const challenges =
            await getTeamChallenges(
                teamId
            );


        const challengeTeams =
            await getChallengeTeams(
                challenges
            );


        renderChallenges(
            challenges,
            teamId,
            challengeTeams
        );


    } catch (error) {

        console.error(
            "Error refreshing team challenges:",
            error
        );

    }

}


/* ============================================
   CREATE CHALLENGE
============================================ */

async function handleChallengeSubmit(
    event,
    challengedTeamId,
    challengerTeamId
) {

    event.preventDefault();

    hideMessage();

/* ----------------------------------------
   CHECK CHALLENGE COOLDOWN
---------------------------------------- */

const user =
    await getCurrentUser();


if (!user) {

    showMessage(
        "Tu sesión expiró. Volvé a iniciar sesión.",
        "error"
    );

    return;

}


const {
    data: cooldown,
    error: cooldownError
} = await supabase
    .from(
        "team_challenge_cooldowns"
    )
    .select(
        "cooldown_until"
    )
    .eq(
        "user_id",
        user.id
    )
    .maybeSingle();


if (cooldownError) {
    throw cooldownError;
}


if (cooldown?.cooldown_until) {

    const cooldownUntil =
        new Date(
            cooldown.cooldown_until
        );


    const now =
        new Date();


    if (cooldownUntil > now) {

        const remainingMinutes =
            Math.ceil(
                (
                    cooldownUntil.getTime() -
                    now.getTime()
                ) /
                (1000 * 60)
            );


        showMessage(
            `Esperá ${remainingMinutes} minuto${remainingMinutes === 1 ? "" : "s"} antes de enviar otro desafío.`,
            "error"
        );

        return;

    }

}



    /* ----------------------------------------
       GET PROPOSED MATCH DETAILS
    ---------------------------------------- */

    const proposedDayOfWeek =
        getElement(
            "challenge-day"
        )?.value;


    const proposedStartTime =
        getElement(
            "challenge-start"
        )?.value;


    const proposedEndTime =
        getElement(
            "challenge-end"
        )?.value;


    const proposedFieldId =
        getElement(
            "challenge-field"
        )?.value;


    const message =
        getElement(
            "challenge-message"
        )?.value.trim();


    const submitButton =
        getElement(
            "challenge-submit"
        );


    /* ----------------------------------------
       VALIDATION
    ---------------------------------------- */

    if (
        proposedDayOfWeek === "" ||
        !proposedDayOfWeek ||
        !proposedStartTime ||
        !proposedEndTime
    ) {

        showMessage(
            "Seleccioná el día y el horario del partido.",
            "error"
        );

        return;

    }


    if (
        proposedStartTime >=
        proposedEndTime
    ) {

        showMessage(
            "La hora de finalización debe ser posterior a la hora de inicio.",
            "error"
        );

        return;

    }


    /* ----------------------------------------
       SEND CHALLENGE
    ---------------------------------------- */

    try {

        if (submitButton) {

            submitButton.disabled = true;

            submitButton.textContent =
                "Enviando...";

        }


        const {
            error
        } = await supabase
            .from("team_challenges")
            .insert({

                challenger_team_id:
                    challengerTeamId,

                challenged_team_id:
                    challengedTeamId,

                /*
                 * availability_id is no longer
                 * required because the challenge
                 * now stores its own proposed
                 * day, time and field.
                 */

                availability_id:
                    null,

                status:
                    "pending",

                message:
                    message || null,

                proposed_day_of_week:
                    Number(
                        proposedDayOfWeek
                    ),

                proposed_start_time:
                    proposedStartTime,

                proposed_end_time:
                    proposedEndTime,

                proposed_field_id:
    proposedFieldId ||
    null

            });


        if (error) {
            throw error;
        }


        /* ----------------------------------------
           RESET FORM
        ---------------------------------------- */

        const form =
            getElement(
                "team-challenge-form"
            );


        if (form) {
            form.reset();
        }


        showChallengeCreator(false);


  /* ----------------------------------------
   RELOAD CHALLENGES
---------------------------------------- */

await refreshTeamChallenges(
    challengerTeamId
);


        /* ----------------------------------------
           SUCCESS
        ---------------------------------------- */

        showMessage(
            "El desafío fue enviado correctamente.",
            "success"
        );


    } catch (error) {

        console.error(
            "Challenge error:",
            error
        );


        if (
            error.code === "23505"
        ) {

            showMessage(
                "Ya existe un desafío entre estos equipos para este horario.",
                "error"
            );

        } else {

            showMessage(
                error.message ||
                "No pudimos enviar el desafío.",
                "error"
            );

        }


    } finally {

        if (submitButton) {

            submitButton.disabled = false;

            submitButton.textContent =
                "Enviar desafío";

        }

    }

}




/* ============================================
   CREATE AVAILABILITY
   ============================================ */

async function handleAvailabilitySubmit(
    event,
    teamId
) {

    event.preventDefault();

    hideMessage();


    const date =
        getElement(
            "availability-date"
        )?.value;

    const startTime =
        getElement(
            "availability-start"
        )?.value;

    const endTime =
        getElement(
            "availability-end"
        )?.value;

    const fieldId =
        getElement(
            "availability-field"
        )?.value;

    const submitButton =
        getElement(
            "availability-submit"
        );


    if (!date || !startTime || !endTime) {

        showMessage(
            "Completá la fecha y el horario.",
            "error"
        );

        return;

    }


    if (startTime >= endTime) {

        showMessage(
            "La hora de finalización debe ser posterior a la hora de inicio.",
            "error"
        );

        return;

    }


    try {

        if (submitButton) {

            submitButton.disabled = true;

            submitButton.textContent =
                "Guardando...";

        }


        const {
            error
        } = await supabase
            .from("team_availability")
            .insert({

                team_id:
                    teamId,

                available_date:
                    date,

                start_time:
                    startTime,

                end_time:
                    endTime,

                field_id:
                    fieldId || null,

                status:
                    "available"

            });


        if (error) {
            throw error;
        }


        const form =
            getElement(
                "team-availability-form"
            );


        if (form) {
            form.reset();
        }


        showAvailabilityCreator(false);


        const availability =
            await getTeamAvailability(
                teamId
            );


        renderAvailability(
            availability
        );


        showMessage(
            "La disponibilidad fue agregada correctamente.",
            "success"
        );


    } catch (error) {

        console.error(
            "Availability error:",
            error
        );


        showMessage(
            error.message ||
            "No pudimos guardar la disponibilidad.",
            "error"
        );


    } finally {

        if (submitButton) {

            submitButton.disabled = false;

            submitButton.textContent =
                "Agregar disponibilidad";

        }

    }

}


/* ============================================
   INITIALIZE
   ============================================ */

export async function initTeamPage() {

    const loading =
        getElement("team-loading");


    try {

        const teamId =
            getTeamIdFromUrl();


        if (!teamId) {

            throw new Error(
                "No se encontró el equipo."
            );

        }


        const user =
            await getCurrentUser();

                    let userIsCaptain = false;

        if (user) {

            userIsCaptain =
                await isCaptain(
                    teamId,
                    user.id
                );

        }


        if (!user) {

            window.location.href =
                "login.html";

            return;

        }

        fields = await getFields();

        /* ----------------------------------------
           LOAD TEAM
        ---------------------------------------- */

        const team =
            await getTeam(teamId);


        renderTeam(team);


        /* ----------------------------------------
           LOAD MEMBERS
        ---------------------------------------- */

        const members =
            await getTeamMembers(
                teamId
            );


        renderMembers(
            members
        );


        /* ----------------------------------------
           LOAD AVAILABILITY
        ---------------------------------------- */

        const availability =
            await getTeamAvailability(
                teamId
            );


        renderAvailability(
            availability
        );

                /* ----------------------------------------
        LOAD WEEKLY SCHEDULE
        ---------------------------------------- */

        const schedule =
            await getTeamSchedule(
                teamId
            );


        renderTeamSchedule(
            schedule
        );


                /* ----------------------------------------
           LOAD CHALLENGES
        ---------------------------------------- */

        const challenges =
            await getTeamChallenges(
                teamId
            );


        const challengeTeams =
            await getChallengeTeams(
                challenges
            );


        renderChallenges(
            challenges,
            teamId,
            challengeTeams
        );


                /* ----------------------------------------
        LOAD MATCHES
        ---------------------------------------- */

        const matches =
            await getTeamMatches(
                teamId
            );

        const matchTeams =
            await getMatchTeams(
                matches
            );

        renderMatches(
    matches,
    teamId,
    matchTeams,
    userIsCaptain
);

/* MATCH ACTION BUTTONS */
const matchesList =
    getElement(
        "team-matches-list"
    );

if (matchesList) {

  /*   console.log(
    "MATCH ACTION LISTENER ATTACHED"
); */

    matchesList.addEventListener(
        "click",
        async event => {

   /*          console.log("MATCH CLICK:", {
    target: event.target,
    closestButton: event.target.closest("button"),
    action: event.target.closest("button")?.dataset.action
}); */

/* ----------------------------------------
   SAVE MATCH RESULT
---------------------------------------- */

const saveResultButton =
    event.target.closest(
        ".team-match-save-result-button"
    );

if (saveResultButton) {

    const matchId =
        saveResultButton.dataset.matchId;

    const resultForm =
        saveResultButton.closest(
            ".team-match-result-form"
        );

    if (!resultForm) {
        return;
    }

    const homeScoreInput =
        resultForm.querySelector(
            ".team-match-home-score"
        );

    const awayScoreInput =
        resultForm.querySelector(
            ".team-match-away-score"
        );

    const homeScore =
        homeScoreInput?.value;

    const awayScore =
        awayScoreInput?.value;

    console.log(
        "SAVE RESULT CLICKED:",
        {
            matchId,
            teamId,
            homeScore,
            awayScore
        }
    );

    await recordTeamMatchResult(
    matchId,
    teamId,
    homeScore,
    awayScore
);

/* console.log("SAVE RESULT HANDLER FINISHED"); */

    return;
}


/* ----------------------------------------
   CANCEL RESULT ENTRY
---------------------------------------- */

const cancelResultButton =
    event.target.closest(
        ".team-match-cancel-result-button"
    );

if (cancelResultButton) {

    const resultForm =
        cancelResultButton.closest(
            ".team-match-result-form"
        );

    if (resultForm) {
        resultForm.remove();
    }

    return;
}

            /* ----------------------------------------
               CANCEL MATCH
            ---------------------------------------- */

            const cancelButton =
                event.target.closest(
                    ".team-match-cancel-button"
                );

            if (cancelButton) {

                const matchId =
                    cancelButton.dataset.matchId;

                await cancelTeamMatch(
                    matchId,
                    teamId
                );

                return;

            }


            /* ----------------------------------------
               RECORD MATCH RESULT
            ---------------------------------------- */

            const resultButton =
                event.target.closest(
                    ".team-match-result-button"
                );

            if (resultButton) {

                const matchId =
                    resultButton.dataset.matchId;

                console.log(
                    "REGISTER RESULT CLICKED:",
                    {
                        matchId,
                        teamId
                    }
                );

                /*
                 * Temporary test only.
                 *
                 * We will replace this with
                 * the score-entry UI in the next step.
                 */

                /* ----------------------------------------
   SHOW SCORE ENTRY UI
---------------------------------------- */

const matchCard =
    resultButton.closest(
        ".team-match-card"
    );

if (!matchCard) {
    return;
}

const existingForm =
    matchCard.querySelector(
        ".team-match-result-form"
    );

if (existingForm) {
    return;
}

const teamsContainer =
    matchCard.querySelector(
        ".team-match-teams"
    );

if (!teamsContainer) {
    return;
}

const resultForm =
    document.createElement(
        "div"
    );

resultForm.className =
    "team-match-result-form";

resultForm.innerHTML = `
    <div class="team-match-score-inputs">

        <div class="team-match-score-input">
            <label>
                Local
            </label>

            <input
                type="number"
                class="team-match-home-score"
                min="0"
                step="1"
                value="0"
            >
        </div>

        <span class="team-match-score-separator">
            –
        </span>

        <div class="team-match-score-input">
            <label>
                Visitante
            </label>

            <input
                type="number"
                class="team-match-away-score"
                min="0"
                step="1"
                value="0"
            >
        </div>

    </div>

    <div class="team-match-result-form-actions">

        <button
            type="button"
            class="team-match-save-result-button"
            data-match-id="${matchId}"
        >
            Guardar resultado
        </button>

        <button
            type="button"
            class="team-match-cancel-result-button"
        >
            Cancelar
        </button>

    </div>
`;

teamsContainer.insertAdjacentElement(
    "afterend",
    resultForm
);

            }

        }
    );

}

                /* ----------------------------------------
        SUBSCRIBE TO CHALLENGE UPDATES
        ---------------------------------------- */

        subscribeToTeamChallenges(
            teamId
        );


        /* ----------------------------------------
        SUBSCRIBE TO MATCH UPDATES
        ---------------------------------------- */

        subscribeToTeamMatches(
            teamId
        );

        /* ----------------------------------------
           FIELD OPTIONS
        ---------------------------------------- */

        renderFieldOptions();


               /* ----------------------------------------
           CHECK CAPTAIN
        ---------------------------------------- */

        /* const captain =
            await isCaptain(
                teamId,
                user.id
            ); */


        /* ----------------------------------------
           LOAD USER'S CAPTAIN TEAMS
        ---------------------------------------- */

        const captainTeams =
            await getCaptainTeams(
                user.id
            );


        /*
         * Teams that belong to the current user
         * and are NOT the team being viewed.
         */

        const challengerTeams =
            captainTeams.filter(
                item =>
                    item.team_id !== teamId
            );

                renderChallengeTeams(
        captainTeams,
        teamId
        );


                    /* ----------------------------------------
        COMPARE WEEKLY SCHEDULES
        ---------------------------------------- */

        const challengeTeamSelect =
            getElement(
                "challenge-team"
            );


        const updateScheduleRecommendations =
            async () => {

        const challengerTeamId =
            challengeTeamSelect?.value;


        const container =
            getScheduleRecommendationContainer();


        if (!challengerTeamId) {

            if (container) {

                container.hidden =
                    true;

                container.innerHTML =
                    "";

            }

            return;

        }


        try {

            if (container) {

                container.hidden =
                    false;

                container.innerHTML = `

                    <div class="challenge-schedule-loading">

                        Buscando horarios compatibles...

                    </div>

                `;

            }




            const challengedTeamSchedule =
                schedule;




            const challengerTeamSchedule =
                await getTeamSchedule(
                    challengerTeamId
                );


            const matches =
                findScheduleMatches(
                    challengerTeamSchedule,
                    challengedTeamSchedule
                );


            renderScheduleRecommendations(
                matches
            );


        } catch (error) {

            console.error(
                "Error comparing team schedules:",
                error
            );


            if (container) {

                container.innerHTML = `

                    <div class="challenge-schedule-no-match">

                        No pudimos comparar los horarios
                        de los equipos.

                    </div>

                `;

                container.hidden =
                    false;

            }

        }

    };


        if (challengeTeamSelect) {

            challengeTeamSelect.addEventListener(
                "change",
                updateScheduleRecommendations
            );

        }


        /* ----------------------------------------
           CHALLENGE BUTTON
        ---------------------------------------- */

        const challengeButton =
            getElement(
                "challenge-team-button"
            );


        const challengeActions =
            getElement(
                "team-detail-actions"
            );


        /*
         * A captain cannot challenge
         * their own team.
         */

        if (
            challengerTeams.length &&
            !userIsCaptain
        ) {

            if (challengeActions) {
                challengeActions.hidden = false;
            }


            if (challengeButton) {

                challengeButton.addEventListener(
                    "click",
                    () => {

                        showChallengeCreator(
                            true
                        );

                    }
                );

            }


            /*
             * Populate availability options
             * using the TEAM BEING VIEWED.
             */

            renderChallengeAvailability(
                availability
            );


            const challengeForm =
                getElement(
                    "team-challenge-form"
                );


            if (challengeForm) {

                challengeForm.addEventListener(
                    "submit",
                    event => {

                        /*
                         * For now we automatically
                         * use the first captain team.
                         *
                         * We'll improve this next so
                         * the user can choose which
                         * team is challenging.
                         */

                        const challengerTeamId =
                getElement(
                    "challenge-team"
                )?.value;


            if (!challengerTeamId) {

                showMessage(
                    "Seleccioná el equipo que va a desafiar.",
                    "error"
                );

                return;

            }


                        handleChallengeSubmit(
                            event,
                            teamId,
                            challengerTeamId
                        );

                    }
                );

            }


            const challengeCancel =
    getElement(
        "challenge-cancel"
    );


            if (challengeCancel) {

            challengeCancel.addEventListener(
            "click",
                () => {

            const form =
                getElement(
                    "team-challenge-form"
                );


            if (form) {
                form.reset();
            }


            showChallengeCreator(false);

            hideMessage();

            }
        );

    }

        }

            if (userIsCaptain) {

            const addButton =
                getElement(
                    "add-availability-button"
                );


            if (addButton) {

                addButton.hidden = false;

                addButton.addEventListener(
                    "click",
                    () => {

                        showAvailabilityCreator(
                            true
                        );

                    }
                );

            }


            const form =
                getElement(
                    "team-availability-form"
                );


            if (form) {

                form.addEventListener(
                    "submit",
                    event =>
                        handleAvailabilitySubmit(
                            event,
                            teamId
                        )
                );

            }

                        /* ----------------------------------------
            WEEKLY SCHEDULE
            ---------------------------------------- */

            const scheduleButton =
                getElement(
                    "add-schedule-button"
                );


            if (scheduleButton) {

                scheduleButton.hidden = false;

                scheduleButton.addEventListener(
                    "click",
                    () => {

                        showScheduleCreator(
                            true
                        );

                    }
                );

            }


            const scheduleForm =
                getElement(
                    "team-schedule-form"
                );


            if (scheduleForm) {

                scheduleForm.addEventListener(
                    "submit",
                    event =>
                        handleScheduleSubmit(
                            event,
                            teamId
                        )
                );

            }


        const scheduleCancel =
            getElement(
                "schedule-cancel"
            );


        if (scheduleCancel) {

            scheduleCancel.addEventListener(
                "click",
                () => {

            const form =
                getElement(
                    "team-schedule-form"
                );


            if (form) {
                form.reset();
            }


            showScheduleCreator(
                false
            );


            hideMessage();

        }
    );

        }

        }


        if (loading) {
            loading.hidden = true;
        }


    } catch (error) {

        console.error(
            "Team page error:",
            error
        );


        if (loading) {
            loading.hidden = true;
        }


        showMessage(
            "No pudimos cargar este equipo.",
            "error"
        );

    }

}
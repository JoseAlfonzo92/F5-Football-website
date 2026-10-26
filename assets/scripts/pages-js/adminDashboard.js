
import { supabase } from "../services/supabase.js";

let adminDashboardInitialized = false;

const $ = (selector) => document.querySelector(selector);

export async function initAdminDashboard() {
  if (
    !document.getElementById("admin-dashboard-page") ||
    adminDashboardInitialized
  ) {
    return;
  }

  adminDashboardInitialized = true;

  const state = {
    user: null,
    submissions: [],
    fields: [],
    activity: [],
    activeTab: "submissions",
  };

  const views = {
    loading: $("#loading-state"),
    login: $("#login-view"),
    denied: $("#denied-view"),
    dashboard: $("#dashboard-view"),
  };

  const show = (element, visible) => {
    if (element) element.hidden = !visible;
  };

  function escapeHtml(value = "") {
    return String(value).replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    })[char]);
  }

  function formatDate(value) {
    if (!value) return "—";

    const date = new Date(value);

    return Number.isNaN(date.getTime())
      ? "—"
      : date.toLocaleString("es-AR", {
          dateStyle: "short",
          timeStyle: "short",
        });
  }

  function money(value) {
    if (value === null || value === undefined || value === "") {
      return "Sin especificar";
    }

    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      maximumFractionDigits: 0,
    }).format(Number(value));
  }

  function statusLabel(value) {
    const labels = {
      pending: "Pendiente",
      verified: "Verificado",
      approved: "Aprobada",
      rejected: "Rechazada",
      cancelled: "Cancelada",
      active: "Activa",
      blocked: "Bloqueada",
      unverified: "Sin verificar",
      unknown: "Desconocido",
    };

    const key = String(value || "unknown").toLowerCase();

    return labels[key] || key.replaceAll("_", " ");
  }

  function paymentStatusLabel(value) {
  const labels = {
    pending: "Pago pendiente",
    verified: "Pago verificado",
    unverified: "Pago sin verificar",
    manual: "Pago registrado manualmente",
  };

  return labels[String(value || "unverified").toLowerCase()]
    || statusLabel(value);
}

  function statusClass(value) {
    const key = String(value || "unknown").toLowerCase();

    if (["verified", "approved", "active"].includes(key)) {
      return "status-good";
    }

    if (key === "pending") {
      return "status-pending";
    }

    if (["rejected", "cancelled", "blocked"].includes(key)) {
      return "status-bad";
    }

    return "";
  }

  function badge(value, label = statusLabel(value)) {
  return `<span class="status-badge ${statusClass(value)}">${escapeHtml(label)}</span>`;
}

  function notice(message, kind = "success") {
    const element = $("#global-notice");

    if (!element) return;

    element.textContent = message;
    element.className = `notice notice-${kind}`;

    show(element, true);

    if (kind !== "error") {
      window.setTimeout(() => show(element, false), 5000);
    }
  }

  function setView(name) {
    Object.entries(views).forEach(([key, element]) => {
      show(element, key === name);
    });

    show($("#session-tools"), Boolean(state.user));

    const emailElement = $("#admin-email");

    if (emailElement) {
      emailElement.textContent = state.user?.email || "";
    }
  }

  function setBusy(button, busy, text = "Procesando…") {
    if (!button) return;

    if (busy) {
      button.dataset.originalText = button.textContent;
      button.textContent = text;
      button.disabled = true;
    } else {
      button.textContent =
        button.dataset.originalText || button.textContent;
      button.disabled = false;
    }
  }

  async function checkSession() {
    console.log("[Administración] Verificando sesión…");

    setView("loading");

    const { data, error } = await supabase.auth.getUser();

    if (error || !data.user) {
      state.user = null;
      setView("login");
      return;
    }

    state.user = data.user;
    setView("loading");

    console.log("[Administración] Verificando permisos…");

    const { data: isAdmin, error: adminError } =
      await supabase.rpc("is_fulsap_admin");

    if (adminError) {
      console.error(
        "Error al verificar los permisos de administrador:",
        adminError
      );

      setView("denied");

      const message = $("#denied-view .muted");

      if (message) {
        message.textContent =
          "No se pudieron verificar tus permisos. Comprobá que la configuración de administración en Supabase se haya ejecutado correctamente.";
      }

      return;
    }

    if (isAdmin !== true) {
      setView("denied");
      return;
    }

    console.log("[Administración] Cargando información…");

    setView("dashboard");

    await loadAll();

    console.log("[Administración] Panel cargado.");
  }

  async function loadAll() {
    $("#submission-list").innerHTML =
      '<div class="empty-state">Cargando solicitudes…</div>';

    $("#field-list").innerHTML =
      '<div class="empty-state">Cargando canchas…</div>';

    $("#activity-list").innerHTML =
      '<div class="empty-state">Cargando historial…</div>';

    const [
      submissionsResult,
      fieldsResult,
      activityResult,
    ] = await Promise.all([
      supabase
        .from("field_submissions")
        .select("*")
        .order("created_at", { ascending: false }),

      supabase
        .from("fields")
        .select("*")
        .order("created_at", { ascending: false }),

      supabase
        .from("admin_action_log")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(100),
    ]);

    const failures = [
      submissionsResult,
      fieldsResult,
      activityResult,
    ].filter((result) => result.error);

    if (failures.length) {
      console.error(
        "Errores al cargar el panel:",
        failures.map((result) => result.error)
      );

      notice(
        failures
          .map((result) => result.error.message)
          .join(" · "),
        "error"
      );
    }

    state.submissions = submissionsResult.data || [];
    state.fields = fieldsResult.data || [];
    state.activity = activityResult.data || [];

    renderStats();
    renderSubmissions();
    renderFields();
    renderActivity();
  }

  function renderStats() {
    const pending = state.submissions.filter(
      (item) => item.status === "pending"
    );

    $("#stat-pending").textContent = pending.length;

    $("#stat-paid").textContent = pending.filter(
      (item) =>
        item.payment_status === "verified" &&
        item.payment_verified_at
    ).length;

    $("#stat-active").textContent = state.fields.filter(
      (field) => field.is_active === true
    ).length;

    $("#stat-blocked").textContent = state.fields.filter(
      (field) => field.is_active === false
    ).length;

    $("#pending-tab-count").textContent = pending.length;
  }

  function submissionMatches(item, query) {
    const searchable = [
      item.name,
      item.city,
      item.zone,
      item.province,
      item.address,
      item.whatsapp,
      statusLabel(item.status),
      statusLabel(item.payment_status),
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return searchable.includes(query);
  }

  function renderSubmissions() {
    const filter = $("#submission-filter").value;
    const query = $("#submission-search").value.trim().toLowerCase();

    const rows = state.submissions.filter((item) => {
      const statusMatch =
        filter === "all" || item.status === filter;

      return statusMatch && submissionMatches(item, query);
    });

    const container = $("#submission-list");

    if (!rows.length) {
      container.innerHTML =
        '<div class="empty-state">No hay solicitudes que coincidan con los filtros.</div>';
      return;
    }

    container.innerHTML = rows.map((item) => {
      const images = Array.isArray(item.image_urls)
        ? item.image_urls
        : [];

      const imageMarkup = images.slice(0, 4).map((url) =>
        `<a class="thumb-link" href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">
          <img class="thumb" src="${escapeHtml(url)}" alt="Foto de ${escapeHtml(item.name || "la cancha")}" loading="lazy">
        </a>`
      ).join("");

      const paymentVerified =
        item.payment_status === "verified" &&
        Boolean(item.payment_verified_at);

      const canModerate = item.status === "pending";
      const canApprove = canModerate && paymentVerified;

      const paymentMethodLabel = ({
        mercado_pago: "Mercado Pago",
        uala: "Ualá",
        manual: "Manual (método anterior)",
      })[item.payment_method] || "No registrado";

      const details = [
        item.address,
        [item.zone, item.city, item.province].filter(Boolean).join(", "),
        item.description,
        item.type ? `Tipo: ${item.type}` : "",
        `Precio: ${money(item.price_from)}${
          item.price_to ? ` – ${money(item.price_to)}` : ""
        }`,
        item.whatsapp ? `WhatsApp: ${item.whatsapp}` : "",
      ].filter(Boolean);

      return `<article class="submission-card">
        <div class="submission-main">
          <div class="card-heading">
            <div>
              <div class="eyebrow">${escapeHtml(formatDate(item.created_at))}</div>
              <h3>${escapeHtml(item.name || "Cancha sin nombre")}</h3>
            </div>

            <div class="badge-stack">
              ${badge(item.status)}
              ${badge(
                item.payment_status || "unverified",
                paymentStatusLabel(item.payment_status)
              )}
            </div>
          </div>

          <div class="detail-grid">
            ${details.map((detail) => `<p>${escapeHtml(detail)}</p>`).join("")}
          </div>

          ${imageMarkup ? `<div class="thumb-row">${imageMarkup}</div>` : ""}

          <div class="payment-line">
            <strong>Pago:</strong>
            ${escapeHtml(paymentMethodLabel)}
            ${
              item.payment_verified_at
                ? ` · Verificado el ${escapeHtml(formatDate(item.payment_verified_at))}`
                : ""
            }
          </div>

          ${
            item.rejection_reason
              ? `<p class="reason"><strong>Motivo:</strong> ${escapeHtml(item.rejection_reason)}</p>`
              : ""
          }
        </div>

        <div class="card-actions">
          ${
            canModerate && !paymentVerified
              ? `<label class="method-label" for="method-${escapeHtml(item.id)}">
                  Medio de pago recibido
                </label>
                <select id="method-${escapeHtml(item.id)}" data-payment-method="${escapeHtml(item.id)}">
                  <option value="mercado_pago">Mercado Pago</option>
                  <option value="uala">Ualá</option>
                </select>
                <button class="button button-secondary" data-action="verify" data-id="${escapeHtml(item.id)}" type="button">
                  Verificar pago
                </button>`
              : ""
          }

          ${
            canApprove
              ? `<button class="button button-primary" data-action="approve" data-id="${escapeHtml(item.id)}" type="button">
                  Aprobar y publicar
                </button>`
              : ""
          }

          ${
            canModerate
              ? `<button class="button button-danger-outline" data-action="cancel" data-id="${escapeHtml(item.id)}" type="button">
                  Cancelar solicitud
                </button>`
              : ""
          }

          ${
            canModerate && !paymentVerified
              ? `<p class="action-hint">Verificá el pago antes de aprobar la solicitud.</p>`
              : ""
          }
        </div>
      </article>`;
    }).join("");
  }

  function renderFields() {
    const query = $("#field-search").value.trim().toLowerCase();

    const rows = state.fields.filter((field) =>
      [
        field.name,
        field.id,
        field.city,
        field.zone,
        field.address,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(query)
    );

    const container = $("#field-list");

    if (!rows.length) {
      container.innerHTML =
        '<div class="empty-state">No hay canchas que coincidan con la búsqueda.</div>';
      return;
    }

    container.innerHTML = rows.map((field) => `
      <article class="field-row">
        <div class="field-avatar">
          ${escapeHtml((field.name || "C").slice(0, 1).toUpperCase())}
        </div>

        <div class="field-row-main">
          <div class="field-row-title">
            <h3>${escapeHtml(field.name || "Cancha sin nombre")}</h3>
            ${badge(
              field.is_active ? "active" : "blocked",
              field.is_active ? "Publicada" : "Bloqueada"
            )}
          </div>

          <p class="muted">
            ${escapeHtml(
              [field.zone, field.city, field.province]
                .filter(Boolean)
                .join(", ") ||
              field.address ||
              "Ubicación no especificada"
            )}
          </p>

          <p class="field-id">
            ID: <code>${escapeHtml(field.id)}</code>
            · ${escapeHtml(money(field.price_from))}
          </p>
        </div>

        <div class="field-actions">
          <button
            class="button ${field.is_active ? "button-danger-outline" : "button-primary"}"
            data-action="${field.is_active ? "block" : "unblock"}"
            data-id="${escapeHtml(field.id)}"
            type="button"
          >
            ${field.is_active ? "Bloquear cancha" : "Reactivar cancha"}
          </button>
        </div>
      </article>
    `).join("");
  }

  function renderActivity() {
    const container = $("#activity-list");

    if (!state.activity.length) {
      container.innerHTML =
        '<div class="empty-state">Todavía no hay acciones administrativas registradas.</div>';
      return;
    }

    const actionLabels = {
      payment_verified: "Pago verificado",
      field_submission_approved: "Solicitud aprobada",
      submission_approved: "Solicitud aprobada",
      field_submission_rejected: "Solicitud rechazada",
      submission_rejected: "Solicitud rechazada",
      field_blocked: "Cancha bloqueada",
      field_unblocked: "Cancha reactivada",
      field_activated: "Cancha reactivada",
      field_deactivated: "Cancha bloqueada",
    };

    container.innerHTML = state.activity.map((item) => {
      const rawAction = (item.action || "action").replaceAll("_", " ");

      const actionLabel =
        actionLabels[item.action] ||
        rawAction.charAt(0).toUpperCase() + rawAction.slice(1);

      const details =
        item.details && typeof item.details === "object"
          ? JSON.stringify(item.details)
          : "";

      return `<article class="activity-row">
        <div class="activity-dot"></div>
        <div class="activity-body">
          <strong>${escapeHtml(actionLabel)}</strong>
          ${details ? `<p>${escapeHtml(details)}</p>` : ""}
          <small>
            ${escapeHtml(formatDate(item.created_at))}
            · ${escapeHtml(item.performed_by || "Administrador")}
          </small>
        </div>
      </article>`;
    }).join("");
  }

  async function runAction(button, action) {
    const id = button.dataset.id;

    setBusy(button, true);

    try {
      if (action === "verify") {
        const method =
          document.querySelector(
            `[data-payment-method="${CSS.escape(id)}"]`
          )?.value || "mercado_pago";

        const { error } = await supabase.rpc(
          "verify_field_submission_payment",
          {
            p_submission_id: id,
            p_payment_method: method,
          }
        );

        if (error) throw error;

        notice(
          "Pago verificado correctamente. Ya podés aprobar la solicitud."
        );
      } else if (action === "approve") {
        const confirmed = window.confirm(
          "¿Querés aprobar y publicar esta cancha? Será visible en los listados públicos."
        );

        if (!confirmed) return;

        const { error } = await supabase.rpc(
          "approve_field_submission",
          {
            p_submission_id: id,
          }
        );

        if (error) throw error;

        notice("La cancha fue aprobada y publicada correctamente.");
      } else if (action === "cancel") {
        const reason = window.prompt(
          "¿Por qué querés cancelar esta solicitud que todavía no tiene el pago verificado?"
        );

        if (reason === null) return;

        if (!reason.trim()) {
          throw new Error("Ingresá un motivo para cancelar la solicitud.");
        }

        const { error } = await supabase.rpc(
          "reject_field_submission",
          {
            p_submission_id: id,
            p_reason: reason.trim(),
          }
        );

        if (error) throw error;

        notice("La solicitud fue cancelada correctamente.");
      } else if (action === "block" || action === "unblock") {
        const blocking = action === "block";

        const reason = window.prompt(
          blocking
            ? "Indicá el motivo por el que querés bloquear esta cancha:"
            : "Indicá el motivo de la reactivación (opcional):"
        );

        if (reason === null) return;

        if (blocking && !reason.trim()) {
          throw new Error("Ingresá un motivo para bloquear la cancha.");
        }

        const { error } = await supabase.rpc(
          "set_field_active",
          {
            p_field_id: id,
            p_is_active: !blocking,
            p_reason: reason.trim() || null,
          }
        );

        if (error) throw error;

        notice(
          blocking
            ? "La cancha fue bloqueada y ya no aparece en los listados públicos."
            : "La cancha fue reactivada correctamente."
        );
      }

      await loadAll();
    } catch (error) {
      console.error(`Error al ejecutar la acción ${action}:`, error);

      notice(
        error.message ||
          "No se pudo completar la acción. Revisá los registros y los permisos de Supabase.",
        "error"
      );
    } finally {
      setBusy(button, false);
    }
  }

  $("#login-form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const button = event.currentTarget.querySelector(
      'button[type="submit"]'
    );

    const errorElement = $("#login-error");

    show(errorElement, false);
    setBusy(button, true, "Iniciando sesión…");

    try {
      const email = $("#login-email").value.trim();
      const password = $("#login-password").value;

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      await checkSession();
    } catch (error) {
      errorElement.textContent =
        error.message || "No se pudo iniciar sesión.";

      show(errorElement, true);
    } finally {
      setBusy(button, false);
    }
  });

  async function signOut() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      notice("No se pudo cerrar la sesión.", "error");
      return;
    }

    state.user = null;
    setView("login");
  }

  $("#sign-out").addEventListener("click", signOut);
  $("#denied-sign-out").addEventListener("click", signOut);

  $("#refresh-button").addEventListener("click", async () => {
    const button = $("#refresh-button");

    setBusy(button, true, "Actualizando…");

    try {
      await loadAll();
      notice("La información se actualizó correctamente.");
    } catch (error) {
      console.error("Error al actualizar el panel:", error);
      notice("No se pudo actualizar la información.", "error");
    } finally {
      setBusy(button, false);
    }
  });

  document.querySelectorAll("[data-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      state.activeTab = button.dataset.tab;

      document.querySelectorAll("[data-tab]").forEach((tab) => {
        tab.classList.toggle("is-active", tab === button);
      });

      document.querySelectorAll(".tab-panel").forEach((panel) => {
        show(panel, panel.id === `panel-${state.activeTab}`);
      });
    });
  });

  $("#submission-filter").addEventListener("change", renderSubmissions);
  $("#submission-search").addEventListener("input", renderSubmissions);
  $("#field-search").addEventListener("input", renderFields);

  $("#submission-list").addEventListener("click", (event) => {
    const button = event.target.closest("button[data-action]");

    if (button) {
      runAction(button, button.dataset.action);
    }
  });

  $("#field-list").addEventListener("click", (event) => {
    const button = event.target.closest("button[data-action]");

    if (button) {
      runAction(button, button.dataset.action);
    }
  });

  supabase.auth.onAuthStateChange((event) => {
    // Evita repetir la verificación por el evento inicial de sesión.
    // Los cambios de autenticación posteriores sí se procesan.
    if (event === "INITIAL_SESSION") return;

    window.setTimeout(() => {
      checkSession().catch((error) => {
        console.error("Error al verificar la sesión:", error);
        notice("No se pudo verificar la sesión.", "error");
      });
    }, 0);
  });

  await checkSession().catch((error) => {
    console.error("Error al inicializar el panel:", error);

    setView("login");

    const errorElement = $("#login-error");

    if (errorElement) {
      errorElement.textContent =
        error.message || "No se pudo cargar el panel de administración.";

      show(errorElement, true);
    }
  });
}

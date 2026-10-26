
import { supabase } from "../services/supabase.js";

const emailForm = document.getElementById("recovery-email-form");
const emailInput = document.getElementById("recovery-email");
const emailButton = document.getElementById("recovery-email-button");

const passwordForm = document.getElementById("reset-password-form");
const passwordInput = document.getElementById("new-password");
const confirmPasswordInput = document.getElementById("confirm-password");
const passwordButton = document.getElementById("reset-password-button");

const message = document.getElementById("reset-password-message");

const RECOVERY_KEY = "fulsap-password-recovery";

let recoveryReady = false;
let submitting = false;

function showMessage(text, type = "info") {
    message.textContent = text;
    message.dataset.type = type;
    message.hidden = false;
}

function showEmailForm() {
    recoveryReady = false;
    emailForm.hidden = false;
    passwordForm.hidden = true;
}

function showPasswordForm() {
    recoveryReady = true;
    emailForm.hidden = true;
    passwordForm.hidden = false;
    message.hidden = true;
}

function setSubmitting(button, isSubmitting, defaultText, loadingText) {
    submitting = isSubmitting;
    emailButton.disabled = isSubmitting;
    passwordButton.disabled = isSubmitting;

    button.textContent = isSubmitting ? loadingText : defaultText;
}

export async function initPasswordReset() {
    showEmailForm();

    // A recovery event is emitted when Supabase processes a valid
    // password-recovery link.
    supabase.auth.onAuthStateChange((event, session) => {
        if (event === "PASSWORD_RECOVERY" && session) {
            try {
                sessionStorage.setItem(RECOVERY_KEY, "true");
            } catch (error) {
                console.error("Could not store recovery state:", error);
            }

            showPasswordForm();
        }
    });

    // Allow the recovery form to remain visible after a page refresh,
    // but only if the marker and a valid Supabase session both exist.
    try {
        const marker = sessionStorage.getItem(RECOVERY_KEY);
        const { data, error } = await supabase.auth.getSession();

        if (!error && data.session && marker === "true") {
            showPasswordForm();
        }
    } catch (error) {
        console.error("Could not verify recovery session:", error);
    }
}

// Request a password-recovery email.
emailForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (submitting) return;

    const email = emailInput.value.trim();

    if (!email) {
        showMessage("Ingresá tu correo electrónico.", "error");
        emailInput.focus();
        return;
    }

    setSubmitting(
        emailButton,
        true,
        "Enviar enlace de recuperación",
        "Enviando..."
    );

    message.hidden = true;

    try {
        const redirectTo =
            `${window.location.origin}${window.location.pathname}`;

        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo
        });

        if (error) throw error;

        emailForm.reset();

        showMessage(
            "Si existe una cuenta asociada a ese correo, recibirás un enlace para restablecer tu contraseña. Revisá también la carpeta de spam.",
            "success"
        );
    } catch (error) {
        console.error("Password recovery request failed:", error);

        showMessage(
            "No pudimos enviar el enlace de recuperación. Intentá nuevamente más tarde.",
            "error"
        );
    } finally {
        setSubmitting(
            emailButton,
            false,
            "Enviar enlace de recuperación",
            "Enviando..."
        );
    }
});

// Save the new password after a valid recovery session is established.
passwordForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!recoveryReady || submitting) return;

    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (password.length < 6) {
        showMessage(
            "La contraseña debe tener al menos 6 caracteres.",
            "error"
        );
        passwordInput.focus();
        return;
    }

    if (password !== confirmPassword) {
        showMessage("Las contraseñas no coinciden.", "error");
        confirmPasswordInput.focus();
        return;
    }

    setSubmitting(
        passwordButton,
        true,
        "Guardar nueva contraseña",
        "Guardando..."
    );

    message.hidden = true;

    try {
        const { data, error } = await supabase.auth.updateUser({
            password
        });

        if (error) throw error;
        if (!data.user) {
            throw new Error("Supabase did not return the updated user.");
        }

        try {
            sessionStorage.removeItem(RECOVERY_KEY);
        } catch (error) {
            console.error("Could not clear recovery state:", error);
        }

        passwordForm.reset();
        passwordForm.hidden = true;
        recoveryReady = false;

        showMessage(
            "Tu contraseña se actualizó correctamente. Ya podés volver al inicio de sesión.",
            "success"
        );
    } catch (error) {
        console.error("Password update failed:", error);

        showMessage(
            "No pudimos actualizar tu contraseña. Es posible que el enlace haya vencido. Solicitá uno nuevo e intentá nuevamente.",
            "error"
        );
    } finally {
        setSubmitting(
            passwordButton,
            false,
            "Guardar nueva contraseña",
            "Guardando..."
        );
    }
});

//initPasswordReset();
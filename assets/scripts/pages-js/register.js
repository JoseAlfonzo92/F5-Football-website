import { signUp } from "../services/auth.js";


export function initRegisterPage() {

    const form = document.getElementById("register-form");

    if (!form) return;

    const message = document.getElementById("register-message");


    // PASSWORD VISIBILITY
    const passwordToggles =
        form.querySelectorAll(".password-toggle");

    passwordToggles.forEach(button => {

        button.addEventListener("click", () => {

            const targetId =
                button.dataset.passwordTarget;

            const input =
                document.getElementById(targetId);

            if (!input) return;

            const isPassword =
                input.type === "password";

            input.type =
                isPassword ? "text" : "password";

            button.setAttribute(
                "aria-label",
                isPassword
                    ? "Ocultar contraseña"
                    : "Mostrar contraseña"
            );

            const icon =
                button.querySelector("[data-icon]");

            if (icon) {

                icon.setAttribute(
                    "data-icon",
                    isPassword
                        ? "eyeSlash"
                        : "eye"
                );

            }

        });

    });


    // REGISTER FORM
    form.addEventListener("submit", async (event) => {

        event.preventDefault();

        const username =
            document.getElementById("username").value.trim();

        const displayName =
            document.getElementById("display-name").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const password =
            document.getElementById("password").value;

        const confirmPassword =
            document.getElementById("confirm-password").value;


        if (password !== confirmPassword) {

            message.textContent =
                "Las contraseñas no coinciden.";

            message.className =
                "auth-message error";

            return;
        }


        try {

            message.textContent =
                "Creando tu cuenta...";

            message.className =
                "auth-message";


            await signUp({
                email,
                password,
                username,
                displayName
            });


            message.textContent =
                "¡Cuenta creada! Revisá tu correo para confirmar tu cuenta.";

            message.className =
                "auth-message success";

            form.reset();


        } catch (error) {

            console.error(error);

            message.textContent =
                error.message ||
                "No pudimos crear tu cuenta.";

            message.className =
                "auth-message error";
        }

    });

}
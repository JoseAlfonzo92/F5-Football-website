import {
    signIn
} from "../services/auth.js";


export function initLoginPage() {

    const form = document.getElementById("login-form");

    if (!form) return;

    const message =
        document.getElementById("login-message");

    const button =
        document.getElementById("login-button");


    form.addEventListener("submit", async (event) => {

        event.preventDefault();


        const email =
            document
                .getElementById("email")
                .value
                .trim();

        const password =
            document
                .getElementById("password")
                .value;


        try {

            button.disabled = true;

            button.textContent =
                "Iniciando sesión...";

            message.textContent = "";

            message.className =
                "auth-message";


            await signIn(
                email,
                password
            );


            message.textContent =
                "¡Bienvenido a Fulsap!";

            message.className =
                "auth-message success";


            /*
             * For now we redirect to the home page.
             *
             * Later we can redirect the user
             * to their community/team dashboard.
             */

            setTimeout(() => {

                window.location.href =
                    "../index.html";

            }, 800);


        } catch (error) {

            console.error(
                "Login error:",
                error
            );


            message.textContent =
                "El correo o la contraseña no son correctos.";

            message.className =
                "auth-message error";


            button.disabled = false;

            button.textContent =
                "Iniciar sesión";

        }

    });


    // PASSWORD VISIBILITY

    const passwordInput =
        document.getElementById("password");

    const passwordToggle =
        document.getElementById("password-toggle");


    if (
        passwordInput &&
        passwordToggle
    ) {

        passwordToggle.addEventListener(
            "click",
            () => {

                const isPassword =
                    passwordInput.type === "password";


                passwordInput.type =
                    isPassword
                        ? "text"
                        : "password";


                passwordToggle.setAttribute(
                    "aria-label",
                    isPassword
                        ? "Ocultar contraseña"
                        : "Mostrar contraseña"
                );


                passwordToggle.setAttribute(
                    "aria-pressed",
                    String(isPassword)
                );


                passwordToggle.innerHTML =
                    `<span data-icon="${
                        isPassword
                            ? "eyeSlash"
                            : "eye"
                    }"></span>`;

                /*
                 * Re-inject the icon because
                 * we replaced the button contents.
                 */
                document.dispatchEvent(
                    new Event("icons:refresh")
                );

            }
        );

    }

}
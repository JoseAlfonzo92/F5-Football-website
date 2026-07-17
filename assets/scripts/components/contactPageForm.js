import { icons } from "../utils/icons.js";

export function initContactPageForm() {
    const form = document.querySelector("#contact-form");

    if (!form) return;

    const submitBtn = form.querySelector(".contact-btn");

    async function handleSubmit(e) {
        e.preventDefault();

        submitBtn.disabled = true;

        const originalBtnText = submitBtn.innerHTML;

        submitBtn.disabled = true;
        submitBtn.innerHTML = `
            Enviando...
            <span class="spin">${icons.circleLoop}</span>
        `;

        try {
            await emailjs.send(
                "service_f6r1tp1",
                "template_bc82t7m",
                {
                    name: form.name.value.trim(),
                    email: form.email.value.trim(),
                    subject: form.subject.value.trim() || "Sin asunto",
                    message: form.message.value.trim(),
                    date: new Date().toLocaleString("es-AR")
                },
                "uVpteypiD8hGJlJ42"
            );

            showSuccessMessage();

        } catch (error) {
            console.error(error);

            alert(
                "Ocurrió un error al enviar la consulta. Intentá nuevamente."
            );
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        }
    }

    function showSuccessMessage() {
        const successHTML = `
            <div class="success-message">
                <h2>¡Consulta enviada con éxito!</h2>

                <p>
                    Gracias por comunicarte con nosotros.
                    Revisaremos tu mensaje y te responderemos lo antes posible,
                    generalmente dentro de las próximas 24 horas.
                </p>

                <button
                    type="button"
                    class="btn-primary success-reload-btn"
                    style="margin-top:20px;"
                >
                    Enviar otra consulta
                </button>
            </div>
        `;

        form.style.display = "none";

        const container = document.querySelector(".contact-container");

        if (container) {
            container.insertAdjacentHTML("beforeend", successHTML);

            container
                .querySelector(".success-reload-btn")
                .addEventListener("click", () => location.reload());
        }
    }

    form.addEventListener("submit", handleSubmit);
}
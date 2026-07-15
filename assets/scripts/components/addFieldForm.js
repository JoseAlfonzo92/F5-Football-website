import { icons } from "../utils/icons.js";

export function initAddFieldForm() {
    const form = document.querySelector('.add-field-form');
    if (!form) return;

    const submitBtn = form.querySelector('.submit-btn');
    const fileInput = document.getElementById('field-images');
    let previewContainer = null;
    let selectedFiles = [];

    //  CONFIG 
    const EMAILJS_SERVICE_ID = 'service_f6r1tp1';
    const EMAILJS_TEMPLATE_ID = 'template_r6fzbhg';
    const EMAILJS_PUBLIC_KEY = 'uVpteypiD8hGJlJ42';

    const CLOUDINARY_CLOUD_NAME = 'dolmulmgp';
    const CLOUDINARY_UPLOAD_PRESET = 'upload-for-template-website';

    //  IMAGE PREVIEW 
    function createPreviewContainer() {
        const uploadBox = document.querySelector('.upload-box');
        if (!uploadBox) return;

        previewContainer = document.getElementById('image-preview-container');
        if (!previewContainer) {
            previewContainer = document.createElement('div');
            previewContainer.id = 'image-preview-container';
            previewContainer.className = 'image-preview-grid';
            uploadBox.parentNode.insertBefore(previewContainer, uploadBox.nextSibling);
        }
    }

    function renderPreviews() {
        if (!previewContainer) createPreviewContainer();
        previewContainer.innerHTML = '';

        if (selectedFiles.length === 0) return;

        selectedFiles.forEach((file, index) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const div = document.createElement('div');
                div.className = 'preview-item';
                div.innerHTML = `
                    <img src="${e.target.result}" alt="${file.name}">
                    <button type="button" class="remove-preview" data-index="${index}">×</button>
                `;
                previewContainer.appendChild(div);
            };
            reader.readAsDataURL(file);
        });

        // Delete All Button
        const deleteAllBtn = document.createElement('button');
        deleteAllBtn.type = 'button';
        deleteAllBtn.className = 'delete-all-btn';
        deleteAllBtn.innerHTML = ' Eliminar todas las imágenes';
        deleteAllBtn.onclick = () => {
            if (confirm('¿Estás seguro de eliminar todas las imágenes?')) {
                selectedFiles = [];
                renderPreviews();
            }
        };

        const wrapper = document.createElement('div');
        wrapper.style.marginTop = '12px';
        wrapper.appendChild(deleteAllBtn);
        previewContainer.appendChild(wrapper);
    }

    //  UPLOAD TO CLOUDINARY 
    async function uploadImagesToCloudinary() {
        const uploadedUrls = [];

        for (let i = 0; i < selectedFiles.length; i++) {
            const file = selectedFiles[i];
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

            try {
                const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
                    method: 'POST',
                    body: formData
                });

                const data = await res.json();

                if (data.secure_url) {
                    uploadedUrls.push(data.secure_url);
                } else {
                    console.error('Cloudinary error:', data);
                }
            } catch (err) {
                console.error('Error uploading image:', err);
            }
        }
        return uploadedUrls;
    }

    //  DRAG & DROP 
    function setupDragAndDrop() {
        const uploadBox = document.querySelector('.upload-box');
        if (!uploadBox) return;

        uploadBox.addEventListener('click', () => fileInput.click());

        uploadBox.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadBox.style.borderColor = 'var(--color-primary)';
        });

        uploadBox.addEventListener('dragleave', () => {
            uploadBox.style.borderColor = '';
        });

        uploadBox.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadBox.style.borderColor = '';
            const newFiles = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'));
            selectedFiles = [...selectedFiles, ...newFiles];
            renderPreviews();
        });

        fileInput.addEventListener('change', () => {
            selectedFiles = [...selectedFiles, ...Array.from(fileInput.files)];
            renderPreviews();
        });

        // Remove individual image
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('remove-preview')) {
                const index = parseInt(e.target.dataset.index);
                selectedFiles.splice(index, 1);
                renderPreviews();
            }
        });
    }

    //  VALIDATION 
    function validateForm() {
        const name = document.getElementById('field-name').value.trim();
        const phone = document.getElementById('field-phone').value.trim();
        const location = document.getElementById('field-location').value.trim();

        if (!name) return "El nombre de la cancha es obligatorio.";
        if (!phone) return "El WhatsApp es obligatorio.";
        if (!location) return "La ubicación es obligatoria.";

        const cleanPhone = phone.replace(/\s+|\-|\(|\)/g, '');
        if (!/^\+?54?[0-9]{8,12}$/.test(cleanPhone)) {
            return "Por favor ingresa un número de WhatsApp válido.";
        }

        if (selectedFiles.length === 0) {
            return "Debes subir al menos una imagen de la cancha.";
        }

        return null;
    }

    //  SUBMIT
    async function handleSubmit(e) {
        e.preventDefault();

        const error = validateForm();
        if (error) {
            alert(error);
            return;
        }

        const originalBtnText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = `Subiendo imágenes... <span class="spin">${icons.circleLoop}</span>`;

        try {
            const imageUrls = await uploadImagesToCloudinary();

            const formDataObj = {
            // Basic Information
            nombre: document.getElementById('field-name').value.trim(),
            whatsapp: document.getElementById('field-phone').value.trim(),
            ubicacion: document.getElementById('field-location').value.trim(),
            address: document.getElementById('field-address').value.trim(),
            tipo: document.getElementById('field-type').value || 'No especificado',
            descripcion: document.getElementById('field-description').value.trim(),

            // Pricing
            priceFrom: document.getElementById('price-from').value || 'No especificado',
            priceTo: document.getElementById('price-to').value || 'No especificado',

            // Field Configuration
            sizes: Array.from(document.querySelectorAll('input[name="sizes"]:checked'))
                .map(i => i.value)
                .join(', ') || 'Ninguno',

            boots: Array.from(document.querySelectorAll('input[name="boots"]:checked'))
                .map(i => i.value)
                .join(', ') || 'Ninguno',

            surface: Array.from(document.querySelectorAll('input[name="surface"]:checked'))
                .map(i => i.value)
                .join(', ') || 'No especificada',

            // Schedule
            weekSchedule: document.getElementById('week-schedule').value.trim() || 'No especificado',
            weekendSchedule: document.getElementById('weekend-schedule').value.trim() || 'No especificado',

            // Features
            features: Array.from(document.querySelectorAll('input[name="features"]:checked'))
                .map(i => i.value)
                .join(', ') || 'Ninguna',

            // Buffet
            buffet: document.getElementById('buffet-items').value.trim() || 'No especificado',

            // Barbecue
            cookType: document.getElementById('cook-type').value || 'No posee',
            grillFee: document.getElementById('grill-fee').value || '0',
            cookServiceFee: document.getElementById('cook-service-fee').value || '0',
            barbecueNotes: document.getElementById('barbecue-notes').value.trim() || 'Ninguna',

            // Jerseys
            jerseys: document.getElementById('available-jerseys').value.trim() || 'No especificado',

            // Additional Information
            adicional: document.getElementById('extra-info').value.trim() || 'Ninguna',

            // Images
            imagesCount: imageUrls.length,
            imageUrls: imageUrls.join('\n\n'),

            // Metadata
            fecha: new Date().toLocaleString('es-AR')
        };

            await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formDataObj);
            
            showSuccessMessage();

        } catch (error) {
            console.error(error);
            alert('Error al enviar la solicitud. Por favor intenta nuevamente.');
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        }
    }

    function showSuccessMessage() {
        const successHTML = `
            <div class="success-message">
                <h2>¡Solicitud enviada con éxito!</h2>
                <p>Revisaremos la información y te contactaremos por WhatsApp en las próximas 48 horas.</p>
                <button onclick="location.reload()" class="btn-primary" style="margin-top: 20px;">
                    Agregar otra cancha
                </button>
            </div>
        `;

        form.style.display = 'none';
        const wrapper = document.querySelector('.form-wrapper');
        if (wrapper) wrapper.insertAdjacentHTML('beforeend', successHTML);
    }

    //  INIT 
    function init() {
        if (typeof emailjs !== 'undefined') {
            emailjs.init(EMAILJS_PUBLIC_KEY);
        }

        createPreviewContainer();
        setupDragAndDrop();
        form.addEventListener('submit', handleSubmit);

        console.log(' initAddFieldForm with Cloudinary initialized');
    }

    init();
}
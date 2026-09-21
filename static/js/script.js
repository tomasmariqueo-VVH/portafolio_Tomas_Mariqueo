console.log("Conexión con JS correcta...")

document.addEventListener("DOMContentLoaded", () => {
    // ==========================================
    // 1. MANEJO DEL FORMULARIO DE CONTACTO
    // ==========================================
    const formulario = document.getElementById("formulario-contacto");
    const mensajeEstado = document.getElementById("mensaje-estado");
    const campoMensaje = document.getElementById("mensaje");
    const contadorCaracteres = document.getElementById("contador-caracteres");

    if (formulario) {
        formulario.addEventListener("submit", (e) => {
            e.preventDefault(); // Evita la recarga de página

            const nombre = document.getElementById("nombre").value.trim();
            const correo = document.getElementById("correo").value.trim();
            const mensaje = campoMensaje.value.trim();

            if (!nombre || !correo || !mensaje) {
                mostrarEstado("Por favor, completa todos los campos.", "error");
                return;
            }

            // Simulación de envío exitoso
            mostrarEstado("Enviando mensaje...", "");

            setTimeout(() => {
                mostrarEstado(`¡Gracias ${nombre}! Tu mensaje ha sido enviado con éxito.`, "exito");
                formulario.reset();
                if (contadorCaracteres) {
                    contadorCaracteres.textContent = "0 / 300";
                }
            }, 1200);
        });
    }

    function mostrarEstado(texto, tipo) {
        if (!mensajeEstado) return;
        mensajeEstado.textContent = texto;
        mensajeEstado.className = "mensaje-estado " + tipo;
    }

    // ==========================================
    // 2. CONTADOR DE CARACTERES EN TIEMPO REAL
    // ==========================================
    if (campoMensaje && contadorCaracteres) {
        const maxCaracteres = campoMensaje.getAttribute("maxlength") || 300;

        campoMensaje.addEventListener("input", () => {
            const actual = campoMensaje.value.length;
            contadorCaracteres.textContent = `${actual} / ${maxCaracteres}`;

            if (actual >= maxCaracteres - 20) {
                contadorCaracteres.style.color = "var(--rojo)";
            } else {
                contadorCaracteres.style.color = "var(--gris-texto)";
            }
        });
    }

    // ==========================================
    // 3. RESALTE DE SECCIÓN ACTIVA AL HACER SCROLL
    // ==========================================
    const secciones = document.querySelectorAll(".tarjeta, .portada");
    const navLinks = document.querySelectorAll(".nav-links a");

    window.addEventListener("scroll", () => {
        let seccionActual = "";

        secciones.forEach((seccion) => {
            const seccionTop = seccion.offsetTop - 120;
            const seccionHeight = seccion.offsetHeight;

            if (window.scrollY >= seccionTop && window.scrollY < seccionTop + seccionHeight) {
                seccionActual = seccion.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("activo");
            if (link.getAttribute("href") === `#${seccionActual}`) {
                link.classList.add("activo");
            }
        });
    });
});
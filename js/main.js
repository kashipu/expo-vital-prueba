function initializeCommonFeatures() {
    // Menú hamburguesa
    const menuHamburguesa = document.getElementById('menuHamburguesa');
    const menuNavegacion = document.getElementById('menuNavegacion');

    if (menuHamburguesa && menuNavegacion) {
        menuHamburguesa.addEventListener('click', function() {
            menuNavegacion.classList.toggle('activo');
            menuHamburguesa.classList.toggle('activo');
        });

        // Cerrar menú al hacer clic en un enlace
        const navLinks = document.querySelectorAll('.enlace-navegacion');
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                menuNavegacion.classList.remove('activo');
                menuHamburguesa.classList.remove('activo');
            });
        });

        // Cerrar menú al hacer clic fuera de él
        document.addEventListener('click', function(e) {
            if (!menuHamburguesa.contains(e.target) && !menuNavegacion.contains(e.target)) {
                menuNavegacion.classList.remove('activo');
                menuHamburguesa.classList.remove('activo');
            }
        });
    }
}

// Formulario
function initializeHomePage() {
    // Validación básica del formulario
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('¡Formulario enviado exitosamente!');
        });
    }
}

// Funcionalidad específica para la página de eventos (eventos.html)
function initializeEventsPage() {
    // Datos JSON de eventos
    const eventosData = {
        "eventos": [
            {
                "id": 1,
                "titulo": "Aromaterapia para el Estrés",
                "categoria": "belleza",
                "tipo": "taller",
                "presentador": "Biotecgen",
                "descripcion": "Técnicas de aromaterapia para reducir el estrés y mejorar el bienestar emocional.",
                "hora": "11:00 am - 12:00 p.m.",
                "fecha": "2024-09-24",
                "fechaTexto": "24 de septiembre",
                "ubicacion": "Salón Wellness",
                "esHoy": true,
                "destacado": true
            },
            {
                "id": 2,
                "titulo": "Rutinas de Skincare Natural",
                "categoria": "belleza",
                "tipo": "taller",
                "presentador": "DermaNatural",
                "descripcion": "Aprende a crear rutinas de cuidado facial con ingredientes naturales y productos orgánicos.",
                "hora": "2:00 pm - 3:30 p.m.",
                "fecha": "2024-09-24",
                "fechaTexto": "24 de septiembre",
                "ubicacion": "Salón Beauty",
                "esHoy": true,
                "destacado": false
            },
            {
                "id": 3,
                "titulo": "Yoga y Meditación",
                "categoria": "bienestar",
                "tipo": "masterclass",
                "presentador": "Zentro Wellness",
                "descripcion": "Sesión de yoga y meditación para encontrar el equilibrio entre cuerpo y mente.",
                "hora": "9:00 am - 10:30 a.m.",
                "fecha": "2024-09-24",
                "fechaTexto": "24 de septiembre",
                "ubicacion": "Salón Zen",
                "esHoy": true,
                "destacado": false
            },
            {
                "id": 4,
                "titulo": "Nutrición Deportiva",
                "categoria": "fitness",
                "tipo": "conferencia",
                "presentador": "Dr. Carlos Méndez",
                "descripcion": "Conferencia sobre la importancia de la nutrición en el rendimiento deportivo y la recuperación.",
                "hora": "4:00 pm - 5:00 p.m.",
                "fecha": "2024-09-24",
                "fechaTexto": "24 de septiembre",
                "ubicacion": "Auditorio Principal",
                "esHoy": true,
                "destacado": false
            },
            {
                "id": 5,
                "titulo": "Maquillaje Profesional",
                "categoria": "belleza",
                "tipo": "demostracion",
                "presentador": "Make Up Studio",
                "descripcion": "Demostración de técnicas profesionales de maquillaje para diferentes ocasiones.",
                "hora": "10:00 am - 11:30 a.m.",
                "fecha": "2024-09-25",
                "fechaTexto": "25 de septiembre",
                "ubicacion": "Estudio de Belleza",
                "esHoy": false,
                "destacado": false
            },
            {
                "id": 6,
                "titulo": "Entrenamiento Funcional",
                "categoria": "fitness",
                "tipo": "taller",
                "presentador": "FitTraining Pro",
                "descripcion": "Aprende ejercicios funcionales que puedes hacer en casa para mantenerte en forma.",
                "hora": "3:00 pm - 4:30 p.m.",
                "fecha": "2024-09-25",
                "fechaTexto": "25 de septiembre",
                "ubicacion": "Zona Fitness",
                "esHoy": false,
                "destacado": false
            },
            {
                "id": 7,
                "titulo": "Medicina Estética Avanzada",
                "categoria": "salud",
                "tipo": "conferencia",
                "presentador": "Dra. Ana Rodríguez",
                "descripcion": "Últimas tendencias en medicina estética y tratamientos no invasivos para el rejuvenecimiento.",
                "hora": "11:00 am - 12:30 p.m.",
                "fecha": "2024-09-25",
                "fechaTexto": "25 de septiembre",
                "ubicacion": "Sala Médica",
                "esHoy": false,
                "destacado": false
            },
            {
                "id": 8,
                "titulo": "Terapias de Relajación",
                "categoria": "bienestar",
                "tipo": "taller",
                "presentador": "SpaVital",
                "descripcion": "Técnicas de relajación y manejo del estrés para mejorar la calidad de vida.",
                "hora": "1:00 pm - 2:30 p.m.",
                "fecha": "2024-09-26",
                "fechaTexto": "26 de septiembre",
                "ubicacion": "Salón Relax",
                "esHoy": false,
                "destacado": false
            },
            {
                "id": 9,
                "titulo": "Cuidado Capilar Integral",
                "categoria": "belleza",
                "tipo": "masterclass",
                "presentador": "Hair Expert",
                "descripcion": "Masterclass sobre cuidado capilar, tratamientos y productos para diferentes tipos de cabello.",
                "hora": "10:00 am - 11:30 a.m.",
                "fecha": "2024-09-26",
                "fechaTexto": "26 de septiembre",
                "ubicacion": "Salón Capilar",
                "esHoy": false,
                "destacado": false
            }
        ]
    };

    // Variables globales
    let eventosFiltrados = [...eventosData.eventos];

    // Función para obtener el color de la etiqueta según la categoría
    function obtenerColorCategoria(categoria) {
        const colores = {
            'belleza': 'etiqueta-belleza',
            'salud': 'etiqueta-salud',
            'fitness': 'etiqueta-fitness',
            'bienestar': 'etiqueta-bienestar'
        };
        return colores[categoria] || 'etiqueta-default';
    }

    // Función para obtener el color de la etiqueta según el tipo
    function obtenerColorTipo(tipo) {
        const colores = {
            'taller': 'etiqueta-taller',
            'conferencia': 'etiqueta-conferencia',
            'demostracion': 'etiqueta-demostracion',
            'masterclass': 'etiqueta-masterclass'
        };
        return colores[tipo] || 'etiqueta-default';
    }

    // Función para crear HTML de una tarjeta de evento
    function crearTarjetaEvento(evento) {
        return `
            <div class="tarjeta-evento" data-categoria="${evento.categoria}" data-tipo="${evento.tipo}" data-fecha="${evento.fecha}">
                <div class="etiquetas-evento">
                    <span class="etiqueta ${obtenerColorCategoria(evento.categoria)}">${evento.categoria.charAt(0).toUpperCase() + evento.categoria.slice(1)}</span>
                    <span class="etiqueta ${obtenerColorTipo(evento.tipo)}">${evento.tipo.charAt(0).toUpperCase() + evento.tipo.slice(1)}</span>
                </div>
                <h3 class="titulo-evento">${evento.titulo}</h3>
                <p class="presentador-evento">Por: ${evento.presentador}</p>
                <p class="descripcion-evento">${evento.descripcion}</p>
                <div class="detalles-evento">
                    <div class="hora-evento">${evento.hora}</div>
                    <div class="fecha-evento">${evento.fechaTexto}</div>
                    <div class="ubicacion-evento">${evento.ubicacion}</div>
                </div>
                <button class="boton-primario boton-completo" onclick="inscribirseEvento(${evento.id})">
                    Inscríbete aquí
                </button>
            </div>
        `;
    }

    // Función para renderizar eventos
    function renderizarEventos() {
        const eventosHoy = document.getElementById('eventosHoy');
        const proximosEventos = document.getElementById('proximosEventos');
        const eventoDestacado = document.getElementById('eventoDestacado');

        if (!eventosHoy || !proximosEventos || !eventoDestacado) return;

        // Limpiar contenedores
        eventosHoy.innerHTML = '';
        proximosEventos.innerHTML = '';

        // Filtrar eventos
        const eventosHoyFiltrados = eventosFiltrados.filter(evento => evento.esHoy);
        const eventosProximosFiltrados = eventosFiltrados.filter(evento => !evento.esHoy);

        // Renderizar eventos de hoy
        if (eventosHoyFiltrados.length > 0) {
            eventosHoy.innerHTML = eventosHoyFiltrados.map(crearTarjetaEvento).join('');
        } else {
            eventosHoy.innerHTML = '<p class="sin-eventos">No hay eventos que coincidan con los filtros seleccionados.</p>';
        }

        // Renderizar próximos eventos
        if (eventosProximosFiltrados.length > 0) {
            proximosEventos.innerHTML = eventosProximosFiltrados.map(crearTarjetaEvento).join('');
        } else {
            proximosEventos.innerHTML = '<p class="sin-eventos">No hay próximos eventos que coincidan con los filtros seleccionados.</p>';
        }

        // Renderizar evento destacado
        const destacado = eventosData.eventos.find(evento => evento.destacado);
        if (destacado) {
            eventoDestacado.innerHTML = crearTarjetaEvento(destacado);
        }
    }

    // Función para aplicar filtros
    function aplicarFiltros() {
        const categoriaElement = document.getElementById('categoria');
        const tipoEventoElement = document.getElementById('tipoEvento');
        const fechaElement = document.getElementById('fecha');

        if (!categoriaElement || !tipoEventoElement || !fechaElement) return;

        const categoria = categoriaElement.value;
        const tipo = tipoEventoElement.value;
        const fecha = fechaElement.value;

        eventosFiltrados = eventosData.eventos.filter(evento => {
            const coincideCategoria = !categoria || evento.categoria === categoria;
            const coincideTipo = !tipo || evento.tipo === tipo;
            const coincideFecha = !fecha || evento.fecha === fecha;

            return coincideCategoria && coincideTipo && coincideFecha;
        });

        renderizarEventos();
    }

    // Función para inscribirse a un evento (global para onclick)
    window.inscribirseEvento = function(eventoId) {
        const evento = eventosData.eventos.find(e => e.id === eventoId);
        if (evento) {
            alert(`Te has inscrito exitosamente al evento: ${evento.titulo}`);
        }
    };

    // Inicializar eventos
    renderizarEventos();
    
    // Agregar event listeners para filtros
    const categoriaElement = document.getElementById('categoria');
    const tipoEventoElement = document.getElementById('tipoEvento');
    const fechaElement = document.getElementById('fecha');

    if (categoriaElement) categoriaElement.addEventListener('change', aplicarFiltros);
    if (tipoEventoElement) tipoEventoElement.addEventListener('change', aplicarFiltros);
    if (fechaElement) fechaElement.addEventListener('change', aplicarFiltros);
}

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    initializeCommonFeatures();
    initializeHomePage();
    initializeEventsPage();
});
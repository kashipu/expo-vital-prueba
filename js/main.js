// === MENÚ HAMBURGUESA ===
function initMenuHamburguesa() {
    const menuBtn = document.getElementById('menuHamburguesa');
    const menu = document.getElementById('menuNavegacion');
    
    if (!menuBtn || !menu) return;

    // Alternar menú
    menuBtn.addEventListener('click', () => {
        menu.classList.toggle('activo');
        menuBtn.classList.toggle('activo');
    });

    // Cerrar menú al hacer clic en enlaces
    menu.querySelectorAll('.enlace-navegacion').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('activo');
            menuBtn.classList.remove('activo');
        });
    });

    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', (e) => {
        if (!menuBtn.contains(e.target) && !menu.contains(e.target)) {
            menu.classList.remove('activo');
            menuBtn.classList.remove('activo');
        }
    });
}

// === FORMULARIOS ===
function initFormularios() {
    const formularios = document.querySelectorAll('form');
    
    formularios.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('¡Formulario enviado exitosamente!');
        });
    });
}

// === EVENTOS ===
function initEventos() {
    // Solo ejecutar si estamos en la página de eventos
    if (!document.getElementById('eventosHoy')) return;
    
    let eventosFiltrados = [...EVENTOS_DATA.eventos];

    // Crear HTML de evento
    function crearEventoHTML(evento) {
        const categoriaClass = `etiqueta-${evento.categoria}`;
        const tipoClass = `etiqueta-${evento.tipo}`;
        
        return `
            <div class="tarjeta-evento">
                <div class="etiquetas-evento">
                    <span class="etiqueta ${categoriaClass}">${evento.categoriaTexto}</span>
                    <span class="etiqueta ${tipoClass}">${evento.tipoTexto}</span>
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

    // Mostrar eventos en contenedores
    function mostrarEventos() {
        const eventosHoy = document.getElementById('eventosHoy');
        const proximosEventos = document.getElementById('proximosEventos');
        const eventoDestacado = document.getElementById('eventoDestacado');

        if (!eventosHoy || !proximosEventos) return;

        const hoy = eventosFiltrados.filter(evento => evento.esHoy);
        const proximos = eventosFiltrados.filter(evento => !evento.esHoy);

        eventosHoy.innerHTML = hoy.length > 0 
            ? hoy.map(crearEventoHTML).join('') 
            : '<p class="sin-eventos">No hay eventos para hoy.</p>';

        proximosEventos.innerHTML = proximos.length > 0 
            ? proximos.map(crearEventoHTML).join('') 
            : '<p class="sin-eventos">No hay eventos próximos.</p>';

        // Evento destacado
        const destacado = EVENTOS_DATA.eventos.find(evento => evento.destacado);
        if (destacado && eventoDestacado) {
            eventoDestacado.innerHTML = crearEventoHTML(destacado);
        }
    }

    // Filtrar eventos
    function filtrarEventos() {
        const categoria = document.getElementById('categoria')?.value || '';
        const tipo = document.getElementById('tipoEvento')?.value || '';
        const fecha = document.getElementById('fecha')?.value || '';

        eventosFiltrados = EVENTOS_DATA.eventos.filter(evento => {
            return (!categoria || evento.categoria === categoria) &&
                   (!tipo || evento.tipo === tipo) &&
                   (!fecha || evento.fecha === fecha);
        });

        mostrarEventos();
    }

    // Inscripción a evento
    window.inscribirseEvento = function(eventoId) {
        const evento = EVENTOS_DATA.eventos.find(e => e.id === eventoId);
        if (evento) {
            alert(`¡Inscripción exitosa! Te esperamos en: ${evento.titulo}`);
        }
    };

    // Inicializar
    mostrarEventos();

    // Agregar listeners a filtros
    ['categoria', 'tipoEvento', 'fecha'].forEach(id => {
        const elemento = document.getElementById(id);
        if (elemento) elemento.addEventListener('change', filtrarEventos);
    });
}

// === INICIALIZACIÓN ===
document.addEventListener('DOMContentLoaded', () => {
    initMenuHamburguesa();
    initFormularios();
    initEventos();
});
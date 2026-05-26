/* ═══════════════════════════════════════════════════
   HOME MARKET — CATÁLOGO DIGITAL
   script.js
   - Carga productos desde productos.json
   - Filtros por categoría
   - Buscador en tiempo real
   - Modal de detalle
   - Scroll header
═══════════════════════════════════════════════════ */

// ── Estado global ──────────────────────────────────
let todosLosProductos = [];
let categoriaActiva   = 'Todos';
let textoBusqueda     = '';

// ── Número de WhatsApp ─────────────────────────────
const WA_NUMERO = '50494700698';

// ── Colores de badge por texto ─────────────────────
const BADGE_CLASES = {
  '40% off':        'badge-promo',
  'nuevo':          'badge-nuevo',
  'disponible':     'badge-disp',
  'últimas unidades':'badge-ultimas',
  'viral':          'badge-viral',
  'más vendida':    'badge-vendido',
  'más vendido':    'badge-vendido',
};

/* ═══════════════════════════════════════════════════
   ARRANQUE
═══════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  iniciarHeader();
  cargarProductos();
  iniciarFiltros();
  iniciarBuscador();
  iniciarModal();
});

/* ═══════════════════════════════════════════════════
   HEADER — sombra al hacer scroll
═══════════════════════════════════════════════════ */
function iniciarHeader() {
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });
}

/* ═══════════════════════════════════════════════════
   CARGA DE PRODUCTOS
═══════════════════════════════════════════════════ */
async function cargarProductos() {
  const loading = document.getElementById('loading');
  const grid    = document.getElementById('productosGrid');

  loading.style.display = 'block';
  grid.style.display    = 'none';

  try {
    const res  = await fetch('productos.json');
    if (!res.ok) throw new Error('No se pudo cargar productos.json');
    todosLosProductos = await res.json();
  } catch (err) {
    console.warn('Error cargando productos.json:', err);
    // Productos de demostración si falla el fetch (ej: sin Live Server)
    todosLosProductos = obtenerProductosDemostracion();
  }

  loading.style.display = 'none';
  grid.style.display    = 'grid';

  renderizarProductos(todosLosProductos);
}

/* ═══════════════════════════════════════════════════
   RENDERIZADO
═══════════════════════════════════════════════════ */
function renderizarProductos(lista) {
  const grid         = document.getElementById('productosGrid');
  const sinResultados = document.getElementById('sinResultados');

  grid.innerHTML = '';

  if (!lista.length) {
    grid.style.display    = 'none';
    sinResultados.style.display = 'block';
    return;
  }

  grid.style.display    = 'grid';
  sinResultados.style.display = 'none';

  lista.forEach((producto, index) => {
    const card = crearTarjeta(producto, index);
    grid.appendChild(card);
  });
}

/* ─────────────────────────────────────────────────
   Crear tarjeta de producto
───────────────────────────────────────────────── */
function crearTarjeta(producto, index) {
  const card = document.createElement('div');
  card.className = 'producto-card';
  card.style.animationDelay = `${index * 60}ms`;
  card.setAttribute('role', 'article');
  card.setAttribute('aria-label', producto.nombre);

  const mensajeWA = encodeURIComponent(
    `Hola, estoy interesado/a en *${producto.nombre}* del catálogo Home Market. ¿Me pueden dar más información?`
  );
  const linkWA = `https://wa.me/${WA_NUMERO}?text=${mensajeWA}`;

  // Badge de promo
  const badgeHTML = producto.promo
    ? `<span class="card-badge ${obtenerClaseBadge(producto.promo)}">${producto.promo}</span>`
    : '';

  card.innerHTML = `
    <div class="card-imagen-wrap">
      <img
        class="card-imagen"
        src="${producto.imagen}"
        alt="${producto.nombre}"
        loading="lazy"
        onerror="mostrarPlaceholder(this)"
      />
      ${badgeHTML}
    </div>
    <div class="card-body">
      <span class="card-cat">${producto.categoria}</span>
      <h3 class="card-nombre">${producto.nombre}</h3>
      <p class="card-desc">${producto.descripcion}</p>
      <p class="card-medidas">${producto.medidas}</p>
    </div>
    <div class="card-footer">
      <span class="card-precio">${producto.precio}</span>
      <a
        class="card-btn-wa"
        href="${linkWA}"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Consultar ${producto.nombre} por WhatsApp"
        onclick="event.stopPropagation()"
      >💬 Consultar</a>
    </div>
  `;

  // Abrir modal al hacer clic en la tarjeta
  card.addEventListener('click', () => abrirModal(producto));

  return card;
}

/* ─────────────────────────────────────────────────
   Placeholder cuando la imagen falla
───────────────────────────────────────────────── */
function mostrarPlaceholder(imgEl) {
  const wrap = imgEl.closest('.card-imagen-wrap');
  imgEl.style.display = 'none';
  const ph = document.createElement('div');
  ph.className = 'card-placeholder';
  ph.innerHTML = `
    <span class="card-placeholder-icon">🛏️</span>
    <span class="card-placeholder-txt">Home Market</span>
  `;
  wrap.appendChild(ph);
}

/* ─────────────────────────────────────────────────
   Clase de badge
───────────────────────────────────────────────── */
function obtenerClaseBadge(texto) {
  const clave = texto.toLowerCase();
  return BADGE_CLASES[clave] || 'badge-nuevo';
}

/* ═══════════════════════════════════════════════════
   FILTROS
═══════════════════════════════════════════════════ */
function iniciarFiltros() {
  const botones = document.querySelectorAll('.filtro');
  botones.forEach(btn => {
    btn.addEventListener('click', () => {
      categoriaActiva = btn.dataset.cat;
      botones.forEach(b => b.classList.remove('activo'));
      btn.classList.add('activo');
      aplicarFiltros();
    });
  });
}

// También usada desde el footer
function filtrarCategoria(cat) {
  categoriaActiva = cat;
  document.querySelectorAll('.filtro').forEach(b => {
    b.classList.toggle('activo', b.dataset.cat === cat);
  });
  aplicarFiltros();
  document.getElementById('catalogo').scrollIntoView({ behavior: 'smooth' });
  return false;
}

/* ═══════════════════════════════════════════════════
   BUSCADOR
═══════════════════════════════════════════════════ */
function iniciarBuscador() {
  const input = document.getElementById('buscador');
  const clear = document.getElementById('buscadorClear');

  input.addEventListener('input', () => {
    textoBusqueda = input.value.trim();
    clear.classList.toggle('visible', textoBusqueda.length > 0);
    aplicarFiltros();
  });

  clear.addEventListener('click', () => {
    input.value   = '';
    textoBusqueda = '';
    clear.classList.remove('visible');
    aplicarFiltros();
    input.focus();
  });
}

/* ═══════════════════════════════════════════════════
   LÓGICA DE FILTRO COMBINADA
═══════════════════════════════════════════════════ */
function aplicarFiltros() {
  const texto = textoBusqueda.toLowerCase();

  const resultado = todosLosProductos.filter(p => {
    const porCategoria =
      categoriaActiva === 'Todos' ||
      p.categoria === categoriaActiva;

    const porTexto =
      !texto ||
      p.nombre.toLowerCase().includes(texto) ||
      p.descripcion.toLowerCase().includes(texto) ||
      p.categoria.toLowerCase().includes(texto);

    return porCategoria && porTexto;
  });

  renderizarProductos(resultado);
}

/* Función pública para el botón "Ver todos" */
function resetFiltros() {
  categoriaActiva = 'Todos';
  textoBusqueda   = '';
  document.getElementById('buscador').value = '';
  document.getElementById('buscadorClear').classList.remove('visible');
  document.querySelectorAll('.filtro').forEach(b => {
    b.classList.toggle('activo', b.dataset.cat === 'Todos');
  });
  renderizarProductos(todosLosProductos);
}

/* ═══════════════════════════════════════════════════
   MODAL DE DETALLE
═══════════════════════════════════════════════════ */
function iniciarModal() {
  const overlay = document.getElementById('modalOverlay');
  const btnClose = document.getElementById('modalClose');

  // Cerrar con botón
  btnClose.addEventListener('click', cerrarModal);

  // Cerrar al hacer clic fuera del modal
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) cerrarModal();
  });

  // Cerrar con Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') cerrarModal();
  });
}

function abrirModal(producto) {
  const overlay = document.getElementById('modalOverlay');
  const content = document.getElementById('modalContent');

  const mensajeWA = encodeURIComponent(
    `Hola, estoy interesado/a en *${producto.nombre}* del catálogo Home Market. ¿Me pueden dar más información?`
  );
  const linkWA = `https://wa.me/${WA_NUMERO}?text=${mensajeWA}`;

  const badgeHTML = producto.promo
    ? `<span class="card-badge ${obtenerClaseBadge(producto.promo)}" style="position:relative;top:0;left:0;margin-bottom:12px;display:inline-block">${producto.promo}</span>`
    : '';

  content.innerHTML = `
    <img
      class="modal-img"
      src="${producto.imagen}"
      alt="${producto.nombre}"
      onerror="this.style.background='#E8D5B5';this.alt=''"
    />
    <div class="modal-body">
      <p class="modal-cat">${producto.categoria}</p>
      ${badgeHTML}
      <h2 class="modal-nombre">${producto.nombre}</h2>
      <p class="modal-desc">${producto.descripcion}</p>
      <div class="modal-meta">
        <div class="modal-meta-item">
          <strong>Medidas</strong>
          ${producto.medidas}
        </div>
        <div class="modal-meta-item">
          <strong>Precio</strong>
          ${producto.precio}
        </div>
      </div>
      <div class="modal-precio-row">
        <span class="modal-precio">${producto.precio}</span>
        <a
          class="btn btn-wa"
          href="${linkWA}"
          target="_blank"
          rel="noopener noreferrer"
        >💬 Consultar por WhatsApp</a>
      </div>
    </div>
  `;

  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function cerrarModal() {
  const overlay = document.getElementById('modalOverlay');
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

/* ═══════════════════════════════════════════════════
   PRODUCTOS DE DEMOSTRACIÓN
   (Se muestran si productos.json no carga,
   por ejemplo al abrir index.html directo sin servidor)
═══════════════════════════════════════════════════ */
function obtenerProductosDemostracion() {
  return [
    {
      nombre: "Cama Sealy Premium Queen",
      categoria: "Camas",
      descripcion: "Tecnología de resortes Posturepedic para un descanso profundo. Ideal para quienes sufren dolor de espalda.",
      medidas: "Queen (152 x 190 cm)",
      precio: "Desde L 18,000",
      promo: "40% OFF",
      imagen: "productos/cama-sealy.jpg"
    },
    {
      nombre: "Cabecera Milano",
      categoria: "Cabeceras",
      descripcion: "Diseño moderno tapizado en tela premium. Transforma tu habitación al instante.",
      medidas: "Queen y King",
      precio: "Consultar precio",
      promo: "Nuevo",
      imagen: "productos/cabecera-milano.jpg"
    },
    {
      nombre: "Pad Memory Foam Hotelero",
      categoria: "Accesorios",
      descripcion: "Convierte cualquier colchón en cama de hotel en minutos. El accesorio más viral de la tienda.",
      medidas: "Matrimonial, Queen y King",
      precio: "Desde L 2,200",
      promo: "40% OFF",
      imagen: "productos/pad-memory.jpg"
    },
    {
      nombre: "Almohada Memory Foam Ergonómica",
      categoria: "Almohadas",
      descripcion: "Diseñada por expertos en descanso. Alivia el dolor de cuello y mejora tu postura.",
      medidas: "Estándar y King",
      precio: "Desde L 850",
      promo: "Más vendida",
      imagen: "productos/almohada-memory.jpg"
    },
    {
      nombre: "Set Línea Hotelera Premium",
      categoria: "Línea Hotelera",
      descripcion: "El set completo para dormir como en un hotel 5 estrellas: sábanas, almohadas, pad y protector.",
      medidas: "Queen y King",
      precio: "Desde L 5,500",
      promo: "40% OFF",
      imagen: "productos/linea-hotelera.jpg"
    },
    {
      nombre: "Closet Madera Milano",
      categoria: "Closets",
      descripcion: "Organiza tu vida desde el dormitorio. Modular, elegante y fácil de instalar.",
      medidas: "200 x 240 cm (personalizable)",
      precio: "Desde L 12,000",
      promo: "Últimas unidades",
      imagen: "productos/closet-madera.jpg"
    }
  ];
}

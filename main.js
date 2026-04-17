// ===== DATOS =====
const sedes = {
    lima: {
        nombre:'Lima', direccion:'Av. Reducto 1278, Miraflores',
        telefono:'01 242 9009', horario:'Mar–Dom: 12:00 PM – 6:00 PM',
        delivery:0, reservaUrl:'https://fiesta.mesa247.pe/reservas/#/fiesta_lima',
        comida:[
            {id:1, nombre:'Croqueta de Mero Murike', precio:35, desc:'Pulpa de pescado hecha croqueta crujiente', img:'fiesta 28.jpg', badge:'Más Vendido', cat:'entradas'},
            {id:2, nombre:'Pulpo a la Parrilla', precio:89, desc:'Pulpo con aceite de oliva y cebollines', img:'pulpo.jpeg', badge:'Recomendado', cat:'fondos'},
            {id:3, nombre:'Arroz con Mariscos', precio:55, desc:'Arroz cremoso con mariscos frescos del día', img:'patobola.jpeg', badge:null, cat:'fondos'},
            {id:4, nombre:'Ají de Gallina', precio:42, desc:'Pechuga en salsa de ají amarillo con papa', img:'gui1.jpeg', badge:'Tradicional', cat:'fondos'},
            {id:5, nombre:'Causa Limeña', precio:32, desc:'Papa amarilla con pollo deshilachado y palta', img:'langosta.jpeg', badge:null, cat:'entradas'},
            {id:6, nombre:'Ceviche Super Fiesta', precio:200, desc:'Pesca y mariscos, leche de tigre y ají limo', img:'fiest1.jpeg', badge:'Premium', cat:'fondos'}
        ],
        bebidas:[
            {id:7, nombre:'Pisco Sour', precio:25, desc:'Cóctel bandera del Perú con pisco y limón', img:'coctel1.jpeg', badge:'Signature', cat:'cocteles'},
            {id:8, nombre:'Chilcano', precio:22, desc:'Pisco y ginger ale con limón y angostura', img:'coctel2.jpeg', badge:null, cat:'cocteles'},
            {id:9, nombre:'Chicha Morada', precio:12, desc:'Maíz morado con piña y especias', img:'coctel3.jpeg', badge:'Natural', cat:'bebidas'},
            {id:10, nombre:'Inca Kola', precio:8, desc:'Gaseosa peruana 500ml', img:'coctel4.jpeg', badge:null, cat:'bebidas'},
            {id:11, nombre:'Cerveza Artesanal', precio:18, desc:'Cerveza rubia artesanal 500ml', img:'coctel5.jpeg', badge:'Artesanal', cat:'bebidas'},
            {id:12, nombre:'Mojito', precio:24, desc:'Ron blanco con maracuyá y menta fresca', img:'coctel6.jpeg', badge:null, cat:'cocteles'}
        ]
    },
    chiclayo: {
        nombre:'Chiclayo', direccion:'Av. Salaverry 1820, Chiclayo',
        telefono:'924 516 825', horario:'Mar–Dom: 12:00 PM – 6:00 PM',
        delivery:6, reservaUrl:'https://fiesta.mesa247.pe/reservas/#/fiesta_chiclayo',
        comida:[
            {id:101, nombre:'Coletilla de Mero Murike x kg', precio:230, desc:'Cola de Mero Murike frito y jugoso', img:'coletilla.jpeg', badge:'Especialidad', cat:'fondos'},
            {id:102, nombre:'Espesado', precio:38, desc:'Plato típico norteño con carne y yuca', img:'espesado.jpeg', badge:'Tradicional', cat:'fondos'},
            {id:103, nombre:'Tortilla de Raya', precio:52, desc:'Raya seca frita con huevo y especias', img:'langosta.jpeg', badge:'Típico', cat:'entradas'},
            {id:104, nombre:'Ceviche Norteño', precio:46, desc:'Con chicharrón de pescado y salsa de ají', img:'gui1.jpeg', badge:null, cat:'fondos'},
            {id:105, nombre:'King Kong', precio:25, desc:'Dulce típico de manjarblanco y frutas', img:'patobola.jpeg', badge:'Postre', cat:'postres'},
            {id:106, nombre:'Seco de Chavelo', precio:40, desc:'Carne de res con plátano maduro y yuca', img:'kingkong.jpeg', badge:null, cat:'fondos'}
        ],
        bebidas:[
            {id:107, nombre:'Pisco Sour', precio:24, desc:'Cóctel bandera del Perú', img:'coctel7.jpeg', badge:'Signature', cat:'cocteles'},
            {id:108, nombre:'Chicha de Jora', precio:10, desc:'Bebida fermentada tradicional del norte', img:'coctel8.jpeg', badge:'Típico', cat:'bebidas'},
            {id:109, nombre:'Cerveza Norteña', precio:15, desc:'Cerveza local artesanal', img:'coctel9.jpeg', badge:'Local', cat:'bebidas'},
            {id:110, nombre:'Guarapo', precio:8, desc:'Jugo fresco de caña de azúcar', img:'coctel10.jpeg', badge:'Natural', cat:'bebidas'},
            {id:111, nombre:'Pisco Acholado', precio:26, desc:'Pisco premium de uvas seleccionadas', img:'coctel11.jpeg', badge:'Premium', cat:'cocteles'},
            {id:112, nombre:'Inca Kola', precio:8, desc:'Gaseosa peruana 500ml', img:'coctel12.jpeg', badge:null, cat:'bebidas'}
        ]
    }
};

// ===== ESTADO GLOBAL =====
let sedeAct = 'lima', carrito = [], logged = false, usr = null, curT = 0, tInt, searchQuery = '';

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
    cambiarSede('lima');
    initScroll();
    initReveal();
    initTesti();
    initSearch();
    initKeyboard();
    initHeroBg();

    const s = sessionStorage.getItem('fiestaUsr');
    if (s) {
        try { usr = JSON.parse(s); logged = true; document.getElementById('userDot').style.display = 'block'; } catch(e) {}
    }
});

// ===== HERO BG PARALLAX REVEAL =====
function initHeroBg() {
    const bg = document.getElementById('heroBg');
    if (bg) { bg.classList.add('loaded') }
}

// ===== SCROLL REVEAL =====
function initReveal() {
    const obs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('in');
                obs.unobserve(e.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => obs.observe(el));
}

// ===== SCROLL & HEADER =====
function initScroll() {
    const hdr = document.getElementById('hdr'), catBar = document.querySelector('.cat-bar');
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const y = window.scrollY;
                hdr.classList.toggle('sc', y > 60);
                if (catBar) catBar.classList.toggle('sc', y > 60);
                const secs = ['filosofia','carta','spotlight','galeria','testimonios'];
                let cur = '';
                secs.forEach(id => {
                    const el = document.getElementById(id);
                    if (el && el.offsetTop - 200 <= y) cur = id;
                });
                document.querySelectorAll('.dna').forEach(a => {
                    a.classList.toggle('act', a.getAttribute('href') === '#' + cur);
                });
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

// ===== TESTIMONIOS =====
function initTesti() {
    const cards = document.querySelectorAll('.testi-card'), dots = document.querySelectorAll('.testi-dot');
    function show(i) {
        cards.forEach(c => c.classList.remove('on'));
        dots.forEach(d => { d.classList.remove('on'); d.setAttribute('aria-selected','false') });
        cards[i].classList.add('on');
        dots[i].classList.add('on');
        dots[i].setAttribute('aria-selected','true');
        curT = i;
    }
    dots.forEach(d => {
        d.addEventListener('click', () => { show(+d.dataset.i); clearInterval(tInt); tInt = setInterval(() => show((curT+1) % cards.length), 6000) });
    });
    tInt = setInterval(() => show((curT+1) % cards.length), 6000);
}

// ===== BÚSQUEDA =====
function initSearch() {
    const input = document.getElementById('menuSearch');
    if (!input) return;
    input.addEventListener('input', e => { searchQuery = e.target.value.toLowerCase().trim(); filtrarMenu() });
    document.addEventListener('keydown', e => {
        if (e.key === '/' && document.activeElement !== input && !['INPUT','TEXTAREA'].includes(document.activeElement.tagName)) {
            e.preventDefault(); input.focus();
        }
        if (e.key === 'Escape' && document.activeElement === input) {
            input.blur(); input.value = ''; searchQuery = ''; filtrarMenu();
        }
    });
}

function filtrarMenu() {
    const items = document.querySelectorAll('.pc');
    items.forEach(item => {
        const nombre = (item.querySelector('.pc-name')?.textContent || '').toLowerCase(),
              desc = (item.querySelector('.pc-desc')?.textContent || '').toLowerCase();
        item.style.display = (!searchQuery || nombre.includes(searchQuery) || desc.includes(searchQuery)) ? '' : 'none';
    });
}

// ===== KEYBOARD =====
function initKeyboard() {
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            closeLogin(); cerrarModalReserva(); closeHistoria();
            if (document.getElementById('cartSh').classList.contains('on')) toggleCart();
            if (document.getElementById('mm').classList.contains('on')) toggleMM();
        }
    });
}

// ===== CAMBIAR SEDE =====
function cambiarSede(s) {
    sedeAct = s;
    const d = sedes[s];
    document.querySelectorAll('.sede-b').forEach(b => {
        const on = b.textContent.toLowerCase().trim() === s || (s === 'lima' && b.textContent.trim() === 'Lima') || (s === 'chiclayo' && b.textContent.trim() === 'Chiclayo');
        b.classList.toggle('on', on);
        b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    document.getElementById('sedeInfo').innerHTML = `
        <h3>Fiesta ${d.nombre}</h3>
        <div class="si"><i class="fas fa-map-marker-alt"></i><span>${d.direccion}</span></div>
        <div class="si"><i class="fas fa-phone"></i><span>${d.telefono}</span></div>
        <div class="si"><i class="fas fa-clock"></i><span>${d.horario}</span></div>`;
    document.getElementById('cartSede').textContent = d.nombre;
    render(d.comida, 'cScr', 'cGrid');
    render(d.bebidas, 'bScr', 'bGrid');
    if (carrito.length) { carrito = []; updCart(); toast('Carrito actualizado por cambio de sede', 'warning') }
}

// ===== RENDER =====
function render(prods, scrId, gridId) {
    const h = prods.map(p => `
        <article class="pc" role="listitem" data-cat="${p.cat || 'comida'}">
            <div class="pc-img">
                <img src="${p.img}" alt="${p.nombre}" loading="lazy" width="300" height="200">
                <div class="pc-img-ov"></div>
                ${p.badge ? `<span class="pc-badge">${p.badge}</span>` : ''}
                <button class="pc-fav" onclick="toggleFav(this)" aria-label="Agregar a favoritos" aria-pressed="false">
                    <i class="fas fa-heart"></i>
                </button>
            </div>
            <div class="pc-body">
                <h3 class="pc-name">${p.nombre}</h3>
                <p class="pc-desc">${p.desc}</p>
                <div class="pc-foot">
                    <span class="pc-price">S/ ${p.precio.toFixed(2)}</span>
                    <button class="pc-add" onclick="addCart(${p.id},'${p.nombre.replace(/'/g,"\\'")}',${p.precio},'${p.img}')">
                        <i class="fas fa-plus"></i> Agregar
                    </button>
                </div>
            </div>
        </article>`).join('');
    document.getElementById(scrId).innerHTML = h;
    document.getElementById(gridId).innerHTML = h;
    if (searchQuery) filtrarMenu();
}

// ===== FILTROS =====
document.querySelectorAll('.cp').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.cp').forEach(b => { b.classList.remove('on'); b.setAttribute('aria-selected','false') });
        this.classList.add('on');
        this.setAttribute('aria-selected','true');
        const cat = this.dataset.cat, d = sedes[sedeAct];

        if (cat === 'todos') {
            render(d.comida, 'cScr', 'cGrid');
            render(d.bebidas, 'bScr', 'bGrid');
            document.getElementById('comidaTitle').parentElement.style.display = '';
            document.getElementById('bebidasTitle').parentElement.style.display = '';
        } else if (['comida','entradas','fondos','postres'].includes(cat)) {
            // Filtrar comidas por categoría
            const filtered = cat === 'comida' ? d.comida : d.comida.filter(p => p.cat === cat);
            render(filtered, 'cScr', 'cGrid');
            document.getElementById('bScr').innerHTML = '';
            document.getElementById('bGrid').innerHTML = '';
            document.getElementById('comidaTitle').parentElement.style.display = '';
            document.getElementById('bebidasTitle').parentElement.style.display = 'none';
        } else {
            // Filtrar bebidas/cócteles
            const filtered = cat === 'bebidas' ? d.bebidas : d.bebidas.filter(p => p.cat === cat);
            render(filtered, 'bScr', 'bGrid');
            document.getElementById('cScr').innerHTML = '';
            document.getElementById('cGrid').innerHTML = '';
            document.getElementById('comidaTitle').parentElement.style.display = 'none';
            document.getElementById('bebidasTitle').parentElement.style.display = '';
        }
    });
});

// ===== CARRITO (sin login obligatorio para agregar) =====
function addCart(id, nombre, precio, img) {
    const ex = carrito.find(i => i.id === id);
    if (ex) ex.cant++;
    else carrito.push({ id, nombre, precio, img, cant:1 });
    updCart();
    toast(`${nombre} agregado al pedido`);

    // Animación del ícono de carrito
    const cartIcon = document.querySelector('[aria-label="Carrito"] i');
    if (cartIcon) {
        cartIcon.style.transform = 'scale(1.4)';
        setTimeout(() => { cartIcon.style.transform = '' }, 200);
    }
}

function updCart() {
    const c = document.getElementById('cartItems'), cb = document.getElementById('cartBdg'),
          fc = document.getElementById('fcC'), fb = document.getElementById('fcBtn');
    const tot = carrito.reduce((s,i) => s + i.cant, 0);
    cb.textContent = tot;
    fc.textContent = tot;
    fb.classList.toggle('on', tot > 0);

    if (!carrito.length) {
        c.innerHTML = '<div class="cart-empty"><i class="fas fa-shopping-bag"></i><p>Tu carrito está vacío</p></div>';
        document.getElementById('btnCK').disabled = true;
    } else {
        c.innerHTML = carrito.map(i => `
            <div class="ci">
                <div class="ci-img"><img src="${i.img}" alt="${i.nombre}" loading="lazy"></div>
                <div class="ci-info">
                    <h4 class="ci-name">${i.nombre}</h4>
                    <p class="ci-price">S/ ${i.precio.toFixed(2)}</p>
                    <div class="ci-qty">
                        <button class="ci-qb" onclick="chgQ(${i.id},-1)" aria-label="Reducir">−</button>
                        <span class="ci-qv">${i.cant}</span>
                        <button class="ci-qb" onclick="chgQ(${i.id},1)" aria-label="Aumentar">+</button>
                    </div>
                </div>
                <button class="ci-del" onclick="delI(${i.id})" aria-label="Eliminar"><i class="fas fa-trash-alt"></i></button>
            </div>`).join('');
        document.getElementById('btnCK').disabled = false;
    }
    const d = sedes[sedeAct], sub = carrito.reduce((s,i) => s + i.precio * i.cant, 0), del = carrito.length ? d.delivery : 0;
    document.getElementById('subVal').textContent = 'S/ ' + sub.toFixed(2);
    document.getElementById('delVal').textContent = 'S/ ' + del.toFixed(2);
    document.getElementById('totVal').textContent = 'S/ ' + (sub+del).toFixed(2);
}

function chgQ(id, d) {
    const i = carrito.find(x => x.id === id);
    if (i) { i.cant += d; if (i.cant <= 0) delI(id); else updCart() }
}
function delI(id) { carrito = carrito.filter(i => i.id !== id); updCart(); toast('Producto eliminado', 'warning') }

function toggleCart() {
    const sh = document.getElementById('cartSh'), ov = document.getElementById('cartOv');
    sh.classList.toggle('on'); ov.classList.toggle('on');
    document.body.style.overflow = sh.classList.contains('on') ? 'hidden' : '';
}

function checkout() {
    // Login requerido solo al confirmar pedido
    if (!logged) {
        openLogin();
        toast('Inicia sesión para confirmar tu pedido', 'warning');
        return;
    }
    const d = sedes[sedeAct], sub = carrito.reduce((s,i) => s + i.precio * i.cant, 0), tot = sub + d.delivery;
    const msg = `*PEDIDO FIESTA — ${d.nombre.toUpperCase()}*%0A%0A` +
        carrito.map(i => `• ${i.nombre} x${i.cant} — S/ ${(i.precio*i.cant).toFixed(2)}`).join('%0A') +
        `%0A%0A─────────────%0ASubtotal: S/ ${sub.toFixed(2)}%0ADelivery: S/ ${d.delivery.toFixed(2)}%0A*TOTAL: S/ ${tot.toFixed(2)}*%0A%0A${d.direccion}%0A%0ADirección de entrega:`;
    window.open(`https://wa.me/51932483302?text=${msg}`, '_blank');
}

// ===== FAVORITOS =====
function toggleFav(btn) {
    const on = btn.classList.toggle('on');
    btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    btn.setAttribute('aria-label', on ? 'Quitar de favoritos' : 'Agregar a favoritos');
    toast(on ? 'Agregado a favoritos ❤️' : 'Quitado de favoritos');
}

// ===== WIDGET DE RESERVA =====
const RESV_URLS = {
    lima:     'https://fiesta.mesa247.pe/reservas/#/fiesta_lima',
    chiclayo: 'https://fiesta.mesa247.pe/reservas/#/fiesta_chiclayo'
};
const RESV_INFO = {
    lima:     'Lima — Miraflores',
    chiclayo: 'Chiclayo'
};
let resvCurrentSede = null;

function reservarDirecto() {
    abrirWidgetReserva(sedeAct);
}

function abrirWidgetReserva(sede) {
    resvCurrentSede = sede || sedeAct;
    const ov          = document.getElementById('resvOv');
    const wid         = document.getElementById('resvWidget');
    const iframe      = document.getElementById('resvIframe');
    const placeholder = document.getElementById('resvPlaceholder');
    const loader      = document.getElementById('resvLoader');
    const subtitle    = document.getElementById('resvSubtitle');

    subtitle.textContent = RESV_INFO[resvCurrentSede];
    _syncResvSwitch(resvCurrentSede);

    // Reset estado iframe
    placeholder.classList.remove('hide');
    iframe.classList.remove('loaded');
    loader.classList.remove('done','hide');

    ov.classList.add('on');
    ov.removeAttribute('aria-hidden');
    wid.classList.add('on');
    document.body.style.overflow = 'hidden';

    // Pequeño delay para que la animación de entrada se vea antes de cargar el iframe
    setTimeout(() => { iframe.src = RESV_URLS[resvCurrentSede] }, 200);
    setTimeout(() => document.querySelector('.resv-close')?.focus(), 420);
}

function cerrarModalReserva() {
    const ov     = document.getElementById('resvOv');
    const wid    = document.getElementById('resvWidget');
    const iframe = document.getElementById('resvIframe');
    ov.classList.remove('on');
    ov.setAttribute('aria-hidden','true');
    wid.classList.remove('on');
    document.body.style.overflow = '';
    setTimeout(() => { iframe.src = '' }, 460);
}

function switchResvSede(sede) {
    if (sede === resvCurrentSede) return;
    resvCurrentSede = sede;
    const iframe      = document.getElementById('resvIframe');
    const placeholder = document.getElementById('resvPlaceholder');
    const loader      = document.getElementById('resvLoader');
    const subtitle    = document.getElementById('resvSubtitle');

    subtitle.textContent = RESV_INFO[sede];
    _syncResvSwitch(sede);
    placeholder.classList.remove('hide');
    iframe.classList.remove('loaded');
    loader.classList.remove('done','hide');
    iframe.src = '';
    setTimeout(() => { iframe.src = RESV_URLS[sede] }, 80);
}

function _syncResvSwitch(sede) {
    document.querySelectorAll('.resv-sw-b').forEach(b => {
        b.classList.toggle('on', b.dataset.sede === sede);
    });
}

function onIframeLoad() {
    const iframe      = document.getElementById('resvIframe');
    const placeholder = document.getElementById('resvPlaceholder');
    const loader      = document.getElementById('resvLoader');
    iframe.classList.add('loaded');
    placeholder.classList.add('hide');
    loader.classList.add('done');
    setTimeout(() => loader.classList.add('hide'), 600);
}

function abrirEnNuevaPestana(e) {
    e.preventDefault();
    if (resvCurrentSede) window.open(RESV_URLS[resvCurrentSede], '_blank');
}

// ===== LOGIN =====
function openLogin() {
    if (logged) {
        if (confirm(`¿Cerrar sesión de ${usr?.nombre}?`)) doLogout();
        return;
    }
    openMo('moLogin');
}
function closeLogin() { closeMo('moLogin') }

function swTab(t) {
    document.querySelectorAll('.lg-tab').forEach((b,i) => {
        const on = (t === 'login' && i === 0) || (t === 'reg' && i === 1);
        b.classList.toggle('on', on); b.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    document.getElementById('fLogin').classList.toggle('on', t === 'login');
    document.getElementById('fReg').classList.toggle('on', t === 'reg');
}

function doLogin(e) {
    e.preventDefault();
    usr = { nombre:'Usuario', email:document.getElementById('loginEmail').value };
    logged = true; sessionStorage.setItem('fiestaUsr', JSON.stringify(usr));
    document.getElementById('userDot').style.display = 'block';
    closeLogin(); toast('¡Bienvenido de vuelta!');
}

function doReg(e) {
    e.preventDefault();
    usr = { nombre:document.getElementById('regName').value, email:document.getElementById('regEmail').value };
    logged = true; sessionStorage.setItem('fiestaUsr', JSON.stringify(usr));
    document.getElementById('userDot').style.display = 'block';
    closeLogin(); toast('¡Cuenta creada con éxito!');
}

function doLogout() {
    usr = null; logged = false; sessionStorage.removeItem('fiestaUsr');
    document.getElementById('userDot').style.display = 'none';
    toast('Sesión cerrada', 'warning');
}

// ===== MODALES =====
function openMo(id) {
    const m = document.getElementById(id);
    m.style.display = 'flex';
    requestAnimationFrame(() => m.classList.add('on'));
    document.body.style.overflow = 'hidden';
    const f = m.querySelectorAll('button,[href],input');
    if (f.length) setTimeout(() => f[0].focus(), 100);
}
function closeMo(id) {
    const m = document.getElementById(id);
    m.classList.remove('on');
    setTimeout(() => { m.style.display = 'none' }, 250);
    document.body.style.overflow = '';
}
function showHistoria() { document.getElementById('hfModal').classList.add('on'); document.body.style.overflow = 'hidden' }
function closeHistoria() { document.getElementById('hfModal').classList.remove('on'); document.body.style.overflow = '' }
function toggleMM() {
    const m = document.getElementById('mm'), on = m.classList.toggle('on');
    document.body.style.overflow = on ? 'hidden' : '';
    document.querySelector('.ham')?.setAttribute('aria-expanded', on ? 'true' : 'false');
}

// ===== NEWSLETTER =====
function subscribeNewsletter(e) {
    e.preventDefault();
    toast('¡Gracias por suscribirte! Te enviaremos novedades.');
    e.target.reset();
}

// ===== TOAST =====
function toast(msg, type = 'success') {
    document.querySelectorAll('.toast').forEach(t => t.remove());
    const container = document.getElementById('toast-container') || document.body,
          t = document.createElement('div');
    t.className = `toast ${type}`;
    t.setAttribute('role', 'alert');
    const icons = { success:'check-circle', error:'exclamation-circle', warning:'exclamation-triangle', info:'info-circle' };
    t.innerHTML = `<i class="fas fa-${icons[type] || 'check-circle'}"></i><span>${msg}</span>`;
    container.appendChild(t);
    requestAnimationFrame(() => t.classList.add('show'));
    setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 300) }, 3200);
}

// ===== CERRAR MODALES AL CLICK FUERA =====
document.getElementById('moLogin')?.addEventListener('click', e => {
    if (e.target === document.getElementById('moLogin')) closeLogin();
});

// Overlay reserva — click directo sobre él (no sobre el widget)
document.getElementById('resvOv').addEventListener('click', cerrarModalReserva);
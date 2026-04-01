// Variables
let cart = [], currentCity = 'lima', currentFilter = 'todos', deliveryZone = { name: 'Miraflores', price: 5 }, currentUser = null, pendingReservationCity = null, paymentMethod = 'yape';
const reservationLinks = { lima: 'https://fiesta.mesa247.pe/reservas/#/fiesta_lima', chiclayo: 'https://fiesta.mesa247.pe/reservas/#/fiesta_chiclayo' };

// Data
const menusPorSede = {
    lima: { platos: [
        { nombre: 'Ceviche Clasico', precio: 48, descripcion: 'Pescado fresco', imagen: 'https://picsum.photos/seed/ceviche/600/450', badge: 'Popular' },
        { nombre: 'Lomo Saltado', precio: 62, descripcion: 'Lomo fino', imagen: 'https://picsum.photos/seed/lomo/600/450' },
        { nombre: 'Aji de Gallina', precio: 45, descripcion: 'Crema de aji', imagen: 'https://picsum.photos/seed/aji/600/450', badge: 'Tradicional' }
    ]},
    chiclayo: { platos: [
        { nombre: 'Arroz con Pato', precio: 52, descripcion: 'Pato estofado', imagen: 'https://picsum.photos/seed/pato/600/450', badge: 'Especialidad' },
        { nombre: 'Espesado', precio: 48, descripcion: 'Guiso norteno', imagen: 'https://picsum.photos/seed/espesado/600/450' }
    ]}
};
const products = {
    lima: [
        { id: 1, nombre: 'Ceviche', precio: 48, categoria: 'entradas', imagen: 'https://picsum.photos/seed/ceviche2/600/450' },
        { id: 2, nombre: 'Lomo', precio: 62, categoria: 'fondos', imagen: 'https://picsum.photos/seed/lomo2/600/450' },
        { id: 3, nombre: 'Pisco', precio: 25, categoria: 'bebidas', imagen: 'https://picsum.photos/seed/pisco/600/450' }
    ],
    chiclayo: [
        { id: 4, nombre: 'Pato', precio: 52, categoria: 'fondos', imagen: 'https://picsum.photos/seed/pato2/600/450' }
    ]
};
const sedesInfo = {
    lima: { direccion: 'Av. Reducto 1278', telefono: '01 242 9009' },
    chiclayo: { direccion: 'Av. Salaverry 1820', telefono: '924 516 825' }
};

// UI Functions
function openModal(id) { 
    document.getElementById(id).classList.add('visible'); 
    setTimeout(() => document.getElementById(id).classList.add('opacity-show'), 10);
    document.body.classList.add('menu-open');
}
function closeModal(id) { 
    document.getElementById(id).classList.remove('opacity-show'); 
    setTimeout(() => { document.getElementById(id).classList.remove('visible'); document.body.classList.remove('menu-open'); }, 300);
}
function showLogin() { closeMobileMenu(); openModal('loginModal'); }
function showReservation() { closeMobileMenu(); openModal('reservationModal'); }
function switchToRegister() { closeModal('loginModal'); setTimeout(() => openModal('registerModal'), 300); }
function switchToLogin() { closeModal('registerModal'); setTimeout(() => openModal('loginModal'), 300); }

function showToast(msg) {
    document.getElementById('toastMessage').textContent = msg;
    document.getElementById('toast').classList.add('visible');
    setTimeout(() => document.getElementById('toast').classList.remove('visible'), 3000);
}

// Mobile Menu
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    menuToggle.classList.toggle('hamburger-active');
    document.body.classList.toggle('menu-open');
});
function closeMobileMenu() { mobileMenu.classList.remove('open'); menuToggle.classList.remove('hamburger-active'); document.body.classList.remove('menu-open'); }

// Cart
function openCart() { closeMobileMenu(); document.getElementById('cartSidebar').classList.add('open'); document.body.classList.add('menu-open'); }
function closeCart() { document.getElementById('cartSidebar').classList.remove('open'); if(!mobileMenu.classList.contains('open')) document.body.classList.remove('menu-open'); }
function addToCart(id) {
    const item = products[currentCity].find(p => p.id === id);
    const existing = cart.find(c => c.id === id);
    if(existing) existing.quantity++; else cart.push({...item, quantity: 1});
    updateCart();
    openCart();
    showToast(item.nombre + ' agregado');
}
function updateCart() {
    let count = 0, subtotal = 0;
    cart.forEach(i => { count += i.quantity; subtotal += i.precio * i.quantity; });
    document.getElementById('cartBadgeNav').textContent = count;
    document.getElementById('cartBadgeNav').classList.toggle('hidden', count === 0);
    document.getElementById('cartCount2').textContent = count;
    document.getElementById('cartSubtotal').textContent = subtotal;
    document.getElementById('cartTotalSidebar').textContent = subtotal + deliveryZone.price;
    
    const container = document.getElementById('cartItemsSidebar');
    if(cart.length === 0) container.innerHTML = '<p class="text-white/40 text-center py-8 text-sm">Carrito vacio</p>';
    else container.innerHTML = cart.map((i, idx) => `
        <div class="flex gap-3 items-center bg-white/5 p-2 rounded-lg">
            <img src="${i.imagen}" class="w-12 h-12 rounded object-cover">
            <div class="flex-1">
                <p class="text-white text-xs">${i.nombre}</p>
                <p class="text-[#c9a961] text-xs">S/ ${i.precio}</p>
            </div>
            <div class="flex items-center gap-1">
                <button onclick="updateQty(${idx}, -1)" class="quantity-btn text-xs"><iconify-icon icon="mdi:minus"></iconify-icon></button>
                <span class="text-white text-xs w-4 text-center">${i.quantity}</span>
                <button onclick="updateQty(${idx}, 1)" class="quantity-btn text-xs"><iconify-icon icon="mdi:plus"></iconify-icon></button>
            </div>
        </div>
    `).join('');
}
function updateQty(idx, delta) { cart[idx].quantity += delta; if(cart[idx].quantity <= 0) cart.splice(idx, 1); updateCart(); }

// Auth
function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const pass = document.getElementById('loginPassword').value;
    // Simulated login
    currentUser = { firstName: 'Usuario', lastName: 'Demo', email: email };
    localStorage.setItem('fiestaUser', JSON.stringify(currentUser));
    updateUIForUser();
    closeModal('loginModal');
    showToast('Bienvenido de vuelta');
}
function handleRegister(e) {
    e.preventDefault();
    currentUser = { firstName: document.getElementById('registerFirstName').value, lastName: document.getElementById('registerLastName').value, email: document.getElementById('registerEmail').value };
    localStorage.setItem('fiestaUser', JSON.stringify(currentUser));
    updateUIForUser();
    closeModal('registerModal');
    showToast('Cuenta creada exitosamente');
}
function updateUIForUser() {
    if(currentUser) {
        document.getElementById('userBtn').classList.add('hidden');
        document.getElementById('userAvatar').classList.remove('hidden');
        document.getElementById('userAvatar').classList.add('flex');
        document.getElementById('avatarInitials').textContent = (currentUser.firstName[0] + currentUser.lastName[0]).toUpperCase();
        document.getElementById('dropdownUserName').textContent = currentUser.firstName;
        document.getElementById('dropdownUserEmail').textContent = currentUser.email;
    }
}
function toggleUserMenu() { document.getElementById('userDropdown').classList.toggle('visible'); }
function logoutUser() { currentUser = null; localStorage.removeItem('fiestaUser'); location.reload(); }

// Reservations
function requestReservation(city) { pendingReservationCity = city; closeModal('reservationModal'); document.getElementById('confirmSedeName').textContent = city.charAt(0).toUpperCase() + city.slice(1); setTimeout(() => openModal('confirmModal'), 300); }
function confirmReservation() { closeModal('confirmModal'); window.location.href = reservationLinks[pendingReservationCity]; }

// Utils
function selectCity(city) {
    currentCity = city;
    document.querySelectorAll('.city-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('btn-' + city).classList.add('active');
    renderMenu();
    renderProducts();
    renderSedeInfo();
}
function renderSedeInfo() {
    const s = sedesInfo[currentCity];
    document.getElementById('sedeInfo').innerHTML = `
        <div class="flex items-center gap-2 text-white/60 text-xs mb-2"><iconify-icon icon="mdi:map-marker" width="14" class="text-[#c9a961]"></iconify-icon>${s.direccion}</div>
        <div class="flex items-center gap-2 text-white/60 text-xs"><iconify-icon icon="mdi:phone" width="14" class="text-[#c9a961]"></iconify-icon>${s.telefono}</div>
    `;
    document.getElementById('sedeInfo').classList.add('show');
}
function renderMenu() {
    const grid = document.getElementById('menuGrid');
    grid.innerHTML = menusPorSede[currentCity].platos.map(p => `
        <article class="reveal glass-card rounded-xl overflow-hidden">
            <img src="${p.imagen}" alt="${p.nombre}" class="w-full aspect-video object-cover">
            <div class="p-4">
                <div class="flex justify-between items-start mb-1">
                    <h3 class="font-heading text-white text-lg">${p.nombre}</h3>
                    <span class="text-[#c9a961] text-sm">S/ ${p.precio}</span>
                </div>
                <p class="text-white/40 text-xs">${p.descripcion}</p>
            </div>
        </article>
    `).join('');
}
function renderProducts() {
    const grid = document.getElementById('productsGrid');
    let list = currentFilter === 'todos' ? products[currentCity] : products[currentCity].filter(p => p.categoria === currentFilter);
    grid.innerHTML = list.map(p => `
        <div class="product-card reveal">
            <img src="${p.imagen}" alt="${p.nombre}" class="w-full aspect-video object-cover">
            <div class="p-3">
                <div class="flex justify-between items-center mb-2">
                    <h3 class="text-white text-sm">${p.nombre}</h3>
                    <span class="text-[#c9a961] text-xs">S/ ${p.precio}</span>
                </div>
                <button onclick="addToCart(${p.id})" class="btn btn-primary w-full justify-center text-[10px] py-2">Agregar</button>
            </div>
        </div>
    `).join('');
}
function filterProducts(cat) { currentFilter = cat; document.querySelectorAll('.category-filter').forEach(b => b.classList.remove('active')); event.target.classList.add('active'); renderProducts(); }
function searchProducts() { /* Simple filter logic */ }
function selectZone(el, name, price) { document.querySelectorAll('.zone-card').forEach(z => z.classList.remove('active')); el.classList.add('active'); deliveryZone = {name, price}; document.getElementById('cartDelivery').textContent = price; }
function selectPayment(el, method) { document.querySelectorAll('.payment-method').forEach(p => p.classList.remove('active')); el.classList.add('active'); paymentMethod = method; }
function openWhatsAppChat() { closeModal('whatsappConfirmModal'); window.open('https://wa.me/51927743956', '_blank'); }
function applyCoupon() { showToast('Cupon invalido'); }
function checkout() {
    if(cart.length === 0) { showToast('Carrito vacio'); return; }
    if(!currentUser) { showToast('Inicia sesion primero'); closeCart(); showLogin(); return; }
    let text = `Pedido de ${currentUser.firstName}\n`;
    cart.forEach(i => text += `${i.quantity}x ${i.nombre}\n`);
    text += `Total: S/ ${document.getElementById('cartTotalSidebar').textContent}`;
    window.open(`https://wa.me/51927743956?text=${encodeURIComponent(text)}`, '_blank');
}
function scrollToSection(id) { document.getElementById(id).scrollIntoView({behavior: 'smooth'}); }

// Init
document.addEventListener('DOMContentLoaded', () => {
    // Observer
    const obs = new IntersectionObserver(entries => entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('active'); }), {threshold: 0.1});
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    
    // Load User
    const savedUser = localStorage.getItem('fiestaUser');
    if(savedUser) { currentUser = JSON.parse(savedUser); updateUIForUser(); }
    
    // Init Renders
    renderSedeInfo();
    renderMenu();
    renderProducts();
    
    // Show WhatsApp after delay
    setTimeout(() => document.getElementById('whatsappFloat').classList.add('visible'), 3000);
});

// Close dropdowns on outside click
document.addEventListener('click', (e) => {
    const userContainer = document.getElementById('userContainer');
    if(!userContainer.contains(e.target)) document.getElementById('userDropdown').classList.remove('visible');
});
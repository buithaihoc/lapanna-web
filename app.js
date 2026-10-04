// app.js

// --- Data ---
const products = [
    { id: 1, name: 'Panna Cotta Dâu Tây Mọng Nước', price: 38000, img: 'assets/strawberry_panna_cotta_1790435271258.png', category: 'fruit', tag: 'Best Seller', tagType: 'danger', desc: 'Kết cấu dâu tây thanh mát chua nhẹ hòa hợp với whipping cream' },
    { id: 2, name: 'Panna Cotta Xoài Cát Hòa Lộc', price: 38000, img: 'assets/mango_panna_cotta_1790435259241.png', category: 'fruit', tag: 'Mới', tagType: 'new', desc: 'Sốt xoài vàng ươm thơm lừng từ xoài chín tự nhiên, trọn vị' },
    { id: 3, name: 'Panna Cotta Uji Matcha', price: 39000, img: 'assets/matcha_panna_cotta_1790435285155.png', category: 'tea', desc: 'Vị trà xanh đậm đà từ Uji, hòa quyện chút chát nhẹ thanh tao' },
    { id: 4, name: 'Caramel Muối & Hạnh Nhân', price: 39000, img: 'assets/caramel_panna_cotta_1790435294553.png', category: 'coffee', tag: 'Signature', tagType: 'danger', desc: 'Sốt caramel thủ công đắng nhẹ béo ngậy, phủ hạnh nhân nướng' },
    { id: 5, name: 'Panna Cotta Vani Tradi', price: 35000, img: 'assets/vanilla_panna_cotta_1790435249043.png', category: 'tea', desc: 'Nguyên bản hương vani Madagascar mộc mạc, tinh tế' }
];

// --- State ---
const state = {
    cart: JSON.parse(sessionStorage.getItem('lapanna_cart')) || [],
    filter: 'all',
    mixBox: { size: 4, price: 180000, flavors: [] }
};

// --- Format Utilities ---
const formatMoney = (amount) => amount.toLocaleString('vi-VN') + 'đ';

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    initScrollReveal();
    initNavbar();
    initMobileMenu();
    renderProducts();
    initFilters();
    initMixBox();
    updateCartUI();

    // Global Events
    document.getElementById('cartBtn').addEventListener('click', toggleCart);
    document.getElementById('closeCartBtn').addEventListener('click', toggleCart);
    document.getElementById('cartOverlay').addEventListener('click', toggleCart);

    document.getElementById('checkoutBtn').addEventListener('click', openCheckoutModal);
    document.getElementById('closeModalBtn').addEventListener('click', closeCheckoutModal);
    document.getElementById('orderForm').addEventListener('submit', handleOrderSubmit);
});

// --- Scroll Reveal & Interactions ---
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    reveals.forEach(reveal => observer.observe(reveal));
}

function initNavbar() {
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) header.classList.add('scrolled');
        else header.classList.remove('scrolled');
    });
}

function initMobileMenu() {
    const btn = document.getElementById('mobileMenuBtn');
    const menu = document.getElementById('mobileMenu');
    btn.addEventListener('click', () => {
        menu.classList.toggle('open');
        const icon = btn.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
    });

    menu.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
            menu.classList.remove('open');
            btn.querySelector('i').className = 'fa-solid fa-bars';
        });
    });
}

// --- Product Listing ---
function renderProducts() {
    const grid = document.getElementById('productGrid');
    const filtered = state.filter === 'all' ? products : products.filter(p => p.category === state.filter);

    grid.innerHTML = filtered.map(product => `
        <div class="product-card">
            ${product.tag ? `<span class="product-tag tag-${product.tagType}">${product.tag}</span>` : ''}
            <div class="product-image-wrap">
                <img src="${product.img}" alt="${product.name}" class="product-img" loading="lazy">
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-desc">${product.desc}</p>
                <div class="product-footer">
                    <span class="product-price">${formatMoney(product.price)}</span>
                    <button class="btn-add-cart" onclick="addToCart(${product.id}, 'single')" aria-label="Thêm vào giỏ">
                        <i class="fa-solid fa-plus"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function initFilters() {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            buttons.forEach(b => b.classList.remove('active'));
            e.currentTarget.classList.add('active');
            state.filter = e.currentTarget.dataset.filter;
            renderProducts();
        });
    });
}

// --- Mix Box Logic ---
function initMixBox() {
    const radios = document.querySelectorAll('input[name="boxSize"]');
    radios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            document.querySelectorAll('.box-option').forEach(opt => opt.classList.remove('active'));
            e.target.closest('.box-option').classList.add('active');

            const size = parseInt(e.target.value);
            state.mixBox.size = size;
            state.mixBox.price = size === 4 ? 180000 : 270000;
            // Trim flavors if needed
            if (state.mixBox.flavors.length > size) {
                state.mixBox.flavors = state.mixBox.flavors.slice(0, size);
            }
            renderMixBox();
        });
    });

    renderMixBoxGrid();
    renderMixBox();

    document.getElementById('addMixBoxToCartBtn').addEventListener('click', addMixBoxToCart);
}

function renderMixBoxGrid() {
    const grid = document.getElementById('mixFlavorsGrid');
    grid.innerHTML = products.map(product => `
        <div class="mix-flavor-card" onclick="toggleMixFlavor(${product.id})">
            <div class="mix-flavor-count" id="mix-count-${product.id}">0</div>
            <img src="${product.img}" alt="${product.name}" class="mix-flavor-img" loading="lazy">
            <span class="mix-flavor-name">${product.name.replace('Panna Cotta ', '')}</span>
        </div>
    `).join('');
}

function toggleMixFlavor(productId) {
    const count = state.mixBox.flavors.filter(id => id === productId).length;

    if (state.mixBox.flavors.length < state.mixBox.size) {
        // Add flavor
        state.mixBox.flavors.push(productId);
    } else {
        // Full, try to remove one if clicking the same
        if (count > 0) {
            const index = state.mixBox.flavors.indexOf(productId);
            state.mixBox.flavors.splice(index, 1);
        } else {
            // Provide subtle feedback that it's full (e.g. shake)
            const btn = document.getElementById('addMixBoxToCartBtn');
            btn.style.transform = 'translateX(5px)';
            setTimeout(() => btn.style.transform = 'translateX(-5px)', 100);
            setTimeout(() => btn.style.transform = 'translateX(0)', 200);
            return;
        }
    }
    renderMixBox();
}

function renderMixBox() {
    const { size, flavors } = state.mixBox;

    // Update labels
    document.getElementById('mixTargetCount').innerText = size;
    const btn = document.getElementById('addMixBoxToCartBtn');

    if (flavors.length === size) {
        btn.disabled = false;
        btn.innerHTML = `<i class="fa-solid fa-basket-shopping"></i> Thêm Hộp Mix (Đã Chọn ${flavors.length}/${size}) Vào Giỏ`;
    } else {
        btn.disabled = true;
        btn.innerHTML = `<i class="fa-solid fa-basket-shopping"></i> Chọn thêm ${size - flavors.length} vị để hoàn tất`;
    }

    // Render Slots
    let slotsHTML = '';
    for (let i = 0; i < size; i++) {
        if (i < flavors.length) {
            const product = products.find(p => p.id === flavors[i]);
            slotsHTML += `<div class="slot filled" style="background-image: url('${product.img}')" onclick="removeFlavorAt(${i})" title="Bấm để xóa"></div>`;
        } else {
            slotsHTML += `<div class="slot"></div>`;
        }
    }
    document.getElementById('selectionSlots').innerHTML = slotsHTML;

    // Update Grid visual counts
    products.forEach(p => {
        const count = flavors.filter(id => id === p.id).length;
        const card = document.getElementById(`mix-count-${p.id}`).parentElement;
        const countBadge = document.getElementById(`mix-count-${p.id}`);

        if (count > 0) {
            card.classList.add('selected');
            countBadge.innerText = count;
        } else {
            card.classList.remove('selected');
        }
    });
}

function removeFlavorAt(index) {
    state.mixBox.flavors.splice(index, 1);
    renderMixBox();
}

function addMixBoxToCart() {
    const { size, price, flavors } = state.mixBox;

    // Count flavors nicely
    const flavorCounts = {};
    flavors.forEach(id => {
        const name = products.find(p => p.id === id).name.replace('Panna Cotta ', '');
        flavorCounts[name] = (flavorCounts[name] || 0) + 1;
    });

    const desc = Object.entries(flavorCounts).map(([name, count]) => `${name} (x${count})`).join(', ');
    const boxName = size === 4 ? 'Hộp Sweet Trio (4 Hũ)' : 'Hộp Mini Grand (6 Hũ)';

    // Create unique ID for this exact mix
    const mixId = 'mix_' + size + '_' + flavors.sort().join('_');

    addToCart(mixId, 'mix', {
        id: mixId,
        name: boxName,
        desc: desc,
        price: price,
        img: products[0].img // Use first flavor image as representative or a box image
    });

    // Reset Mix Box
    state.mixBox.flavors = [];
    renderMixBox();
}

// --- Cart System ---
function toggleCart() {
    document.body.classList.toggle('cart-open');
}

function addToCart(itemId, type = 'single', customData = null) {
    const existingItem = state.cart.find(item => String(item.id) === String(itemId));

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        if (type === 'single') {
            const product = products.find(p => p.id === itemId);
            state.cart.push({ id: product.id, name: product.name, price: product.price, img: product.img, quantity: 1, type: 'single' });
        } else if (type === 'mix') {
            state.cart.push({ ...customData, quantity: 1, type: 'mix' });
        }
    }

    saveCart();
    updateCartUI();

    // Feedback
    const cartBtn = document.getElementById('cartBtn');
    cartBtn.style.transform = 'scale(1.2)';
    setTimeout(() => cartBtn.style.transform = 'scale(1)', 200);
}

function removeFromCart(itemId) {
    state.cart = state.cart.filter(item => String(item.id) !== String(itemId));
    saveCart();
    updateCartUI();
}

function updateQuantity(itemId, change) {
    const item = state.cart.find(item => String(item.id) === String(itemId));
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) removeFromCart(itemId);
        else {
            saveCart();
            updateCartUI();
        }
    }
}

function saveCart() {
    sessionStorage.setItem('lapanna_cart', JSON.stringify(state.cart));
}

function updateCartUI() {
    const totalItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cartCount').innerText = totalItems;
    document.getElementById('cartHeaderCount').innerText = `(${totalItems})`;

    const container = document.getElementById('cartItems');
    const checkoutBtn = document.getElementById('checkoutBtn');

    if (state.cart.length === 0) {
        container.innerHTML = `<div class="empty-cart-msg"><i class="fa-solid fa-basket-shopping"></i><p>Giỏ hàng chưa có sản phẩm nào.</p></div>`;
        checkoutBtn.disabled = true;
    } else {
        checkoutBtn.disabled = false;
        container.innerHTML = state.cart.map(item => `
            <div class="cart-item">
                <img src="${item.img}" alt="${item.name}" class="cart-item-img">
                <div class="cart-item-info">
                    <h4 class="cart-item-title">${item.name}</h4>
                    ${item.type === 'mix' ? `<p style="font-size: 0.8rem; color: #7A6961; margin-bottom: 4px;">${item.desc}</p>` : ''}
                    <p class="cart-item-price">${formatMoney(item.price)}</p>
                    <div class="cart-item-actions">
                        <div class="qty-controls">
                            <button class="qty-btn" onclick="updateQuantity('${item.id}', -1)">-</button>
                            <span class="qty-val">${item.quantity}</span>
                            <button class="qty-btn" onclick="updateQuantity('${item.id}', 1)">+</button>
                        </div>
                        <button class="remove-btn" onclick="removeFromCart('${item.id}')">Xóa</button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    const total = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('cartTotalPrice').innerText = formatMoney(total);
}

// --- Checkout System ---
function openCheckoutModal() {
    if (state.cart.length === 0) return;
    document.body.classList.remove('cart-open');
    document.body.classList.add('modal-open');
}

function closeCheckoutModal() {
    document.body.classList.remove('modal-open');
}

async function handleOrderSubmit(e) {
    e.preventDefault();
    if (state.cart.length === 0) return;

    const form = e.target;
    const formData = new FormData(form);

    const submitBtn = document.getElementById('submitBtn');
    const formStatus = document.getElementById('formStatus');

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Đang xử lý...';

    // 1. Chuẩn bị dữ liệu đơn hàng
    const orderDetails = state.cart.map(item => {
        let detail = `- ${item.name} x${item.quantity}`;
        if (item.type === 'mix') detail += `\n  (${item.desc})`;
        return detail;
    }).join('\n');

    const totalPrice = formatMoney(state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0));

    const orderData = {
        name: formData.get('name'),
        phone: formData.get('phone'),
        address: formData.get('address'),
        notes: formData.get('notes') || '',
        cartDetails: orderDetails,
        totalPrice: totalPrice
    };

    // --- TODO: THAY URL WEB APP CỦA GOOGLE APPS SCRIPT VÀO ĐÂY ---
    const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbz5iIGW_k5dIVxDYtXaL1Z0KCW3iVEy4F3EvYNTmz66MZfMmq1R3nWnpW8KfgayA5c/exec';

    try {
        if (GOOGLE_SHEET_URL === 'YOUR_GOOGLE_WEB_APP_URL_HERE') {
            console.warn("Chưa cấu hình Google Sheet URL. Chạy giả lập API...");
            await new Promise(resolve => setTimeout(resolve, 1500)); // Fake delay
        } else {
            // 2. Gửi dữ liệu tới Google Apps Script (Sử dụng text/plain để tránh lỗi CORS Preflight)
            await fetch(GOOGLE_SHEET_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/plain;charset=utf-8',
                },
                body: JSON.stringify(orderData)
            });
        }

        formStatus.innerHTML = '<span class="success-msg"><i class="fa-solid fa-circle-check"></i> Đặt hàng thành công! Chúng tôi sẽ liên hệ sớm.</span>';

        setTimeout(() => {
            form.reset();
            state.cart = [];
            saveCart();
            updateCartUI();
            closeCheckoutModal();
            formStatus.innerHTML = '';
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Xác Nhận Đặt Hàng';
        }, 2000);

    } catch (error) {
        console.error('Lỗi khi gửi đơn hàng:', error);
        formStatus.innerHTML = '<span class="error-msg" style="color: #dc3545; display: block; margin-top: 10px;"><i class="fa-solid fa-circle-exclamation"></i> Có lỗi xảy ra. Vui lòng thử lại hoặc liên hệ Hotline.</span>';
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Xác Nhận Đặt Hàng';
    }
}

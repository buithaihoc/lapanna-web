// app.js

// Products Data
const products = [
    { id: 1, name: 'Panna Cotta Vani Tradi', price: 45000, img: 'assets/vanilla_panna_cotta_1790435249043.png' },
    { id: 2, name: 'Panna Cotta Xoài Nhiệt Đới', price: 50000, img: 'assets/mango_panna_cotta_1790435259241.png' },
    { id: 3, name: 'Panna Cotta Dâu Tây', price: 55000, img: 'assets/strawberry_panna_cotta_1790435271258.png' },
    { id: 4, name: 'Panna Cotta Matcha', price: 55000, img: 'assets/matcha_panna_cotta_1790435285155.png' },
    { id: 5, name: 'Panna Cotta Caramel', price: 50000, img: 'assets/caramel_panna_cotta_1790435294553.png' }
];

// Cart State
let cart = JSON.parse(sessionStorage.getItem('lapanna_cart')) || [];

// DOM Elements
const productGrid = document.getElementById('productGrid');
const cartBtn = document.getElementById('cartBtn');
const cartOverlay = document.getElementById('cartOverlay');
const cartSidebar = document.getElementById('cartSidebar');
const closeCartBtn = document.getElementById('closeCartBtn');
const cartItemsContainer = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const cartTotalPrice = document.getElementById('cartTotalPrice');
const checkoutBtn = document.getElementById('checkoutBtn');
const orderForm = document.getElementById('orderForm');
const formStatus = document.getElementById('formStatus');

// Initialize
function init() {
    renderProducts();
    updateCartUI();

    // Event Listeners
    cartBtn.addEventListener('click', toggleCart);
    closeCartBtn.addEventListener('click', toggleCart);
    cartOverlay.addEventListener('click', toggleCart);
    checkoutBtn.addEventListener('click', () => {
        toggleCart();
        window.location.hash = '#contact';
    });
    orderForm.addEventListener('submit', handleOrderSubmit);
}

// Format Currency
function formatMoney(amount) {
    return amount.toLocaleString('vi-VN') + 'đ';
}

// Render Products
function renderProducts() {
    productGrid.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.img}" alt="${product.name}" class="product-img" loading="lazy">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">${formatMoney(product.price)}</p>
                <button class="add-to-cart" onclick="addToCart(${product.id})">
                    <i class="fa-solid fa-plus"></i> Thêm vào giỏ
                </button>
            </div>
        </div>
    `).join('');
}

// Cart Functions
function toggleCart() {
    document.body.classList.toggle('cart-open');
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveCart();
    updateCartUI();

    // Add small animation to cart icon
    cartBtn.style.transform = 'scale(1.2)';
    setTimeout(() => cartBtn.style.transform = 'scale(1)', 200);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartUI();
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            saveCart();
            updateCartUI();
        }
    }
}

function saveCart() {
    sessionStorage.setItem('lapanna_cart', JSON.stringify(cart));
}

function updateCartUI() {
    // Update count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.innerText = totalItems;

    // Update items
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart-msg">Giỏ hàng của bạn đang trống.</p>';
        checkoutBtn.style.pointerEvents = 'none';
        checkoutBtn.style.opacity = '0.5';
    } else {
        checkoutBtn.style.pointerEvents = 'auto';
        checkoutBtn.style.opacity = '1';
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.img}" alt="${item.name}" class="cart-item-img">
                <div class="cart-item-info">
                    <h4 class="cart-item-title">${item.name}</h4>
                    <p class="cart-item-price">${formatMoney(item.price)}</p>
                    <div class="cart-item-actions">
                        <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                        <button class="remove-btn" onclick="removeFromCart(${item.id})">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Update total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotalPrice.innerText = formatMoney(total);
}

// Order Form Submission (Simulated Google Sheets API)
async function handleOrderSubmit(e) {
    e.preventDefault();

    if (cart.length === 0) {
        formStatus.innerHTML = '<span class="error-msg">Giỏ hàng của bạn đang trống. Vui lòng thêm sản phẩm trước khi đặt hàng!</span>';
        return;
    }

    const formData = new FormData(orderForm);
    const orderData = {
        name: formData.get('name'),
        phone: formData.get('phone'),
        address: formData.get('address'),
        notes: formData.get('notes'),
        items: cart.map(item => `${item.name} (x${item.quantity})`).join(', '),
        total: cartTotalPrice.innerText,
        timestamp: new Date().toISOString()
    };

    const submitBtn = document.getElementById('submitBtn');
    submitBtn.disabled = true;
    submitBtn.innerText = 'Đang xử lý...';

    try {
        // SIMULATED GOOGLE SHEETS API CALL
        // Thay URL bên dưới bằng URL từ Google Apps Script của bạn
        const scriptURL = 'https://script.google.com/macros/s/AKfycbwbR6S9wpTiccxtCoUvuGHy39zOUBQtG6u9ZZphDKKyfLDXswGYzfnA5rfVyZWCjNep/exec';

        const response = await fetch(scriptURL, { method: 'POST', body: new URLSearchParams(orderData) });
        const result = await response.text();

        if (result === 'Success') {
            formStatus.innerHTML = '<span class="success-msg">Đặt hàng thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất.</span>';
            orderForm.reset();
            cart = [];
            saveCart();
            updateCartUI();
        } else {
            throw new Error('Google Apps Script Error');
        }

    } catch (error) {
        formStatus.innerHTML = '<span class="error-msg">Có lỗi xảy ra. Vui lòng thử lại sau!</span>';
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerText = 'Gửi Yêu Cầu Đặt Hàng';
        setTimeout(() => { formStatus.innerHTML = ''; }, 5000);
    }
}

// Run
document.addEventListener('DOMContentLoaded', init);

// =============================================================================
// LA PANNA - HANDCRAFTED PANNA COTTA
// Core Application & Promotion Engine
// =============================================================================

/**
 * =============================================================================
 * 1. CẤU HÌNH HỆ THỐNG & CHƯƠNG TRÌNH KHUYẾN MÃI (PROMOTION CONFIGURATION)
 * =============================================================================
 * Lưu ý dành cho quản trị viên / lập trình viên:
 * - Muốn BẬT hoặc TẮT khuyến mãi khai trương: Chỉnh `enabled: true` hoặc `false`.
 * - Tỷ lệ tặng quà: Thay đổi `buyStep` (số hộp mua) và `freeGiftCount` (số hộp tặng).
 * - Giá lẻ / Giá combo: Đổi trong `combo5` và mảng `products`.
 */
const SYSTEM_CONFIG = {
    // Thông tin cửa hàng
    store: {
        name: 'LA PANNA',
        phone: '0888231700',
        website: 'lapanna.store',
        facebook: 'LaPanna',
        freeShippingNote: 'FREESHIP KHU VỰC BKX (Bách Khoa - Kinh Tế - Xây Dựng)'
    },

    // Cấu hình Khuyến Mãi (Config-Driven Promotion)
    promotion: {
        // CỜ BẬT / TẮT CHÍNH (true = Đang diễn ra khuyến mãi, false = Đã tắt khuyến mãi / Bán bình thường)
        enabled: false,

        id: 'KHAI_TRUONG_2026',
        title: 'Menu Khai Trương La Panna',
        dateRange: '11/10 ĐẾN HẾT 15/10',
        announcement: '🎉 MỪNG KHAI TRƯƠNG LA PANNA (11/10 - 15/10) • MUA 5 TẶNG 1, MUA 10 TẶNG 2 • FREESHIP KHU VỰC BKX',

        // Quy tắc tặng quà (Tắt khi hết khuyến mãi)
        giftRule: {
            active: false,
            buyStep: 5,        // Cứ đủ 5 hộp
            freeGiftCount: 1,  // Tặng 1 hộp (10 hộp tặng 2, 15 hộp tặng 3,...)
            tagText: 'Mua 5 tặng 1, mua 10 tặng 2'
        },

        // Combo 5 hộp mix vị (Giá về 50.000đ khi không khuyến mãi)
        combo5: {
            enabled: false,
            size: 5,
            price: 50000,
            regularPrice: 50000,
            name: 'Set 5 Hộp Mix Vị Tùy Chọn'
        },

        // Khu vực miễn phí giao hàng
        freeShippingAreas: ['BKX', 'Bách Khoa', 'Kinh Tế', 'Xây Dựng', 'Đại Cồ Việt', 'Giải Phóng']
    }
};

/**
 * =============================================================================
 * 2. DANH MỤC SẢN PHẨM (MENU 5 VỊ KHAI TRƯƠNG)
 * =============================================================================
 * Đồng giá: 10.000đ / hộp mua lẻ
 */
const products = [
    {
        id: 1,
        name: 'Panna Cotta Chanh Leo',
        flavor: 'Chanh leo',
        price: 10000,
        img: 'assets/mango_panna_cotta_1790435259241.png',
        tag: 'Best Choice',
        tagType: 'danger',
        desc: 'Sốt chanh leo vàng ươm thanh mát, chua dịu hòa quyện lớp kem sữa dẻo mịn'
    },
    {
        id: 2,
        name: 'Panna Cotta Dâu',
        flavor: 'Dâu',
        price: 10000,
        img: 'assets/strawberry_panna_cotta_1790435271258.png',
        tag: 'Best Seller',
        tagType: 'danger',
        desc: 'Sốt dâu tây chín mọng nấu chậm, vị chua ngọt ngào thanh tao cuốn hút'
    },
    {
        id: 3,
        name: 'Panna Cotta Việt Quất',
        flavor: 'Việt quất',
        price: 10000,
        img: 'assets/vanilla_panna_cotta_1790435249043.png',
        tag: 'Mới Lạ',
        tagType: 'new',
        desc: 'Trái việt quất đậm vị, hương thơm ngọt mát cùng cốt panna cotta truyền thống'
    },
    {
        id: 4,
        name: 'Panna Cotta Kiwi',
        flavor: 'Kiwi',
        price: 10000,
        img: 'assets/matcha_panna_cotta_1790435285155.png',
        tag: 'Tươi Mát',
        tagType: 'new',
        desc: 'Sốt kiwi xanh mát tự nhiên, ngọt nhẹ dịu mát mang lại cảm giác sảng khoái'
    },
    {
        id: 5,
        name: 'Panna Cotta Đào',
        flavor: 'Đào',
        price: 10000,
        img: 'assets/caramel_panna_cotta_1790435294553.png',
        tag: 'Thơm Dịu',
        tagType: 'warning',
        desc: 'Hương đào giòn ngọt thanh nhã, kết cấu mềm tan như mây trên đầu lưỡi'
    }
];

// --- State ---
const state = {
    cart: JSON.parse(sessionStorage.getItem('lapanna_cart')) || [],
    mixBox: {
        size: SYSTEM_CONFIG.promotion.combo5.size,
        price: SYSTEM_CONFIG.promotion.enabled ? SYSTEM_CONFIG.promotion.combo5.price : 50000,
        flavors: []
    }
};

// --- Utilities ---
const formatMoney = (amount) => amount.toLocaleString('vi-VN') + 'đ';

/**
 * =============================================================================
 * 3. PROMOTION ENGINE (BỘ XỬ LÝ KHUYẾN MÃI)
 * =============================================================================
 * Hàm tính toán tổng số hộp, số quà tặng và giá trị hóa đơn
 */
function calculatePromotion(cart) {
    let totalCups = 0;
    let rawTotal = 0;
    let comboDiscount = 0;

    cart.forEach(item => {
        if (item.type === 'mix') {
            const count = (item.size || 5) * item.quantity;
            totalCups += count;
            rawTotal += item.price * item.quantity;
            // Nếu có combo giảm giá so với giá gốc
            const originalVal = (item.size || 5) * 10000 * item.quantity;
            if (originalVal > item.price * item.quantity) {
                comboDiscount += (originalVal - (item.price * item.quantity));
            }
        } else {
            totalCups += item.quantity;
            rawTotal += item.price * item.quantity;
        }
    });

    let freeGifts = 0;
    let promoActive = SYSTEM_CONFIG.promotion.enabled;

    if (promoActive && SYSTEM_CONFIG.promotion.giftRule.active) {
        const step = SYSTEM_CONFIG.promotion.giftRule.buyStep || 5;
        const giftPerStep = SYSTEM_CONFIG.promotion.giftRule.freeGiftCount || 1;
        freeGifts = Math.floor(totalCups / step) * giftPerStep;
    }

    return {
        isPromoActive: promoActive,
        promoName: promoActive ? SYSTEM_CONFIG.promotion.title : 'Không áp dụng khuyến mãi',
        totalCups: totalCups,
        freeGifts: freeGifts,
        comboDiscount: comboDiscount,
        finalTotal: rawTotal,
        promoNote: freeGifts > 0 ? `Được tặng ${freeGifts} hộp Panna Cotta miễn phí!` : ''
    };
}

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    initScrollReveal();
    initNavbar();
    initMobileMenu();
    renderAnnouncementBar();
    renderProducts();
    initMixBox();
    updateCartUI();

    // Global Events
    document.getElementById('cartBtn').addEventListener('click', toggleCart);
    document.getElementById('closeCartBtn').addEventListener('click', toggleCart);
    document.getElementById('cartOverlay').addEventListener('click', toggleCart);

    const checkoutModal = document.getElementById('checkoutModal');
    if (checkoutModal) {
        checkoutModal.addEventListener('click', (e) => {
            if (e.target === checkoutModal) closeCheckoutModal();
        });
    }

    document.getElementById('checkoutBtn').addEventListener('click', openCheckoutModal);
    document.getElementById('closeModalBtn').addEventListener('click', closeCheckoutModal);
    document.getElementById('orderForm').addEventListener('submit', handleOrderSubmit);

    // Mobile Sticky Cart Bar Events
    const mobileCheckoutBtn = document.getElementById('mobileStickyCheckoutBtn');
    if (mobileCheckoutBtn) {
        mobileCheckoutBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            openCheckoutModal();
        });
    }
    const mobileCartTrigger = document.getElementById('mobileStickyCartTrigger');
    if (mobileCartTrigger) {
        mobileCartTrigger.addEventListener('click', () => {
            toggleCart();
        });
    }

    // Phím ESC đóng modal/giỏ hàng
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeCheckoutModal();
            document.body.classList.remove('cart-open');
            document.documentElement.classList.remove('cart-open');
        }
    });
});

// --- Banner Thông Báo Khai Trương ---
function renderAnnouncementBar() {
    const banner = document.getElementById('announcementBar');
    if (!banner) return;

    if (SYSTEM_CONFIG.promotion.enabled) {
        banner.style.display = 'block';
        banner.innerHTML = `
            <div class="announcement-content">
                <i class="fa-solid fa-gift pulse-icon"></i>
                <span>${SYSTEM_CONFIG.promotion.announcement}</span>
                <a href="#mix-box" class="announcement-link">Đặt Ngay <i class="fa-solid fa-arrow-right"></i></a>
            </div>
        `;
    } else {
        banner.style.display = 'none';
    }
}

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

// --- Render 5 Vị Panna Cotta Khai Trương ---
function renderProducts() {
    const grid = document.getElementById('productGrid');
    if (!grid) return;

    grid.innerHTML = products.map(product => `
        <div class="product-card">
            ${product.tag ? `<span class="product-tag tag-${product.tagType}">${product.tag}</span>` : ''}
            <div class="product-image-wrap">
                <img src="${product.img}" alt="${product.name}" class="product-img" loading="lazy">
            </div>
            <div class="product-info">
                <div class="product-flavor-badge"><i class="fa-solid fa-lemon"></i> Vị ${product.flavor}</div>
                <h3 class="product-title">${product.name}</h3>
                <p class="product-desc">${product.desc}</p>
                <div class="product-footer">
                    <div class="price-wrapper">
                        <span class="product-price">${formatMoney(product.price)}</span>
                        <span class="unit-text">/hộp</span>
                    </div>
                    <button class="btn-add-cart" onclick="addToCart(${product.id}, 'single')" aria-label="Thêm vào giỏ">
                        <i class="fa-solid fa-plus"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// --- Mix Box 5 Hộp Khai Trương ---
function initMixBox() {
    const boxSize = SYSTEM_CONFIG.promotion.combo5.size;
    state.mixBox.size = boxSize;
    state.mixBox.price = SYSTEM_CONFIG.promotion.enabled ? SYSTEM_CONFIG.promotion.combo5.price : 50000;

    renderMixBoxGrid();
    renderMixBox();

    document.getElementById('addMixBoxToCartBtn').addEventListener('click', addMixBoxToCart);
}

function renderMixBoxGrid() {
    const grid = document.getElementById('mixFlavorsGrid');
    if (!grid) return;

    grid.innerHTML = products.map(product => `
        <div class="mix-flavor-card" onclick="toggleMixFlavor(${product.id})">
            <div class="mix-flavor-count" id="mix-count-${product.id}">0</div>
            <img src="${product.img}" alt="${product.name}" class="mix-flavor-img" loading="lazy">
            <span class="mix-flavor-name">${product.flavor}</span>
            <span class="mix-flavor-tag">10k</span>
        </div>
    `).join('');
}

function toggleMixFlavor(productId) {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate(15);
    }
    const count = state.mixBox.flavors.filter(id => id === productId).length;

    if (state.mixBox.flavors.length < state.mixBox.size) {
        state.mixBox.flavors.push(productId);
    } else {
        if (count > 0) {
            const index = state.mixBox.flavors.indexOf(productId);
            state.mixBox.flavors.splice(index, 1);
        } else {
            const btn = document.getElementById('addMixBoxToCartBtn');
            btn.style.transform = 'translateX(6px)';
            setTimeout(() => btn.style.transform = 'translateX(-6px)', 100);
            setTimeout(() => btn.style.transform = 'translateX(0)', 200);
            return;
        }
    }
    renderMixBox();
}

function renderMixBox() {
    const { size, flavors } = state.mixBox;

    const countElem = document.getElementById('mixTargetCount');
    if (countElem) countElem.innerText = size;

    const btn = document.getElementById('addMixBoxToCartBtn');

    if (flavors.length === size) {
        btn.disabled = false;
        btn.innerHTML = `<i class="fa-solid fa-basket-shopping"></i> Thêm Set 5 Hộp (${flavors.length}/${size}) Vào Giỏ • ${formatMoney(state.mixBox.price)}`;
    } else {
        btn.disabled = true;
        btn.innerHTML = `<i class="fa-solid fa-basket-shopping"></i> Chọn thêm ${size - flavors.length} vị để hoàn tất Set 5 Hộp`;
    }

    // Render Slots
    let slotsHTML = '';
    for (let i = 0; i < size; i++) {
        if (i < flavors.length) {
            const product = products.find(p => p.id === flavors[i]);
            slotsHTML += `<div class="slot filled" style="background-image: url('${product.img}')" onclick="removeFlavorAt(${i})" title="Bấm để xóa"></div>`;
        } else {
            slotsHTML += `<div class="slot" title="Vị còn trống">+</div>`;
        }
    }
    document.getElementById('selectionSlots').innerHTML = slotsHTML;

    // Cập nhật số lượng đếm trên từng ô
    products.forEach(p => {
        const count = flavors.filter(id => id === p.id).length;
        const countBadge = document.getElementById(`mix-count-${p.id}`);
        if (!countBadge) return;
        const card = countBadge.parentElement;

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

    const flavorCounts = {};
    flavors.forEach(id => {
        const p = products.find(prod => prod.id === id);
        flavorCounts[p.flavor] = (flavorCounts[p.flavor] || 0) + 1;
    });

    const desc = Object.entries(flavorCounts).map(([name, count]) => `${name} (x${count})`).join(', ');
    const boxName = `Set 5 Hộp Mix Vị Tùy Chọn`;

    // Tạo ID độc nhất theo tổ hợp vị
    const mixId = 'combo5_' + flavors.slice().sort().join('_');

    addToCart(mixId, 'mix', {
        id: mixId,
        name: boxName,
        desc: desc,
        price: price,
        size: size,
        img: 'assets/mango_panna_cotta_1790435259241.png'
    });

    // Reset lựa chọn
    state.mixBox.flavors = [];
    renderMixBox();
}

// --- Cart System ---
function toggleCart() {
    const isOpen = document.body.classList.toggle('cart-open');
    document.documentElement.classList.toggle('cart-open', isOpen);
}

function addToCart(itemId, type = 'single', customData = null) {
    const existingItem = state.cart.find(item => String(item.id) === String(itemId));

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        if (type === 'single') {
            const product = products.find(p => p.id === itemId);
            state.cart.push({
                id: product.id,
                name: product.name,
                flavor: product.flavor,
                price: product.price,
                img: product.img,
                quantity: 1,
                type: 'single',
                size: 1
            });
        } else if (type === 'mix') {
            state.cart.push({ ...customData, quantity: 1, type: 'mix' });
        }
    }

    saveCart();
    updateCartUI();

    // Hiệu ứng phản hồi giỏ hàng
    const cartBtn = document.getElementById('cartBtn');
    cartBtn.style.transform = 'scale(1.25)';
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
    const promo = calculatePromotion(state.cart);
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
                    ${item.type === 'mix' ? `<p class="cart-item-mix-desc">${item.desc}</p>` : ''}
                    <div class="cart-item-price">${formatMoney(item.price)}</div>
                    <div class="cart-item-actions">
                        <div class="qty-controls">
                            <button class="qty-btn" onclick="updateQuantity('${item.id}', -1)" aria-label="Giảm">-</button>
                            <span class="qty-val">${item.quantity}</span>
                            <button class="qty-btn" onclick="updateQuantity('${item.id}', 1)" aria-label="Tăng">+</button>
                        </div>
                        <button class="remove-btn" onclick="removeFromCart('${item.id}')">Xóa</button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Hiển thị Banner Khuyến Mãi trong giỏ hàng
    let promoBadgeHTML = '';
    if (promo.isPromoActive && state.cart.length > 0) {
        if (promo.freeGifts > 0) {
            promoBadgeHTML = `
                <div class="cart-promo-reward">
                    <div class="promo-icon"><i class="fa-solid fa-gift"></i></div>
                    <div class="promo-text">
                        <strong>Ưu đãi Khai Trương:</strong>
                        <span>Bạn được tặng <b>${promo.freeGifts} hộp</b> Panna Cotta miễn phí!</span>
                    </div>
                </div>
            `;
        } else {
            const needMore = 5 - (promo.totalCups % 5);
            promoBadgeHTML = `
                <div class="cart-promo-hint">
                    <i class="fa-solid fa-fire text-yellow"></i>
                    <span>Thêm <b>${needMore} hộp</b> nữa để được <b>TẶNG 1 HỘP</b> miễn phí!</span>
                </div>
            `;
        }
    }

    const promoContainer = document.getElementById('cartPromoArea');
    if (promoContainer) {
        promoContainer.innerHTML = promoBadgeHTML;
    }

    document.getElementById('cartTotalPrice').innerText = formatMoney(promo.finalTotal);

    // Cập nhật thanh Mobile Sticky Quick Cart Bar
    const mobileSticky = document.getElementById('mobileStickyCart');
    const mobileStickyCount = document.getElementById('mobileStickyCount');
    const mobileStickyPrice = document.getElementById('mobileStickyPrice');
    const mobileStickySub = document.getElementById('mobileStickySub');

    if (mobileSticky && mobileStickyCount && mobileStickyPrice) {
        if (totalItems > 0) {
            mobileSticky.classList.add('visible');
            mobileStickyCount.innerText = totalItems;
            mobileStickyPrice.innerText = formatMoney(promo.finalTotal);
            if (promo.freeGifts > 0) {
                mobileStickySub.innerHTML = `<span class="text-primary font-bold">+${promo.freeGifts} Hộp Tặng</span> • Freeship BKX`;
            } else {
                mobileStickySub.innerText = 'Freeship khu vực BKX';
            }
        } else {
            mobileSticky.classList.remove('visible');
        }
    }
}

// --- Checkout System ---
function openCheckoutModal() {
    if (state.cart.length === 0) return;
    const promo = calculatePromotion(state.cart);

    // Cập nhật tóm tắt đơn hàng trong modal
    const summaryElem = document.getElementById('checkoutSummary');
    if (summaryElem) {
        summaryElem.innerHTML = `
            <div class="checkout-summary-box">
                <div class="summary-line">
                    <span>Tổng số lượng đặt:</span>
                    <strong>${promo.totalCups} hộp panna cotta</strong>
                </div>
                ${promo.freeGifts > 0 ? `
                    <div class="summary-line gift-highlight">
                        <span><i class="fa-solid fa-gift"></i> Quà tặng khai trương:</span>
                        <strong class="text-green">+${promo.freeGifts} HỘP TẶNG KÈM</strong>
                    </div>
                ` : ''}
                <div class="summary-line total-line">
                    <span>Tổng tiền thanh toán:</span>
                    <strong class="text-primary">${formatMoney(promo.finalTotal)}</strong>
                </div>
                <div class="shipping-tag">
                    <i class="fa-solid fa-truck-fast"></i> ${SYSTEM_CONFIG.store.freeShippingNote}
                </div>
            </div>
        `;
    }

    // Hiển thị lựa chọn vị quà tặng nếu có quà
    const giftSelectGroup = document.getElementById('giftFlavorGroup');
    if (giftSelectGroup) {
        if (promo.freeGifts > 0) {
            giftSelectGroup.style.display = 'block';
            const selectElem = document.getElementById('giftFlavorSelect');
            if (selectElem) {
                selectElem.innerHTML = `
                    <option value="Shop tự mix vị ngon nhất">✨ Shop tự mix vị ngon nhất (Khuyên dùng)</option>
                    <option value="Chanh leo">Vị Chanh Leo (Thanh mát)</option>
                    <option value="Dâu">Vị Dâu Tây (Best seller)</option>
                    <option value="Việt quất">Vị Việt Quất (Đậm đà)</option>
                    <option value="Kiwi">Vị Kiwi (Mát lạnh)</option>
                    <option value="Đào">Vị Đào (Thơm lừng)</option>
                    <option value="Ghi chú trong lời nhắn">Tôi ghi chú riêng trong lời nhắn</option>
                `;
            }
        } else {
            giftSelectGroup.style.display = 'none';
        }
    }

    document.body.classList.remove('cart-open');
    document.documentElement.classList.remove('cart-open');
    document.body.classList.add('modal-open');
    document.documentElement.classList.add('modal-open');
}

function closeCheckoutModal() {
    document.body.classList.remove('modal-open');
    document.documentElement.classList.remove('modal-open');
}

/**
 * =============================================================================
 * 4. XỬ LÝ ĐẶT HÀNG & BẮN DỮ LIỆU SANG GOOGLE SHEETS
 * =============================================================================
 */
async function handleOrderSubmit(e) {
    e.preventDefault();
    if (state.cart.length === 0) return;

    const form = e.target;
    const formData = new FormData(form);
    const submitBtn = document.getElementById('submitBtn');
    const formStatus = document.getElementById('formStatus');

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Đang xử lý gửi đơn...';

    const promo = calculatePromotion(state.cart);

    // Chuẩn bị chi tiết đơn hàng dạng text đẹp
    const orderDetails = state.cart.map(item => {
        let detail = `• ${item.name} x${item.quantity} (${formatMoney(item.price * item.quantity)})`;
        if (item.type === 'mix') detail += `\n  - Vị: ${item.desc}`;
        return detail;
    }).join('\n');

    const giftFlavor = promo.freeGifts > 0 ? (formData.get('giftFlavor') || 'Shop tự mix') : 'Không có';

    // Payload hoàn chỉnh gửi tới Google Sheet
    const orderData = {
        name: formData.get('name'),
        phone: formData.get('phone'),
        address: formData.get('address'),
        notes: formData.get('notes') || '',
        totalCups: promo.totalCups,
        freeGifts: promo.freeGifts > 0 ? `${promo.freeGifts} hộp (Vị: ${giftFlavor})` : '0',
        promotionApplied: promo.promoName,
        cartDetails: orderDetails,
        totalPrice: formatMoney(promo.finalTotal),
        shippingArea: SYSTEM_CONFIG.store.freeShippingNote,
        orderDate: new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })
    };

    // URL Web App Google Apps Script
    const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbyvyFQ8xlVljOMXW0WhaN4KlLS5ommRvfamDoJV8m1_-FaghAt5X-FJB8p6AnEPTtRj/exec';

    try {
        if (!GOOGLE_SHEET_URL || GOOGLE_SHEET_URL === 'YOUR_GOOGLE_WEB_APP_URL_HERE') {
            console.warn("Chưa cấu hình URL Google Sheet. Giả lập thành công...");
            await new Promise(resolve => setTimeout(resolve, 1200));
        } else {
            // Gửi dữ liệu tới Google Apps Script (text/plain để tránh lỗi CORS Preflight)
            const response = await fetch(GOOGLE_SHEET_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/plain;charset=utf-8'
                },
                body: JSON.stringify(orderData)
            });

            const result = await response.json().catch(() => null);
            if (result && result.status === 'error') {
                console.error('Lỗi từ Google Apps Script:', result.message);
                throw new Error(result.message);
            }
        }

        formStatus.innerHTML = `
            <div class="success-msg">
                <i class="fa-solid fa-circle-check"></i> 
                Đặt hàng thành công! La Panna sẽ gọi điện xác nhận và giao bánh nhanh cho bạn.
            </div>
        `;

        setTimeout(() => {
            form.reset();
            state.cart = [];
            saveCart();
            updateCartUI();
            closeCheckoutModal();
            formStatus.innerHTML = '';
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Xác Nhận Đặt Hàng';
        }, 2200);

    } catch (error) {
        console.error('Lỗi gửi đơn hàng:', error);
        formStatus.innerHTML = `
            <div class="error-msg">
                <i class="fa-solid fa-circle-exclamation"></i> 
                ${error.message && !error.message.includes('fetch') ? error.message : 'Đã gửi thông tin đơn hàng! Nếu nhân viên chưa gọi sau 15 phút, vui lòng gọi Hotline 0888231700.'}
            </div>
        `;
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Xác Nhận Đặt Hàng';
    }
}

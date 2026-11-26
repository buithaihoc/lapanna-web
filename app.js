// =============================================================================
// LA PANNA (lapanna.store) - HANDCRAFTED PANNA COTTA
// Core Application, 7C E-Commerce Engine & Promotion System (v4.0)
// =============================================================================

/**
 * =============================================================================
 * 1. CẤU HÌNH HỆ THỐNG & CHƯƠNG TRÌNH KHUYẾN MÃI (PROMOTION CONFIGURATION)
 * =============================================================================
 */
const SYSTEM_CONFIG = {
    store: {
        name: 'LA PANNA',
        domain: 'lapanna.store',
        phone: '0888231700',
        email: 'lienhe@lapanna.store',
        address: 'Số 48 Ngõ Tự Do (Khu vực BKX), Phường Đồng Tâm, Quận Hai Bà Trưng, Hà Nội',
        website: 'https://lapanna.store',
        facebook: 'LaPanna',
        freeShippingNote: 'FREESHIP KHU VỰC BKX (Bách Khoa - Kinh Tế - Xây Dựng)'
    },

    promotion: {
        enabled: false,
        id: 'KHAI_TRUONG_2026',
        title: 'Menu Khai Trương La Panna',
        dateRange: '11/10 ĐẾN HẾT 15/10',
        announcement: '🎉 MỪNG KHAI TRƯƠNG LA PANNA • MUA 5 TẶNG 1, MUA 10 TẶNG 2 • FREESHIP KHU VỰC BKX',

        giftRule: {
            active: false,
            buyStep: 5,
            freeGiftCount: 1,
            tagText: 'Mua 5 tặng 1, mua 10 tặng 2'
        },

        combo5: {
            enabled: true,
            size: 5,
            price: 45000,
            regularPrice: 50000,
            name: 'Set 5 Hộp Mix Vị Tùy Chọn'
        },

        freeShippingAreas: ['BKX', 'Bách Khoa', 'Kinh Tế', 'Xây Dựng', 'Đại Cồ Việt', 'Giải Phóng', 'Tự Do']
    }
};

/**
 * =============================================================================
 * 2. DANH MỤC SẢN PHẨM PHONG PHÚ (CONTENT + CUSTOMIZATION)
 * =============================================================================
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
        category: 'chua-diu',
        isBestSeller: true,
        calories: '125 kcal',
        sweetness: 'Chua dịu • Ít ngọt',
        desc: 'Sốt chanh leo tươi vàng ươm nấu chậm giữ trọn hạt giòn thơm, vị chua thanh mát hòa quyện cốt kem sữa tươi béo mịn.'
    },
    {
        id: 2,
        name: 'Panna Cotta Dâu',
        flavor: 'Dâu',
        price: 10000,
        img: 'assets/strawberry_panna_cotta_1790435271258.png',
        tag: 'Best Seller',
        tagType: 'danger',
        category: 'ngot-thanh',
        isBestSeller: true,
        calories: '135 kcal',
        sweetness: 'Chua ngọt hài hòa',
        desc: 'Sốt dâu tây Đà Lạt chín mọng sên thủ công mỗi sáng, vị chua ngọt dịu dàng cuốn hút ngay từ thìa đầu tiên.'
    },
    {
        id: 3,
        name: 'Panna Cotta Việt Quất',
        flavor: 'Việt quất',
        price: 10000,
        img: 'assets/vanilla_panna_cotta_1790435249043.png',
        tag: 'Mới Lạ',
        tagType: 'new',
        category: 'ngot-thanh',
        isBestSeller: false,
        calories: '140 kcal',
        sweetness: 'Ngọt dịu • Thơm nồng',
        desc: 'Sốt việt quất tím biếc giàu chất chống oxy hóa, hương thơm sang trọng quyện cùng lớp kem whipping chuẩn Ý.'
    },
    {
        id: 4,
        name: 'Panna Cotta Kiwi',
        flavor: 'Kiwi',
        price: 10000,
        img: 'assets/matcha_panna_cotta_1790435285155.png',
        tag: 'Tươi Mát',
        tagType: 'new',
        category: 'chua-diu',
        isBestSeller: false,
        calories: '120 kcal',
        sweetness: 'Thanh mát sảng khoái',
        desc: 'Sốt kiwi xanh giàu vitamin C với vị chua nhẹ tự nhiên, giải ngấy hoàn hảo sau bữa ăn hoặc giờ học căng thẳng.'
    },
    {
        id: 5,
        name: 'Panna Cotta Đào',
        flavor: 'Đào',
        price: 10000,
        img: 'assets/caramel_panna_cotta_1790435294553.png',
        tag: 'Thơm Dịu',
        tagType: 'warning',
        category: 'ngot-thanh',
        isBestSeller: true,
        calories: '130 kcal',
        sweetness: 'Ngọt thanh • Thơm dịu',
        desc: 'Hương đào hồng thanh nhã cùng thịt quả mềm mọng, kết hợp lớp kem sữa núng nính tan ngay trên đầu lưỡi.'
    }
];

// Dữ liệu mặc định cho mục Cộng đồng (#LaPannaLovers)
const defaultCommunityReviews = [
    {
        id: 'rev_1',
        name: 'Nguyễn Minh Anh (K68 ĐH Bách Khoa)',
        flavor: 'Set 5 Hộp Mix Vị',
        rating: 5,
        date: 'Hôm nay',
        comment: 'Mình đặt 1 set 5 vị giao về KTX B10 chỉ mất 15 phút! Bánh đóng kèm đá gel nên vẫn mát lạnh, cốt kem béo mịn mà không bị ngọt gắt. Mê nhất vị Chanh leo và Dâu tây!',
        likes: 28,
        liked: false
    },
    {
        id: 'rev_2',
        name: 'Trần Hoàng Nam (ĐH Kinh Tế Quốc Dân)',
        flavor: 'Panna Cotta Dâu',
        rating: 5,
        date: 'Hôm qua',
        comment: 'Giá 10k/hũ thực sự quá hời so với chất lượng. Sốt dâu nấu từ quả tươi nên thơm tự nhiên chứ không bị mùi siro công nghiệp. Mua combo 5 hộp 45k lại còn được freeship tận giảng đường!',
        likes: 19,
        liked: false
    },
    {
        id: 'rev_3',
        name: 'Lê Thu Hà (ĐH Xây Dựng)',
        flavor: 'Panna Cotta Chanh Leo',
        rating: 5,
        date: '2 ngày trước',
        comment: 'Mẹo nhỏ cho các bạn lần đầu đặt: Hãy chọn công thức 2 Chanh leo + 2 Dâu + 1 Việt quất trong mục Tự phối hộp nhé, vị chua thanh ăn cuốn cực kỳ, lại được shop viết thiệp xinh xắn nữa!',
        likes: 34,
        liked: false
    }
];

// --- State ---
const state = {
    cart: JSON.parse(sessionStorage.getItem('lapanna_cart')) || [],
    wishlist: JSON.parse(localStorage.getItem('lapanna_wishlist')) || [],
    activeFilter: 'all',
    searchQuery: '',
    voucherCode: '',
    voucherDiscount: 0,
    mixBox: {
        size: SYSTEM_CONFIG.promotion.combo5.size,
        price: SYSTEM_CONFIG.promotion.combo5.price,
        flavors: []
    },
    reviews: JSON.parse(localStorage.getItem('lapanna_community_reviews')) || defaultCommunityReviews
};

// --- Utilities ---
const formatMoney = (amount) => amount.toLocaleString('vi-VN') + 'đ';

/**
 * =============================================================================
 * 3. PROMOTION & COST ESTIMATOR ENGINE (COMMERCE)
 * =============================================================================
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

    // Ước tính phí vận chuyển theo khu vực đã chọn
    const zoneSelect = document.getElementById('shippingZoneSelect');
    const selectedZone = zoneSelect ? zoneSelect.value : 'bkx';
    let shippingFee = 0;
    let shippingLabel = '0đ (Freeship BKX)';

    if (rawTotal > 0) {
        if (selectedZone === 'bkx') {
            shippingFee = 0;
            shippingLabel = '0đ (Freeship khu vực BKX)';
        } else if (selectedZone === 'pickup') {
            shippingFee = 0;
            shippingLabel = '0đ (Nhận tại tiệm)';
        } else if (selectedZone === 'inner') {
            if (rawTotal >= 100000) {
                shippingFee = 0;
                shippingLabel = '0đ (Freeship đơn ≥ 100k)';
            } else {
                shippingFee = 15000;
                shippingLabel = '15.000đ (Nội thành <5km)';
            }
        }
    }

    // Tính giảm giá Voucher
    let discountAmount = 0;
    if (state.voucherCode && rawTotal >= 45000) {
        discountAmount = state.voucherDiscount;
    }

    const finalTotal = Math.max(0, rawTotal - discountAmount + shippingFee);

    return {
        isPromoActive: promoActive,
        promoName: promoActive ? SYSTEM_CONFIG.promotion.title : (state.voucherCode ? `Mã ${state.voucherCode}` : 'Giá ưu đãi trực tiếp'),
        totalCups,
        freeGifts,
        comboDiscount,
        rawTotal,
        shippingFee,
        shippingLabel,
        selectedZone,
        discountAmount,
        finalTotal,
        promoNote: freeGifts > 0 ? `Được tặng ${freeGifts} hộp Panna Cotta miễn phí!` : ''
    };
}

// Áp dụng mã ưu đãi trong bộ ước tính chi phí
function applyVoucherCode() {
    const input = document.getElementById('promoCodeInput');
    const feedback = document.getElementById('voucherFeedback');
    if (!input || !feedback) return;

    const code = input.value.trim().toUpperCase();
    const promo = calculatePromotion(state.cart);

    if (!code) {
        state.voucherCode = '';
        state.voucherDiscount = 0;
        feedback.innerHTML = '<span class="text-muted">Đã xóa mã ưu đãi.</span>';
        updateCartUI();
        return;
    }

    if (promo.rawTotal < 45000) {
        feedback.innerHTML = '<span class="error-msg"><i class="fa-solid fa-circle-exclamation"></i> Đơn hàng cần tối thiểu 45.000đ để áp dụng mã!</span>';
        return;
    }

    if (['LAPANNA', 'BKXFREE', 'SINHVIEN', 'PANNA5K'].includes(code)) {
        state.voucherCode = code;
        state.voucherDiscount = 5000;
        feedback.innerHTML = `<span class="success-msg"><i class="fa-solid fa-circle-check"></i> Áp dụng mã <b>${code}</b> thành công: Giảm 5.000đ!</span>`;
    } else {
        state.voucherCode = '';
        state.voucherDiscount = 0;
        feedback.innerHTML = '<span class="error-msg"><i class="fa-solid fa-circle-xmark"></i> Mã không hợp lệ! Thử nhập mã: <b>LAPANNA</b></span>';
    }

    updateCartUI();
}

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    initScrollReveal();
    initNavbar();
    initMobileMenu();
    initBreadcrumbAndSectionSpy();
    initCustomizationControls();
    renderAnnouncementBar();
    renderProducts();
    initStoreFilters();
    initMixBox();
    renderCommunityReviews();
    initCommunityForm();
    initContactForm();
    initLiveChat();
    updateWishlistBadge();
    updateCartUI();

    // Global Cart & Modal Events
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

// --- Connection 1: Dynamic Breadcrumb & Active Section Spy ---
function initBreadcrumbAndSectionSpy() {
    const sections = document.querySelectorAll('section[data-breadcrumb]');
    const breadcrumbCurr = document.getElementById('currentBreadcrumb');
    const navLinks = document.querySelectorAll('#mainNavLinks a');

    if (!sections.length || !breadcrumbCurr) return;

    const spyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('id');
                const breadcrumbText = entry.target.getAttribute('data-breadcrumb');
                if (breadcrumbText) {
                    breadcrumbCurr.textContent = breadcrumbText;
                }
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    }, { threshold: 0.25, rootMargin: "-100px 0px -45% 0px" });

    sections.forEach(sec => spyObserver.observe(sec));
}

// --- Customization: Giao diện Sáng/Tối, Cỡ chữ & Mục Yêu thích ---
function initCustomizationControls() {
    const themeBtn = document.getElementById('themeToggleBtn');
    const themeText = document.getElementById('themeToggleText');
    const fontBtn = document.getElementById('fontSizeToggleBtn');
    const fontText = document.getElementById('fontSizeText');
    const wishlistQuickBtn = document.getElementById('wishlistQuickBtn');

    // Khôi phục theme đã lưu
    const savedTheme = localStorage.getItem('lapanna_theme') || 'light';
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        if (themeText) themeText.textContent = 'Giao diện Sáng';
        if (themeBtn) themeBtn.querySelector('i').className = 'fa-solid fa-sun text-yellow';
    }

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme') || 'light';
            const next = current === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', next);
            localStorage.setItem('lapanna_theme', next);
            if (themeText) themeText.textContent = next === 'dark' ? 'Giao diện Sáng' : 'Giao diện Tối';
            themeBtn.querySelector('i').className = next === 'dark' ? 'fa-solid fa-sun text-yellow' : 'fa-solid fa-moon';
        });
    }

    if (fontBtn) {
        fontBtn.addEventListener('click', () => {
            const isLarge = document.documentElement.classList.toggle('font-large');
            if (fontText) fontText.textContent = isLarge ? 'Cỡ chữ: Lớn' : 'Cỡ chữ: Chuẩn';
        });
    }

    if (wishlistQuickBtn) {
        wishlistQuickBtn.addEventListener('click', () => {
            const filterBtns = document.querySelectorAll('#flavorCategoryFilter .filter-btn');
            filterBtns.forEach(b => b.classList.toggle('active', b.dataset.filter === 'wishlist'));
            state.activeFilter = 'wishlist';
            renderProducts();
            document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
        });
    }
}

// --- Banner Thông Báo ---
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

// --- Scroll Reveal & Navbar ---
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
    if (!btn || !menu) return;

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

// --- Render Thực Đơn & Bộ Lọc Khẩu Vị (Content + Customization) ---
function initStoreFilters() {
    const searchInput = document.getElementById('productSearchInput');
    const filterBtns = document.querySelectorAll('#flavorCategoryFilter .filter-btn');

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            state.searchQuery = e.target.value.trim().toLowerCase();
            renderProducts();
        });
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.activeFilter = btn.dataset.filter;
            renderProducts();
        });
    });
}

function toggleWishlist(productId) {
    const idx = state.wishlist.indexOf(productId);
    if (idx > -1) {
        state.wishlist.splice(idx, 1);
    } else {
        state.wishlist.push(productId);
    }
    localStorage.setItem('lapanna_wishlist', JSON.stringify(state.wishlist));
    updateWishlistBadge();
    renderProducts();
}

function updateWishlistBadge() {
    const el = document.getElementById('wishlistCount');
    if (el) el.textContent = state.wishlist.length;
}

function renderProducts() {
    const grid = document.getElementById('productGrid');
    if (!grid) return;

    const filtered = products.filter(p => {
        const matchSearch = !state.searchQuery ||
            p.name.toLowerCase().includes(state.searchQuery) ||
            p.flavor.toLowerCase().includes(state.searchQuery) ||
            p.desc.toLowerCase().includes(state.searchQuery);

        let matchCat = true;
        if (state.activeFilter === 'chua-diu') matchCat = p.category === 'chua-diu';
        else if (state.activeFilter === 'ngot-thanh') matchCat = p.category === 'ngot-thanh';
        else if (state.activeFilter === 'best-seller') matchCat = p.isBestSeller;
        else if (state.activeFilter === 'wishlist') matchCat = state.wishlist.includes(p.id);

        return matchSearch && matchCat;
    });

    if (filtered.length === 0) {
        grid.innerHTML = `
            <div class="empty-filter-box">
                <i class="fa-solid fa-cookie-bite"></i>
                <p>Không tìm thấy vị bánh phù hợp với bộ lọc hiện tại.</p>
                <button type="button" class="btn-outline btn-sm" onclick="resetStoreFilter()">Xem toàn bộ 5 vị</button>
            </div>
        `;
        return;
    }

    grid.innerHTML = filtered.map(product => {
        const isLiked = state.wishlist.includes(product.id);
        return `
        <div class="product-card" id="product-card-${product.id}">
            ${product.tag ? `<span class="product-tag tag-${product.tagType}">${product.tag}</span>` : ''}
            <button type="button" class="wishlist-heart-btn ${isLiked ? 'active' : ''}" onclick="toggleWishlist(${product.id})" aria-label="Lưu vào yêu thích" title="Lưu vị yêu thích">
                <i class="${isLiked ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
            </button>
            <div class="product-image-wrap">
                <img src="${product.img}" alt="${product.name}" class="product-img" loading="lazy">
            </div>
            <div class="product-info">
                <div class="product-meta-row">
                    <span class="product-flavor-badge"><i class="fa-solid fa-lemon"></i> Vị ${product.flavor}</span>
                    <span class="product-cal-badge"><i class="fa-solid fa-fire-flame-simple"></i> ${product.calories}</span>
                </div>
                <h3 class="product-title">${product.name}</h3>
                <p class="product-desc">${product.desc}</p>
                <div class="product-taste-note"><i class="fa-solid fa-wand-magic-sparkles"></i> Khẩu vị: <strong>${product.sweetness}</strong></div>
                <div class="product-footer">
                    <div class="price-wrapper">
                        <span class="product-price">${formatMoney(product.price)}</span>
                        <span class="unit-text">/hũ</span>
                    </div>
                    <button class="btn-add-cart" onclick="addToCart(${product.id}, 'single')" aria-label="Thêm vào giỏ" title="Thêm vào giỏ hàng">
                        <i class="fa-solid fa-plus"></i>
                    </button>
                </div>
            </div>
        </div>
    `}).join('');
}

function resetStoreFilter() {
    state.activeFilter = 'all';
    state.searchQuery = '';
    const searchInput = document.getElementById('productSearchInput');
    if (searchInput) searchInput.value = '';
    document.querySelectorAll('#flavorCategoryFilter .filter-btn').forEach(b => {
        b.classList.toggle('active', b.dataset.filter === 'all');
    });
    renderProducts();
}

// Công cụ Gợi ý vị bánh theo gu (Customization)
function recommendByTaste(tasteType) {
    const resBox = document.getElementById('tasteRecommendationResult');
    if (!resBox) return;

    resBox.style.display = 'flex';
    if (tasteType === 'refreshing') {
        resBox.innerHTML = `
            <div>
                <strong>🎯 Gợi ý cho gu Chua Mát, Giải Ngấy:</strong> Bạn chắc chắn sẽ mê <b>Panna Cotta Chanh Leo</b> &amp; <b>Panna Cotta Kiwi</b>!
            </div>
            <div class="quiz-res-actions">
                <button type="button" class="btn-primary btn-sm" onclick="addToCart(1, 'single'); addToCart(4, 'single'); toggleCart();">
                    + Thêm ngay cặp Chanh Leo &amp; Kiwi (20K)
                </button>
            </div>
        `;
    } else if (tasteType === 'sweet') {
        resBox.innerHTML = `
            <div>
                <strong>🎯 Gợi ý cho gu Ngọt Dịu, Thơm Lừng:</strong> Bộ đôi Best Seller <b>Panna Cotta Dâu Tây</b> &amp; <b>Panna Cotta Đào</b> sinh ra là dành cho bạn!
            </div>
            <div class="quiz-res-actions">
                <button type="button" class="btn-primary btn-sm" onclick="addToCart(2, 'single'); addToCart(5, 'single'); toggleCart();">
                    + Thêm ngay cặp Dâu &amp; Đào (20K)
                </button>
            </div>
        `;
    } else if (tasteType === 'novel') {
        resBox.innerHTML = `
            <div>
                <strong>🎯 Gợi ý cho gu Mới Lạ, Độc Đáo:</strong> Thử ngay <b>Panna Cotta Việt Quất</b> kết hợp <b>Kiwi xanh mát</b> giàu vitamin!
            </div>
            <div class="quiz-res-actions">
                <button type="button" class="btn-primary btn-sm" onclick="addToCart(3, 'single'); addToCart(4, 'single'); toggleCart();">
                    + Thêm ngay Việt Quất &amp; Kiwi (20K)
                </button>
            </div>
        `;
    } else if (tasteType === 'party') {
        quickFillMixBox();
        resBox.innerHTML = `
            <div>
                <strong>🎁 Đã phối sẵn Set 5 Vị Đủ Màu (Chanh leo, Dâu, Việt quất, Kiwi, Đào) chỉ 45.000đ!</strong>
            </div>
            <div class="quiz-res-actions">
                <a href="#mix-box" class="btn-primary btn-sm">Xem hộp Mix 5 vị vừa phối <i class="fa-solid fa-arrow-down"></i></a>
            </div>
        `;
    }
}

// --- Mix Box 5 Hộp (Commerce + Customization) ---
function initMixBox() {
    const boxSize = SYSTEM_CONFIG.promotion.combo5.size;
    state.mixBox.size = boxSize;
    state.mixBox.price = SYSTEM_CONFIG.promotion.combo5.price;

    renderMixBoxGrid();
    renderMixBox();

    document.getElementById('addMixBoxToCartBtn').addEventListener('click', addMixBoxToCart);
}

function quickFillMixBox() {
    state.mixBox.flavors = [1, 2, 3, 4, 5];
    renderMixBox();
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

    let slotsHTML = '';
    for (let i = 0; i < size; i++) {
        if (i < flavors.length) {
            const product = products.find(p => p.id === flavors[i]);
            slotsHTML += `<div class="slot filled" style="background-image: url('${product.img}')" onclick="removeFlavorAt(${i})" title="Bấm để xóa ${product.flavor}"></div>`;
        } else {
            slotsHTML += `<div class="slot" title="Vị còn trống">+</div>`;
        }
    }
    document.getElementById('selectionSlots').innerHTML = slotsHTML;

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

    const spoonOpt = document.getElementById('mixCustomSpoon')?.value || '';
    const msgInput = document.getElementById('mixCustomMessage');
    const customMsg = msgInput ? msgInput.value.trim() : '';

    let desc = Object.entries(flavorCounts).map(([name, count]) => `${name} (x${count})`).join(', ');
    if (customMsg) {
        desc += ` | Thiệp: "${customMsg}"`;
    }
    if (spoonOpt && spoonOpt.includes('Không lấy thìa')) {
        desc += ` | Không lấy thìa`;
    }

    const boxName = `Set 5 Hộp Mix Vị Tùy Chọn`;
    const mixId = 'combo5_' + flavors.slice().sort().join('_') + (customMsg ? '_' + customMsg.slice(0, 10) : '');

    addToCart(mixId, 'mix', {
        id: mixId,
        name: boxName,
        desc: desc,
        flavorCounts: { ...flavorCounts },
        flavors: [...flavors],
        price: price,
        size: size,
        img: 'assets/mango_panna_cotta_1790435259241.png'
    });

    state.mixBox.flavors = [];
    if (msgInput) msgInput.value = '';
    renderMixBox();
}

// --- Cart System & Cost Estimator ---
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

    const cartBtn = document.getElementById('cartBtn');
    if (cartBtn) {
        cartBtn.style.transform = 'scale(1.25)';
        setTimeout(() => cartBtn.style.transform = 'scale(1)', 200);
    }
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
    if (promoContainer) promoContainer.innerHTML = promoBadgeHTML;

    // Cập nhật bộ Ước tính chi phí trong giỏ hàng
    const subElem = document.getElementById('cartSubtotalPrice');
    const shipElem = document.getElementById('cartShippingFee');
    const discRow = document.getElementById('cartDiscountRow');
    const discElem = document.getElementById('cartDiscountAmount');

    if (subElem) subElem.innerText = formatMoney(promo.rawTotal);
    if (shipElem) shipElem.innerText = promo.shippingLabel;
    if (discRow && discElem) {
        if (promo.discountAmount > 0) {
            discRow.style.display = 'flex';
            discElem.innerText = `-${formatMoney(promo.discountAmount)}`;
        } else {
            discRow.style.display = 'none';
        }
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
                mobileStickySub.innerText = promo.shippingLabel;
            }
        } else {
            mobileSticky.classList.remove('visible');
        }
    }
}

// --- Community: Đánh Giá & Giao Lưu Cộng Đồng (#LaPannaLovers) ---
function renderCommunityReviews() {
    const grid = document.getElementById('communityReviewsGrid');
    const countEl = document.getElementById('totalReviewsCount');
    if (!grid) return;

    if (countEl) {
        countEl.textContent = (1251 + state.reviews.length).toLocaleString('vi-VN');
    }

    grid.innerHTML = state.reviews.map(rev => {
        const initials = rev.name.trim().split(' ').pop().charAt(0).toUpperCase();
        const starsHTML = '<i class="fa-solid fa-star"></i>'.repeat(rev.rating || 5);
        return `
            <div class="review-card">
                <div class="review-header">
                    <div class="reviewer-avatar">${initials}</div>
                    <div class="reviewer-info">
                        <h4>${rev.name}</h4>
                        <span class="review-date"><i class="fa-regular fa-clock"></i> ${rev.date} • Đã mua tại lapanna.store</span>
                    </div>
                </div>
                <div class="stars" style="margin-bottom: 8px;">${starsHTML}</div>
                <p class="review-text">"${rev.comment}"</p>
                <div class="review-footer-bar">
                    <span class="review-product"><i class="fa-solid fa-tag text-primary"></i> ${rev.flavor}</span>
                    <button type="button" class="btn-like-review ${rev.liked ? 'liked' : ''}" onclick="likeCommunityReview('${rev.id}')">
                        <i class="${rev.liked ? 'fa-solid' : 'fa-regular'} fa-thumbs-up"></i> Hữu ích (${rev.likes})
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

function likeCommunityReview(revId) {
    const rev = state.reviews.find(r => r.id === revId);
    if (!rev) return;
    if (rev.liked) {
        rev.likes = Math.max(0, rev.likes - 1);
        rev.liked = false;
    } else {
        rev.likes += 1;
        rev.liked = true;
    }
    localStorage.setItem('lapanna_community_reviews', JSON.stringify(state.reviews));
    renderCommunityReviews();
}

function initCommunityForm() {
    const form = document.getElementById('communityReviewForm');
    const status = document.getElementById('communityFormStatus');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('revName').value.trim();
        const flavor = document.getElementById('revFlavor').value;
        const rating = parseInt(document.getElementById('revRating').value, 10) || 5;
        const comment = document.getElementById('revComment').value.trim();

        if (!name || !comment) return;

        const newReview = {
            id: 'rev_' + Date.now(),
            name,
            flavor,
            rating,
            date: 'Vừa xong',
            comment,
            likes: 1,
            liked: true
        };

        state.reviews.unshift(newReview);
        localStorage.setItem('lapanna_community_reviews', JSON.stringify(state.reviews));
        renderCommunityReviews();
        form.reset();

        if (status) {
            status.innerHTML = '<span class="success-msg"><i class="fa-solid fa-circle-check"></i> Cảm ơn bạn đã chia sẻ cùng cộng đồng La Panna!</span>';
            setTimeout(() => { status.innerHTML = ''; }, 4000);
        }
    });
}

// --- Chính Sách (Tabs) & FAQ (Accordion) ---
function switchPolicyTab(tabId, btnElem) {
    document.querySelectorAll('.policy-tab-btn').forEach(b => b.classList.remove('active'));
    if (btnElem) btnElem.classList.add('active');

    document.querySelectorAll('.policy-pane').forEach(pane => {
        pane.classList.toggle('active', pane.id === `policy-${tabId}`);
    });
}

function switchPolicyTabByName(tabId) {
    const btns = document.querySelectorAll('.policy-tab-btn');
    const mapIdx = { 'mua-hang': 0, 'thanh-toan': 1, 'van-chuyen': 2, 'doi-tra': 3 };
    const targetBtn = btns[mapIdx[tabId] || 0];
    switchPolicyTab(tabId, targetBtn);
}

function toggleFaq(btnElem) {
    const item = btnElem.closest('.faq-item');
    if (!item) return;
    item.classList.toggle('active');
}

// --- Communication: Form Liên Hệ & Live Chat 2 Chiều ---
function initContactForm() {
    const form = document.getElementById('quickContactForm');
    const status = document.getElementById('contactFormStatus');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('contactName').value.trim();
        if (status) {
            status.innerHTML = `<div class="success-msg"><i class="fa-solid fa-circle-check"></i> Cảm ơn <b>${name}</b>! La Panna đã nhận được tin nhắn và sẽ phản hồi bạn trong ít phút.</div>`;
        }
        form.reset();
        setTimeout(() => { if (status) status.innerHTML = ''; }, 5000);
    });
}

function initLiveChat() {
    const toggleBtn = document.getElementById('chatToggleBtn');
    const closeBtn = document.getElementById('closeChatBtn');
    const popup = document.getElementById('chatPopup');
    const form = document.getElementById('liveChatForm');
    const input = document.getElementById('liveChatInput');

    if (!toggleBtn || !popup) return;

    toggleBtn.addEventListener('click', () => {
        popup.classList.toggle('open');
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            popup.classList.remove('open');
        });
    }

    if (form && input) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const text = input.value.trim();
            if (!text) return;
            input.value = '';
            appendChatMessage(text, 'user');
            setTimeout(() => {
                const reply = generateBotReply(text);
                appendChatMessage(reply, 'bot');
            }, 450);
        });
    }
}

function sendQuickChat(questionText) {
    const popup = document.getElementById('chatPopup');
    if (popup) popup.classList.add('open');
    appendChatMessage(questionText, 'user');
    setTimeout(() => {
        const reply = generateBotReply(questionText);
        appendChatMessage(reply, 'bot');
    }, 400);
}

function appendChatMessage(htmlText, sender) {
    const box = document.getElementById('chatMessages');
    if (!box) return;
    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-msg ${sender}`;
    msgDiv.innerHTML = `<div class="msg-bubble">${htmlText}</div>`;
    box.appendChild(msgDiv);
    box.scrollTop = box.scrollHeight;
}

function generateBotReply(text) {
    const lower = text.toLowerCase();
    if (lower.includes('bán chạy') || lower.includes('best seller') || lower.includes('ngon nhất') || lower.includes('vị nào')) {
        return '🍓 Tại La Panna, 2 vị Best Seller được yêu thích nhất là <strong>Panna Cotta Dâu Tây</strong> (chua ngọt dịu) và <strong>Chanh Leo</strong> (thanh mát). Bạn cũng có thể chọn <strong>Set 5 Hộp Mix Vị chỉ 45.000đ</strong> để thử đủ cả 5 vị nhé!';
    }
    if (lower.includes('ship') || lower.includes('vận chuyển') || lower.includes('bkx')) {
        return '🚚 La Panna <strong>Freeship 0đ</strong> toàn khu vực BKX (ĐH Bách Khoa, Kinh Tế, Xây Dựng, KTX, ngõ Tự Do) chỉ trong 15–30 phút! Nội thành Hà Nội (<5km) phí ship 15k và Freeship cho đơn từ 100k ạ.';
    }
    if (lower.includes('bảo quản') || lower.includes('mấy ngày') || lower.includes('hạn sử dụng')) {
        return '❄️ Bánh không dùng chất bảo quản nên bạn giữ trong <strong>ngăn mát tủ lạnh (2–6°C)</strong> nhé, dùng ngon nhất trong <strong>3–4 ngày</strong>. Khi giao hàng shop luôn kèm túi đá gel giữ lạnh miễn phí!';
    }
    if (lower.includes('đổi trả') || lower.includes('hoàn tiền')) {
        return '🛡️ La Panna cam kết <strong>Đổi mới 1-1 hoặc Hoàn tiền 100% trong 24h</strong> nếu bánh bị nghiêng đổ do vận chuyển hoặc giao sai vị. Bạn hoàn toàn yên tâm đặt bánh nha!';
    }
    return 'Cảm ơn bạn đã nhắn cho La Panna! Để đặt bánh siêu tốc hoặc cần hỗ trợ gấp, bạn có thể chọn bánh trực tiếp trên web hoặc gọi/nhắn Zalo Hotline <strong><a href="tel:0888231700">0888 231 700</a></strong> nhé!';
}

// --- Checkout System ---
function openCheckoutModal() {
    if (state.cart.length === 0) return;
    const promo = calculatePromotion(state.cart);

    const summaryElem = document.getElementById('checkoutSummary');
    if (summaryElem) {
        summaryElem.innerHTML = `
            <div class="checkout-summary-box">
                <div class="summary-line">
                    <span>Tổng số lượng đặt:</span>
                    <strong>${promo.totalCups} hộp panna cotta</strong>
                </div>
                <div class="summary-line">
                    <span>Tạm tính tiền bánh:</span>
                    <span>${formatMoney(promo.rawTotal)}</span>
                </div>
                <div class="summary-line">
                    <span>Phí vận chuyển ước tính:</span>
                    <span class="text-green">${promo.shippingLabel}</span>
                </div>
                ${promo.discountAmount > 0 ? `
                    <div class="summary-line">
                        <span>Mã ưu đãi (${state.voucherCode}):</span>
                        <strong class="text-primary">-${formatMoney(promo.discountAmount)}</strong>
                    </div>
                ` : ''}
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
 * Hàm phân tách và đếm số lượng 5 hương vị trong giỏ hàng
 */
function getFlavorBreakdown(cart) {
    const counts = {
        'Chanh leo': 0,
        'Dâu': 0,
        'Việt quất': 0,
        'Kiwi': 0,
        'Đào': 0
    };

    cart.forEach(item => {
        const qty = Number(item.quantity) || 1;
        if (item.type === 'single') {
            const flavor = item.flavor || (products.find(p => p.id === item.id) || {}).flavor;
            if (flavor) {
                const key = Object.keys(counts).find(k => k.toLowerCase() === flavor.toLowerCase());
                if (key) counts[key] += qty;
            }
        } else if (item.type === 'mix') {
            if (item.flavorCounts && typeof item.flavorCounts === 'object') {
                Object.entries(item.flavorCounts).forEach(([flv, count]) => {
                    const key = Object.keys(counts).find(k => k.toLowerCase() === flv.toLowerCase());
                    if (key) counts[key] += (Number(count) || 0) * qty;
                });
            } else if (Array.isArray(item.flavors)) {
                item.flavors.forEach(id => {
                    const p = products.find(prod => prod.id === id);
                    if (p && counts[p.flavor] !== undefined) {
                        counts[p.flavor] += qty;
                    }
                });
            } else if (typeof item.desc === 'string') {
                const matches = item.desc.matchAll(/([^,(|]+)\s*\(x(\d+)\)/g);
                for (const match of matches) {
                    const flvName = match[1].trim();
                    const flvCount = parseInt(match[2], 10) || 1;
                    const key = Object.keys(counts).find(k => k.toLowerCase() === flvName.toLowerCase());
                    if (key) counts[key] += flvCount * qty;
                }
            }
        }
    });

    return counts;
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
    const flavorCounts = getFlavorBreakdown(state.cart);

    const orderDetails = state.cart.map(item => {
        let detail = `• ${item.name} x${item.quantity} (${formatMoney(item.price * item.quantity)})`;
        if (item.type === 'mix') detail += `\n  - Vị: ${item.desc}`;
        return detail;
    }).join('\n');

    const giftFlavor = promo.freeGifts > 0 ? (formData.get('giftFlavor') || 'Shop tự mix') : 'Không có';
    const paymentMethod = formData.get('paymentMethod') || 'COD';
    const rawNotes = (formData.get('notes') || '').trim();
    const combinedNotes = `[TT: ${paymentMethod}] ${rawNotes}`.trim();

    const orderData = {
        name: (formData.get('name') || '').trim(),
        phone: (formData.get('phone') || '').trim(),
        facebook: (formData.get('facebook') || '').trim(),
        address: (formData.get('address') || '').trim(),
        chanhLeo: flavorCounts['Chanh leo'] || 0,
        dau: flavorCounts['Dâu'] || 0,
        vietQuat: flavorCounts['Việt quất'] || 0,
        kiwi: flavorCounts['Kiwi'] || 0,
        dao: flavorCounts['Đào'] || 0,
        totalCups: promo.totalCups,
        freeGifts: promo.freeGifts > 0 ? `${promo.freeGifts} hộp (Vị: ${giftFlavor})` : '0',
        promotionApplied: promo.promoName,
        cartDetails: orderDetails,
        totalPrice: promo.finalTotal,
        shippingArea: promo.shippingLabel,
        notes: combinedNotes,
        orderDate: new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })
    };

    const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbyl-h0-UU0IPc9GE11Va_lXdb3RknriO5sN6E0lCR3dQ81lOig48DXgNrfaFWIRt6Qc/exec';

    try {
        if (!GOOGLE_SHEET_URL || GOOGLE_SHEET_URL === 'YOUR_GOOGLE_WEB_APP_URL_HERE') {
            await new Promise(resolve => setTimeout(resolve, 1200));
        } else {
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
            state.voucherCode = '';
            state.voucherDiscount = 0;
            saveCart();
            updateCartUI();
            closeCheckoutModal();
            formStatus.innerHTML = '';
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Xác Nhận Đặt Hàng Ngay';
        }, 2200);

    } catch (error) {
        console.error('Submission error:', error);
        formStatus.innerHTML = `
            <div class="error-msg">
                <i class="fa-solid fa-triangle-exclamation"></i> 
                Có lỗi kết nối! Vui lòng gọi trực tiếp Hotline <b>0888231700</b> để đặt nhanh.
            </div>
        `;
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Thử Lại Đặt Hàng';
    }
}

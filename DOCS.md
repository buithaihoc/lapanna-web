# HƯỚNG DẪN KỸ THUẬT & VẬN HÀNH HỆ THỐNG LA PANNA WEB
> **Tài liệu bàn giao & vận hành hệ thống website bán hàng La Panna Handcrafted Panna Cotta**  
> *Phiên bản:* 3.0 (Chỉnh về Trạng Thái Bình Thường — Hết Chương Trình Khai Trương)  
> *Ngày cập nhật:* 16/10/2026

---

## MỤC LỤC
1. [Tổng Quan Kiến Trúc Hệ Thống](#1-tổng-quan-kiến-trúc-hệ-thống)
2. [Cấu Trúc Thư Mục & Bản Đồ Truy Vết (Tracing Map)](#2-cấu-trúc-thư-mục--bản-đồ-truy-vết-tracing-map)
3. [Cơ Chế Khuyến Mãi Linh Hoạt (Promotion Engine)](#3-cơ-chế-khuyến-mãi-linh-hoạt-promotion-engine)
   - [3.1. Hướng dẫn BẬT / TẮT Khuyến Mãi](#31-hướng-dẫn-bật--tắt-khuyến-mãi)
   - [3.2. Hướng dẫn sửa đổi mốc tặng quà (Mua X tặng Y)](#32-hướng-dẫn-sửa-đổi-mốc-tặng-quà-mua-x-tặng-y)
   - [3.3. Hướng dẫn sửa đổi giá Combo Set 5 Hộp](#33-hướng-dẫn-sửa-đổi-giá-combo-set-5-hộp)
4. [Quản Lý & Thay Đổi Thực Đơn Sản Phẩm](#4-quản-lý--thay-đổi-thực-đơn-sản-phẩm)
   - [4.1. Đổi giá bán lẻ](#41-đổi-giá-bán-lẻ)
   - [4.2. Thêm hoặc ẩn hương vị bánh](#42-thêm-hoặc-ẩn-hương-vị-bánh)
5. [Tích Hợp Đồng Bộ Google Sheet (Google Apps Script)](#5-tích-hợp-đồng-bộ-google-sheet-google-apps-script)
   - [5.1. Luồng dữ liệu và Payload](#51-luồng-dữ-liệu-và-payload)
   - [5.2. Mã nguồn Google Apps Script mẫu (Code.gs)](#52-mã-nguồn-google-apps-script-mẫu-codegs)
   - [5.3. Các bước cấu hình Web App Google Sheet](#53-các-bước-cấu-hình-web-app-google-sheet)
6. [Quy Trình Kiểm Thử & Xử Lý Sự Cố (Troubleshooting)](#6-quy-trình-kiểm-thử--xử-lý-sự-cố-troubleshooting)

---

## 1. TỔNG QUAN KIẾN TRÚC HỆ THỐNG

Website La Panna được phát triển theo mô hình **Zero-Dependency Lightweight Client-Side Architecture** (Kiến trúc thuần Frontend nhẹ, không phụ thuộc framework cồng kềnh):
- **Ngôn ngữ cốt lõi:** HTML5 ngữ nghĩa, Vanilla CSS3 (Custom Design Tokens), Modern JavaScript (ES6+).
- **Backend không máy chủ (Serverless via Google Apps Script):** Tiếp nhận đơn hàng trực tiếp vào Google Sheets theo thời gian thực mà không phát sinh chi phí duy trì server hay database.
- **Triết lý thiết kế (Design Philosophy):** Config-Driven Development — Toàn bộ quy tắc khuyến mãi, giá bán, chính sách giao hàng và menu đều được tập trung vào đối tượng cấu hình `SYSTEM_CONFIG` giúp dễ dàng trace, bảo trì và thay đổi mà không cần can thiệp sâu vào luồng xử lý giao diện.

```mermaid
flowchart TD
    Config["SYSTEM_CONFIG\n(Bật/Tắt KM, Tỷ lệ tặng, Giá Combo)"] --> Engine["Promotion Engine\n(calculatePromotion)"]
    Products["products Data\n(5 Vị: Chanh leo, Dâu,...)"] --> ProductGrid["Product Grid UI & Mix Box"]
    UserActions["Thao tác Khách hàng\n(Thêm giỏ / Mix 5 hộp)"] --> CartState["state.cart\n(Session Storage)"]
    CartState --> Engine
    Engine --> CartUI["Cập nhật Giỏ Hàng & Badge Quà Tặng"]
    Engine --> CheckoutModal["Modal Thanh Toán\n(Chọn vị quà tặng, Tóm tắt tiền)"]
    CheckoutModal --> GAS["Google Apps Script Web App"]
    GAS --> GoogleSheet[("Google Sheets Lưu Đơn")]
```

---

## 2. CẤU TRÚC THƯ MỤC & BẢN ĐỒ TRUY VẾT (TRACING MAP)

```text
lapanna-web/
├── index.html       # Cấu trúc giao diện: Top Announcement, Hero, Menu 10k, Set 5 hộp, Modal
├── style.css        # Hệ thống giao diện: Palette màu, typography, flyer card, giỏ hàng, animations
├── app.js           # Logic chính: SYSTEM_CONFIG, products, Promotion Engine, Cart, Submit Order
├── assets/          # Thư mục hình ảnh sản phẩm (Panna Cotta dâu, chanh leo, đào, kiwi, việt quất)
├── DOCS.md          # Tài liệu kỹ thuật chi tiết này
└── CNAME            # Tên miền tùy chỉnh khi deploy lên GitHub Pages / Hosting (lapanna.store)
```

### Bảng tra cứu các vị trí mã nguồn quan trọng trong `app.js`:

| Tính Năng / Nhiệm Vụ | Vị Trí Dòng / Hàm Trong `app.js` | Ghi Chú |
| :--- | :--- | :--- |
| **Cấu hình Bật/Tắt Khuyến Mãi** | `const SYSTEM_CONFIG = { ... }` (Dòng 14 - 55) | Thay đổi cờ `promotion.enabled` |
| **Danh sách 5 Vị Menu Khai Trương** | `const products = [ ... ]` (Dòng 63 - 110) | Thay đổi giá, tên, ảnh, mô tả |
| **Tính toán Khuyến mãi & Quà tặng** | Hàm `calculatePromotion(cart)` (Dòng 126 - 165) | Tự động tính số hộp tặng |
| **Logic Tự Phối Set 5 Hộp** | Hàm `initMixBox()`, `toggleMixFlavor()` | Chọn đủ 5 vị mới cho bấm thêm giỏ |
| **Giỏ hàng & Quản lý số lượng** | Hàm `addToCart()`, `updateCartUI()` | Tự động lưu vào SessionStorage |
| **Mở Modal & Dropdown Quà Tặng** | Hàm `openCheckoutModal()` | Sinh danh sách vị quà tặng miễn phí |
| **Bắn dữ liệu sang Google Sheet** | Hàm `handleOrderSubmit(e)` | Đóng gói JSON và gọi fetch API |

---

## 3. CƠ CHẾ KHUYẾN MÃI LINH HOẠT (PROMOTION ENGINE)

Toàn bộ logic khuyến mãi được điều khiển tập trung bởi object `SYSTEM_CONFIG.promotion` tại đầu file `app.js`:

```javascript
const SYSTEM_CONFIG = {
    promotion: {
        enabled: true,              // CỜ BẬT / TẮT CHÍNH
        id: 'KHAI_TRUONG_2026',
        title: 'Menu Khai Trương La Panna',
        dateRange: '11/10 ĐẾN HẾT 15/10',
        announcement: '🎉 MỪNG KHAI TRƯƠNG LA PANNA (11/10 - 15/10) • MUA 5 TẶNG 1, MUA 10 TẶNG 2 • FREESHIP KHU VỰC BKX',
        
        giftRule: {
            active: true,           // Bật/tắt riêng quy tắc tặng quà
            buyStep: 5,             // Cứ mua đủ 5 hộp
            freeGiftCount: 1,       // Được tặng 1 hộp
            tagText: 'Mua 5 tặng 1, mua 10 tặng 2'
        },

        combo5: {
            enabled: true,          // Bật/tắt combo
            size: 5,                // Kích thước combo: 5 hộp
            price: 45000,           // Giá khuyến mãi combo: 45.000đ
            regularPrice: 50000,    // Giá gốc khi mua lẻ 5 hộp: 50.000đ
            name: 'Set 5 Hộp Mix Vị Tùy Chọn'
        }
    }
};
```

### 3.1. Hướng dẫn BẬT / TẮT Khuyến Mãi

> **✅ TRẠNG THÁI HIỆN TẠI (16/10/2026): `enabled: false` — Không có chương trình khuyến mãi nào đang chạy.**

- **Khi muốn BẬT (chạy chương trình mới):**
  1. Mở file [app.js](file:///d:/Học Tập/2026.1/Thương mại điện tử/lapanna-web/app.js).
  2. Tại dòng 27: Đổi `enabled: false` thành `enabled: true`.
  3. Cập nhật lại `dateRange`, `announcement`, `giftRule` và `combo5.price` theo ý đích khuyến mãi mới.
- **Khi muốn TẮT (hết chương trình):**
  1. Mở file [app.js](file:///d:/Học Tập/2026.1/Thương mại điện tử/lapanna-web/app.js).
  2. Tại dòng 27: Đổi `enabled: true` thành `enabled: false`.
  3. **Kết quả tự động của hệ thống:**
     - Thanh Banner trên đầu trang (`#announcementBar`) tự động ẩn đi.
     - Quy tắc tặng quà (mua 5 tặng 1) tự động ngưng áp dụng.
     - Giỏ hàng và Modal thanh toán không còn sinh dòng quà tặng hay dropdown chọn vị quà.
     - Giá Set 5 hộp tự động điều chỉnh về 50.000đ.

### 3.2. Hướng dẫn sửa đổi mốc tặng quà (Mua X tặng Y)
Nếu muốn đổi chương trình từ "Mua 5 tặng 1" sang "Mua 4 tặng 1" hoặc "Mua 10 tặng 3":
- Trong `giftRule`:
  ```javascript
  buyStep: 4,        // Khách mua mỗi 4 hộp
  freeGiftCount: 1   // Sẽ được tặng 1 hộp
  ```
- Hàm `calculatePromotion(cart)` tự động thực hiện phép tính lũy tiến:
  $$\text{Số hộp quà tặng} = \lfloor \frac{\text{Tổng số hộp trong đơn}}{\text{buyStep}} \rfloor \times \text{freeGiftCount}$$
- Ví dụ: Khi khách mua 12 hộp (với `buyStep: 5`), số hộp tặng = $\lfloor 12 / 5 \rfloor \times 1 = 2$ hộp tặng.

### 3.3. Hướng dẫn sửa đổi giá Combo Set 5 Hộp
- Trong `combo5`:
  - `price: 45000`: Giá khách cần thanh toán khi chọn đủ 5 vị.
  - `size: 5`: Số vị tối đa khách phải chọn để hoàn tất set.

---

## 4. QUẢN LÝ & THAY ĐỔI THỰC ĐƠN SẢN PHẨM

Toàn bộ 5 hương vị theo menu khai trương được định nghĩa trong mảng `products` tại [app.js](file:///d:/Học Tập/2026.1/Thương mại điện tử/lapanna-web/app.js):

```javascript
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
    // ... các vị Dâu, Việt quất, Kiwi, Đào
];
```

### 4.1. Đổi giá bán lẻ
- Muốn đổi giá của từng vị: Thay đổi trường `price: 10000` thành số tiền mong muốn (ví dụ `12000`).
- Hệ thống sử dụng hàm `formatMoney(amount)` sẽ tự động hiển thị ra định dạng tiền tệ Việt Nam (Ví dụ: `12.000đ`).

### 4.2. Thêm hoặc ẩn hương vị bánh
- **Muốn thêm vị thứ 6:** Thêm 1 object vào mảng `products` với `id: 6`, khai báo đầy đủ tên, ảnh (`assets/...`), và `flavor`. Cả giao diện Menu chính và lưới chọn Mix Vị sẽ tự động nhận diện vị mới.
- **Muốn tạm ẩn một vị:** Chỉ cần chú thích (`//`) phần tử đó trong mảng `products`.

---

## 5. TÍCH HỢP ĐỒNG BỘ GOOGLE SHEET (GOOGLE APPS SCRIPT)

### 5.1. Luồng dữ liệu và Payload
Khi khách hàng bấm **"Xác Nhận Đặt Hàng"** trên website, hàm `handleOrderSubmit` sẽ đóng gói toàn bộ dữ liệu thành một JSON payload và bắn tới endpoint Web App của Google Apps Script:

```json
{
  "name": "Nguyễn Văn A",
  "phone": "0987654321",
  "address": "Phòng 302 KTX B10 Đại học Bách Khoa",
  "notes": "Giao sau 16h chiều, cho thêm thìa",
  "totalCups": 6,
  "freeGifts": "1 hộp (Vị: Dâu)",
  "promotionApplied": "Menu Khai Trương La Panna",
  "cartDetails": "• Set 5 Hộp Mix Vị Tùy Chọn x1 (45.000đ)\n  - Vị: Dâu (x2), Chanh leo (x1), Kiwi (x2)\n• Panna Cotta Đào x1 (10.000đ)",
  "totalPrice": "55.000đ",
  "shippingArea": "FREESHIP KHU VỰC BKX (Bách Khoa - Kinh Tế - Xây Dựng)",
  "orderDate": "11/10/2026, 17:30:00"
}
```

> **Ghi chú kỹ thuật về CORS:** Client gửi `Content-Type: text/plain;charset=utf-8` để trình duyệt không kích hoạt CORS Preflight (OPTIONS request), giúp Google Apps Script xử lý mượt mà 100% không bị chặn.

### 5.2. Mã nguồn Google Apps Script mẫu (Code.gs)
Chủ tiệm hoặc lập trình viên mở Google Sheet cũ -> chọn **Tiện ích mở rộng (Extensions)** -> **Apps Script** và thay thế toàn bộ mã nguồn trong `Code.gs` bằng đoạn script sau:

```javascript
/**
 * =============================================================================
 * GOOGLE APPS SCRIPT - BỘ TIẾP NHẬN ĐƠN HÀNG LA PANNA (MULTI-SHEET VERSION)
 * =============================================================================
 * Tự động ghi đơn hàng vào đúng Sheet (Tab) được chỉ định trong cùng một Spreadsheet.
 * Nếu Sheet chưa tồn tại, script sẽ tự động tạo Sheet mới và định dạng tiêu đề đẹp mắt.
 */

// 1. CẤU HÌNH TÊN SHEET (TAB) LƯU ĐƠN HÀNG
// Đặt đúng tên tab trong file Google Sheet của bạn (Mặc định: "Đơn Hàng")
var TARGET_SHEET_NAME = "Đơn Hàng";

function doPost(e) {
  // Sử dụng LockService để tránh xung đột khi nhiều khách bấm đặt hàng cùng lúc
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = spreadsheet.getSheetByName(TARGET_SHEET_NAME);
    
    // Nếu sheet với tên trên chưa tồn tại, tự động tạo mới
    if (!sheet) {
      sheet = spreadsheet.insertSheet(TARGET_SHEET_NAME);
    }
    
    var data = JSON.parse(e.postData.contents);
    
    // Nếu sheet còn trống (chưa có dòng nào), tự động tạo hàng tiêu đề (Headers)
    if (sheet.getLastRow() === 0) {
      var headers = [
        "Thời Gian Đặt",
        "Họ Tên Khách",
        "Số Điện Thoại",
        "Địa Chỉ Giao Hàng",
        "Tổng Số Hộp",
        "Quà Tặng Khuyến Mãi",
        "Chương Trình KM",
        "Chi Tiết Đơn Hàng",
        "Tổng Tiền",
        "Khu Vực Giao Hàng",
        "Ghi Chú Của Khách",
        "Trạng Thái Đơn"
      ];
      sheet.appendRow(headers);
      
      // Định dạng dòng tiêu đề (Tone đỏ thương hiệu La Panna)
      var headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setBackground("#C91C3E");
      headerRange.setFontColor("#FFFFFF");
      headerRange.setFontWeight("bold");
      headerRange.setFontSize(11);
      headerRange.setHorizontalAlignment("center");
      headerRange.setVerticalAlignment("middle");
      sheet.setRowHeight(1, 38);
      sheet.setFrozenRows(1); // Cố định dòng tiêu đề khi cuộn chuột
    }
    
    // Thêm dòng dữ liệu đơn hàng mới
    sheet.appendRow([
      data.orderDate || new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" }),
      data.name || "",
      "'" + (data.phone || ""), // Dấu nháy đơn để giữ số 0 ở đầu số điện thoại
      data.address || "",
      data.totalCups || 0,
      data.freeGifts || "0",
      data.promotionApplied || "Không áp dụng",
      data.cartDetails || "",
      data.totalPrice || "0đ",
      data.shippingArea || "",
      data.notes || "",
      "Mới (Chờ xác nhận)"
    ]);

    var lastRow = sheet.getLastRow();
    sheet.getRange(lastRow, 1, 1, 12).setVerticalAlignment("middle");
    
    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      sheetName: TARGET_SHEET_NAME,
      message: "Đơn hàng đã được lưu thành công vào sheet: " + TARGET_SHEET_NAME
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

/**
 * Hỗ trợ kiểm tra sức khỏe Web App qua trình duyệt
 */
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: "success",
    targetSheet: TARGET_SHEET_NAME,
    message: "Hệ thống tiếp nhận đơn hàng La Panna đang hoạt động ổn định!"
  })).setMimeType(ContentService.MimeType.JSON);
}

/**
 * Hàm kiểm tra thử nghiệm (Bấm 'Run' trực tiếp trong Apps Script để kiểm tra)
 */
function testAddOrder() {
  var testEvent = {
    postData: {
      contents: JSON.stringify({
        name: "Khách Mẫu Test",
        phone: "0888231700",
        address: "KTX Bách Khoa",
        notes: "Đơn thử nghiệm hệ thống sheet mới",
        totalCups: 5,
        freeGifts: "0",
        promotionApplied: "Không áp dụng khuyến mãi",
        cartDetails: "• Set 5 Hộp Mix Vị Tùy Chọn x1 (50.000đ)",
        totalPrice: "50.000đ",
        shippingArea: "FREESHIP KHU VỰC BKX",
        orderDate: new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" })
      })
    }
  };
  var res = doPost(testEvent);
  Logger.log(res.getContent());
}
```

### 5.3. Hướng dẫn chi tiết triển khai Web App vào Sheet mới trong file cũ

Bạn thực hiện theo 4 bước sau:

#### Bước 1: Tạo Tab (Sheet) mới trong cùng file Google Spreadsheet
1. Mở file Google Sheet bạn đang dùng để nhận đơn.
2. Ở thanh dưới cùng, bấm dấu **`+` (Thêm trang tính)** để tạo một tab mới.
3. Đổi tên tab mới thành: `Đơn Hàng` (hoặc tên bất kỳ bạn thích).
   *(Lưu ý: Nếu bạn không tạo trước, mã Script trên cũng sẽ tự động tạo giúp bạn khi có đơn đầu tiên).*

#### Bước 2: Cập nhật mã nguồn trong Apps Script
1. Trên menu Google Sheet, chọn **Tiện ích mở rộng (Extensions)** -> **Apps Script**.
2. Xóa toàn bộ code cũ trong tệp `Code.gs` và dán toàn bộ đoạn mã ở mục 5.2 phía trên vào.
3. Kiểm tra biến `var TARGET_SHEET_NAME = "Đơn Hàng";` xem đã đúng tên tab bạn muốn lưu chưa.
4. Bấm **Lưu dự án (Ctrl + S)** hoặc biểu tượng đĩa mềm.

#### Bước 3: Triển khai phiên bản mới (Cập nhật Web App)
Có 2 cách để triển khai:

* **Cách A (Khuyên dùng - Nhanh nhất & Giữ nguyên URL cũ):**
  1. Ở góc trên bên phải, bấm nút **Triển khai (Deploy)** -> Chọn **Quản lý bản triển khai (Manage deployments)**.
  2. Chọn bản triển khai Web App hiện tại, bấm vào biểu tượng **Chiếc bút chì (Chỉnh sửa / Edit)** ở góc trên.
  3. Tại mục **Phiên bản (Version)**: Nhấp vào menu thả xuống và chọn **Phiên bản mới (New version)**.
  4. Bấm **Triển khai (Deploy)**.
  5. *Kết quả:* URL Web App giữ nguyên 100%, website tiếp tục chạy mà không cần sửa lại mã frontend!

* **Cách B (Tạo một bản triển khai mới độc lập):**
  1. Bấm **Triển khai (Deploy)** -> Chọn **Triển khai mới (New deployment)**.
  2. Bấm biểu tượng bánh răng bên cạnh "Chọn loại" -> Chọn **Ứng dụng web (Web app)**.
  3. Điền mô tả: `Tiếp nhận đơn - Sheet mới`.
  4. **Thực thi dưới tên (Execute as):** `Tôi (Me)`.
  5. **Ai có quyền truy cập (Who has access):** `Bất kỳ ai (Anyone)`.
  6. Bấm **Triển khai (Deploy)**.
  7. Sao chép **URL ứng dụng web** mới tạo (có đuôi `/exec`).
  8. Mở file [app.js](file:///d:/Học Tập/2026.1/Thương mại điện tử/lapanna-web/app.js) tại dòng 698, dán URL mới vào biến `GOOGLE_SHEET_URL`.

#### Bước 4: Kiểm thử và hoàn tất
1. Bạn có thể test nhanh bằng cách chọn hàm `testAddOrder` trên thanh công cụ Apps Script rồi bấm **Chạy (Run)**.
2. Quay lại Google Sheet, bạn sẽ thấy tab mới xuất hiện với tiêu đề màu đỏ thương hiệu La Panna và 1 dòng đơn hàng mẫu!
3. Vào website [lapanna.store](https://lapanna.store) thử đặt một đơn hàng thực tế để kiểm tra dòng dữ liệu ghi vào.

---

## 6. QUY TRÌNH KIỂM THỬ & XỬ LÝ SỰ CỐ (TROUBLESHOOTING)

### 6.1. Ma trận kiểm thử đơn hàng (Test Cases)

| Kịch Bản Kiểm Thử | Hành Động | Kết Quả Mong Đợi |
| :--- | :--- | :--- |
| **Mua lẻ 1 đến 4 hộp** | Thêm 1-4 hộp lẻ bất kỳ | Giá 10k/hộp; không có quà tặng khai trương |
| **Mua đúng 5 hộp lẻ** | Thêm 5 hộp lẻ | Tổng tiền 50k; Kích hoạt quà tặng: **Tặng 1 hộp** |
| **Mua Set 5 hộp mix** | Chọn đủ 5 vị trong Mix Box | Giá áp dụng **45k** (tiết kiệm 5k); Kích hoạt: **Tặng 1 hộp** |
| **Mua 10 hộp (2 Set)** | Thêm 2 Set 5 hộp | Tổng tiền 90k; Kích hoạt: **Tặng 2 hộp** |
| **Chọn vị quà tặng** | Mở Modal thanh toán | Dropdown vị quà hiển thị đầy đủ 5 vị hoặc 'Shop tự mix' |
| **Tắt cờ khuyến mãi** | Đặt `enabled: false` | Ẩn banner top, tắt tính quà tặng, Set 5 hộp về giá 50k |

### 6.2. Các sự cố thường gặp & cách khắc phục

1. **Khách đặt hàng nhưng Google Sheet không nhận được dòng mới:**
   - *Nguyên nhân:* Google Apps Script chưa được phân quyền "Anyone" (Bất kỳ ai), hoặc URL Web App bị sai.
   - *Khắc phục:* Mở Apps Script -> Deploy -> Manage deployments -> Chỉnh sửa -> Đảm bảo `Who has access = Anyone`. Nếu sửa code Apps Script, phải tạo một Version Deployment mới.
2. **Số điện thoại bị mất số 0 đầu tiên trong Excel / Google Sheet:**
   - *Khắc phục:* Trong `Code.gs`, dữ liệu phone đã được tự động thêm tiền tố `"'"` (dấu nháy đơn) để Google Sheet hiểu là chuỗi ký tự (Text).
3. **Giao diện không hiển thị thay đổi mới:**
   - *Khắc phục:* Trình duyệt có thể lưu cache tệp `style.css` hoặc `app.js`. Nhấn tổ hợp phím `Ctrl + F5` (hoặc mở cửa sổ ẩn danh) để tải lại toàn bộ tài nguyên mới nhất.

---

## 7. KIẾN TRÚC TỐI ƯU MOBILE & TRẢI NGHIỆM VUỐT CHẠM (MOBILE UX ENGINE)

### 7.1. Các vấn đề cốt lõi đã được giải quyết
1. **Modal Đặt Hàng Chuyển Thành Native Bottom Sheet (Dạng Ngăn Kéo Kéo Từ Dưới Lên):**
   - *Vấn đề cũ:* Modal căn giữa (`top: 50%`) khiến nội dung dài bị thụt mất phần đầu (nút đóng, tiêu đề) và phần chân (nút đặt hàng) trên màn hình điện thoại, đồng thời không vuốt được.
   - *Xử lý:* Trên mobile (<=768px), modal tự động chuyển sang cơ chế **Bottom Sheet**:
     - Bắt đầu từ đáy màn hình (`align-items: flex-end`) trượt lên êm ái (`transform: translateY(100% -> 0)`).
     - Chiều cao khống chế `max-height: 90dvh` (Dynamic Viewport Height - tự co giãn theo thanh địa chỉ Safari/Chrome).
     - Tiêu đề và nút Đóng `[X]` được gắn cố định (`position: sticky`), kèm thanh gạt vuốt (`sheet-handle-bar`).
     - Nội dung bên trong tự động cuộn mượt bằng `-webkit-overflow-scrolling: touch` và `overscroll-behavior: contain`.
     - Cho phép chạm ra vùng nền tối (`modal-overlay`) hoặc phím `Esc` để đóng nhanh.

2. **Chống Hiện Tượng Tự Động Phóng To (Auto-Zoom) Trên iOS Safari:**
   - Khi người dùng chạm vào ô nhập liệu (`input`, `select`, `textarea`) có cỡ chữ nhỏ hơn 16px, iOS Safari sẽ tự phóng to màn hình làm lệch giao diện.
   - *Xử lý:* Cố định `font-size: 16px !important` cho toàn bộ form trên mobile và cấu hình viewport chuẩn.

3. **Khóa Cuộn Trang Nền (Body Scroll Lock):**
   - Khi mở Giỏ hàng hoặc Modal đặt hàng, trang nền đằng sau được tự động khóa cuộn (`html.modal-open, body.modal-open { overflow: hidden !important; touch-action: none; }`), triệt tiêu 100% hiện tượng giật rung/tranh chấp cuộn nền khi khách hàng đang điền thông tin.

4. **Loại Bỏ Bẫy Cuộn (Scroll Trap) Ở Mục Tự Mix Set 5 Hộp:**
   - *Vấn đề cũ:* Khung chọn vị panna cotta bị bọc trong `max-height: 400px; overflow-y: auto`, khi người dùng vuốt ngón cái qua khu vực này sẽ bị kẹt cuộn bên trong thay vì cuộn tiếp trang web.
   - *Xử lý:* Chuyển sang bố cục lưới 3 cột trực quan không giới hạn chiều cao con, các thẻ vị có phản hồi xúc giác rung nhẹ (`navigator.vibrate`) và nút "Thêm Set 5 Hộp" được di chuyển ngay dưới danh sách chọn vị, giúp khách hàng chọn xong là bấm thêm giỏ được ngay mà không cần cuộn ngược lên.

5. **Lưới Menu 10K Tối Ưu 2 Cột (2-Column Grid):**
   - Thay vì hiển thị từng thẻ đơn lẻ chiếm trọn cả màn hình, danh mục 5 vị hiển thị dạng lưới 2 cột cân đối. Khách hàng xem trọn vẹn thực đơn chỉ với 1-2 lần lướt ngón tay.

6. **Thanh Đặt Hàng Nổi Thông Minh (Mobile Floating Quick Cart Bar):**
   - Khi giỏ hàng có bánh, một thanh nổi (`#mobileStickyCart`) với hiệu ứng làm mờ kính (`backdrop-filter`) sẽ xuất hiện ở đáy màn hình hiển thị: Tổng tiền, số hộp, tag ưu đãi ("+1 Hộp Tặng • Freeship BKX") và nút "Đặt Hàng". Khách có thể chạm để mở thanh toán ngay ở bất kỳ vị trí nào trên trang.

---
---
*Tài liệu được cập nhật phiên bản 3.0 — Hết chương trình khai trương, chuyển về vận hành bình thường (16/10/2026).*


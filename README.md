# Thiệp cưới Văn An & Trúc Mai

Trang thiệp cưới online (một file `index.html`, ảnh đã nhúng sẵn), chạy trên GitHub Pages.
Lời chúc / xác nhận tham dự được ghi vào Google Sheet qua Google Apps Script.

## 1. Kết nối Google Sheet

1. Tạo một Google Sheet mới (ví dụ: "RSVP đám cưới").
2. **Tiện ích mở rộng → Apps Script**, xoá code mẫu, dán toàn bộ `apps-script/Code.gs`, bấm Lưu.
3. **Triển khai → Tùy chọn triển khai mới → Ứng dụng web**
   - Thực thi với tư cách: **Tôi**
   - Ai có quyền truy cập: **Bất kỳ ai**
4. Cấp quyền khi Google hỏi, rồi copy **URL ứng dụng web** (dạng `https://script.google.com/macros/s/.../exec`).
5. Mở `index.html`, tìm `var SHEET_URL='';` và dán URL vào giữa hai dấu nháy.

Sheet sẽ tự tạo tab `RSVP` với các cột: Thời gian, Tên, Tham dự, Số người, Lời chúc, Khách mời (theo link).

> Mỗi lần sửa `Code.gs`, cần **Triển khai → Quản lý triển khai → Sửa → Phiên bản mới** để thay đổi có hiệu lực (URL giữ nguyên).

## 2. Đưa lên GitHub và bật GitHub Pages

```bash
cd thiep-cuoi-site
git init -b main
git add .
git commit -m "Thiệp cưới Văn An & Trúc Mai"

# Cách A: dùng GitHub CLI
gh repo create thiep-cuoi --public --source=. --push
gh api -X POST repos/{owner}/thiep-cuoi/pages -f "source[branch]=main" -f "source[path]=/"

# Cách B: tạo repo "thiep-cuoi" trên github.com rồi
git remote add origin https://github.com/<username>/thiep-cuoi.git
git push -u origin main
# rồi vào Settings → Pages → Source: Deploy from a branch → main / (root) → Save
```

Sau 1–2 phút, thiệp có ở: `https://<username>.github.io/thiep-cuoi/`

## 3. Tạo link riêng cho từng khách

Mở `https://<username>.github.io/thiep-cuoi/#tao-thiep`, nhập tên từng người (hoặc dán cả danh sách) rồi gửi link.

## 4. Ảnh xem trước khi gửi qua Zalo/Messenger

Thẻ `og:image` đang trỏ tới `og.jpg`. Một số ứng dụng cần đường dẫn đầy đủ, nên sau khi có link GitHub Pages hãy đổi thành
`https://<username>.github.io/thiep-cuoi/og.jpg`.

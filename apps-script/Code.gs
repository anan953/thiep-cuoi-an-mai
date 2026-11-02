/**
 * Nhận lời chúc / xác nhận tham dự từ thiệp cưới và ghi vào Google Sheet.
 * Cách dùng: mở Google Sheet > Tiện ích mở rộng > Apps Script, dán toàn bộ file này,
 * rồi Triển khai > Tùy chọn triển khai mới > Ứng dụng web
 * (Thực thi với tư cách: Tôi; Ai có quyền truy cập: Bất kỳ ai).
 */
const SHEET_NAME = 'RSVP';
const HEADERS = ['Thời gian', 'Tên', 'Tham dự', 'Số người', 'Lời chúc', 'Khách mời (theo link)'];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sh = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
    if (sh.getLastRow() === 0) {
      sh.appendRow(HEADERS);
      sh.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
      sh.setFrozenRows(1);
    }
    const d = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    // Giới hạn độ dài và chặn công thức (=, +, -, @) để tránh chèn công thức vào Sheet
    const clean = v => String(v == null ? '' : v).slice(0, 1000).replace(/^[=+\-@]/, "'$&");
    sh.appendRow([new Date(), clean(d.name), clean(d.attend), clean(d.count), clean(d.message), clean(d.guest)]);
    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return json({ ok: true, message: 'RSVP endpoint đang chạy' });
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

# ⚡ SmartElec Manager - Giải pháp Quản lý Năng lượng Thông minh

**SmartElec Manager** là một nền tảng quản trị năng lượng cấp doanh nghiệp (Enterprise), được thiết kế để giám sát, phân tích và tối ưu hóa hệ thống điện thông minh dựa trên công nghệ AI và IoT. Hệ thống cung cấp giao diện người dùng cao cấp (High-Fidelity) với khả năng xử lý dữ liệu thời gian thực và dự báo rủi ro thông minh.

---

## ✨ Tính năng nổi bật

### 1. 📊 Dashboard Tổng lực
- Giám sát toàn diện trạng thái hệ thống, hiệu suất thiết bị và các chỉ số năng lượng chính (KPIs).
- Hỗ trợ đa dạng các Dashboard: Tổng quan, Kỹ thuật và Kho vận.

### 2. 🛡️ AI Monitoring & RCA
- Sử dụng AI để dự báo hỏng hóc thiết bị trước khi xảy ra sự cố.
- **Root Cause Analysis (RCA):** Phân tích căn nguyên lỗi và đưa ra giải pháp xử lý tự động.

### 3. 🔌 Quản lý Thiết bị & Tài sản
- Quản lý danh sách thiết bị IoT, giám sát thông số điện áp, nhiệt độ thời gian thực.
- Tích hợp quét mã QR để truy xuất thông tin thiết bị nhanh chóng.

### 4. 🛠️ Quy trình Bảo trì (Maintenance)
- Hệ thống Kanban quản lý phiếu sửa chữa.
- Phân công kỹ thuật viên và theo dõi tiến độ bảo trì tự động.

### 5. 📦 Quản lý Kho & Linh kiện
- Theo dõi tồn kho linh kiện điện tử, cảnh báo thiếu hụt dựa trên tốc độ sử dụng.
- Quản lý nhập/xuất kho và nhà cung cấp.

### 6. 📈 Phân tích & Báo cáo (Analytics & Reports)
- Phân tích chi tiết tiêu thụ năng lượng, tính toán ROI và tối ưu hóa chi phí.
- Kho lưu trữ báo cáo (PDF/Excel) tập trung theo từng dự án.

### 7. 🌓 Chế độ Dark/Light Mode
- Giao diện **Deep Dark** sang trọng và **Light Mode** tinh tế, đồng bộ toàn diện từ Sidebar đến các thẻ Card.

---

## 🛠️ Công nghệ sử dụng

### Frontend
- **Framework:** Next.js 16.2.6 (Turbopack)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (Custom Design System)
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Auth:** NextAuth.js

### Backend
- **Framework:** FastAPI (Python 3.10+)
- **Database:** PostgreSQL
- **AI/ML:** Predictive Analytics & Anomaly Detection modules

---

## 🚀 Hướng dẫn Chạy dự án

### 1. Yêu cầu hệ thống
- **Node.js** v18.0.0 trở lên
- **Python** 3.10+
- **PostgreSQL** 14+

### 2. Cài đặt & Chạy Frontend
```bash
# Di chuyển vào thư mục frontend
cd frontend/web-admin

# Cài đặt phụ thuộc
npm install

# Chạy môi trường phát triển
npm run dev
```
Truy cập giao diện tại: `http://localhost:3000`

### 3. Cài đặt & Chạy Backend
```bash
# Di chuyển vào thư mục backend
cd backend

# Cài đặt môi trường ảo (khuyên dùng)
python -m venv venv
source venv/bin/activate # Windows: venv\Scripts\activate

# Cài đặt thư viện
pip install -r requirements.txt

# Khởi chạy server
uvicorn app.main:app --reload
```
Truy cập API Docs tại: `http://localhost:8000/docs`

---

## 🎨 Ngôn ngữ Thiết kế
Dự án tuân thủ phong cách **Glassmorphism** với:
- Các góc bo tròn lớn (32px - 56px).
- Hiệu ứng kính mờ (Backdrop Blur).
- Tông màu Neon (Cyan, Purple, Orange) trên nền tối sâu (Deep Dark).
- Chế độ sáng tối được đồng bộ qua CSS Variables.

---

## 📧 Liên hệ
- **Phát triển bởi:** SmartElec Team
- **Website:** [smartelec.vn](https://smartelec.vn)
- **Dự án:** SmartElec Manager v1.0.0
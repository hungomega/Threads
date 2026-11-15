# Threads Clone

Dự án xây dựng giao diện mạng xã hội lấy cảm hứng từ [Threads](https://www.threads.com/), sử dụng React và Vite. Dự án tái hiện các chức năng cốt lõi của một nền tảng mạng xã hội, bao gồm xác thực người dùng, bảng tin, tương tác bài viết, trả lời bài viết và quản lý người dùng.

**Demo:** [https://hungomega.github.io/Threads/](https://hungomega.github.io/Threads/)

## Công nghệ sử dụng (Tech Stack)

| Phân loại | Công nghệ |
|---|---|
| Frontend | React 19, JavaScript |
| Build Tool | Vite |
| Routing | React Router |
| Styling | Tailwind CSS v4 |
| UI Components | shadcn/ui, Radix UI |
| State Management | Redux Toolkit, React Redux |
| HTTP Client | Axios |
| Form Management | React Hook Form |
| Form Validation | Yup, @hookform/resolvers |
| Icons | Lucide React |

## Các chức năng chính (Features)

### 1. Xác thực người dùng (Authentication)
- Đăng nhập bằng email, username hoặc số điện thoại.
- Đăng ký tài khoản.
- Kiểm tra tính khả dụng của username và email.
- Xác thực email thông qua token.
- Chức năng quên mật khẩu.
- Đặt lại mật khẩu bằng token xác thực.
- Duy trì trạng thái đăng nhập bằng Access Token và Refresh Token.
- Tự động làm mới token thông qua Axios Interceptors.
- Bảo vệ các trang yêu cầu đăng nhập bằng Protected Routes.

### 2. Bảng tin (Home Feed)
- Lấy danh sách bài viết từ Backend API.
- Hiển thị nội dung bài viết, thông tin tác giả, thời gian đăng và phương tiện đính kèm.
- Tự động tải thêm bài viết khi cuộn trang (Infinite Scroll).
- Xử lý trạng thái tải dữ liệu và lỗi.
- Hiển thị hình ảnh và video đính kèm.

### 3. Tương tác với bài viết (Post Interactions)
- Thích và bỏ thích bài viết.
- Trả lời bài viết.
- Đăng lại và hủy đăng lại bài viết.
- Trích dẫn bài viết (Quote Post).
- Chia sẻ bài viết.
- Lưu và bỏ lưu bài viết.

### 4. Quản lý bài viết và người dùng (Post Management)
- Chỉnh sửa và xóa bài viết của bản thân.
- Đánh dấu bài viết không quan tâm.
- Tắt tiếng người dùng (Mute).
- Hạn chế người dùng (Restrict).
- Chặn người dùng (Block).
- Báo cáo bài viết (Report).
- Sao chép liên kết bài viết.
- Tạo nội dung nhúng bài viết (Embed).

### 5. Hệ thống trả lời (Reply System)
- Tạo câu trả lời bằng nội dung văn bản.
- Tải lên hình ảnh và video đính kèm.
- Lựa chọn quyền trả lời.
- Thêm chủ đề cho câu trả lời.
- Lấy danh sách câu trả lời từ Backend API.

### 6. Nhúng bài viết (Post Embedding)
- Layout riêng dành cho nội dung nhúng, không hiển thị thanh điều hướng chính.
- Hiển thị nội dung bài viết được nhúng.
- Cung cấp liên kết để xem bài viết gốc trên Threads.

## Cấu trúc dự án (Project Structure)

```text
Theads/
├── public/
│   ├── favicon.png
│   ├── favicon.svg
│   └── icons.svg
│
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Loading/
│   │   ├── LoginPanel/
│   │   ├── ProtectedRoute/
│   │   ├── Sidebar/
│   │   ├── post/
│   │   └── ui/
│   │
│   ├── hooks/
│   │   └── useInfiniteScroll.js
│   │
│   ├── layouts/
│   │   ├── AuthLayout/
│   │   ├── DefaultLayout/
│   │   └── EmbedLayout.jsx
│   │
│   ├── pages/
│   │   ├── Activity/
│   │   ├── Auth/
│   │   ├── Create/
│   │   ├── Embed.jsx
│   │   ├── Home/
│   │   ├── Profile/
│   │   └── Search/
│   │
│   ├── redux/
│   │   ├── slices/
│   │   └── store.js
│   │
│   ├── schemas/
│   ├── services/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── .github/
│   └── workflows/
│       └── deploy.yml
│
├── index.html
├── package.json
└── vite.config.js
```

## Hướng dẫn cài đặt (Getting Started)

### Yêu cầu hệ thống

- Node.js
- npm
- Git

### Các bước cài đặt

**1. Clone repository:**

```bash
git clone https://github.com/hungomega/Threads.git
```

**2. Di chuyển vào thư mục dự án:**

```bash
cd Threads
```

**3. Cài đặt các thư viện:**

```bash
npm install
```

**4. Khởi chạy môi trường phát triển:**

```bash
npm run dev
```

**5.** Mở địa chỉ Local URL được hiển thị trong Terminal.

## Các câu lệnh (Available Scripts)

| Lệnh | Mô tả |
|---|---|
| `npm run dev` | Khởi chạy môi trường phát triển |
| `npm run build` | Build ứng dụng cho môi trường production |
| `npm run preview` | Xem trước phiên bản production |
| `npm run lint` | Kiểm tra mã nguồn bằng ESLint |

## Tích hợp API (API Integration)

Dự án sử dụng Axios để giao tiếp với F8 Threads API.

**Địa chỉ API:**

```text
https://threads.f8team.dev/api
```

Các API Service được tổ chức thành những module riêng biệt:

- `auth.service.js` – Xử lý xác thực và quản lý tài khoản.
- `postService.js` – Xử lý bảng tin, bài viết, câu trả lời và các thao tác tương tác.
- `axios.js` – Cấu hình Axios Instance, Request Interceptors và tự động làm mới token.

## Triển khai (Deployment)

Dự án được triển khai bằng **GitHub Pages** kết hợp với **GitHub Actions**.

Quy trình triển khai:

1. Cài đặt các thư viện cần thiết.
2. Build ứng dụng bằng Vite.
3. Đóng gói thư mục `dist`.
4. Triển khai bản build lên GitHub Pages.

**Demo:** [Threads Clone](https://hungomega.github.io/Threads/)

## Ghi chú phát triển (Development Notes)

Đây là dự án thực hành Frontend, được xây dựng dựa trên giao diện và trải nghiệm của Threads.

Một số trang như Search, Activity, Create và Profile hiện vẫn đang ở giai đoạn triển khai ban đầu. Dự án tập trung chủ yếu vào các chức năng xác thực người dùng, bảng tin, tương tác bài viết, hệ thống trả lời và tích hợp API.

## Tác giả (Author)

**Nguyễn Hữu Hùng**

- GitHub: [@hungomega](https://github.com/hungomega)
- Repository: [Threads Clone](https://github.com/hungomega/Threads)

---

*Được xây dựng bằng React, JavaScript với mục tiêu học tập và phát triển kỹ năng Frontend.*

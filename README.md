# Cách tiếp cận 1 dự án

1. Đi từ bao quát tới chi tiết

2. Mô tả càng chi tiết càng tốt

# Mục tiêu của dự án này là clone Frontend của threads.com

## Mô tả lộ trình làm dự án

1. Lựa chọn công nghệ

- Vite
- React
- JS
- Routing: React Router
- Form : React Hook Form
- i18n: React i18next
- Validation: Yup
- CSS: Taiwind CSS
- UI Component: Shadcn
- State management: Redux Toolkit / RTK Query
- HTTP request: Axious
- Font icon: Fontawesome , Lucide icon (shadcn) , Hero icons (Tailwindk)

2. Phân tích cấu trúc :

- Layouts: Default layout , auth layout , no layout
    - Default layout:
        - Navigation
        - Add post button
    - Auth layout:
        - Wrapper có background-image
    - No layout:

- Pages:
    - Page trong Default Layout
        - Home page
            - Có nhiều threads , mỗi thread là 1 page ,các page xếp hàng ngang
            - Mỗi page có 1 state trong store
            - Khi có 1 page trong home page thì click tên user hay bài post thì chuyển trang . Nhưng nếu có nhiều page thì chỉ thay đổi nội dung của page đó.
        - For you page
            - Danh sách các bài thread
            - Modal đăng bài thread
        - Following page
            - Danh sách bài thread của những user đã follow
        - Search page
            - input on change hiển thị danh sách kết quả bên dưới
            - filter
            - Follow suggestion
        - Ghost page
            - Danh sách bài thread đã lưu trữ quá 24h
        - Activity Page
            - danh sách bài theard được gợi ý
        - Profile page
            - Thông tin của user , (nếu user chính là mình thì hiện thị các nút action)
        - Appearance
        - Insight page
            - card và Chard của shadcn để hiện thị insights ( views , interactions , follows : by location , by age , by gender)
        - Settings page
            - Dùng Sidebar của shadcn
            - Có 4 item trong Sidebar
        - Saved page
            - Danh sách bài thread đã lưu
    - Pages trong auth layout:
        - Login page
            - Form dùng React Hook Form có 2 trường : email / username / phone và password
            - có link dẫn tới trang "quên mật khẩu"
            - Có nút đăng ký bằng ig
        - Register page
            - Nếu API có thì làm trang này
        - Forgot password page
            - Nếu API có thì làm trang này
        - Reset password page
            - Nếu API có thì làm trang này
    - No Layout:
        - Not Found Page
            - Hiển thị thông báo và nút "Back" quay lại trang chủ
        - Embed thread page
            - Xuất 1 khối code HTML và 1 thẻ script chứa logic nhúng iframe chứa thread vào khối code html
3. Thời gian : 12 ngày (6 - 7  tiếng)

## Yêu cầu
1. Dựa vào mô tả trên , làm chhi tiết từng mô  tả  với code triển khai
2. Đưa ra kế hoạch ,  chia từng gia đoạn dựa trên thời gian trong mô tả để hoàn  thành dự án đúng thời hạn .
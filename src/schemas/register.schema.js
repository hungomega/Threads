import * as yup from "yup";
// Yup là thư viện giúp kiểm tra dữ liệu người dùng nhập vào form có hợp lệ hay không.
export const registerSchema = yup.object({
    // Tên hiển thị
    username: yup
        .string()
        .trim()
        .required("Vui lòng nhập tên hiển thị")
        .min(3, "Tên hiển thị phải có ít nhất 3 ký tự")
        .max(30, "Tên hiển thị không được quá 30 ký tự")
        .matches(
            /^[a-zA-Z0-9_-]+$/,
            "Chỉ được sử dụng chữ không dấu, số, dấu - và _",
        ),

    // Email
    email: yup
        .string()
        .required("Vui lòng nhập email")
        .email("Email không đúng định dạng"),

    // Mật khẩu
    password: yup
        .string()
        .required("Vui lòng nhập mật khẩu")
        .min(8, "Mật khẩu phải có ít nhất 8 ký tự"),

    // Xác nhận mật khẩu
    password_confirmation: yup
        .string()
        .required("Vui lòng xác nhận mật khẩu")
        .oneOf([yup.ref("password")], "Mật khẩu xác nhận không khớp"),
});

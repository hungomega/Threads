import * as yup from "yup";

export const loginSchema = yup.object({
    identifier: yup
        .string()
        .required("Vui lòng nhập email hoặc tên người dùng"),

    password: yup.string().required("Vui lòng nhập mật khẩu"),
});

// yup.object()	Định nghĩa bộ quy tắc kiểm tra dữ liệu dạng object
export const forgotPasswordSchema = yup.object({
    email: yup
        .string()
        .required("Vui lòng nhập email")
        .email("Email không hợp lệ"),
});

export const resetPasswordSchema = yup.object({
    password: yup
        .string()
        .required("Vui lòng nhập mật khẩu")
        .min(8, "Mật khẩu phải có ít nhất 8 ký tự"),

    password_confirmation: yup
        .string()
        .required("Vui lòng xác nhận mật khẩu")
        .oneOf([yup.ref("password")], "Mật khẩu xác nhận không khớp"),
});

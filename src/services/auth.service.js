import axiosClient from "./axios";

// Đăng nhập
export const login = (data) => {
    return axiosClient.post("/auth/login", data);
};

// Lấy thông tin người dùng
export const getUserInfo = () => {
    return axiosClient.get("/auth/user");
};

// Kiểm tra username đã tồn tại chưa
export const validateUsername = (username) =>
    axiosClient.post("/auth/validate/username", {
        username,
    });

// Kiểm tra email đã tồn tại chưa
export const validateEmail = (email) =>
    axiosClient.post("/auth/validate/email", {
        email,
    });
// Đăng ký tài khoản.
export const register = (data) => {
    return axiosClient.post("/auth/register", data, {
        headers: {
            "x-origin": window.location.origin, // địa chỉ frontend hiện tại, giúp backend tạo đường dẫn xác thực email quay về ứng dụng của bạn.
        },
    });
};

// Gửi email đặt lại mật khẩu.
export const forgotPassword = (email) => {
    return axiosClient.post(
        "/auth/forgot-password",
        { email }, // { email }: dữ liệu gửi lên API.
        {
            headers: {
                "x-origin": window.location.origin, // giúp API tạo link quay về frontend
            },
        },
    );
};

// Kiểm tra token đặt lại mật khẩu có hợp lệ không.
export const validateResetToken = (token) => {
    return axiosClient.get("/auth/reset-password/validate", {
        params: { token }, // Axios tự đưa token vào query string của URL.
    });
};

// Gửi mật khẩu mới lên server.
export const resetPassword = (data) => {
    return axiosClient.post("/auth/reset-password", data);
};
// Xác minh email bằng token nhận được từ đường link trong email
export const verifyEmail = (token) => {
    return axiosClient.post("/auth/verify-email", {
        token,
    });
};
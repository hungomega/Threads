import axios from "axios";

// Kiểm tra có request nào đang thực hiện Refresh Token không
let isRefreshing = false;

// Lưu các request đang chờ Access Token mới
let failedQueue = [];

// Xử lý các request đang chờ Access Token mới
const processQueue = (error, token = null) => {
    failedQueue.forEach((request) => {
        if (error) {
            // Nếu Refresh Token thất bại, thông báo lỗi cho request đang chờ
            request.reject(error);
        } else {
            // Nếu Refresh Token thành công, trả Access Token mới cho request
            request.resolve(token);
        }
    });

    // Xóa danh sách request đã xử lý
    failedQueue = [];
};

// Khởi tạo Axios Instance
// Khởi tạo Axios Instance
const axiosClient = axios.create({
    baseURL: "https://threads.f8team.dev/api",
});

// REQUEST INTERCEPTOR
// Tự động đính kèm Access Token vào Header trước mỗi request
axiosClient.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem("access_token");

    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
});

// RESPONSE INTERCEPTOR
// Tự động xử lý khi Access Token hết hạn
axiosClient.interceptors.response.use(
    // Nếu API thành công, trả response về như bình thường
    (response) => {
        return response;
    },

    // Nếu API thất bại
    async (error) => {
        const originalRequest = error.config;

        // Chỉ xử lý lỗi 401, request chưa thử lại,
        // và không phải API Login hoặc Refresh Token
        if (
            error.response?.status === 401 &&
            originalRequest &&
            !originalRequest._retry &&
            !originalRequest.url?.includes("/auth/login") &&
            !originalRequest.url?.includes("/auth/refresh")
        ) {
            // Nếu đang có request khác thực hiện Refresh Token
            if (isRefreshing) {
                // Đưa request hiện tại vào hàng đợi để chờ Access Token mới
                originalRequest._retry = true;

                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then((token) => {
                        // Gắn Access Token mới vào request đang chờ
                        originalRequest.headers.Authorization = `Bearer ${token}`;

                        // Gửi lại request ban đầu
                        return axiosClient(originalRequest);
                    })
                    .catch((error) => {
                        return Promise.reject(error);
                    });
            }

            // Đánh dấu request hiện tại đã được thử lại
            originalRequest._retry = true;

            // Lấy Refresh Token từ LocalStorage
            const refreshToken = localStorage.getItem("refresh_token");

            // Nếu không có Refresh Token, xóa token và chuyển về Login
            if (!refreshToken) {
                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");

                window.location.href = "/login";

                return Promise.reject(error);
            }

            // Đánh dấu đang thực hiện Refresh Token
            isRefreshing = true;

            try {
                // Gọi API Refresh Token bằng Axios gốc
                // Dùng axios gốc để tránh lặp lại Response Interceptor
                const response = await axios.post(
                    "https://threads.f8team.dev/api/auth/refresh",
                    {
                        refresh_token: refreshToken,
                    },
                );

                // Lấy Access Token và Refresh Token mới từ API
                const { access_token, refresh_token } = response.data.data;

                // Lưu hai token mới vào LocalStorage
                localStorage.setItem("access_token", access_token);
                localStorage.setItem("refresh_token", refresh_token);

                // Giải phóng hàng đợi và gửi Access Token mới cho các request đang chờ
                processQueue(null, access_token);

                // Gắn Access Token mới vào request ban đầu
                originalRequest.headers.Authorization = `Bearer ${access_token}`;

                // Gửi lại request ban đầu
                return await axiosClient(originalRequest);
            } catch (refreshError) {
                // Refresh Token thất bại: thông báo lỗi cho các request đang chờ
                processQueue(refreshError, null);

                // Xóa token cũ vì không thể xác thực
                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");

                // Chuyển người dùng về trang Login
                window.location.href = "/login";

                return Promise.reject(refreshError);
            } finally {
                // Kết thúc quá trình Refresh Token
                // Cho phép request tiếp theo có thể Refresh Token nếu cần
                isRefreshing = false;
            }
        }

        // Những lỗi khác trả về cho nơi gọi API xử lý
        return Promise.reject(error);
    },
);

export default axiosClient;

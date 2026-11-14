import { useEffect } from "react";
import { Routes, Route } from "react-router";
import { useDispatch, useSelector } from "react-redux";

// Pages - Main
import Home from "./pages/Home/index.jsx";
import Search from "./pages/Search/index.jsx";
import Activity from "./pages/Activity/index.jsx";
import Create from "./pages/Create/index.jsx";
import Profile from "./pages/Profile/index.jsx";

// Pages - Authentication
import Login from "./pages/Auth/Login.jsx";
import Register from "./pages/Auth/Register.jsx";
import ForgotPassword from "./pages/Auth/ForgotPassword.jsx";
import ResetPassword from "./pages/Auth/ResetPassword.jsx";
import VerifyEmail from "./pages/Auth/VerifyEmail.jsx";

// Pages - Embed
import Embed from "./pages/Embed";

// Layouts
import DefaultLayout from "./layouts/DefaultLayout/index.jsx";
import AuthLayout from "./layouts/AuthLayout/index.jsx";
import EmbedLayout from "./layouts/EmbedLayout";

// Components
import Loading from "./components/Loading/index.jsx";
import ProtectedRoute from "./components/ProtectedRoute/index.jsx";

// Redux
import { setUser, setAuthInitialized } from "./redux/slices/userSlice";

// Services
import { getUserInfo } from "./services/auth.service";

function App() {
    const dispatch = useDispatch();

    // Lấy trạng thái khởi tạo xác thực từ Redux
    const isInitialized = useSelector((state) => state.user.isInitialized);

    // Kiểm tra trạng thái đăng nhập khi ứng dụng khởi chạy
    useEffect(() => {
        const checkAuth = async () => {
            const accessToken = localStorage.getItem("access_token");

            // Không có token thì kết thúc quá trình kiểm tra
            if (!accessToken) {
                dispatch(setAuthInitialized());
                return;
            }

            try {
                // Khôi phục thông tin người dùng từ API
                const response = await getUserInfo();
                const userData = response.data.data;

                // Lưu thông tin user vào Redux Store
                dispatch(setUser(userData));
            } catch (error) {
                console.warn("Không thể khôi phục đăng nhập:", error);

                // Xóa token nếu xác thực không thành công
                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");
            } finally {
                // Đánh dấu quá trình kiểm tra xác thực đã hoàn tất
                dispatch(setAuthInitialized());
            }
        };

        checkAuth();
    }, [dispatch]);

    // Chờ kiểm tra trạng thái đăng nhập hoàn tất
    if (!isInitialized) {
        return <Loading />;
    }

    return (
        <Routes>
            {/* Layout chính: Navigation, Sidebar, ... */}
            <Route element={<DefaultLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<Search />} />

                {/* Các trang yêu cầu đăng nhập */}
                <Route element={<ProtectedRoute />}>
                    <Route path="/create" element={<Create />} />
                    <Route path="/activity" element={<Activity />} />
                    <Route path="/profile" element={<Profile />} />
                </Route>
            </Route>

            {/* Layout xác thực: Login, Register, ... */}
            <Route element={<AuthLayout />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/verify-email" element={<VerifyEmail />} />
            </Route>

            {/* Layout Embed: Không có Navigation và Sidebar */}
            <Route
                path="/:username/post/:postId/embed"
                element={
                    <EmbedLayout>
                        <Embed />
                    </EmbedLayout>
                }
            />
        </Routes>
    );
}

export default App;

import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";

// Kiểm tra người dùng đã đăng nhập chưa.
function ProtectedRoute() {
    // Lấy trạng thái đăng nhập từ Redux.
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

    // Đã đăng nhập: hiển thị trang con.
    // Chưa đăng nhập: chuyển hướng về Login.
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

// Export component.
export default ProtectedRoute;

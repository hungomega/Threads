import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// Schema
import { loginSchema } from "../../schemas/auth.schema";

// Services
import { login, getUserInfo } from "../../services/auth.service.js";

// Redux
import { setUser } from "../../redux/slices/userSlice";

function Login() {
    // 1. Hooks
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(loginSchema),
    });

    // 2. State

    // Thông báo khi xác minh email thành công
    const [successMessage] = useState(() => {
        if (location.state?.verified) {
            return "Đã xác minh tài khoản thành công. Vui lòng đăng nhập.";
        }

        return location.state?.message || "";
    });

    // Thông báo khi đăng nhập thất bại
    const [errorMessage, setErrorMessage] = useState("");

    // 3. Effects

    // Xóa navigation state sau khi lấy thông báo
    useEffect(() => {
        if (location.state?.verified || location.state?.message) {
            navigate(location.pathname, {
                replace: true,
                state: null,
            });
        }
    }, [location.state, location.pathname, navigate]);

    // 4. Handle Login

    const onSubmit = async (data) => {
        try {
            setErrorMessage("");

            // Bước 1: Gọi API đăng nhập
            const response = await login({
                login: data.identifier,
                password: data.password,
            });

            // Bước 2: Lấy token từ response
            const { access_token, refresh_token } = response.data.data;

            // Bước 3: Lưu token vào localStorage
            localStorage.setItem("access_token", access_token);
            localStorage.setItem("refresh_token", refresh_token);

            // Bước 4: Lấy thông tin người dùng
            const userResponse = await getUserInfo();
            const userData = userResponse.data.data;

            // Bước 5: Lưu thông tin người dùng vào Redux
            dispatch(setUser(userData));

            // Bước 6: Chuyển về trang chủ
            navigate("/");

            console.log("Thông tin người dùng:", userData);
        } catch (error) {
            console.log("Đăng nhập thất bại:", error.response?.data);

            setErrorMessage(
                error.response?.data?.message ||
                    "Đăng nhập thất bại. Vui lòng thử lại!",
            );
        }
    };

    // 5. Render UI

    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            {/* Tiêu đề */}
            <h1 className="mb-6 text-center text-2xl font-bold">Đăng nhập</h1>

            {/* Thông báo xác minh email thành công */}
            {successMessage && (
                <p className="mb-4 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700">
                    {successMessage}
                </p>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Email hoặc username */}
                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Email hoặc tên người dùng
                    </label>

                    <input
                        type="text"
                        placeholder="Nhập email hoặc tên người dùng"
                        {...register("identifier")}
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
                    />

                    {errors.identifier && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.identifier.message}
                        </p>
                    )}
                </div>

                {/* Password */}
                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Mật khẩu
                    </label>

                    <input
                        type="password"
                        placeholder="Nhập mật khẩu"
                        {...register("password")}
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
                    />

                    {errors.password && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.password.message}
                        </p>
                    )}

                    {/* Forgot password */}
                    <div className="mt-2 text-right">
                        <Link
                            to="/forgot-password"
                            className="text-sm text-gray-500 hover:text-black"
                        >
                            Quên mật khẩu?
                        </Link>
                    </div>
                </div>

                {/* Login error */}
                {errorMessage && (
                    <p className="text-sm text-red-500">{errorMessage}</p>
                )}

                {/* Submit button */}
                <button
                    type="submit"
                    className="w-full rounded-xl bg-black py-3 font-semibold text-white hover:bg-gray-800"
                >
                    Đăng nhập
                </button>
            </form>

            {/* Register link */}
            <p className="mt-6 text-center text-sm text-gray-500">
                Bạn chưa có tài khoản?{" "}
                <Link to="/register" className="font-semibold text-black">
                    Đăng ký
                </Link>
            </p>
        </div>
    );
}

export default Login;

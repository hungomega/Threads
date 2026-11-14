import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { forgotPasswordSchema } from "../../schemas/auth.schema";
import { forgotPassword } from "../../services/auth.service";
import { useState } from "react";

function ForgotPassword() {
    const {
        register, // Kết nối input Email với React Hook Form.
        handleSubmit, // Kiểm tra dữ liệu theo Yup trước khi xử lý submit.
        formState: { errors, isSubmitting }, // errors: Chứa các lỗi validation.
    } = useForm({
        resolver: yupResolver(forgotPasswordSchema),
    });
    // Lưu thông báo trả về từ API.
    const [message, setMessage] = useState("");

    // Lưu lỗi trả về từ Backend.
    const [serverError, setServerError] = useState("");

    // Xử lý khi người dùng submit form.
    const onSubmit = async (data) => {
        // Xóa thông báo cũ.
        setMessage("");
        setServerError("");

        try {
            // Gọi API gửi email đặt lại mật khẩu.
            const response = await forgotPassword(data.email);

            // Lưu thông báo thành công từ Backend.
            setMessage(
                "Liên kết đặt lại mật khẩu đã được gửi tới email của bạn",
            );

            console.log("Forgot password:", response.data);
        } catch (error) {
            // Lấy thông báo lỗi từ Backend.
            setServerError(
                error.response?.data?.message ||
                    "Đã xảy ra lỗi, vui lòng thử lại",
            );
        }
    };
    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            {/* Tiêu đề */}
            <h1 className="mb-3 text-center text-2xl font-bold">
                Quên mật khẩu?
            </h1>

            {/* Mô tả */}
            <p className="mb-6 text-center text-sm text-gray-500">
                Nhập email của bạn để nhận liên kết đặt lại mật khẩu
            </p>
            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Thông báo thành công */}
                {message && (
                    <p className="mb-4 rounded-lg bg-green-50 p-3 text-sm text-green-700">
                        {message}
                    </p>
                )}

                {/* Thông báo lỗi từ Backend */}
                {serverError && (
                    <p className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
                        {serverError}
                    </p>
                )}

                {/* Email */}
                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Email
                    </label>

                    <input
                        type="email"
                        placeholder="Nhập email"
                        {...register("email")} // Kết nối input Email với React Hook Form để theo dõi giá trị người dùng nhập.
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
                    />
                    {/* Hiển thị lỗi validation */}
                    {errors.email && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.email.message}
                        </p>
                    )}
                </div>

                {/* Nút đặt lại mật khẩu */}
                <button
                    type="submit"
                    className="w-full rounded-xl bg-black py-3 font-semibold text-white hover:bg-gray-800"
                >
                    Đặt lại mật khẩu
                </button>
            </form>

            {/* Quay lại đăng nhập */}
            <p className="mt-6 text-center text-sm text-gray-500">
                Đã nhớ mật khẩu?{" "}
                <Link to="/login" className="font-semibold text-black">
                    Đăng nhập
                </Link>
            </p>
        </div>
    );
}

export default ForgotPassword;

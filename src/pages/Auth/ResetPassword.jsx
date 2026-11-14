import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { validateResetToken } from "../../services/auth.service";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { resetPasswordSchema } from "../../schemas/auth.schema";
import { useNavigate } from "react-router";
import { resetPassword } from "../../services/auth.service";

function ResetPassword() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const [isCheckingToken, setIsCheckingToken] = useState(true); // API đang kiểm tra token.
    const [isTokenValid, setIsTokenValid] = useState(false); // token có hợp lệ không
    const [tokenError, setTokenError] = useState(""); // thông báo lỗi nếu token không hợp lệ.

    const navigate = useNavigate();
    const [serverError, setServerError] = useState("");
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(resetPasswordSchema),
    });

    const onSubmit = async (data) => {
        setServerError("");

        try {
            await resetPassword({
                token,
                password: data.password,
                password_confirmation: data.password_confirmation,
            });

            navigate("/login", {
                replace: true,
                state: {
                    message: "Tạo mật khẩu mới thành công, vui lòng đăng nhập",
                },
            });
        } catch (error) {
            setServerError(
                error.response?.data?.message ||
                    "Không thể đặt lại mật khẩu, vui lòng thử lại",
            );
        }
    };

    useEffect(() => {
        const checkToken = async () => {
            if (!token) {
                setTokenError("Liên kết đã hết hạn hoặc không hợp lệ");
                setIsCheckingToken(false);
                return;
            }

            try {
                const response = await validateResetToken(token);
                const isValid = response.data.data.valid;

                setIsTokenValid(isValid);

                if (!isValid) {
                    setTokenError("Liên kết đã hết hạn hoặc không hợp lệ");
                }
            } catch (error) {
                setTokenError("Liên kết đã hết hạn hoặc không hợp lệ");
            } finally {
                setIsCheckingToken(false);
            }
        };

        checkToken();
    }, [token]);

    if (isCheckingToken) {
        return <p>Đang kiểm tra liên kết...</p>;
    }

    if (!isTokenValid) {
        return (
            <div className="text-center">
                <p className="text-red-500">{tokenError}</p>
            </div>
        );
    }

    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            {/* Tiêu đề */}
            <h1 className="mb-3 text-center text-2xl font-bold">
                Tạo mật khẩu mới
            </h1>

            {/* Mô tả */}
            <p className="mb-6 text-center text-sm text-gray-500">
                Vui lòng nhập mật khẩu mới cho tài khoản của bạn
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Mật khẩu mới */}
                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Mật khẩu mới
                    </label>

                    <input
                        type="password"
                        {...register("password")}
                        placeholder="Nhập mật khẩu mới"
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
                    />
                    {errors.password && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.password.message}
                        </p>
                    )}
                </div>

                {/* Xác nhận mật khẩu */}
                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Xác nhận mật khẩu
                    </label>

                    <input
                        type="password"
                        placeholder="Nhập lại mật khẩu mới"
                        {...register("password_confirmation")}
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
                    />
                    {errors.password_confirmation && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.password_confirmation.message}
                        </p>
                    )}
                </div>

                {/* Nút tạo mật khẩu */}
                {serverError && (
                    <p className="text-sm text-red-500">{serverError}</p>
                )}

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-xl bg-black py-3 font-semibold text-white hover:bg-gray-800 disabled:opacity-50"
                >
                    {isSubmitting ? "Đang xử lý..." : "Tạo mật khẩu mới"}
                </button>
            </form>
        </div>
    );
}

export default ResetPassword;

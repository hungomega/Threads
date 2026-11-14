import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../../schemas/register.schema.js";
import { useEffect, useState } from "react";
import {
    validateUsername,
    validateEmail,
    register as registerAccount,
} from "../../services/auth.service.js";

function Register() {
    // Khởi tạo React Hook Form.
    const {
        register,
        handleSubmit,
        watch,
        setError,
        clearErrors,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(registerSchema),
    });

    // Theo dõi giá trị username và email.
    const username = watch("username");
    const email = watch("email");

    // Lưu thông báo kiểm tra username và email.
    const [usernameMessage, setUsernameMessage] = useState("");
    const [emailMessage, setEmailMessage] = useState("");

    // Lưu trạng thái username và email có thể sử dụng hay không.
    const [usernameAvailable, setUsernameAvailable] = useState(null);
    const [emailAvailable, setEmailAvailable] = useState(null);

    // Lưu thông báo lỗi khi đăng ký.
    const [errorMessage, setErrorMessage] = useState("");

    // Lưu thông báo đăng ký thành công.
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        // Kiểm tra username bằng API.
        setUsernameAvailable(null);
        setUsernameMessage("");
        // Nếu chưa nhập username thì không gọi API.
        if (!username) {
            setUsernameMessage("");
            return;
        }

        // Chỉ gọi API khi username đúng định dạng.
        const isValid = /^[a-zA-Z0-9_-]{3,30}$/.test(username);

        if (!isValid) {
            setUsernameMessage("");
            return;
        }

        // Đợi người dùng ngừng nhập 700ms rồi mới gọi API.
        const timer = setTimeout(async () => {
            try {
                // Gọi API kiểm tra username.
                const response = await validateUsername(username);

                // Lấy kết quả username có khả dụng hay không.
                const available = response.data.data.available;

                // Lưu trạng thái username.
                setUsernameAvailable(available);

                if (available) {
                    // Username chưa tồn tại.
                    setUsernameMessage("Tên người dùng có thể sử dụng");
                } else {
                    // Username đã tồn tại.
                    setUsernameMessage("Tên người dùng đã được sử dụng");
                }
            } catch (error) {
                // Xử lý lỗi khi gọi API.
                console.log("Lỗi kiểm tra username:", error);
            }
        }, 700);

        // Hủy bộ đếm cũ nếu người dùng tiếp tục nhập.
        return () => clearTimeout(timer);
    }, [username]);

    useEffect(() => {
        // Kiểm tra email bằng API.
        setEmailAvailable(null);
        setEmailMessage("");
        // Nếu chưa nhập email thì không gọi API.
        if (!email) {
            setEmailMessage("");
            return;
        }

        // Chỉ gọi API khi email đúng định dạng.
        const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

        if (!isValid) {
            setEmailMessage("");
            return;
        }

        // Đợi người dùng ngừng nhập 700ms rồi mới gọi API.
        const timer = setTimeout(async () => {
            try {
                // Gọi API kiểm tra email.
                const response = await validateEmail(email);

                // Lấy kết quả email có khả dụng hay không.
                const available = response.data.data.available;
                // Lưu trạng thái email.
                setEmailAvailable(available);
                if (available) {
                    // Email chưa tồn tại.
                    setEmailMessage("Email có thể sử dụng");
                } else {
                    // Email đã tồn tại.
                    setEmailMessage("Email đã được sử dụng");
                }
            } catch (error) {
                // Xử lý lỗi khi gọi API.
                console.log("Lỗi kiểm tra email:", error);
            }
        }, 700);

        // Hủy bộ đếm cũ nếu người dùng tiếp tục nhập.
        return () => clearTimeout(timer);
    }, [email]);

    // Xử lý khi dữ liệu hợp lệ.
    // Xử lý đăng ký tài khoản.

    const onSubmit = async (data) => {
        try {
            // Xóa thông báo và lỗi cũ.
            setErrorMessage("");
            setSuccessMessage("");
            clearErrors();

            // Gọi API đăng ký.
            await registerAccount(data);

            // Hiển thị thông báo thành công.
            setSuccessMessage(
                "Chúng tôi đã gửi một liên kết xác thực tới email của bạn. Vui lòng kiểm tra email để xác thực tài khoản.",
            );
        } catch (error) {
            // Lấy danh sách lỗi từ API.
            const errors = error.response?.data?.errors;

            if (errors) {
                // Hiển thị lỗi dưới từng input tương ứng.
                Object.entries(errors).forEach(([field, messages]) => {
                    setError(field, {
                        type: "server",
                        message: messages[0],
                    });
                });
            } else {
                // Hiển thị lỗi chung nếu không có lỗi validation.
                setErrorMessage(
                    error.response?.data?.message ||
                        "Đăng ký thất bại. Vui lòng thử lại!",
                );
            }

            console.log("Lỗi đăng ký:", error.response?.data);
        }
    };
    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h1 className="mb-4 text-center text-2xl font-bold">Đăng ký</h1>
            {successMessage && (
                <p className="mb-4 text-center text-sm text-green-600">
                    {successMessage}
                </p>
            )}

            {errorMessage && (
                <p className="mb-4 text-center text-sm text-red-500">
                    {errorMessage}
                </p>
            )}

            {/* Form đăng ký */}
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4"
                noValidate
            >
                {/* Tên hiển thị */}
                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Tên hiển thị
                    </label>

                    <input
                        type="text"
                        placeholder="Nhập tên hiển thị"
                        {...register("username")}
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
                    />

                    {errors.username && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.username.message}
                        </p>
                    )}

                    {usernameMessage && (
                        <p className="mt-1 text-sm text-gray-500">
                            {usernameMessage}
                        </p>
                    )}
                </div>

                {/* Email */}
                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Email
                    </label>

                    <input
                        type="email"
                        placeholder="Nhập email"
                        {...register("email")}
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
                    />

                    {errors.email && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.email.message}
                        </p>
                    )}

                    {emailMessage && (
                        <p className="mt-1 text-sm text-gray-500">
                            {emailMessage}
                        </p>
                    )}
                </div>

                {/* Mật khẩu */}
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
                </div>

                {/* Xác nhận mật khẩu */}
                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Xác nhận mật khẩu
                    </label>

                    <input
                        type="password"
                        placeholder="Nhập lại mật khẩu"
                        {...register("password_confirmation")}
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
                    />

                    {errors.password_confirmation && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.password_confirmation.message}
                        </p>
                    )}
                </div>

                <button
                    type="submit"
                    className="w-full rounded-xl bg-black py-3 font-semibold text-white hover:bg-gray-800"
                >
                    Đăng ký
                </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-500">
                Đã có tài khoản?{" "}
                <Link to="/login" className="font-semibold text-black">
                    Đăng nhập
                </Link>
            </p>
        </div>
    );
}

export default Register;

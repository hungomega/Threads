import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { verifyEmail } from "../../services/auth.service";

function VerifyEmail() {
    const navigate = useNavigate();
    const hasRequested = useRef(false);
    // Lấy query string từ URL
    // Ví dụ: /verify-email?token=abc123
    const [searchParams] = useSearchParams();

    // Lấy giá trị token trong query string
    const token = searchParams.get("token");

    // Quản lý trạng thái xác minh
    const [isLoading, setIsLoading] = useState(true);

    // Lưu trạng thái lỗi nếu xác minh thất bại
    const [isError, setIsError] = useState(false);

    // Tự động xác minh email khi component được mount
    useEffect(() => {
        // Ngăn gọi API xác minh hai lần trong môi trường development
        if (hasRequested.current) return;

        hasRequested.current = true;

        const handleVerifyEmail = async () => {
            if (!token) {
                setIsError(true);
                setIsLoading(false);
                return;
            }

            try {
                await verifyEmail(token);

                navigate("/login", {
                    replace: true,
                    state: {
                        verified: true,
                    },
                });
            } catch (error) {
                console.log("Verify Email error:", error.response?.data);

                setIsError(true);
                setIsLoading(false);
            }
        };

        handleVerifyEmail();
    }, [token, navigate]);
    // Giao diện khi đang xác minh
    if (isLoading) {
        return (
            <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
                {/* Spinner loading */}
                <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-black"></div>

                <p className="text-sm text-gray-600">Đang xác minh...</p>
            </div>
        );
    }

    // Giao diện khi xác minh thất bại
    if (isError) {
        return (
            <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
                <p className="mb-6 text-sm text-red-500">
                    Liên kết đã hết hạn hoặc không hợp lệ.
                </p>

                {/* Chuyển người dùng về trang đăng nhập */}
                <button
                    type="button"
                    onClick={() => navigate("/login", { replace: true })}
                    className="w-full rounded-xl bg-black py-3 font-semibold text-white hover:bg-gray-800"
                >
                    Đi tới trang đăng nhập
                </button>
            </div>
        );
    }

    return null;
}

export default VerifyEmail;

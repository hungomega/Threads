import { Link } from "react-router";

function LoginPanel() {
    return (
        <aside className="w-72 p-5">
            <div className="rounded-2xl border border-gray-200 p-5">
                <h2 className="mb-3 text-lg font-semibold">
                    Đăng nhập để xem thêm
                </h2>

                <p className="mb-5 text-sm text-gray-500">
                    Đăng nhập để theo dõi những người bạn quan tâm và xem thêm
                    bài viết trên Threads.
                </p>

                <Link
                    to="/login"
                    className="block rounded-xl bg-black px-4 py-3 text-center font-semibold text-white hover:bg-gray-800"
                >
                    Đăng nhập
                </Link>
            </div>
        </aside>
    );
}
export default LoginPanel;
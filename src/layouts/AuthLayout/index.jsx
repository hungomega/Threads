import { Outlet } from "react-router";

function AuthLayout() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md">
                <Outlet />
            </div>
        </main>
    );
}

export default AuthLayout;

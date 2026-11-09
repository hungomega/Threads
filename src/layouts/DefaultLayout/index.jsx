import { Outlet } from "react-router";
import Sidebar from "../../components/Sidebar";

function DefaultLayout() {
    return (
        <div className="min-h-screen">
            <Sidebar />

            <main className="ml-60">
                <Outlet />
            </main>
        </div>
    );
}
export default DefaultLayout;

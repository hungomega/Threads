import { NavLink } from "react-router";
import { House, Search, Plus, Heart, UserRound } from "lucide-react";
import { useSelector } from "react-redux";

const menuItems = [
    { title: "Home", path: "/", icon: House },
    { title: "Search", path: "/search", icon: Search },
    { title: "Create", path: "/create", icon: Plus },
    { title: "Activity", path: "/activity", icon: Heart },
    { title: "Profile", path: "/profile", icon: UserRound },
];
function Sidebar() {
    const user = useSelector((state) => state.user.user);
    return (
        <aside className="fixed left-0 top-0 flex h-screen w-60 flex-col border-r border-gray-200 bg-white px-4 py-8">
            {/* Logo */}
            <div className="mb-12 px-3 text-2xl font-bold">Threads</div>

            {/* Navigation */}
            <nav className="flex flex-col gap-2">
                {menuItems.map((item) => {
                    const Icon = item.icon;

                    return (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center gap-4 rounded-xl px-3 py-3 transition ${
                                    isActive
                                        ? "bg-gray-100 font-semibold"
                                        : "hover:bg-gray-100"
                                }`
                            }
                        >
                            <Icon size={24} />
                            <span>{item.title}</span>
                        </NavLink>
                    );
                })}
            </nav>

            {/* Thông tin người dùng */}
            <div className="mt-auto border-t border-gray-200 pt-4">
                <p>{user?.username || "Chưa đăng nhập"}</p>
            </div>
        </aside>
    );
}
export default Sidebar;

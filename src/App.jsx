import { Routes, Route } from "react-router";
import Home from "./pages/Home/index.jsx";
import Search from "./pages/Search/index.jsx";
import DefaultLayout from "./layouts/DefaultLayout/index.jsx";
import Activity from "./pages/Activity/index.jsx";
import Create from "./pages/Create/index.jsx";
import Profile from "./pages/Profile/index.jsx";

function App() {
    return (
        <>
            <Routes>
                <Route element={<DefaultLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/create" element={<Create />} />
                    <Route path="/activity" element={<Activity />} />
                    <Route path="/profile" element={<Profile />} />
                </Route>
            </Routes>
        </>
    );
}

export default App;

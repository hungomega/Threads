import FeedHeader from "./components/FeedHeader.jsx";
import PostCard from "../../components/post/PostCard.jsx";
import LoginPanel from "../../components/LoginPanel/index.jsx";

function Home() {
    return (
        <div className="mx-auto flex min-h-screen max-w-[1100px] justify-center gap-8 px-4">
            {/* Main Feed */}
            <div className="min-w-0 w-full max-w-[630px] border-x border-gray-200">
                <FeedHeader />

                <PostCard />
            </div>

            {/* Right Sidebar */}
            <div className="hidden shrink-0 xl:block">
                <LoginPanel />
            </div>
        </div>
    );
}
export default Home;
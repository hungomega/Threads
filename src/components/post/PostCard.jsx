import InteractionBar from "./InteractionBar";

function PostCard() {
    return (
        <article className="flex gap-3 border-b border-gray-200 px-4 py-5">
            {/* Avatar */}
            <img
                src="https://i.pravatar.cc/150?img=12"
                alt="Avatar"
                className="h-10 w-10 rounded-full object-cover"
            />

            {/* Post Content */}
            <div className="min-w-0 flex-1">
                {/* User Info */}
                <div className="mb-2 flex items-center gap-2">
                    <span className="font-semibold">hungomega</span>
                    <span className="text-sm text-gray-500">2h</span>
                </div>

                {/* Content */}
                <p className="text-sm leading-6">
                    Hello Threads! Đây là bài đăng đầu tiên của tôi trong dự án
                    Threads Clone.
                </p>

                {/*InteractionBar */}
                <InteractionBar />
            </div>
        </article>
    );
}

export default PostCard;

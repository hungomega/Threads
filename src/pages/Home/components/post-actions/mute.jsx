
import { muteUser } from "../../../../services/postService.js";

export const handleMuteUser = async (userId, setPosts) => {
    try {
        // Gọi API Mute User
        await muteUser(userId);

        // Ẩn tất cả bài viết của người dùng đó khỏi Feed
        setPosts((prevPosts) =>
            prevPosts.filter((post) => post.user_id !== userId),
        );
    } catch (error) {
        console.warn("Mute user failed:", error);
    }
};

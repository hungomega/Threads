import { blockUser } from "../../../../services/postService.js";

export const handleBlockUser = async (userId, setPosts) => {
    try {
        // Gọi API Block User
        await blockUser(userId);

        // Xóa các bài viết của người bị chặn khỏi Feed
        setPosts((prevPosts) =>
            prevPosts.filter((post) => post.user_id !== userId),
        );
    } catch (error) {
        console.warn("Block user failed:", error);
    }
};
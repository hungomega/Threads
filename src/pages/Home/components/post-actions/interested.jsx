import { hidePost } from "../../../../services/postService.js";

export const handleNotInterested = async (postId, setPosts) => {
    try {
        // Gọi API ẩn bài viết
        await hidePost(postId);

        // Xóa bài viết khỏi danh sách Feed
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    } catch (error) {
        console.warn("Hide post failed:", error);
    }
};

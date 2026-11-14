import { deletePost } from "../../../../services/postService.js";

export const handleDeletePost = async (postId, setPosts) => {
    try {
        await deletePost(postId);

        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));

        return true;
    } catch (error) {
        console.warn("Delete post failed:", error);
        return false;
    }
};

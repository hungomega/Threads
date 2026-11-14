import { savePost } from "../../../../services/postService";

export const handleSavePost = async (postId, setPosts) => {
    try {
        await savePost(postId);

        setPosts((prevPosts) =>
            prevPosts.map((post) =>
                post.id === postId
                    ? {
                          ...post,
                          is_saved_by_auth: !post.is_saved_by_auth,
                      }
                    : post,
            ),
        );
    } catch (error) {
        console.warn("Save/Unsave failed:", error);
    }
};

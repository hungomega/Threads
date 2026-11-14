import { useState } from "react";
import { Heart } from "lucide-react";
import { likePost } from "../../../services/postService";

function LikeButton({ post }) {
    const [isLiked, setIsLiked] = useState(post.is_liked_by_auth ?? false);

    const [likesCount, setLikesCount] = useState(post.likes_count ?? 0);

    const handleLike = async () => {
        try {
            const response = await likePost(post.id);
            const data = response.data.data;

            setIsLiked(data.is_liked);
            setLikesCount(data.likes_count);
        } catch (error) {
            console.warn("Lỗi Like bài viết:", error);
        }
    };

    return (
        <button
            onClick={handleLike}
            className="flex items-center gap-1 text-gray-500 hover:text-red-500"
        >
            <Heart
                size={20}
                className={isLiked ? "fill-red-500 text-red-500" : ""}
            />
            <span className="text-xs">{likesCount}</span>
        </button>
    );
}

export default LikeButton;

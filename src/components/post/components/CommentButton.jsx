import { useState } from "react";
import { MessageCircle } from "lucide-react";
import ReplyModal from "../ReplyModal";

function CommentButton({ post, onReplySuccess }) {
    const [isReplyOpen, setIsReplyOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsReplyOpen(true)}
                className="flex items-center gap-1 text-gray-500 hover:text-gray-900"
            >
                <MessageCircle size={20} />
                <span className="text-xs">{post.replies_count ?? 0}</span>
            </button>

            <ReplyModal
                isOpen={isReplyOpen}
                onClose={() => setIsReplyOpen(false)}
                post={post}
                onReplySuccess={onReplySuccess}
            />
        </>
    );
}

export default CommentButton;

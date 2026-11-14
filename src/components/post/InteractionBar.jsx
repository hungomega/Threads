import LikeButton from "./components/LikeButton";
import RepostButton from "./components/RepostButton";
import CommentButton from "./components/CommentButton";
import ShareButton from "./components/ShareButton";

function InteractionBar({ post, onReplySuccess }) {
    return (
        <div className="mt-3 flex items-center gap-5">
            <LikeButton post={post} />
            <CommentButton post={post} onReplySuccess={onReplySuccess} />
            <RepostButton post={post} />
            <ShareButton post={post} />
        </div>
    );
}

export default InteractionBar;

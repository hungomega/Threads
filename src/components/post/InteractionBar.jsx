import { Heart, MessageCircle, Repeat2, Send } from "lucide-react";

function InteractionBar() {
    return (
        <div className="mt-3 flex items-center gap-5">
            {/* Like */}
            <button className="flex items-center gap-1 text-gray-500 hover:text-red-500">
                <Heart size={20} />
                <span className="text-xs">12</span>
            </button>

            {/* Comment */}
            <button className="flex items-center gap-1 text-gray-500 hover:text-gray-900">
                <MessageCircle size={20} />
                <span className="text-xs">5</span>
            </button>

            {/* Repost */}
            <button className="flex items-center gap-1 text-gray-500 hover:text-green-600">
                <Repeat2 size={20} />
                <span className="text-xs">3</span>
            </button>

            {/* Share */}
            <button className="text-gray-500 hover:text-gray-900">
                <Send size={20} />
            </button>
        </div>
    );
}
export default InteractionBar;
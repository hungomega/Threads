import { useState } from "react";
import { Repeat2 } from "lucide-react";
import { repostPost } from "../../../services/postService";
import QuoteModal from "../QuoteModal";

function RepostButton({ post }) {
    const [isReposted, setIsReposted] = useState(
        post.is_reposted_by_auth ?? false,
    );

    const [repostsCount, setRepostsCount] = useState(
        post.reposts_and_quotes_count ?? 0,
    );

    const [isReposting, setIsReposting] = useState(false);
    const [showRepostMenu, setShowRepostMenu] = useState(false);
    const [isQuoteOpen, setIsQuoteOpen] = useState(false);

    const handleRepost = async () => {
        if (isReposting) return;

        try {
            setIsReposting(true);

            const response = await repostPost(post.id);
            const data = response.data.data;

            setIsReposted(data.is_reposted);
            setRepostsCount(data.reposts_and_quotes_count);
        } catch (error) {
            console.warn("Lỗi Repost bài viết:", error);
        } finally {
            setIsReposting(false);
        }
    };

    return (
        <>
            <div className="relative">
                <button
                    onClick={() => setShowRepostMenu(!showRepostMenu)}
                    className={`flex items-center gap-1 ${
                        isReposted
                            ? "text-green-600"
                            : "text-gray-500 hover:text-green-600"
                    }`}
                >
                    <Repeat2 size={20} />
                    <span className="text-xs">{repostsCount}</span>
                </button>

                {showRepostMenu && (
                    <div className="absolute bottom-full left-0 z-20 mb-2 w-36 rounded-xl border bg-white py-2 shadow-lg">
                        <button
                            onClick={() => {
                                handleRepost();
                                setShowRepostMenu(false);
                            }}
                            className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                        >
                            Repost
                        </button>

                        <button
                            onClick={() => {
                                setIsQuoteOpen(true);
                                setShowRepostMenu(false);
                            }}
                            className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                        >
                            Quote
                        </button>
                    </div>
                )}
            </div>

            <QuoteModal
                isOpen={isQuoteOpen}
                onClose={() => setIsQuoteOpen(false)}
                post={post}
            />
        </>
    );
}

export default RepostButton;

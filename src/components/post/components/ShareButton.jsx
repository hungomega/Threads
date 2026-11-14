import { useState } from "react";
import { Send, Copy, Image, Code } from "lucide-react";
import copy from "copy-to-clipboard";
import CopyImageModal from "../CopyImageModal";
import EmbedModal from "../EmbedModal";
function ShareButton({ post }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isImageOpen, setIsImageOpen] = useState(false);
    const [isEmbedOpen, setIsEmbedOpen] = useState(false);
    const handleCopyLink = () => {
        const url = `${window.location.origin}/post/${post.id}`;
        copy(url);
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-500 hover:text-gray-900"
            >
                <Send size={20} />
            </button>

            {isOpen && (
                <div className="absolute bottom-8 left-0 z-50 w-48 rounded-xl border bg-white p-2 shadow-lg">
                    <button
                        onClick={handleCopyLink}
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-gray-100"
                    >
                        <Copy size={17} />
                        Copy link
                    </button>
                    <button
                        onClick={() => {
                            setIsOpen(false);
                            setIsImageOpen(true);
                        }}
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-gray-100"
                    >
                        <Image size={17} />
                        Copy as image
                    </button>

                    <button
                        onClick={() => {
                            setIsOpen(false);
                            setIsEmbedOpen(true);
                        }}
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-gray-100"
                    >
                        <Code size={17} />
                        Get embed code
                    </button>
                </div>
            )}
            <CopyImageModal
                isOpen={isImageOpen}
                onClose={() => setIsImageOpen(false)}
                post={post}
            />
            <EmbedModal
                isOpen={isEmbedOpen}
                onClose={() => setIsEmbedOpen(false)}
                post={post}
            />
        </div>
    );
}

export default ShareButton;

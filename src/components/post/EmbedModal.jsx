import { useState, useEffect } from "react";
import { Copy, Check } from "lucide-react";
import copy from "copy-to-clipboard";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

function EmbedModal({ isOpen, onClose, post }) {
    const [copied, setCopied] = useState(false);

    // Lấy username và tạo URL của trang Embed
    const username = post?.user?.username;
    const embedUrl = `${window.location.origin}/${username}/post/${post?.id}/embed`;

    // Tạo mã HTML để nhúng bài viết vào website khác
    const embedCode = `<iframe src="${embedUrl}" width="100%" height="500" frameborder="0"></iframe>`;

    // Sao chép mã nhúng
    const handleCopy = () => {
        const success = copy(embedCode);

        if (success) {
            setCopied(true);
        }
    };

    // Reset trạng thái Copy khi mở modal
    useEffect(() => {
        if (isOpen) {
            setCopied(false);
        }
    }, [isOpen]);

    if (!post) return null;

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="w-[calc(100vw-2rem)] max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Get embed code</DialogTitle>
                </DialogHeader>

                {/* Preview bài viết bằng iframe */}
                <div className="w-full overflow-hidden rounded-xl border">
                    <iframe
                        src={embedUrl}
                        title="Post Embed Preview"
                        className="h-[450px] w-full border-0 sm:h-[500px]"
                    />
                </div>

                {/* Hiển thị mã nhúng */}
                <div className="flex w-full min-w-0 gap-2">
                    <div className="min-w-0 flex-1 overflow-hidden rounded-lg bg-gray-100 p-3">
                        <code className="block truncate text-xs">
                            {embedCode}
                        </code>
                    </div>

                    <Button onClick={handleCopy}>
                        {copied ? <Check size={16} /> : <Copy size={16} />}
                        {copied ? "Copied" : "Copy"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default EmbedModal;

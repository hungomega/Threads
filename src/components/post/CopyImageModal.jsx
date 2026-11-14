import { useRef, useState } from "react";
import { toPng } from "html-to-image";
import { Heart, MessageCircle, Repeat2, Send } from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

function CopyImageModal({ isOpen, onClose, post }) {
    const postRef = useRef(null);
    const [showMetrics, setShowMetrics] = useState(true);
    const [background, setBackground] = useState("#ffffff");

    const handleDownload = async () => {
        if (!postRef.current) return;

        try {
            const dataUrl = await toPng(postRef.current, {
                cacheBust: true,
                pixelRatio: 2,
                backgroundColor: background,
            });

            const link = document.createElement("a");
            link.download = `post-${post.id}.png`;
            link.href = dataUrl;
            link.click();
        } catch (error) {
            console.warn("Lỗi tạo ảnh:", error);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-[650px]">
                <DialogHeader>
                    <DialogTitle>Copy as image</DialogTitle>
                </DialogHeader>

                {/* Preview */}
                <div
                    ref={postRef}
                    style={{ backgroundColor: background }}
                    className="rounded-2xl border p-6 text-gray-900"
                >
                    <div className="mb-4 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-lg font-semibold text-white">
                            H
                        </div>
                        <span className="font-semibold">hungomega</span>
                    </div>

                    <p className="text-sm leading-6">{post.content}</p>

                    {showMetrics && (
                        <div className="mt-5 flex gap-5 text-gray-600">
                            <span className="flex items-center gap-1">
                                <Heart size={18} />
                                {post.likes_count ?? 0}
                            </span>
                            <span className="flex items-center gap-1">
                                <MessageCircle size={18} />
                                {post.replies_count ?? 0}
                            </span>
                            <span className="flex items-center gap-1">
                                <Repeat2 size={18} />
                                {post.reposts_and_quotes_count ?? 0}
                            </span>
                            <Send size={18} />
                        </div>
                    )}
                </div>

                {/* Options */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setBackground("#ffffff")}
                            className="h-7 w-7 rounded-full border bg-white"
                        />
                        <button
                            onClick={() => setBackground("#fdf2f2")}
                            className="h-7 w-7 rounded-full border bg-red-50"
                        />

                        <label className="flex items-center gap-2 text-sm">
                            <input
                                type="checkbox"
                                checked={showMetrics}
                                onChange={(e) =>
                                    setShowMetrics(e.target.checked)
                                }
                            />
                            Show metrics
                        </label>
                    </div>

                    <Button onClick={handleDownload}>Download image</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default CopyImageModal;

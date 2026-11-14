import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Image, Film, Smile, BarChart3, MapPin } from "lucide-react";

import {
    searchTopics,
    createReply,
    getReplies,
} from "../../services/postService.js";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

function ReplyModal({ isOpen, onClose, post, onReplySuccess }) {
    // ==================================================
    // 1. STATE VÀ REF
    // ==================================================

    const [content, setContent] = useState("");
    const [media, setMedia] = useState([]);
    const [replies, setReplies] = useState([]);

    const [topicName, setTopicName] = useState("");
    const [showTopicInput, setShowTopicInput] = useState(false);

    const [replyPermission, setReplyPermission] = useState("everyone");
    const [showReplyOptions, setShowReplyOptions] = useState(false);

    const [isSubmitting, setIsSubmitting] = useState(false);

    // Tham chiếu đến input chọn ảnh/video ẩn
    const fileInputRef = useRef(null);

    // Lấy thông tin người dùng hiện tại từ Redux
    const currentUser = useSelector((state) => state.user.user);

    // ==================================================
    // 2. DỮ LIỆU CẤU HÌNH
    // ==================================================

    // Các lựa chọn quyền trả lời bài viết
    const replyOptions = [
        { value: "everyone", label: "Anyone" },
        { value: "followers", label: "Your followers" },
        { value: "following", label: "Profiles you follow" },
        { value: "mentions", label: "Only mentioned people" },
    ];

    // Lấy nhãn tương ứng với quyền trả lời đang chọn
    const selectedReplyOption = replyOptions.find(
        (option) => option.value === replyPermission,
    );

    // ==================================================
    // 3. CÁC HÀM XỬ LÝ
    // ==================================================

    // Đóng modal và reset dữ liệu nhập
    const handleClose = () => {
        setContent("");
        setMedia([]);
        setTopicName("");
        setShowTopicInput(false);
        setShowReplyOptions(false);
        setReplyPermission("everyone");

        onClose();
    };

    // Tìm kiếm topic theo tên người dùng nhập
    const handleSearchTopic = async () => {
        if (!topicName.trim()) return;

        try {
            const response = await searchTopics(topicName.trim());

            // Kiểm tra kết quả tìm kiếm topic
            console.warn("Search Topics:", response.data);
        } catch (error) {
            console.warn("Search Topics failed:", error.response?.data);
        }
    };

    // Chọn ảnh/video từ máy tính
    const handleSelectMedia = (e) => {
        const files = Array.from(e.target.files);

        // Thêm các file vừa chọn vào danh sách hiện tại
        setMedia((prevMedia) => [...prevMedia, ...files]);

        // Reset input để có thể chọn lại cùng một file
        e.target.value = "";
    };

    // Xóa một ảnh/video khỏi danh sách đã chọn
    const handleRemoveMedia = (index) => {
        setMedia((prevMedia) => prevMedia.filter((_, i) => i !== index));
    };

    // Lấy danh sách reply của bài viết từ API
    const handleGetReplies = async () => {
        try {
            const response = await getReplies(post.id, {
                page: 1,
                per_page: 20,
            });

            setReplies(response.data.data);
        } catch (error) {
            console.warn("Get Replies failed:", error.response?.data || error);
        }
    };

    // Gửi reply lên server
    const handleSubmitReply = async () => {
        // Không gửi nếu nội dung rỗng hoặc đang gửi request
        if (!content.trim() || isSubmitting) return;

        try {
            setIsSubmitting(true);

            const response = await createReply(post.id, {
                content: content.trim(),
                reply_permission: replyPermission,
                topic_name: topicName.trim(),
                media: media,
            });

            console.warn("Create Reply:", response.data);

            // Báo cho component cha cập nhật số lượng reply
            onReplySuccess?.(post.id);

            // Đóng modal sau khi gửi thành công
            handleClose();
        } catch (error) {
            console.warn("Create Reply failed:", error.response?.data || error);
        } finally {
            // Luôn kết thúc trạng thái loading dù thành công hay thất bại
            setIsSubmitting(false);
        }
    };

    // ==================================================
    // 4. EFFECT
    // ==================================================

    // Tự động lấy danh sách reply khi modal được mở
    useEffect(() => {
        if (isOpen && post?.id) {
            handleGetReplies();
        }
    }, [isOpen, post?.id]);

    // ==================================================
    // 5. GIAO DIỆN
    // ==================================================

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
            <DialogContent className="sm:max-w-[600px] max-h-[85vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Reply</DialogTitle>
                </DialogHeader>

                {/* ======================================
                    5.1. THÔNG TIN NGƯỜI DÙNG VÀ BÀI VIẾT GỐC
                ====================================== */}

                <div className="flex gap-3">
                    {currentUser?.avatar_url ? (
                        <img
                            src={currentUser.avatar_url}
                            alt="Avatar"
                            className="h-10 w-10 rounded-full object-cover"
                        />
                    ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-sm font-semibold text-gray-600">
                            {currentUser?.username?.charAt(0).toUpperCase()}
                        </div>
                    )}

                    <div className="min-w-0 flex-1">
                        <span className="font-semibold">
                            {currentUser?.username}
                        </span>

                        <div className="my-5 border-l-2 pl-4">
                            {/* Nội dung bài viết đang được trả lời */}
                            <p className="mt-2 text-sm">{post.content}</p>

                            {/* ======================================
                                5.2. DANH SÁCH REPLY
                            ====================================== */}

                            <div className="mt-4 space-y-4">
                                {replies.map((reply) => (
                                    <div key={reply.id} className="flex gap-3">
                                        {reply.user?.avatar_url ? (
                                            <img
                                                src={reply.user.avatar_url}
                                                alt="Avatar"
                                                className="h-9 w-9 rounded-full object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-200 text-sm font-semibold text-gray-600">
                                                {reply.user?.username
                                                    ?.charAt(0)
                                                    .toUpperCase() || "U"}
                                            </div>
                                        )}

                                        <div className="min-w-0 flex-1">
                                            <span className="font-semibold">
                                                {reply.user?.username}
                                            </span>

                                            <p className="mt-1 text-sm">
                                                {reply.content}
                                            </p>

                                            {/* Hiển thị ảnh/video đính kèm trong reply */}
                                            {reply.media_urls?.length > 0 && (
                                                <div className="mt-2 flex flex-wrap gap-2">
                                                    {reply.media_urls.map(
                                                        (url, index) => (
                                                            <div key={index}>
                                                                {/\.(mp4|mov)$/i.test(
                                                                    url,
                                                                ) ? (
                                                                    <video
                                                                        src={
                                                                            url
                                                                        }
                                                                        controls
                                                                        className="max-h-64 max-w-full rounded-lg"
                                                                    />
                                                                ) : (
                                                                    <img
                                                                        src={
                                                                            url
                                                                        }
                                                                        alt="Reply media"
                                                                        className="max-h-64 max-w-full rounded-lg object-cover"
                                                                    />
                                                                )}
                                                            </div>
                                                        ),
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* ======================================
                                5.3. FORM NHẬP REPLY
                            ====================================== */}

                            <span className="text-sm font-medium">
                                Replying to @{post.user?.username}
                            </span>

                            <Textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder={`Reply to @${post.user?.username || "user"}...`}
                                className="mt-2 min-h-[100px] resize-none border-0 shadow-none"
                            />

                            {/* Xem trước ảnh/video vừa chọn */}
                            {media.length > 0 && (
                                <div className="mt-3 flex flex-wrap gap-3">
                                    {media.map((file, index) => (
                                        <div key={index} className="relative">
                                            {file.type.startsWith("image/") ? (
                                                <img
                                                    src={URL.createObjectURL(
                                                        file,
                                                    )}
                                                    alt="Preview"
                                                    className="h-24 w-24 rounded-lg object-cover"
                                                />
                                            ) : (
                                                <video
                                                    src={URL.createObjectURL(
                                                        file,
                                                    )}
                                                    controls
                                                    className="h-24 w-24 rounded-lg object-cover"
                                                />
                                            )}

                                            {/* Xóa file khỏi danh sách */}
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleRemoveMedia(index)
                                                }
                                                className="absolute -right-2 -top-2 rounded-full bg-black px-2 text-white"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Input chọn ảnh/video được ẩn khỏi giao diện */}
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*,video/*"
                                multiple
                                hidden
                                onChange={handleSelectMedia}
                            />

                            {/* ======================================
                                5.4. THANH CÔNG CỤ
                            ====================================== */}

                            <div className="flex items-center gap-4 py-3 text-gray-500">
                                <button
                                    type="button"
                                    title="Upload image/video"
                                    onClick={() =>
                                        fileInputRef.current?.click()
                                    }
                                >
                                    <Image size={20} />
                                </button>

                                <button type="button" title="Upload GIF">
                                    <Film size={20} />
                                </button>

                                <button type="button" title="Choose emoji">
                                    <Smile size={20} />
                                </button>

                                <button type="button" title="Create poll">
                                    <BarChart3 size={20} />
                                </button>

                                <button type="button" title="Add location">
                                    <MapPin size={20} />
                                </button>
                            </div>

                            {/* ======================================
                                5.5. TOPIC
                            ====================================== */}

                            <div className="mt-2">
                                {!showTopicInput ? (
                                    <button
                                        type="button"
                                        onClick={() => setShowTopicInput(true)}
                                        className="text-sm text-gray-500 hover:text-black"
                                    >
                                        Add a topic
                                    </button>
                                ) : (
                                    <input
                                        type="text"
                                        value={topicName}
                                        onChange={(e) =>
                                            setTopicName(e.target.value)
                                        }
                                        onKeyDown={(e) => {
                                            // Nhấn Enter để tìm kiếm topic
                                            if (e.key === "Enter") {
                                                e.preventDefault();
                                                handleSearchTopic();
                                            }
                                        }}
                                        placeholder="Add a topic..."
                                        className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-400"
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* ======================================
                    5.6. CHỌN QUYỀN TRẢ LỜI
                ====================================== */}

                {showReplyOptions && (
                    <div className="mb-4 rounded-xl border p-3">
                        <p className="mb-3 text-sm font-semibold">
                            Who can reply?
                        </p>

                        {replyOptions.map((option) => (
                            <button
                                key={option.value}
                                type="button"
                                onClick={() => {
                                    // Cập nhật quyền và đóng bảng lựa chọn
                                    setReplyPermission(option.value);
                                    setShowReplyOptions(false);
                                }}
                                className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm hover:bg-gray-100"
                            >
                                {option.label}

                                {replyPermission === option.value && (
                                    <span className="font-bold">✓</span>
                                )}
                            </button>
                        ))}
                    </div>
                )}

                {/* ======================================
                    5.7. FOOTER VÀ NÚT GỬI REPLY
                ====================================== */}

                <div className="flex items-center justify-between border-t pt-4">
                    <button
                        type="button"
                        onClick={() => setShowReplyOptions((prev) => !prev)}
                        className="text-xs font-medium text-gray-500 hover:text-black"
                    >
                        {selectedReplyOption?.label}
                    </button>

                    <Button
                        disabled={!content.trim() || isSubmitting}
                        onClick={handleSubmitReply}
                        className="rounded-full"
                    >
                        {isSubmitting ? "Replying..." : "Reply"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default ReplyModal;

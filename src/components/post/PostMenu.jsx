import { useState, useEffect } from "react";
import BlockModal from "./BlockModal";
import ReportModal from "./ReportModal";
import copy from "copy-to-clipboard";
import DeleteModal from "./DeleteModal";
import EmbedModal from "./EmbedModal";
import {
    MoreHorizontal,
    Bookmark,
    EyeOff,
    VolumeX,
    Shield,
    Ban,
    Flag,
    Copy,
    Pencil,
    Trash2,
    Code,
} from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

function PostMenu({
    post,
    currentUser,
    onSavePost,
    onNotInterested,
    onMuteUser,
    onRestrictUser,
    onReportPost,
    onBlockUser,
    onDeletePost,
}) {
    const isOwner = post.user_id === currentUser?.id;
    const [isBlockOpen, setIsBlockOpen] = useState(false);
    const [isReportOpen, setIsReportOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [isEmbedOpen, setIsEmbedOpen] = useState(false);

    const handleConfirmDelete = async () => {
        const success = await onDeletePost(post.id);

        if (success) {
            setIsDeleteOpen(false);
        }
    };
    // Copy Link
    const [toast, setToast] = useState("");

    const handleCopyLink = () => {
        const postUrl = `${window.location.origin}/post/${post.id}`;

        copy(postUrl);
        setToast("Link copied to clipboard");
    };

    const handleConfirmBlock = async () => {
        await onBlockUser(post.user_id);
        setIsBlockOpen(false);
    };
    const handleSubmitReport = async (data) => {
        const success = await onReportPost(post.id, data);

        if (success) {
            setIsReportOpen(false);
        }
    };
    useEffect(() => {
        if (!toast) return;

        const timer = setTimeout(() => {
            setToast("");
        }, 1500);

        return () => clearTimeout(timer);
    }, [toast]);

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger className="rounded-full p-2 text-gray-500 hover:bg-gray-100">
                    <MoreHorizontal size={20} />
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem onClick={() => onSavePost(post.id)}>
                        <Bookmark size={16} />
                        {post.is_saved_by_auth ? "Unsave" : "Save"}
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={() => onNotInterested(post.id)}>
                        <EyeOff size={16} />
                        Not interested
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={() => onMuteUser(post.user_id)}>
                        <VolumeX size={16} />
                        Mute
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        onClick={() => onRestrictUser(post.user_id)}
                    >
                        <Shield size={16} />
                        Restrict
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => setIsBlockOpen(true)}
                    >
                        <Ban size={16} />
                        Block
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => setIsReportOpen(true)}
                    >
                        <Flag size={16} />
                        Report
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={handleCopyLink}>
                        <Copy size={16} />
                        Copy link
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => {
                            setIsEmbedOpen(true);
                        }}
                    >
                        <Code size={16} />
                        Embed
                    </DropdownMenuItem>
                    {isOwner && (
                        <>
                            <DropdownMenuSeparator />

                            <DropdownMenuItem>
                                <Pencil size={16} />
                                Edit
                            </DropdownMenuItem>

                            <DropdownMenuItem
                                className="text-red-600"
                                onClick={() => setIsDeleteOpen(true)}
                            >
                                <Trash2 size={16} />
                                Delete
                            </DropdownMenuItem>
                        </>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
            <BlockModal
                isOpen={isBlockOpen}
                onClose={() => setIsBlockOpen(false)}
                onConfirm={handleConfirmBlock}
            />
            <ReportModal
                isOpen={isReportOpen}
                onClose={() => setIsReportOpen(false)}
                onSubmit={handleSubmitReport}
            />
            <DeleteModal
                isOpen={isDeleteOpen}
                onClose={() => setIsDeleteOpen(false)}
                onConfirm={handleConfirmDelete}
            />
            {toast && (
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 rounded-lg bg-gray-900 px-4 py-3 text-sm text-white shadow-lg">
                    {toast}
                </div>
            )}{" "}
            <EmbedModal
                isOpen={isEmbedOpen}
                onClose={() => setIsEmbedOpen(false)}
                post={post}
            />
        </>
    );
}
export default PostMenu;

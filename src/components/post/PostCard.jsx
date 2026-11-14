import InteractionBar from "./InteractionBar";
import PostMenu from "./PostMenu";

function PostCard({
    post,
    currentUser,
    onReplySuccess,
    onSavePost,
    onNotInterested,
    onMuteUser,
    onRestrictUser,
    onBlockUser,
    onReportPost,
    onDeletePost,
    isEmbed = false,
}) {
    // Chuyển thời gian API thành định dạng dễ đọc
    const createdAt = post.created_at
        ? new Date(post.created_at).toLocaleString("vi-VN")
        : "";

    return (
        <article className="w-full border-b border-gray-200 px-4 py-5">
            <div className="flex gap-3">
                {/* Avatar người đăng */}
                {post.user?.avatar_url ? (
                    <img
                        src={post.user.avatar_url}
                        alt="Avatar"
                        className="h-10 w-10 shrink-0 rounded-full object-cover"
                    />
                ) : (
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-200 font-semibold">
                        {post.user?.username?.charAt(0).toUpperCase() || "U"}
                    </div>
                )}

                <div className="min-w-0 flex-1">
                    {/* Username, thời gian và menu */}
                    <div className="mb-2 flex items-center justify-between gap-2">
                        <div className="flex min-w-0 flex-wrap items-center gap-2">
                            <span className="font-semibold">
                                {post.user?.username}
                            </span>

                            <span className="text-xs text-gray-500">
                                {createdAt}
                            </span>
                        </div>

                        {/* Embed không hiển thị menu bài viết */}
                        {!isEmbed && (
                            <PostMenu
                                post={post}
                                currentUser={currentUser}
                                onSavePost={onSavePost}
                                onNotInterested={onNotInterested}
                                onMuteUser={onMuteUser}
                                onRestrictUser={onRestrictUser}
                                onBlockUser={onBlockUser}
                                onReportPost={onReportPost}
                                onDeletePost={onDeletePost}
                            />
                        )}
                    </div>

                    {/* Nội dung bài viết */}
                    <p className="whitespace-pre-wrap break-words text-sm leading-6">
                        {post.content}
                    </p>

                    {/* Hiển thị ảnh/video đính kèm */}
                    {post.media_urls?.length > 0 && (
                        <div className="mt-3 grid gap-2">
                            {post.media_urls.map((url, index) => {
                                // Kiểm tra file có phải video không
                                const isVideo =
                                    /\.(mp4|mov|webm)(\?.*)?$/i.test(url);

                                return isVideo ? (
                                    <video
                                        key={index}
                                        src={url}
                                        controls
                                        className="max-h-[500px] w-full rounded-xl object-contain"
                                    />
                                ) : (
                                    <img
                                        key={index}
                                        src={url}
                                        alt="Post media"
                                        className="max-h-[500px] w-full rounded-xl object-contain"
                                    />
                                );
                            })}
                        </div>
                    )}

                    {/* Thanh tương tác */}
                    <InteractionBar
                        post={post}
                        onReplySuccess={onReplySuccess}
                    />

                    {/* Chỉ hiển thị liên kết này trong Embed */}
                    {isEmbed && (
                        <a
                            href={`/${post.user?.username}/post/${post.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-3 inline-block text-sm font-semibold hover:underline"
                        >
                            View on Threads ↗
                        </a>
                    )}
                </div>
            </div>
        </article>
    );
}

export default PostCard;

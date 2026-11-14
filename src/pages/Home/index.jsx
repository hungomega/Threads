import FeedHeader from "./components/FeedHeader.jsx";
import PostCard from "../../components/post/PostCard.jsx";
import LoginPanel from "../../components/LoginPanel/index.jsx";
import { useState, useEffect } from "react";
import { getFeed } from "../../services/postService.js";
import useInfiniteScroll from "../../hooks/useInfiniteScroll.js";
import { useSelector } from "react-redux";
import { handleSavePost } from "./components/post-actions/save.jsx";
import { handleNotInterested } from "./components/post-actions/interested.jsx";
import { handleMuteUser } from "./components/post-actions/mute.jsx";
import { handleRestrictUser } from "./components/post-actions/restrict.jsx";
import { handleBlockUser } from "./components/post-actions/block.jsx";
import { handleReportPost } from "./components/post-actions/report.jsx";
import { handleDeletePost } from "./components/post-actions/delete.jsx";

function Home() {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const currentUser = useSelector((state) => state.user.user);
    // Cập nhật số lượng reply của bài viết
    const handleReplySuccess = (postId) => {
        setPosts((prevPosts) =>
            prevPosts.map((post) =>
                post.id === postId
                    ? { ...post, replies_count: (post.replies_count ?? 0) + 1 }
                    : post,
            ),
        );
    };
    useEffect(() => {
        const fetchPosts = async () => {
            setIsLoading(true);
            setError("");

            try {
                const response = await getFeed();

                // Lưu danh sách bài viết
                setPosts(response.data.data);

                // Lưu trang hiện tại từ API
                setCurrentPage(response.data.pagination.current_page);

                // Kiểm tra còn trang tiếp theo không
                setHasMore(
                    response.data.pagination.current_page <
                        response.data.pagination.last_page,
                );
            } catch (error) {
                setError("Không thể tải danh sách bài viết");
                console.warn("Lỗi tải bài viết:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPosts();
    }, []);

    // Tạo hàm tải bài viết tiếp theo
    const loadMorePosts = async () => {
        // Không tải nếu đang tải hoặc đã hết bài viết
        if (isLoading || !hasMore) return;

        try {
            setIsLoading(true);

            // Tăng số trang lên 1
            const nextPage = currentPage + 1;

            // Gọi API lấy trang tiếp theo
            const response = await getFeed({
                page: nextPage,
            });

            // Lấy danh sách bài viết mới
            const newPosts = response.data.data;

            // Nối bài viết mới vào danh sách cũ
            setPosts((prevPosts) => [...prevPosts, ...newPosts]);

            // Cập nhật trang hiện tại
            setCurrentPage(response.data.pagination.current_page);

            // Kiểm tra còn trang tiếp theo không
            setHasMore(
                response.data.pagination.current_page <
                    response.data.pagination.last_page,
            );
        } catch (error) {
            console.warn("Lỗi tải thêm bài viết:", error);
        } finally {
            setIsLoading(false);
        }
    };
    const targetRef = useInfiniteScroll(loadMorePosts, hasMore && !isLoading);

    return (
        <div className="mx-auto flex min-h-screen max-w-[1100px] justify-center gap-8 px-4">
            {/* Main Feed */}
            <div className="min-w-0 w-full max-w-[630px] border-x border-gray-200">
                <FeedHeader />

                {isLoading && (
                    <p className="py-5 text-center text-gray-500">
                        Đang tải bài viết...
                    </p>
                )}

                {error && (
                    <p className="py-5 text-center text-red-500">{error}</p>
                )}

                {posts.map((post) => (
                    <PostCard
                        key={post.id}
                        post={post}
                        currentUser={currentUser}
                        onSavePost={(postId) =>
                            handleSavePost(postId, setPosts)
                        }
                        onNotInterested={(postId) =>
                            handleNotInterested(postId, setPosts)
                        }
                        onMuteUser={(userId) =>
                            handleMuteUser(userId, setPosts)
                        }
                        onRestrictUser={(userId) => handleRestrictUser(userId)}
                        onBlockUser={(userId) =>
                            handleBlockUser(userId, setPosts)
                        }
                        onReportPost={(postId, data) =>
                            handleReportPost(postId, data)
                        }
                        onDeletePost={(postId) =>
                            handleDeletePost(postId, setPosts)
                        }
                        onReplySuccess={handleReplySuccess}
                    />
                ))}

                {/* Phần tử theo dõi cuối danh sách */}
                <div ref={targetRef} className="h-10" />

                {isLoading && posts.length > 0 && (
                    <p className="py-5 text-center text-gray-500">
                        Đang tải thêm bài viết...
                    </p>
                )}
            </div>

            {/* Right Sidebar */}
            <div className="hidden shrink-0 xl:block">
                <LoginPanel />
            </div>
        </div>
    );
}
export default Home;

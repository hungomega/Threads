import { useEffect, useState } from "react";
import { useParams } from "react-router";

import { getPost } from "../services/postService";
import PostCard from "../components/post/PostCard";

function Embed() {
    // Lấy postId từ URL thông qua React Router
    // Ví dụ: /dovanvan/post/12/embed => postId = "12"
    const { postId } = useParams();

    // State lưu dữ liệu bài viết sau khi gọi API
    const [post, setPost] = useState(null);

    // State xác định API đang trong quá trình tải dữ liệu hay không
    const [isLoading, setIsLoading] = useState(true);

    // State lưu thông báo lỗi nếu không lấy được bài viết
    const [error, setError] = useState("");

    // useEffect thực thi khi component được render
    // hoặc khi postId thay đổi
    useEffect(() => {
        // Hàm bất đồng bộ dùng để gọi API lấy thông tin bài viết
        const fetchPost = async () => {
            try {
                // Bắt đầu tải dữ liệu và xóa lỗi cũ (nếu có)
                setIsLoading(true);
                setError("");

                // Gọi API Get Single Post với ID lấy từ URL
                const response = await getPost(postId);

                // Lấy dữ liệu bài viết từ response và lưu vào state
                // response.data.data là object chứa thông tin bài viết
                setPost(response.data.data);
            } catch (error) {
                // Nếu API thất bại, ghi nhận lỗi và hiển thị thông báo
                console.warn("Get Single Post failed:", error);
                setError("Không thể tải bài viết.");
            } finally {
                // Luôn kết thúc trạng thái loading dù API thành công hay thất bại
                setIsLoading(false);
            }
        };

        // Chỉ gọi API khi đã lấy được postId từ URL
        if (postId) {
            fetchPost();
        }
    }, [postId]); // Chạy lại effect khi postId thay đổi

    // Nếu đang tải dữ liệu, hiển thị giao diện Loading
    if (isLoading) {
        return (
            <div className="p-5 text-center text-sm text-gray-500">
                Loading post...
            </div>
        );
    }

    // Nếu có lỗi hoặc không tìm thấy bài viết, hiển thị thông báo
    if (error || !post) {
        return (
            <div className="p-5 text-center text-sm text-red-500">
                {error || "Post not found."}
            </div>
        );
    }

    // Khi lấy dữ liệu thành công, hiển thị PostCard
    // isEmbed=true giúp PostCard nhận biết đang được sử dụng trong trang Embed
    return (
        <div className="mx-auto w-full max-w-[600px] bg-white">
            <PostCard post={post} isEmbed />
        </div>
    );
}

export default Embed;

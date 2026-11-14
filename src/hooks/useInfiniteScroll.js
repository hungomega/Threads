import { useEffect, useRef } from "react";

function useInfiniteScroll(onLoadMore, enabled = true) {
    // Tham chiếu đến phần tử cuối danh sách
    const targetRef = useRef(null);

    // Lưu callback mới nhất
    const callbackRef = useRef(onLoadMore);

    // Cập nhật callback khi onLoadMore thay đổi
    useEffect(() => {
        callbackRef.current = onLoadMore;
    }, [onLoadMore]);

    // Theo dõi phần tử cuối danh sách
    useEffect(() => {
        const target = targetRef.current;

        // Không theo dõi nếu không có phần tử hoặc đã tắt
        if (!target || !enabled) return;

        // Tạo bộ theo dõi phần tử xuất hiện trên màn hình
        const observer = new IntersectionObserver(
            (entries) => {
                // Gọi hàm tải thêm khi phần tử xuất hiện
                if (entries[0].isIntersecting) {
                    callbackRef.current();
                }
            },
            {
                rootMargin: "200px", // Tải trước khi chạm đến cuối
            },
        );

        // Bắt đầu theo dõi phần tử
        observer.observe(target);

        // Dừng theo dõi khi component bị hủy
        return () => {
            observer.disconnect();
        };
    }, [enabled]);

    // Trả ref để gắn vào phần tử cuối danh sách
    return targetRef;
}

export default useInfiniteScroll;
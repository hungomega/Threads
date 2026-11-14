import axiosClient from "./axios";
// Lấy danh sách bài viết trên bảng tin
export const getFeed = (params = {}) => {
    return axiosClient.get("/posts/feed", {
        params: {
            type: "for_you",
            page: 1,
            per_page: 20,
            ...params,
        },
    });
};

// hàm gọi API Like / Unlike
export const likePost = (postId) => {
    return axiosClient.post(`/posts/${postId}/like`);
};

// Repost / Unrepost bài viết
export const repostPost = (postId) => {
    return axiosClient.post(`/posts/${postId}/repost`);
};

// Quote Post
export const quotePost = (postId, formData) => {
    return axiosClient.post(`/posts/${postId}/quote`, formData);
};

// Save / Unsave Post
export const savePost = (postId) => {
    return axiosClient.post(`/posts/${postId}/save`);
};

// Hide Post (Not interested)
export const hidePost = (postId) => {
    return axiosClient.post(`/posts/${postId}/hide`);
};

// Mute User
export const muteUser = (userId) => {
    return axiosClient.post(`/users/${userId}/mute`);
};

// Restrict User
export const restrictUser = (userId) => {
    return axiosClient.post(`/users/${userId}/restrict`);
};

// Block User
export const blockUser = (userId) => {
    return axiosClient.post(`/users/${userId}/block`);
};

// Report Post
export const reportPost = (postId, data) => {
    return axiosClient.post(`/posts/${postId}/report`, data);
};

// Update Post
export const updatePost = (postId, formData) => {
    formData.append("_method", "PUT");
    return axiosClient.post(`/posts/${postId}`, formData);
};

// Delete Post
export const deletePost = (postId) => {
    return axiosClient.post(`/posts/${postId}`, {
        _method: "DELETE",
    });
};
// Search Topics
export const searchTopics = (query) => {
    return axiosClient.get("/topics/search", {
        params: {
            q: query, // từ khóa người dùng nhập. Ví dụ nhập React → API nhận GET /topics/search?q=React.
        },
    });
};

// Tạo reply cho một bài viết
export const createReply = (postId, data) => {
    // Tạo FormData vì API nhận multipart/form-data
    const formData = new FormData();

    formData.append("content", data.content);
    formData.append("reply_permission", data.reply_permission);

    // Chỉ gửi topic nếu người dùng có nhập
    if (data.topic_name) {
        formData.append("topic_name", data.topic_name);
    }

    // Gửi các file ảnh/video nếu có
    if (data.media?.length) {
        data.media.forEach((file) => {
            formData.append("media[]", file);
        });
    }

    // Gọi API tạo reply
    return axiosClient.post(`/posts/${postId}/reply`, formData);
};

// Lấy danh sách reply của một bài viết
export const getReplies = (postId, params = {}) => {
    return axiosClient.get(`/posts/${postId}/replies`, {
        params,
    });
};

// Lấy thông tin chi tiết một bài viết theo ID
export const getPost = (postId) => {
    return axiosClient.get(`/posts/${postId}`);
};
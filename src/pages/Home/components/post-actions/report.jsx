import { reportPost } from "../../../../services/postService.js";

export const handleReportPost = async (postId, data) => {
    try {
        const response = await reportPost(postId, data);

        if (response.data.success) {
            return {
                success: true,
                message: response.data.message,
            };
        }

        return {
            success: false,
            message: response.data.message,
        };
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || "Report failed",
        };
    }
};

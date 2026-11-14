import { restrictUser } from "../../../../services/postService.js";

export const handleRestrictUser = async (userId) => {
    try {
        await restrictUser(userId);

        console.warn("Restrict user successfully");
    } catch (error) {
        console.warn("Restrict user failed:", error);
    }
};

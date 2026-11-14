import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",

    initialState: {
        // Trạng thái ban đầu, chưa có người dùng đăng nhập.
        user: null,
        isAuthenticated: false,
        isInitialized: false,
    },

    reducers: {
        setUser: (state, action) => {
            // Lưu thông tin người dùng sau khi đăng nhập.
            state.user = action.payload;
            state.isAuthenticated = true;
        },

        clearUser: (state) => {
            // Xóa thông tin người dùng khi đăng xuất.
            state.user = null;
            state.isAuthenticated = false;
        },

        setAuthInitialized: (state) => {
            // Đánh dấu ứng dụng đã kiểm tra trạng thái đăng nhập.
            state.isInitialized = true;
        },
    },
});
export const { setUser, clearUser, setAuthInitialized } = userSlice.actions;

export default userSlice.reducer;
import { configureStore } from "@reduxjs/toolkit"; // Dùng để tạo Redux Store.
import userReducer from "./slices/userSlice";

const store = configureStore({
    // Đăng ký Reducer vào Store
    reducer: {
        user: userReducer,
    },
});

export default store;
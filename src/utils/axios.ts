import axios from "axios";
import { getToken } from "./nextCookies";

const api = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1`
})

api.interceptors.request.use(async (config) => {
    const token = await getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers["ngrok-skip-browser-warning"] = "69420";
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api


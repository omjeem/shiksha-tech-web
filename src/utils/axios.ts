import axios from "axios";

const api = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1`,
    withCredentials : true
})

api.interceptors.request.use(async (config) => {
    config.headers["ngrok-skip-browser-warning"] = "69420";
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api


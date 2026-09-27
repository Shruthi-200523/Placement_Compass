import axios from "axios";

axios.interceptors.request.use(
    (config) => {

        const user = JSON.parse(
            localStorage.getItem("user")
        );

        const token = user?.token;

        if (token) {
            config.headers.Authorization =
                `Bearer ${token}`;
        }

        return config;
    },

    (error) => Promise.reject(error)
);

export default axios;
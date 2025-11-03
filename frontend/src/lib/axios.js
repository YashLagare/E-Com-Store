import axios from 'axios';

let redirectingToLogin = false;

const instance = axios.create({
    baseURL: import.meta.mode === "development" ? "http://localhost:5000/api" : "/api",
    withCredentials: true,
});
export default instance;

import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:4000/api/soap",
    headers: {"Content-Type": "text/xml"}
})
import axios from "axios";

export const api = axios.create(
    {
        baseURL: "https://6852a7210594059b23ce85a2.mockapi.io"
    }
)
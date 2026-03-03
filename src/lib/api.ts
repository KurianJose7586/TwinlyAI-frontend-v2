// src/lib/api.ts
// Central axios instance that auto-attaches the JWT Bearer token to every request.

import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const api = axios.create({
    baseURL: `${API_BASE_URL}/api/v1`,
    headers: {
        "Content-Type": "application/json",
    },
});

// Request interceptor — attach token if present
api.interceptors.request.use(
    (config) => {
        if (typeof window !== "undefined") {
            const token = localStorage.getItem("twinly_token");
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor — auto-logout on 401
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401 && typeof window !== "undefined") {
            // Must clear the cookie as well to prevent middleware redirect loops
            document.cookie = `twinly_token=; path=/; SameSite=Lax; max-age=0`;
            localStorage.removeItem("twinly_token");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default api;

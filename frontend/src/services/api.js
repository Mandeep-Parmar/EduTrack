import axios from "axios";

const rawBackendUrl = (import.meta.env.VITE_BACKEND_URL || "").trim().replace(/\/+$/, "");
const normalizedBaseUrl = rawBackendUrl
  ? rawBackendUrl.endsWith("/api")
    ? rawBackendUrl
    : `${rawBackendUrl}/api`
  : "/api";

const API = axios.create({
  baseURL: normalizedBaseUrl,
});

API.interceptors.request.use((req) => {
  const userInfo = localStorage.getItem("userInfo");
  if (userInfo) {
    const parsedInfo = JSON.parse(userInfo);
    req.headers.Authorization = `Bearer ${parsedInfo.token}`;
  }
  return req;
});

export default API;

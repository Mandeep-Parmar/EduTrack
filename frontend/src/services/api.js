import axios from "axios";

const API = axios.create({
  baseURL: "https://edutrack-backend-fqdp.onrender.com/",
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

import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Attach token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

// Specific API helpers
export const getAccountantById = (id) =>
  API.get(`/accountants/${id}`);


// ➤ Add to shortlist
export const addToShortlist = (accountantId) =>
  API.post("/shortlist", { accountantId });

// ➤ Get shortlist
export const getShortlist = () =>
  API.get("/shortlist");

// ➤ Remove from shortlist
export const removeFromShortlist = (accountantId) =>
  API.delete(`/shortlist/${accountantId}`);

export const getRecommendations = () =>
  API.get("/recommendations");

export default API;
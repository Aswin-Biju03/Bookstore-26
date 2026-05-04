import apiService from "../api/apiService";

export const registerAPI = async (userData) => {
  return await apiService("POST", "/register", userData);
};

export const loginAPI = async (userData) => {
  return await apiService("POST", "/login", userData);
};

export const googleLoginAPI = async (userData) => {
  return await apiService("POST", "/google-login", userData);
};

export const userUpdateAPI = async (userId, userData) => {
  return await apiService("PUT", `/user/${userId}`, userData);
};

export const addBookAPI = async (bookDetails) => {
  return await apiService("POST", `/books`, bookDetails);
};

export const getHomePageBooksAPI = async () => {
  return await apiService("GET", `/home-books`, {});
};

export const getAllBooksAPI = async () => {
  return await apiService("GET", `/all-books`, {});
};

export const getAllUserBooksAPI = async () => {
  return await apiService("GET", `/user-books`, {});
};

export const getAllUserBoughtBooksAPI = async () => {
  return await apiService("GET", `/bought-books`, {});
};


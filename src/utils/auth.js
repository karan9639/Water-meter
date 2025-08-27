import { loginUser, logoutUser } from "./api.js";

const AUTH_TOKEN_KEY = "water_app_auth_token";
const USER_DATA_KEY = "water_app_user_data";

export const login = async (credentials) => {
  try {
    const response = await loginUser(credentials);
    console.log("[v0] Login API response:", response); // Debug log

    if (response.success && response.statusCode === 200) {
      // Store user data and create a simple token (since API doesn't return one)
      const token = btoa(
        JSON.stringify({ email: credentials.email, timestamp: Date.now() })
      );
      localStorage.setItem(AUTH_TOKEN_KEY, token);
      localStorage.setItem(USER_DATA_KEY, JSON.stringify(response.data));
      return { success: true };
    }
    return { success: false, error: response.message || "Invalid credentials" };
  } catch (error) {
    console.error("[v0] Login error:", error); // Debug log
    return { success: false, error: error.message };
  }
};

export const logout = async () => {
  try {
    await logoutUser();
  } catch (error) {
    console.error("Logout API call failed:", error);
  } finally {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(USER_DATA_KEY); // Added to remove user data on logout
  }
};

export const isAuthenticated = () => {
  return localStorage.getItem(AUTH_TOKEN_KEY) !== null;
};

export const getUserData = () => {
  const userData = localStorage.getItem(USER_DATA_KEY);
  return userData ? JSON.parse(userData) : null;
};

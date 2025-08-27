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
    console.log("[v0] Logout API call successful");
  } catch (error) {
    console.error("[v0] Logout API call failed:", error);
    // Continue with logout even if API call fails
  } finally {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(USER_DATA_KEY);
    localStorage.removeItem("water_app_user"); // Clear any additional user data
    console.log("[v0] Local storage cleared");
  }
};

export const isAuthenticated = () => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  const userData = localStorage.getItem(USER_DATA_KEY);

  if (!token || !userData) {
    console.log("[v0] Missing token or user data, redirecting to login");
    return false;
  }

  try {
    // Validate token structure
    const tokenData = JSON.parse(atob(token));
    if (!tokenData.email || !tokenData.timestamp) {
      console.log("[v0] Invalid token structure");
      return false;
    }
    return true;
  } catch (error) {
    console.log("[v0] Token validation failed:", error);
    return false;
  }
};

export const getUserData = () => {
  const userData = localStorage.getItem(USER_DATA_KEY);
  return userData ? JSON.parse(userData) : null;
};

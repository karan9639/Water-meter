const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_VERSION = "api/v1";

const getApiUrl = (endpoint) => `${API_BASE_URL}/${API_VERSION}${endpoint}`;

export const apiRequest = async (endpoint, options = {}) => {
  const url = getApiUrl(endpoint);
  const user = JSON.parse(localStorage.getItem("water_app_user") || "{}");

  const config = {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      // Try different authentication approaches
      ...(user.email && { Authorization: `Bearer ${user.email}` }),
      ...(user.email && { "X-User-Email": user.email }),
      ...(user.data?.email && { "X-Auth-User": user.data.email }),
      ...options.headers,
    },
    ...options,
  };

  console.log("[v0] API Request:", url, config);
  console.log("[v0] User data:", user);

  try {
    const response = await fetch(url, config);
    console.log("[v0] API Response status:", response.status);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
};

export const loginUser = async (credentials) => {
  return apiRequest("/user/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
};

export const logoutUser = async () => {
  return apiRequest("/user/logout", {
    method: "POST",
  });
};

export const saveReading = async (readingData) => {
  return apiRequest("/metre-reading/save", {
    method: "POST",
    body: JSON.stringify({
      treatedWaterReading: readingData.treatedWater,
      wastedWaterReading: readingData.wastedWater,
    }),
  });
};

export const getReadings = async () => {
  const response = await apiRequest("/metre-reading/readings", {
    method: "GET",
  });

  // Return the data array from the nested response structure
  return response.data || [];
};

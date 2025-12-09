import ApiClient from "./ApiClient";

export const loginUser = async (microsoftId: string, username: string, email: string) => {
  try {
    console.log("🌐 Calling API:", ApiClient.defaults.baseURL);
    const response = await ApiClient.post("/api/Login", {
      microsoftId,
      username,
      email,
    });
    return response.data;
  } catch (error) {
    console.error("🔴 Login API error:", error);
    throw error;
  }
};

import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveUser = async (user: object) => {
  try {
    await AsyncStorage.setItem("user", JSON.stringify(user));
  } catch (e) {
    console.error("Error saving user:", e);
  }
};

export const getUser = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("user");
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error("Error getting user:", e);
  }
};

export const removeUser = async () => {
  try {
    await AsyncStorage.removeItem("user");
  } catch (e) {
    console.error("Error removing user:", e);
  }
};

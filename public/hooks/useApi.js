// src/hooks/useApi.js
import axios from "axios";

const useApi = () => {
  // 🔄 GET request
  const getData = async (url) => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error("❌ GET Error:", error.message);
      throw error;
    }
  };

  // 📤 POST request
  const postData = async (url, payload) => {
    try {
      const response = await axios.post(url, payload);
      return response.data;
    } catch (error) {
      console.error("❌ POST Error:", error.message);
      throw error;
    }
  };

  // 🧼 DELETE request
  const deleteData = async (url) => {
    try {
      await axios.delete(url);
    } catch (error) {
      console.error("❌ DELETE Error:", error.message);
      throw error;
    }
  };

  // ✏️ PATCH request
  const patchData = async (url, payload) => {
    try {
      await axios.patch(url, payload);
    } catch (error) {
      console.error("❌ PATCH Error:", error.message);
      throw error;
    }
  };

  return { getData, postData, deleteData, patchData };
};

export default useApi;

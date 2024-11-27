import { apiClient } from "@/api/apiClient";
import endpoints from "@/api/endpoints";
import { User } from "@/types";
import axios from "axios";

export const register = async (formData: User): Promise<any> => {
  try {
    const response = await apiClient.post(endpoints.users.register, formData);
    console.log("Registration successful:", response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle Axios-specific errors
      console.error("Axios error:", error.response?.data || error.message);
      throw new Error(
        error.response?.data?.message ||
          "Sign-up failed. Please try again later."
      );
    } else {
      // Handle other potential errors
      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occurred. Please try again.");
    }
  }
};

export const login = async (formData: User): Promise<any> => {
  try {
    const response = await apiClient.post(endpoints.users.login, formData);
    console.log("login successful:", response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle Axios-specific errors
      console.error("Axios error:", error.response?.data || error.message);
      throw new Error(
        error.response?.data?.message ||
          "Sign-In failed. Please try again later."
      );
    } else {
      // Handle other potential errors
      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occurred. Please try again.");
    }
  }
};

export const getAllUsers = async (): Promise<any> => {
  try {
    const response = await apiClient.get(endpoints.users.getAll);
    console.log("Get user successful:", response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle Axios-specific errors
      console.error("Axios error:", error.response?.data || error.message);
      throw new Error(
        error.response?.data?.message ||
          "Get-user failed. Please try again later."
      );
    } else {
      // Handle other potential errors
      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occurred. Please try again.");
    }
  }
};

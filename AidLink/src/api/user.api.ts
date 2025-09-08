import axios, { type AxiosResponse } from "axios";
import { API_URL } from "../utils/url.utils";
import type { LoginProps, LoginResponse, OTPVerifyData, RegisterProps } from "../types/auth.types";

export const registerUser = async(formData: RegisterProps) : Promise<AxiosResponse> => {
   const response = await axios.post(`${API_URL}/auth/register`, formData);
   return response;
}

export const loginUser = async(formData: LoginProps): Promise<LoginResponse> => {
   const response = await axios.post(`${API_URL}/auth/login`, formData);
   return response.data;
}

export const verifyOTP = async(formData: OTPVerifyData): Promise<{ resetToken: string }> => {
   const response = await axios.post(`${API_URL}/auth/verify-otp`, formData);
   return response.data;
}

export const logoutUser = async(userId: number) : Promise<AxiosResponse> => {
   const token = localStorage.getItem("token");
   const response = await axios.post(`${API_URL}/auth/logout`, {userId}, {
      headers: {
         Authorization: `Bearer ${token}`
      }
   });
   return response.data;
}
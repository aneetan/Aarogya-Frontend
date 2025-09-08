import type { AxiosResponse } from "axios";
import type { CampFormData } from "../types/camp.types";
import { API_URL } from "../utils/url.utils";
import axios from "axios";

export const addCamp = async (formData: CampFormData): Promise<AxiosResponse> => {
//   const token = localStorage.getItem("token");
//   if (!token) throw Error("Token not valid");

//   const userId  = getUserIdFromToken(token) || null;
//   if (userId === null || userId !== formData.userId) {
//     throw Error("Invalid authorization");
//   }
  
  const response = await axios.post(`${API_URL}/camp/add`, formData);

  return response.data;
}


export const viewCamps = async (): Promise<AxiosResponse> => {
  const response = await axios.get(`${API_URL}/camp`);

  return response.data;
}

export const viewRecentCamps = async (): Promise<AxiosResponse> => {
  const response = await axios.get(`${API_URL}/camp/recent`);

  return response.data;
}


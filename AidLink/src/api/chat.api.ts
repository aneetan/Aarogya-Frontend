import axios, { type AxiosResponse } from "axios";
import { API_URL } from "../utils/url.utils";
import type { ChatResponse } from "../types/chat.types";

export const getChatResponse = async (message: string): Promise<ChatResponse> => {
  const res: AxiosResponse<ChatResponse> = await axios.post(`${API_URL}/chat`, { message }, 
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
  return res.data;
};
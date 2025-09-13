import { api } from "./api";
import {
  type RegisterData,
  type LoginData,
  type AuthResponse,
  //   type ApiError,
  type User,
} from "../types";
import axios from "axios";

export const authService = {
  async register(userData: RegisterData): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>("/auth/register", userData);
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message ||
          error.response?.data?.errors?.join(", ") ||
          "Erro ao criar conta";
        throw new Error(message);
      }
      throw new Error("Erro ao criar conta");
    }
  },

  async login(credentials: LoginData): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>("/auth/login", credentials);
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || "Erro ao fazer login";
        throw new Error(message);
      }
      throw new Error("Erro ao fazer login");
    }
  },

  async logout(): Promise<void> {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.error("Erro no logout:", error);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  },

  async getCurrentUser(): Promise<User> {
    try {
      const response = await api.get<User>("/auth/me");
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message || "Erro ao buscar usuario";
        throw new Error(message);
      }
      throw new Error("Erro ao buscar usuario");
    }
  },
};

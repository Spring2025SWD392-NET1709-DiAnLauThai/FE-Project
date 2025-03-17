import { jwtDecode } from "jwt-decode";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { userService } from "../services/user";
import { UserResponse } from "../models/user";
import { Role } from "../enums";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  role: Role | null;
  user: UserResponse | null;
  login: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      user: null,
      role: null,
      login: async (accessToken, refreshToken) => {
        try {
          const decoded: TokenResponse = jwtDecode(accessToken);

          const response = await userService.get.detail(decoded.sub);
          
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);

          set({
            accessToken,
            refreshToken,
            role: decoded.role as Role,
            user: response.data,
          });
        } catch (error) {
          console.error("Invalid token", error);
        }
      },
      logout: () => {
        set({ accessToken: null, refreshToken: null, role: null, user: null });
      },
    }),
    { name: "auth-storage" }
  )
);

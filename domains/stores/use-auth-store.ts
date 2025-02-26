import { jwtDecode } from "jwt-decode";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { userService } from "../services/user";
import { UserResponse } from "../models/user";

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
          set({
            accessToken,
            refreshToken,
            role: decoded.role as Role,
          });

          const response = await userService.get.detail(decoded.sub);

          set({ user: response });
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

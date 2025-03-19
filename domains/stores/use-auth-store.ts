import { jwtDecode } from "jwt-decode";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { userService } from "../services/user";
import { UserResponse } from "../models/user";
import { Role } from "../enums";
import { AuthServices } from "../services/auth.services";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  role: Role | null;
  user: UserResponse | null;
  login: (accessToken: string, refreshToken: string) => void;
  validate: () => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      user: null,
      role: null,
      validate: async () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await AuthServices.validate();
        // if (response.status === 401) {
        //   const refreshToken = localStorage.getItem("refreshToken");
        //   if (refreshToken) {
        //     const response = await AuthServices.refreshToken(refreshToken);
        //     localStorage.setItem("accessToken", response.data.accessToken);
        //     localStorage.setItem("refreshToken", response.data.refreshToken);
        //     get().login(response.data.accessToken, response.data.refreshToken);
        //   }
        // }
      },
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

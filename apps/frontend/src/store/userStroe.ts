import { create } from "zustand";
import type { UserSummary } from "@nebula/shared";

export type UserInfo = UserSummary;

interface UserStore {
  user: UserInfo | null;
  setUser: (user: UserInfo) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user: UserInfo) => set({ user }),
}));

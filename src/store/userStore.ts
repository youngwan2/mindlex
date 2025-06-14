// 유저 전역 상태 예시 (Zustand)
import { create } from 'zustand';

interface UserState {
    user: { id: string; name: string } | null;
    setUser: (user: { id: string; name: string }) => void;
    clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    clearUser: () => set({ user: null }),
}));

// UI 전역 상태 예시 (Zustand)
import { create } from 'zustand';

interface UIState {
    isModalOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
}

export const useUIStore = create<UIState>((set) => ({
    isModalOpen: false,
    openModal: () => set({ isModalOpen: true }),
    closeModal: () => set({ isModalOpen: false }),
}));

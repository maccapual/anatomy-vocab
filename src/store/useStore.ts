import { create } from 'zustand';
import type { BoneVocabulary } from '../data/bones';

interface ZoomTarget {
  position: [number, number, number];
  target: [number, number, number];
}

interface AppState {
  selectedBone: BoneVocabulary | null;
  hoveredBoneId: string | null;
  isPanelOpen: boolean;
  currentSystem: string;
  zoomTarget: ZoomTarget | null;
  favorites: string[];
  learnedBones: string[];
  setSelectedBone: (bone: BoneVocabulary | null) => void;
  setHoveredBoneId: (boneId: string | null) => void;
  setIsPanelOpen: (isOpen: boolean) => void;
  setCurrentSystem: (system: string) => void;
  setZoomTarget: (target: ZoomTarget | null) => void;
  toggleFavorite: (boneId: string) => void;
  markAsLearned: (boneId: string) => void;
}

export const useStore = create<AppState>((set) => ({
  selectedBone: null,
  hoveredBoneId: null,
  isPanelOpen: false,
  currentSystem: 'skeletal',
  zoomTarget: null,
  favorites: [],
  learnedBones: [],
  setSelectedBone: (bone) => set({ selectedBone: bone, isPanelOpen: bone !== null }),
  setHoveredBoneId: (boneId) => set({ hoveredBoneId: boneId }),
  setIsPanelOpen: (isOpen) => set({ isPanelOpen: isOpen }),
  setCurrentSystem: (system) => set({ currentSystem: system }),
  setZoomTarget: (target) => set({ zoomTarget: target }),
  toggleFavorite: (boneId) => set((state) => ({
    favorites: state.favorites.includes(boneId)
      ? state.favorites.filter(id => id !== boneId)
      : [...state.favorites, boneId]
  })),
  markAsLearned: (boneId) => set((state) => ({
    learnedBones: state.learnedBones.includes(boneId)
      ? state.learnedBones
      : [...state.learnedBones, boneId]
  })),
}));

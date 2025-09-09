import { create } from 'zustand';
import { Track } from '@/services/musicApi';

interface PlaybackState {
  currentTrack: Track | null;
  isPlaying: boolean;
  queue: Track[];
  currentIndex: number;
  isShuffled: boolean;
  repeatMode: 'off' | 'all' | 'one';
  volume: number;
  progress: number;
  duration: number;
  showLyrics: boolean;
  
  // Actions
  setCurrentTrack: (track: Track) => void;
  togglePlay: () => void;
  playNext: () => void;
  playPrevious: () => void;
  setQueue: (tracks: Track[], startIndex?: number) => void;
  addToQueue: (track: Track) => void;
  toggleShuffle: () => void;
  setRepeatMode: (mode: 'off' | 'all' | 'one') => void;
  setVolume: (volume: number) => void;
  setProgress: (progress: number) => void;
  setDuration: (duration: number) => void;
  toggleLyrics: () => void;
}

export const usePlaybackStore = create<PlaybackState>((set, get) => ({
  currentTrack: null,
  isPlaying: false,
  queue: [],
  currentIndex: 0,
  isShuffled: false,
  repeatMode: 'off',
  volume: 70,
  progress: 0,
  duration: 0,
  showLyrics: false,

  setCurrentTrack: (track) => set({ currentTrack: track }),
  
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  
  playNext: () => set((state) => {
    const { queue, currentIndex, repeatMode, isShuffled } = state;
    if (queue.length === 0) return state;
    
    let nextIndex = currentIndex;
    
    if (repeatMode === 'one') {
      // Stay on same track
      return { progress: 0 };
    } else if (repeatMode === 'all' && currentIndex === queue.length - 1) {
      nextIndex = 0;
    } else if (currentIndex < queue.length - 1) {
      nextIndex = currentIndex + 1;
    } else {
      return state; // Don't change if at end and no repeat
    }
    
    return {
      currentIndex: nextIndex,
      currentTrack: queue[nextIndex],
      progress: 0
    };
  }),
  
  playPrevious: () => set((state) => {
    const { queue, currentIndex } = state;
    if (queue.length === 0) return state;
    
    let prevIndex = currentIndex;
    
    if (currentIndex > 0) {
      prevIndex = currentIndex - 1;
    } else {
      prevIndex = queue.length - 1; // Loop to end
    }
    
    return {
      currentIndex: prevIndex,
      currentTrack: queue[prevIndex],
      progress: 0
    };
  }),
  
  setQueue: (tracks, startIndex = 0) => set({
    queue: tracks,
    currentIndex: startIndex,
    currentTrack: tracks[startIndex] || null
  }),
  
  addToQueue: (track) => set((state) => ({
    queue: [...state.queue, track]
  })),
  
  toggleShuffle: () => set((state) => ({ isShuffled: !state.isShuffled })),
  
  setRepeatMode: (mode) => set({ repeatMode: mode }),
  
  setVolume: (volume) => set({ volume }),
  
  setProgress: (progress) => set({ progress }),
  
  setDuration: (duration) => set({ duration }),
  
  toggleLyrics: () => set((state) => ({ showLyrics: !state.showLyrics }))
}));
import { create } from 'zustand';
import { Track, Album, Artist } from '@/services/musicApi';

interface PlaybackState {
  currentTrack: Track | null;
  isPlaying: boolean;
  volume: number;
  progress: number;
  duration: number;
  queue: Track[];
  currentIndex: number;
  shuffle: boolean;
  repeat: 'off' | 'all' | 'one';
}

interface SearchState {
  query: string;
  results: {
    tracks: Track[];
    albums: Album[];
    artists: Artist[];
  };
  isSearching: boolean;
  recentSearches: string[];
}

interface LibraryState {
  likedTracks: Track[];
  savedAlbums: Album[];
  followedArtists: Artist[];
  playlists: any[];
  recentlyPlayed: Track[];
}

interface MusicStore {
  // Playback state
  playback: PlaybackState;
  
  // Search state
  search: SearchState;
  
  // Library state
  library: LibraryState;

  // Playback actions
  setCurrentTrack: (track: Track) => void;
  setIsPlaying: (playing: boolean) => void;
  setVolume: (volume: number) => void;
  setProgress: (progress: number) => void;
  setDuration: (duration: number) => void;
  addToQueue: (track: Track) => void;
  removeFromQueue: (index: number) => void;
  nextTrack: () => void;
  previousTrack: () => void;
  toggleShuffle: () => void;
  toggleRepeat: () => void;
  playTrack: (track: Track, queue?: Track[]) => void;

  // Search actions
  setSearchQuery: (query: string) => void;
  setSearchResults: (results: { tracks: Track[]; albums: Album[]; artists: Artist[] }) => void;
  setIsSearching: (searching: boolean) => void;
  addRecentSearch: (query: string) => void;

  // Library actions
  toggleLikeTrack: (track: Track) => void;
  saveAlbum: (album: Album) => void;
  unsaveAlbum: (albumId: string) => void;
  followArtist: (artist: Artist) => void;
  unfollowArtist: (artistId: string) => void;
  addToRecentlyPlayed: (track: Track) => void;
  isTrackLiked: (trackId: string) => boolean;
  isAlbumSaved: (albumId: string) => boolean;
  isArtistFollowed: (artistId: string) => boolean;
}

export const useMusicStore = create<MusicStore>((set, get) => ({
  // Initial state
  playback: {
    currentTrack: null,
    isPlaying: false,
    volume: 70,
    progress: 0,
    duration: 0,
    queue: [],
    currentIndex: -1,
    shuffle: false,
    repeat: 'off',
  },

  search: {
    query: '',
    results: {
      tracks: [],
      albums: [],
      artists: [],
    },
    isSearching: false,
    recentSearches: [],
  },

  library: {
    likedTracks: [],
    savedAlbums: [],
    followedArtists: [],
    playlists: [],
    recentlyPlayed: [],
  },

  // Playback actions
  setCurrentTrack: (track) =>
    set((state) => ({
      playback: { ...state.playback, currentTrack: track },
    })),

  setIsPlaying: (playing) =>
    set((state) => ({
      playback: { ...state.playback, isPlaying: playing },
    })),

  setVolume: (volume) =>
    set((state) => ({
      playback: { ...state.playback, volume },
    })),

  setProgress: (progress) =>
    set((state) => ({
      playback: { ...state.playback, progress },
    })),

  setDuration: (duration) =>
    set((state) => ({
      playback: { ...state.playback, duration },
    })),

  addToQueue: (track) =>
    set((state) => ({
      playback: {
        ...state.playback,
        queue: [...state.playback.queue, track],
      },
    })),

  removeFromQueue: (index) =>
    set((state) => ({
      playback: {
        ...state.playback,
        queue: state.playback.queue.filter((_, i) => i !== index),
        currentIndex: state.playback.currentIndex > index 
          ? state.playback.currentIndex - 1 
          : state.playback.currentIndex,
      },
    })),

  nextTrack: () => {
    const { playback } = get();
    const { queue, currentIndex, shuffle, repeat } = playback;
    
    if (queue.length === 0) return;

    let nextIndex = currentIndex;
    
    if (repeat === 'one') {
      // Stay on current track
      nextIndex = currentIndex;
    } else if (shuffle) {
      // Random next track
      nextIndex = Math.floor(Math.random() * queue.length);
    } else {
      // Normal next
      nextIndex = currentIndex + 1;
      if (nextIndex >= queue.length) {
        nextIndex = repeat === 'all' ? 0 : queue.length - 1;
      }
    }

    if (nextIndex >= 0 && nextIndex < queue.length) {
      set((state) => ({
        playback: {
          ...state.playback,
          currentTrack: queue[nextIndex],
          currentIndex: nextIndex,
          progress: 0,
        },
      }));
    }
  },

  previousTrack: () => {
    const { playback } = get();
    const { queue, currentIndex } = playback;
    
    if (queue.length === 0) return;

    let prevIndex = currentIndex - 1;
    if (prevIndex < 0) {
      prevIndex = queue.length - 1;
    }

    if (prevIndex >= 0 && prevIndex < queue.length) {
      set((state) => ({
        playback: {
          ...state.playback,
          currentTrack: queue[prevIndex],
          currentIndex: prevIndex,
          progress: 0,
        },
      }));
    }
  },

  toggleShuffle: () =>
    set((state) => ({
      playback: { ...state.playback, shuffle: !state.playback.shuffle },
    })),

  toggleRepeat: () => {
    const modes: ('off' | 'all' | 'one')[] = ['off', 'all', 'one'];
    set((state) => {
      const currentIndex = modes.indexOf(state.playback.repeat);
      const nextMode = modes[(currentIndex + 1) % modes.length];
      return {
        playback: { ...state.playback, repeat: nextMode },
      };
    });
  },

  playTrack: (track, queue = []) => {
    const newQueue = queue.length > 0 ? queue : [track];
    const trackIndex = newQueue.findIndex(t => t.id === track.id);
    
    set((state) => ({
      playback: {
        ...state.playback,
        currentTrack: track,
        queue: newQueue,
        currentIndex: trackIndex,
        isPlaying: true,
        progress: 0,
      },
    }));
    
    // Add to recently played
    get().addToRecentlyPlayed(track);
  },

  // Search actions
  setSearchQuery: (query) =>
    set((state) => ({
      search: { ...state.search, query },
    })),

  setSearchResults: (results) =>
    set((state) => ({
      search: { ...state.search, results },
    })),

  setIsSearching: (searching) =>
    set((state) => ({
      search: { ...state.search, isSearching: searching },
    })),

  addRecentSearch: (query) =>
    set((state) => {
      const recentSearches = [
        query,
        ...state.search.recentSearches.filter(s => s !== query),
      ].slice(0, 10);
      return {
        search: { ...state.search, recentSearches },
      };
    }),

  // Library actions
  toggleLikeTrack: (track) =>
    set((state) => {
      const isLiked = state.library.likedTracks.some(t => t.id === track.id);
      const likedTracks = isLiked
        ? state.library.likedTracks.filter(t => t.id !== track.id)
        : [...state.library.likedTracks, track];
      return {
        library: { ...state.library, likedTracks },
      };
    }),

  saveAlbum: (album) =>
    set((state) => ({
      library: {
        ...state.library,
        savedAlbums: [...state.library.savedAlbums, album],
      },
    })),

  unsaveAlbum: (albumId) =>
    set((state) => ({
      library: {
        ...state.library,
        savedAlbums: state.library.savedAlbums.filter(a => a.id !== albumId),
      },
    })),

  followArtist: (artist) =>
    set((state) => ({
      library: {
        ...state.library,
        followedArtists: [...state.library.followedArtists, artist],
      },
    })),

  unfollowArtist: (artistId) =>
    set((state) => ({
      library: {
        ...state.library,
        followedArtists: state.library.followedArtists.filter(a => a.id !== artistId),
      },
    })),

  addToRecentlyPlayed: (track) =>
    set((state) => {
      const recentlyPlayed = [
        track,
        ...state.library.recentlyPlayed.filter(t => t.id !== track.id),
      ].slice(0, 50);
      return {
        library: { ...state.library, recentlyPlayed },
      };
    }),

  isTrackLiked: (trackId) => {
    const { library } = get();
    return library.likedTracks.some(t => t.id === trackId);
  },

  isAlbumSaved: (albumId) => {
    const { library } = get();
    return library.savedAlbums.some(a => a.id === albumId);
  },

  isArtistFollowed: (artistId) => {
    const { library } = get();
    return library.followedArtists.some(a => a.id === artistId);
  },
}));
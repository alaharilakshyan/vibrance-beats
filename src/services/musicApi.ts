// Mock music API service - Replace with real Spotify/Deezer API
export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
  coverUrl: string;
  previewUrl?: string;
  lyrics?: string;
}

export interface Album {
  id: string;
  title: string;
  artist: string;
  coverUrl: string;
  tracks: Track[];
  year: number;
}

export interface Artist {
  id: string;
  name: string;
  imageUrl: string;
  bio?: string;
  topTracks: Track[];
}

// Mock data with real preview URLs from public sources
const mockTracks: Track[] = [
  {
    id: "1",
    title: "Blinding Lights",
    artist: "The Weeknd",
    album: "After Hours",
    duration: 200,
    coverUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
    previewUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    lyrics: "Yeah, I've been trying to call\nI've been on my own for long enough\nMaybe you can show me how to love, maybe\nI feel like I'm just missing something when you're gone"
  },
  {
    id: "2", 
    title: "Watermelon Sugar",
    artist: "Harry Styles",
    album: "Fine Line",
    duration: 174,
    coverUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop",
    previewUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    lyrics: "Tastes like strawberries on a summer evenin'\nAnd it sounds just like a song\nI want more berries and that summer feelin'\nIt's so wonderful and warm"
  },
  {
    id: "3",
    title: "Good 4 U",
    artist: "Olivia Rodrigo",
    album: "SOUR",
    duration: 178,
    coverUrl: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=300&h=300&fit=crop",
    previewUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    lyrics: "Well, good for you, I guess you moved on really easily\nYou found a new girl and it only took a couple weeks\nRemember when you said that you wanted to give me the world"
  },
  {
    id: "4",
    title: "Levitating",
    artist: "Dua Lipa",
    album: "Future Nostalgia",
    duration: 203,
    coverUrl: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=300&h=300&fit=crop",
    previewUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    lyrics: "If you wanna run away with me, I know a galaxy\nAnd I can take you for a ride\nI had a premonition that we fell into a rhythm\nWhere the music don't stop for life"
  },
  {
    id: "5",
    title: "As It Was",
    artist: "Harry Styles", 
    album: "Harry's House",
    duration: 167,
    coverUrl: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=300&h=300&fit=crop",
    previewUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    lyrics: "Holdin' me back\nGravity's holdin' me back\nI want you to hold out the palm of your hand\nWhy don't we leave it at that?"
  }
];

class MusicApiService {
  async searchTracks(query: string): Promise<Track[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    if (!query.trim()) return [];
    
    const filtered = mockTracks.filter(track => 
      track.title.toLowerCase().includes(query.toLowerCase()) ||
      track.artist.toLowerCase().includes(query.toLowerCase()) ||
      track.album.toLowerCase().includes(query.toLowerCase())
    );
    
    return filtered;
  }

  async getTrack(id: string): Promise<Track | null> {
    await new Promise(resolve => setTimeout(resolve, 100));
    return mockTracks.find(track => track.id === id) || null;
  }

  async getTrendingTracks(): Promise<Track[]> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockTracks.slice(0, 3);
  }

  async getRecommendations(): Promise<Track[]> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return [...mockTracks].sort(() => Math.random() - 0.5).slice(0, 4);
  }

  async getNewReleases(): Promise<Track[]> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockTracks.slice(2);
  }
}

export const musicApi = new MusicApiService();
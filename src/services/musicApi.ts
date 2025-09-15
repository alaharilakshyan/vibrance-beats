// Real-time music search using iTunes API (free and no auth required)
// Can be easily extended to support Spotify, Deezer, or other providers

export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
  artwork: string;
  previewUrl: string;
  releaseDate: string;
  genre: string;
}

export interface Album {
  id: string;
  title: string;
  artist: string;
  artwork: string;
  releaseDate: string;
  trackCount: number;
  tracks?: Track[];
}

export interface Artist {
  id: string;
  name: string;
  artwork?: string;
  genre: string;
}

export interface SearchResults {
  tracks: Track[];
  albums: Album[];
  artists: Artist[];
}

const ITUNES_BASE_URL = 'https://itunes.apple.com/search';

class MusicAPI {
  // Search for music across tracks, albums, and artists
  async search(query: string, limit = 20): Promise<SearchResults> {
    if (!query.trim()) {
      return { tracks: [], albums: [], artists: [] };
    }

    try {
      // Search for tracks
      const tracksResponse = await fetch(
        `${ITUNES_BASE_URL}?term=${encodeURIComponent(query)}&media=music&entity=song&limit=${limit}`
      );
      const tracksData = await tracksResponse.json();

      // Search for albums
      const albumsResponse = await fetch(
        `${ITUNES_BASE_URL}?term=${encodeURIComponent(query)}&media=music&entity=album&limit=${Math.ceil(limit / 2)}`
      );
      const albumsData = await albumsResponse.json();

      // Search for artists
      const artistsResponse = await fetch(
        `${ITUNES_BASE_URL}?term=${encodeURIComponent(query)}&media=music&entity=musicArtist&limit=${Math.ceil(limit / 3)}`
      );
      const artistsData = await artistsResponse.json();

      return {
        tracks: this.mapTracksFromItunes(tracksData.results || []),
        albums: this.mapAlbumsFromItunes(albumsData.results || []),
        artists: this.mapArtistsFromItunes(artistsData.results || [])
      };
    } catch (error) {
      console.error('Music search error:', error);
      return { tracks: [], albums: [], artists: [] };
    }
  }

  // Get trending/popular tracks
  async getTrending(limit = 10): Promise<Track[]> {
    try {
      const response = await fetch(
        `${ITUNES_BASE_URL}?term=pop&media=music&entity=song&limit=${limit}&sort=popular`
      );
      const data = await response.json();
      return this.mapTracksFromItunes(data.results || []);
    } catch (error) {
      console.error('Error fetching trending tracks:', error);
      return [];
    }
  }

  // Get tracks by genre
  async getByGenre(genre: string, limit = 20): Promise<Track[]> {
    try {
      const response = await fetch(
        `${ITUNES_BASE_URL}?term=${encodeURIComponent(genre)}&media=music&entity=song&limit=${limit}`
      );
      const data = await response.json();
      return this.mapTracksFromItunes(data.results || []);
    } catch (error) {
      console.error('Error fetching tracks by genre:', error);
      return [];
    }
  }

  // Get album details with tracks
  async getAlbum(albumId: string): Promise<Album | null> {
    try {
      const response = await fetch(
        `${ITUNES_BASE_URL}?id=${albumId}&entity=song&limit=200`
      );
      const data = await response.json();
      
      if (!data.results || data.results.length === 0) return null;

      const albumInfo = data.results[0];
      const tracks = this.mapTracksFromItunes(data.results.slice(1));

      return {
        id: albumInfo.collectionId?.toString() || albumId,
        title: albumInfo.collectionName,
        artist: albumInfo.artistName,
        artwork: albumInfo.artworkUrl100?.replace('100x100', '600x600') || '',
        releaseDate: albumInfo.releaseDate,
        trackCount: albumInfo.trackCount || tracks.length,
        tracks
      };
    } catch (error) {
      console.error('Error fetching album:', error);
      return null;
    }
  }

  // Map iTunes API response to our Track interface
  private mapTracksFromItunes(results: any[]): Track[] {
    return results
      .filter(item => item.kind === 'song' && item.previewUrl)
      .map(item => ({
        id: item.trackId?.toString() || Math.random().toString(),
        title: item.trackName || 'Unknown Track',
        artist: item.artistName || 'Unknown Artist',
        album: item.collectionName || 'Unknown Album',
        duration: Math.floor((item.trackTimeMillis || 30000) / 1000),
        artwork: item.artworkUrl100?.replace('100x100', '600x600') || '',
        previewUrl: item.previewUrl || '',
        releaseDate: item.releaseDate || '',
        genre: item.primaryGenreName || 'Unknown'
      }));
  }

  // Map iTunes API response to our Album interface
  private mapAlbumsFromItunes(results: any[]): Album[] {
    return results
      .filter(item => item.collectionType === 'Album')
      .map(item => ({
        id: item.collectionId?.toString() || Math.random().toString(),
        title: item.collectionName || 'Unknown Album',
        artist: item.artistName || 'Unknown Artist',
        artwork: item.artworkUrl100?.replace('100x100', '600x600') || '',
        releaseDate: item.releaseDate || '',
        trackCount: item.trackCount || 0
      }));
  }

  // Map iTunes API response to our Artist interface
  private mapArtistsFromItunes(results: any[]): Artist[] {
    return results
      .filter(item => item.wrapperType === 'artist')
      .map(item => ({
        id: item.artistId?.toString() || Math.random().toString(),
        name: item.artistName || 'Unknown Artist',
        genre: item.primaryGenreName || 'Unknown'
      }));
  }
}

export const musicApi = new MusicAPI();
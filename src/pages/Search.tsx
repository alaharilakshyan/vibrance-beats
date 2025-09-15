import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Search as SearchIcon, Mic, Camera, Clock, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TrackItem } from "@/components/ui/track-item";
import { musicApi } from "@/services/musicApi";
import { useMusicStore } from "@/store/musicStore";
import { useDebounce } from "react-use";

const genres = [
  { name: "Pop", color: "bg-pink-500", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop" },
  { name: "Hip-Hop", color: "bg-orange-500", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop" },
  { name: "Rock", color: "bg-red-500", image: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=300&h=300&fit=crop" },
  { name: "Electronic", color: "bg-blue-500", image: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=300&h=300&fit=crop" },
  { name: "Jazz", color: "bg-yellow-500", image: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=300&h=300&fit=crop" },
  { name: "Classical", color: "bg-purple-500", image: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=300&h=300&fit=crop" },
  { name: "R&B", color: "bg-green-500", image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop" },
  { name: "Indie", color: "bg-teal-500", image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop" },
];

const recentSearches = [
  "The Weeknd",
  "Blinding Lights",
  "Dua Lipa",
  "After Hours",
  "Future Nostalgia"
];

export default function Search() {
  const {
    search: { query, results, isSearching, recentSearches },
    setSearchQuery,
    setSearchResults,
    setIsSearching,
    addRecentSearch,
  } = useMusicStore();

  const [localQuery, setLocalQuery] = useState("");
  const [showRecentSearches, setShowRecentSearches] = useState(true);

  // Debounce search query
  useDebounce(
    () => {
      if (localQuery.trim() && localQuery !== query) {
        performSearch(localQuery);
      }
    },
    300,
    [localQuery]
  );

  const performSearch = useCallback(async (searchTerm: string) => {
    if (!searchTerm.trim()) return;

    setSearchQuery(searchTerm);
    setIsSearching(true);
    setShowRecentSearches(false);

    try {
      const results = await musicApi.search(searchTerm);
      setSearchResults(results);
      addRecentSearch(searchTerm);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsSearching(false);
    }
  }, [setSearchQuery, setIsSearching, setSearchResults, addRecentSearch]);

  const handleInputChange = (value: string) => {
    setLocalQuery(value);
    if (!value.trim()) {
      setSearchQuery("");
      setShowRecentSearches(true);
    }
  };

  const clearSearch = () => {
    setLocalQuery("");
    setSearchQuery("");
    setShowRecentSearches(true);
    setSearchResults({ tracks: [], albums: [], artists: [] });
  };

  const handleRecentSearch = (searchTerm: string) => {
    setLocalQuery(searchTerm);
    performSearch(searchTerm);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 space-y-8"
    >
      {/* Search Header */}
      <div className="space-y-6">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold gradient-text"
        >
          Search
        </motion.h1>
        
        {/* Search Input */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative max-w-2xl"
        >
          <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          {isSearching && (
            <Loader2 className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary animate-spin" />
          )}
          <Input
            type="text"
            placeholder="Search for songs, artists, albums..."
            value={localQuery}
            onChange={(e) => handleInputChange(e.target.value)}
            className="pl-12 pr-20 h-14 text-lg glass-card border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:shadow-lg transition-all duration-300"
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex gap-1">
            {localQuery && (
              <Button
                size="sm"
                variant="ghost"
                onClick={clearSearch}
                className="w-9 h-9 p-0 text-muted-foreground hover:text-foreground hover:bg-primary/20 rounded-full transition-all duration-200"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
            <Button
              size="sm"
              variant="ghost"
              className="w-9 h-9 p-0 text-muted-foreground hover:text-foreground hover:bg-primary/20 rounded-full transition-all duration-200"
            >
              <Mic className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="w-9 h-9 p-0 text-muted-foreground hover:text-foreground hover:bg-primary/20 rounded-full transition-all duration-200"
            >
              <Camera className="w-4 h-4" />
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Search Results or Browse Content */}
      {query ? (
        <div className="space-y-8">
          {isSearching ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <Loader2 className="w-12 h-12 text-primary mx-auto mb-4 animate-spin" />
              <h3 className="text-lg font-medium text-foreground">
                Searching for "{query}"...
              </h3>
            </motion.div>
          ) : (
            <>
              {/* Tracks Results */}
              {results.tracks.length > 0 && (
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <h2 className="text-2xl font-bold mb-6 gradient-text">Songs</h2>
                  <div className="space-y-2">
                    {results.tracks.slice(0, 10).map((track, index) => (
                      <TrackItem 
                        key={track.id} 
                        track={track} 
                        index={index}
                        showArtwork={true}
                      />
                    ))}
                  </div>
                </motion.section>
              )}

              {/* Albums Results */}
              {results.albums.length > 0 && (
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h2 className="text-2xl font-bold mb-6 gradient-text">Albums</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                    {results.albums.map((album, index) => (
                      <motion.div
                        key={album.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className="glass-card p-4 hover-lift hover-glow cursor-pointer group"
                      >
                        <div className="aspect-square rounded-lg overflow-hidden mb-3">
                          <img
                            src={album.artwork || '/placeholder.svg'}
                            alt={album.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <h3 className="font-medium text-sm truncate">{album.title}</h3>
                        <p className="text-xs text-muted-foreground truncate">{album.artist}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.section>
              )}

              {/* Artists Results */}
              {results.artists.length > 0 && (
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h2 className="text-2xl font-bold mb-6 gradient-text">Artists</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                    {results.artists.map((artist, index) => (
                      <motion.div
                        key={artist.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className="glass-card p-4 hover-lift hover-glow cursor-pointer group text-center"
                      >
                        <div className="w-16 h-16 rounded-full bg-gradient-primary mx-auto mb-3 flex items-center justify-center">
                          <span className="text-white font-bold text-lg">
                            {artist.name.charAt(0)}
                          </span>
                        </div>
                        <h3 className="font-medium text-sm truncate">{artist.name}</h3>
                        <p className="text-xs text-muted-foreground">{artist.genre}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.section>
              )}

              {/* No Results */}
              {results.tracks.length === 0 && results.albums.length === 0 && results.artists.length === 0 && !isSearching && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <SearchIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-muted-foreground">
                    No results found for "{query}"
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    Try different keywords or check your spelling.
                  </p>
                </motion.div>
              )}
            </>
          )}
        </div>
      ) : (
        <div className="space-y-8">
          {/* Recent Searches */}
          {showRecentSearches && recentSearches.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold mb-6 gradient-text">Recent searches</h2>
              <div className="space-y-2">
                {recentSearches.map((search, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleRecentSearch(search)}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-card-hover cursor-pointer transition-all duration-200 hover-lift"
                  >
                    <Clock className="w-5 h-5 text-muted-foreground" />
                    <span className="text-foreground">{search}</span>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Browse All */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold mb-6 gradient-text">Browse all</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {genres.map((genre, index) => (
                <motion.div
                  key={genre.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => {
                    setLocalQuery(genre.name);
                    performSearch(genre.name);
                  }}
                  className="relative aspect-square rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover-lift hover-glow group glass-card"
                >
                  <div className={`absolute inset-0 ${genre.color} opacity-40`} />
                  <img
                    src={genre.image}
                    alt={genre.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/60" />
                  <div className="absolute top-4 left-4">
                    <h3 className="text-2xl font-bold text-white drop-shadow-2xl">
                      {genre.name}
                    </h3>
                  </div>
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center glow-primary">
                      <SearchIcon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </div>
      )}
    </motion.div>
  );
}
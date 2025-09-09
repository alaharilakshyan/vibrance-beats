import { useState } from "react";
import { Search as SearchIcon, Mic, Camera, Clock, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [showRecentSearches, setShowRecentSearches] = useState(true);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setShowRecentSearches(false);
    // Here you would implement actual search logic
  };

  const clearSearch = () => {
    setSearchQuery("");
    setShowRecentSearches(true);
  };

  return (
    <div className="p-6 space-y-8">
      {/* Search Header */}
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Search</h1>
        
        {/* Search Input */}
        <div className="relative max-w-md">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="What do you want to listen to?"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10 pr-20 h-12 bg-background-surface border-border focus:border-primary text-foreground placeholder:text-muted-foreground"
          />
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1">
            {searchQuery && (
              <Button
                size="sm"
                variant="ghost"
                onClick={clearSearch}
                className="w-8 h-8 p-0 text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
            <Button
              size="sm"
              variant="ghost"
              className="w-8 h-8 p-0 text-muted-foreground hover:text-foreground"
            >
              <Mic className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="w-8 h-8 p-0 text-muted-foreground hover:text-foreground"
            >
              <Camera className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Search Results or Browse Content */}
      {searchQuery ? (
        <div className="space-y-8">
          {/* Search Results */}
          <div className="text-center py-12">
            <SearchIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-muted-foreground">
              Search for "{searchQuery}"
            </h3>
            <p className="text-sm text-muted-foreground mt-2">
              Find your favorite songs, artists, albums, and playlists.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Recent Searches */}
          {showRecentSearches && recentSearches.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-6">Recent searches</h2>
              <div className="space-y-2">
                {recentSearches.map((search, index) => (
                  <div
                    key={index}
                    onClick={() => handleSearch(search)}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-card-hover cursor-pointer transition-colors"
                  >
                    <Clock className="w-5 h-5 text-muted-foreground" />
                    <span className="text-foreground">{search}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Browse All */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Browse all</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {genres.map((genre) => (
                <div
                  key={genre.name}
                  onClick={() => handleSearch(genre.name)}
                  className="relative aspect-square rounded-lg overflow-hidden cursor-pointer transition-transform hover:scale-105 group"
                >
                  <div className={`absolute inset-0 ${genre.color} opacity-60`} />
                  <img
                    src={genre.image}
                    alt={genre.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/40" />
                  <div className="absolute top-4 left-4">
                    <h3 className="text-2xl font-bold text-white drop-shadow-lg">
                      {genre.name}
                    </h3>
                  </div>
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-glow-primary">
                      <SearchIcon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
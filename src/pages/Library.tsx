import { useState } from "react";
import { Grid3X3, List, Clock, ArrowUpDown, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const libraryItems = [
  {
    id: 1,
    title: "Liked Songs",
    type: "playlist",
    count: 47,
    creator: "You",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop",
    lastPlayed: "Today"
  },
  {
    id: 2,
    title: "My Playlist #1",
    type: "playlist",
    count: 23,
    creator: "You",
    image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=100&h=100&fit=crop",
    lastPlayed: "2 days ago"
  },
  {
    id: 3,
    title: "After Hours",
    type: "album",
    count: 14,
    creator: "The Weeknd",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop",
    lastPlayed: "1 week ago"
  },
  {
    id: 4,
    title: "Chill Vibes",
    type: "playlist",
    count: 31,
    creator: "You",
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=100&h=100&fit=crop",
    lastPlayed: "3 days ago"
  },
  {
    id: 5,
    title: "Future Nostalgia",
    type: "album",
    count: 11,
    creator: "Dua Lipa",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=100&h=100&fit=crop",
    lastPlayed: "1 day ago"
  },
  {
    id: 6,
    title: "Workout Mix",
    type: "playlist",
    count: 18,
    creator: "You",
    image: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=100&h=100&fit=crop",
    lastPlayed: "5 days ago"
  },
];

type ViewMode = 'list' | 'grid';
type SortOption = 'recent' | 'alphabetical' | 'creator' | 'added';

export default function Library() {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [sortBy, setSortBy] = useState<SortOption>('recent');
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = libraryItems.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.creator.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case 'alphabetical':
        return a.title.localeCompare(b.title);
      case 'creator':
        return a.creator.localeCompare(b.creator);
      case 'added':
        return b.id - a.id;
      case 'recent':
      default:
        return 0; // Keep original order for recent
    }
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Your Library</h1>
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'list' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            <List className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === 'grid' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            <Grid3X3 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search in Your Library"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-background-surface border-border focus:border-primary"
          />
        </div>
        
        <Select value={sortBy} onValueChange={(value: SortOption) => setSortBy(value)}>
          <SelectTrigger className="w-48 bg-background-surface border-border">
            <ArrowUpDown className="w-4 h-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recent">Recently Played</SelectItem>
            <SelectItem value="alphabetical">Alphabetical</SelectItem>
            <SelectItem value="creator">Creator</SelectItem>
            <SelectItem value="added">Recently Added</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Content */}
      {viewMode === 'list' ? (
        <div className="space-y-2">
          {sortedItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 p-3 rounded-lg hover:bg-card-hover cursor-pointer transition-colors group"
            >
              <div className="w-12 h-12 rounded-lg overflow-hidden bg-card flex-shrink-0">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-foreground truncate group-hover:underline">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {item.type === 'playlist' ? 'Playlist' : 'Album'} • {item.creator}
                </p>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="hidden sm:block">{item.count} songs</span>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span className="hidden md:block">{item.lastPlayed}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {sortedItems.map((item) => (
            <div
              key={item.id}
              className="group cursor-pointer"
            >
              <div className="relative mb-4">
                <div className="aspect-square rounded-lg overflow-hidden bg-card shadow-md group-hover:shadow-lg transition-all duration-200">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <h3 className="font-medium text-foreground group-hover:underline truncate">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {item.type === 'playlist' ? 'Playlist' : 'Album'} • {item.creator}
                </p>
                <p className="text-xs text-muted-foreground">
                  {item.count} songs
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {sortedItems.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-muted-foreground mb-2">
            No results found
          </h3>
          <p className="text-sm text-muted-foreground">
            Try searching for something else.
          </p>
        </div>
      )}
    </div>
  );
}
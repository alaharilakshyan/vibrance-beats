import { NavLink } from "react-router-dom";
import { 
  Home, 
  Search, 
  Library, 
  Heart, 
  Plus, 
  Music,
  Disc3,
  PlayCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";

const mainNavItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Search, label: "Search", path: "/search" },
  { icon: Library, label: "Your Library", path: "/library" },
];

const libraryItems = [
  { icon: Heart, label: "Liked Songs", path: "/library/liked" },
  { icon: Music, label: "Recently Played", path: "/library/recent" },
  { icon: Disc3, label: "Albums", path: "/library/albums" },
];

export const Sidebar = () => {
  return (
    <div className="flex flex-col h-full p-6">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
          <PlayCircle className="w-5 h-5 text-white" />
        </div>
        <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Vibecast
        </h1>
      </div>

      {/* Main Navigation */}
      <nav className="space-y-2 mb-8">
        {mainNavItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? "bg-primary/20 text-primary shadow-glow-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-card-hover"
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Create Playlist */}
      <Button 
        variant="ghost" 
        className="justify-start gap-3 mb-6 text-muted-foreground hover:text-foreground"
      >
        <Plus className="w-5 h-5" />
        Create Playlist
      </Button>

      {/* Library Section */}
      <div className="flex-1 overflow-hidden">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Your Library
        </h3>
        <div className="space-y-1 overflow-auto">
          {libraryItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${
                  isActive
                    ? "bg-secondary/20 text-secondary"
                    : "text-muted-foreground hover:text-foreground hover:bg-card-hover"
                }`
              }
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </NavLink>
          ))}
          
          {/* Sample Playlists */}
          <div className="pt-4 space-y-1">
            {["My Playlist #1", "Chill Vibes", "Workout Mix", "Road Trip"].map((playlist) => (
              <NavLink
                key={playlist}
                to={`/playlist/${playlist.toLowerCase().replace(/\s+/g, '-')}`}
                className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-lg transition-all hover:bg-card-hover"
              >
                {playlist}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
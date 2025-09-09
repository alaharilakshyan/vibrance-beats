import { Play, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const featuredPlaylists = [
  {
    id: 1,
    title: "Daily Mix 1",
    description: "The Weeknd, Dua Lipa, Ariana Grande and more",
    coverUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop&crop=center"
  },
  {
    id: 2,
    title: "Discover Weekly",
    description: "Your weekly mixtape of fresh music",
    coverUrl: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&h=300&fit=crop&crop=center"
  },
  {
    id: 3,
    title: "Release Radar",
    description: "Catch all the latest music from artists you follow",
    coverUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop&crop=center"
  },
  {
    id: 4,
    title: "Chill Hits",
    description: "Kick back to the best new and recent chill hits",
    coverUrl: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop&crop=center"
  },
  {
    id: 5,
    title: "Pop Rising",
    description: "Pop that's bubbling up",
    coverUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop&crop=center"
  },
  {
    id: 6,
    title: "Electronic Focus",
    description: "Electronic beats to help you focus",
    coverUrl: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=300&h=300&fit=crop&crop=center"
  },
];

const recentlyPlayed = [
  { title: "Liked Songs", type: "Playlist", count: "47 songs" },
  { title: "My Playlist #1", type: "Playlist", count: "23 songs" },
  { title: "After Hours", type: "Album", count: "The Weeknd" },
  { title: "Chill Vibes", type: "Playlist", count: "31 songs" },
  { title: "Future Nostalgia", type: "Album", count: "Dua Lipa" },
  { title: "Workout Mix", type: "Playlist", count: "18 songs" },
];

export default function Home() {
  const getTimeGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{getTimeGreeting()}</h1>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <Clock className="w-4 h-4 mr-2" />
            Recently played
          </Button>
        </div>
      </div>

      {/* Quick Access Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recentlyPlayed.map((item, index) => (
          <div
            key={index}
            className="bg-card hover:bg-card-hover rounded-lg overflow-hidden cursor-pointer transition-all duration-200 hover-lift group"
          >
            <div className="flex items-center">
              <div className="w-16 h-16 bg-gradient-primary flex items-center justify-center text-white font-bold">
                {item.title.charAt(0)}
              </div>
              <div className="flex-1 px-4">
                <h3 className="font-medium text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.type} • {item.count}</p>
              </div>
              <Button
                size="sm"
                variant="ghost"
                className="mr-4 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Play className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Made For You */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Made for you</h2>
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
            Show all
          </Button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {featuredPlaylists.map((playlist) => (
            <div
              key={playlist.id}
              className="group cursor-pointer"
            >
              <div className="relative mb-4">
                <div className="aspect-square rounded-lg overflow-hidden bg-card shadow-md group-hover:shadow-lg transition-all duration-200">
                  <img
                    src={playlist.coverUrl}
                    alt={playlist.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <Button
                  size="sm"
                  className="absolute bottom-2 right-2 w-12 h-12 rounded-full bg-primary hover:bg-primary-glow shadow-glow-primary opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-2 group-hover:translate-y-0"
                >
                  <Play className="w-5 h-5 ml-0.5" />
                </Button>
              </div>
              <div className="space-y-1">
                <h3 className="font-medium text-foreground group-hover:underline">
                  {playlist.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {playlist.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recently Played Albums/Artists could go here */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Jump back in</h2>
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
            Show all
          </Button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {featuredPlaylists.slice(0, 4).map((playlist) => (
            <div
              key={`recent-${playlist.id}`}
              className="group cursor-pointer"
            >
              <div className="relative mb-4">
                <div className="aspect-square rounded-lg overflow-hidden bg-card shadow-md group-hover:shadow-lg transition-all duration-200">
                  <img
                    src={playlist.coverUrl}
                    alt={playlist.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <Button
                  size="sm"
                  className="absolute bottom-2 right-2 w-12 h-12 rounded-full bg-secondary hover:bg-secondary-glow shadow-glow-secondary opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-2 group-hover:translate-y-0"
                >
                  <Play className="w-5 h-5 ml-0.5" />
                </Button>
              </div>
              <div className="space-y-1">
                <h3 className="font-medium text-foreground group-hover:underline">
                  {playlist.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  Last played 2 hours ago
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
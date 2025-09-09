import { Play, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { musicApi, Track } from "@/services/musicApi";
import { usePlaybackStore } from "@/store/playbackStore";

export default function Home() {
  const [trendingTracks, setTrendingTracks] = useState<Track[]>([]);
  const [recommendations, setRecommendations] = useState<Track[]>([]);
  const [newReleases, setNewReleases] = useState<Track[]>([]);
  const { setCurrentTrack, setQueue } = usePlaybackStore();

  useEffect(() => {
    const loadData = async () => {
      try {
        const [trending, recs, releases] = await Promise.all([
          musicApi.getTrendingTracks(),
          musicApi.getRecommendations(),
          musicApi.getNewReleases()
        ]);
        setTrendingTracks(trending);
        setRecommendations(recs);
        setNewReleases(releases);
      } catch (error) {
        console.error('Failed to load home data:', error);
      }
    };
    
    loadData();
  }, []);

  const playTrack = (track: Track) => {
    setCurrentTrack(track);
    setQueue([track], 0);
  };

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

      {/* Trending Section */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Trending Now</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trendingTracks.map((track) => (
            <div
              key={track.id}
              className="group relative bg-card p-6 rounded-lg hover:bg-card-hover transition-all duration-300 hover-lift cursor-pointer"
              onClick={() => playTrack(track)}
            >
              <div className="aspect-square bg-gradient-primary rounded-lg mb-4 overflow-hidden">
                <img
                  src={track.coverUrl}
                  alt={track.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{track.title}</h3>
              <p className="text-sm text-muted-foreground">{track.artist}</p>
              
              {/* Play Button Overlay */}
              <Button
                size="sm"
                className="absolute bottom-6 right-6 w-12 h-12 rounded-full bg-primary hover:bg-primary-glow glow-primary opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
              >
                <Play className="w-5 h-5 ml-0.5" />
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* Recommendations */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Recommended for You</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {recommendations.map((track) => (
            <div
              key={track.id}
              className="flex items-center gap-4 bg-card rounded-lg p-4 hover:bg-card-hover transition-colors cursor-pointer group"
              onClick={() => playTrack(track)}
            >
              <div className="w-12 h-12 rounded overflow-hidden flex-shrink-0">
                <img 
                  src={track.coverUrl} 
                  alt={track.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <span className="font-medium text-foreground group-hover:text-primary transition-colors block truncate">
                  {track.title}
                </span>
                <span className="text-sm text-muted-foreground block truncate">
                  {track.artist}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* New Releases */}
      <section>
        <h2 className="text-2xl font-bold mb-6">New Releases</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {newReleases.map((track) => (
            <div
              key={track.id}
              className="group cursor-pointer"
              onClick={() => playTrack(track)}
            >
              <div className="relative mb-4">
                <div className="aspect-square rounded-lg overflow-hidden bg-card shadow-md group-hover:shadow-lg transition-all duration-200">
                  <img
                    src={track.coverUrl}
                    alt={track.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <Button
                  size="sm"
                  className="absolute bottom-2 right-2 w-12 h-12 rounded-full bg-primary hover:bg-primary-glow glow-primary opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-2 group-hover:translate-y-0"
                >
                  <Play className="w-5 h-5 ml-0.5" />
                </Button>
              </div>
              <div className="space-y-1">
                <h3 className="font-medium text-foreground group-hover:underline">
                  {track.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {track.artist}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
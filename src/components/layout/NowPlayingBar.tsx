import { useState } from "react";
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Shuffle, 
  Repeat,
  Volume2,
  Heart,
  MoreHorizontal,
  Maximize2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

export const NowPlayingBar = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState<'off' | 'all' | 'one'>('off');
  const [volume, setVolume] = useState([70]);
  const [progress, setProgress] = useState([30]);

  // Mock current track data
  const currentTrack = {
    title: "Blinding Lights",
    artist: "The Weeknd",
    album: "After Hours",
    coverUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=80&h=80&fit=crop&crop=center"
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center justify-between px-4 py-3 h-full">
      {/* Currently Playing */}
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <div className="w-14 h-14 rounded-lg overflow-hidden bg-card flex-shrink-0">
          <img 
            src={currentTrack.coverUrl} 
            alt={currentTrack.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="min-w-0">
          <h4 className="text-sm font-medium text-foreground truncate">
            {currentTrack.title}
          </h4>
          <p className="text-xs text-muted-foreground truncate">
            {currentTrack.artist}
          </p>
        </div>
        <Button size="sm" variant="ghost" className="text-muted-foreground hover:text-foreground">
          <Heart className="w-4 h-4" />
        </Button>
      </div>

      {/* Player Controls */}
      <div className="flex flex-col items-center gap-2 flex-1 max-w-md">
        {/* Control Buttons */}
        <div className="flex items-center gap-4">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setIsShuffle(!isShuffle)}
            className={`text-muted-foreground hover:text-foreground ${
              isShuffle ? 'text-primary' : ''
            }`}
          >
            <Shuffle className="w-4 h-4" />
          </Button>
          
          <Button size="sm" variant="ghost" className="text-muted-foreground hover:text-foreground">
            <SkipBack className="w-4 h-4" />
          </Button>
          
          <Button
            size="sm"
            variant="default"
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-8 h-8 rounded-full bg-primary hover:bg-primary-glow shadow-glow-primary"
          >
            {isPlaying ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4 ml-0.5" />
            )}
          </Button>
          
          <Button size="sm" variant="ghost" className="text-muted-foreground hover:text-foreground">
            <SkipForward className="w-4 h-4" />
          </Button>
          
          <Button
            size="sm"
            variant="ghost"
            onClick={() => {
              const modes: ('off' | 'all' | 'one')[] = ['off', 'all', 'one'];
              const currentIndex = modes.indexOf(repeatMode);
              setRepeatMode(modes[(currentIndex + 1) % modes.length]);
            }}
            className={`text-muted-foreground hover:text-foreground ${
              repeatMode !== 'off' ? 'text-primary' : ''
            }`}
          >
            <Repeat className="w-4 h-4" />
            {repeatMode === 'one' && (
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full"></span>
            )}
          </Button>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center gap-2 w-full text-xs text-muted-foreground">
          <span>{formatTime(90)}</span>
          <Slider
            value={progress}
            onValueChange={setProgress}
            max={100}
            step={1}
            className="flex-1"
          />
          <span>{formatTime(300)}</span>
        </div>
      </div>

      {/* Volume & Options */}
      <div className="flex items-center gap-2 flex-1 justify-end">
        <Button size="sm" variant="ghost" className="text-muted-foreground hover:text-foreground">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
        
        <div className="flex items-center gap-2">
          <Volume2 className="w-4 h-4 text-muted-foreground" />
          <Slider
            value={volume}
            onValueChange={setVolume}
            max={100}
            step={1}
            className="w-20"
          />
        </div>
        
        <Button size="sm" variant="ghost" className="text-muted-foreground hover:text-foreground">
          <Maximize2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
import { motion } from "framer-motion";
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
  Maximize2,
  Music
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useMusicStore } from "@/store/musicStore";
import { AudioPlayer } from "@/components/player/AudioPlayer";

export const NowPlayingBar = () => {
  const {
    playback: { currentTrack, isPlaying, volume, progress, repeat, shuffle },
    setIsPlaying,
    setVolume,
    setProgress,
    toggleShuffle,
    toggleRepeat,
    nextTrack,
    previousTrack,
    toggleLikeTrack,
    isTrackLiked,
  } = useMusicStore();

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!currentTrack) {
    return (
      <div className="glass-player border-t border-player-border h-full flex items-center justify-center">
        <div className="flex items-center gap-3 text-muted-foreground">
          <Music className="w-5 h-5" />
          <span className="text-sm">No track selected</span>
        </div>
        <AudioPlayer />
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="glass-player border-t border-player-border h-full"
    >
      <div className="flex items-center justify-between px-6 py-4 h-full">
        {/* Currently Playing */}
        <div className="flex items-center gap-4 min-w-0 flex-1">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="w-16 h-16 rounded-xl overflow-hidden bg-card flex-shrink-0 shadow-lg"
          >
            <img 
              src={currentTrack.artwork || '/placeholder.svg'} 
              alt={currentTrack.title}
              className="w-full h-full object-cover"
            />
          </motion.div>
          <div className="min-w-0 flex-1">
            <motion.h4 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm font-semibold text-foreground truncate mb-1"
            >
              {currentTrack.title}
            </motion.h4>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-xs text-muted-foreground truncate"
            >
              {currentTrack.artist}
            </motion.p>
          </div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Button 
              size="sm" 
              variant="ghost" 
              onClick={() => toggleLikeTrack(currentTrack)}
              className={`text-muted-foreground hover:text-foreground transition-colors ${
                isTrackLiked(currentTrack.id) ? 'text-red-500 hover:text-red-400' : ''
              }`}
            >
              <Heart className={`w-4 h-4 ${isTrackLiked(currentTrack.id) ? 'fill-current' : ''}`} />
            </Button>
          </motion.div>
        </div>

        {/* Player Controls */}
        <div className="flex flex-col items-center gap-3 flex-1 max-w-lg">
          {/* Control Buttons */}
          <div className="flex items-center gap-6">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="sm"
                variant="ghost"
                onClick={toggleShuffle}
                className={`text-muted-foreground hover:text-foreground transition-all duration-200 ${
                  shuffle ? 'text-primary glow-primary' : ''
                }`}
              >
                <Shuffle className="w-4 h-4" />
              </Button>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={previousTrack}
                className="text-muted-foreground hover:text-foreground"
              >
                <SkipBack className="w-5 h-5" />
              </Button>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="sm"
                variant="default"
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-12 h-12 rounded-full bg-gradient-primary hover:scale-105 glow-primary transition-all duration-300"
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5" />
                ) : (
                  <Play className="w-5 h-5 ml-0.5" />
                )}
              </Button>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={nextTrack}
                className="text-muted-foreground hover:text-foreground"
              >
                <SkipForward className="w-5 h-5" />
              </Button>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="sm"
                variant="ghost"
                onClick={toggleRepeat}
                className={`text-muted-foreground hover:text-foreground transition-all duration-200 ${
                  repeat !== 'off' ? 'text-primary glow-primary' : ''
                } relative`}
              >
                <Repeat className="w-4 h-4" />
                {repeat === 'one' && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full shadow-lg"></span>
                )}
              </Button>
            </motion.div>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center gap-3 w-full text-xs text-muted-foreground">
            <span className="w-10 text-right">{formatTime(Math.floor(progress * currentTrack.duration / 100))}</span>
            <Slider
              value={[progress]}
              onValueChange={(value) => setProgress(value[0])}
              max={100}
              step={0.1}
              className="flex-1"
            />
            <span className="w-10">{formatTime(currentTrack.duration)}</span>
          </div>
        </div>

        {/* Volume & Options */}
        <div className="flex items-center gap-3 flex-1 justify-end">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Button size="sm" variant="ghost" className="text-muted-foreground hover:text-foreground">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </motion.div>
          
          <div className="flex items-center gap-3">
            <Volume2 className="w-4 h-4 text-muted-foreground" />
            <Slider
              value={[volume]}
              onValueChange={(value) => setVolume(value[0])}
              max={100}
              step={1}
              className="w-24"
            />
          </div>
          
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Button size="sm" variant="ghost" className="text-muted-foreground hover:text-foreground">
              <Maximize2 className="w-4 h-4" />
            </Button>
          </motion.div>
        </div>
      </div>
      <AudioPlayer />
    </motion.div>
  );
};
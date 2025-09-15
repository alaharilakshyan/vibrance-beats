import { motion } from 'framer-motion';
import { Play, Pause, Heart, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Track } from '@/services/musicApi';
import { useMusicStore } from '@/store/musicStore';

interface TrackItemProps {
  track: Track;
  index?: number;
  showArtwork?: boolean;
  className?: string;
}

export const TrackItem = ({ 
  track, 
  index, 
  showArtwork = true, 
  className = '' 
}: TrackItemProps) => {
  const {
    playback: { currentTrack, isPlaying },
    playTrack,
    setIsPlaying,
    toggleLikeTrack,
    isTrackLiked,
  } = useMusicStore();

  const isCurrentTrack = currentTrack?.id === track.id;
  const isLiked = isTrackLiked(track.id);

  const handlePlayPause = () => {
    if (isCurrentTrack) {
      setIsPlaying(!isPlaying);
    } else {
      playTrack(track);
    }
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: (index || 0) * 0.05 }}
      className={`group flex items-center gap-4 p-3 rounded-lg hover:bg-card-hover transition-all duration-300 ${
        isCurrentTrack ? 'bg-card-hover' : ''
      } ${className}`}
    >
      {index !== undefined && (
        <div className="w-4 text-sm text-muted-foreground flex-shrink-0">
          {isCurrentTrack && isPlaying ? (
            <div className="flex items-center justify-center">
              <div className="flex gap-0.5">
                <div className="w-0.5 h-3 bg-primary animate-pulse" />
                <div className="w-0.5 h-3 bg-primary animate-pulse delay-75" />
                <div className="w-0.5 h-3 bg-primary animate-pulse delay-150" />
              </div>
            </div>
          ) : (
            <span className="group-hover:hidden">{index + 1}</span>
          )}
          <Button
            size="sm"
            variant="ghost"
            onClick={handlePlayPause}
            className="hidden group-hover:flex w-8 h-8 p-0 hover:bg-primary/20"
          >
            {isCurrentTrack && isPlaying ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4 ml-0.5" />
            )}
          </Button>
        </div>
      )}

      {showArtwork && (
        <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 group">
          <img
            src={track.artwork || '/placeholder.svg'}
            alt={track.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Button
              size="sm"
              variant="ghost"
              onClick={handlePlayPause}
              className="w-8 h-8 p-0 hover:bg-primary/20"
            >
              {isCurrentTrack && isPlaying ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4 ml-0.5" />
              )}
            </Button>
          </div>
        </div>
      )}

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h4 
            className={`font-medium truncate text-sm ${
              isCurrentTrack ? 'text-primary' : 'text-foreground'
            }`}
          >
            {track.title}
          </h4>
          {isCurrentTrack && isPlaying && (
            <div className="flex items-center gap-1">
              <div className="w-1 h-1 bg-primary rounded-full animate-pulse" />
              <div className="w-1 h-1 bg-primary rounded-full animate-pulse delay-75" />
              <div className="w-1 h-1 bg-primary rounded-full animate-pulse delay-150" />
            </div>
          )}
        </div>
        <p className="text-xs text-muted-foreground truncate">
          {track.artist}
        </p>
      </div>

      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          size="sm"
          variant="ghost"
          onClick={() => toggleLikeTrack(track)}
          className={`w-8 h-8 p-0 ${
            isLiked ? 'text-red-500 hover:text-red-400' : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
        </Button>
        
        <Button
          size="sm"
          variant="ghost"
          className="w-8 h-8 p-0 text-muted-foreground hover:text-foreground"
        >
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </div>

      <div className="text-xs text-muted-foreground w-10 text-right flex-shrink-0">
        {formatDuration(track.duration)}
      </div>
    </motion.div>
  );
};
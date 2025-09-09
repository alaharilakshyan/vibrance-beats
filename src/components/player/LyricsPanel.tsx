import { X, Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePlaybackStore } from "@/store/playbackStore";

export const LyricsPanel = () => {
  const { currentTrack, showLyrics, toggleLyrics } = usePlaybackStore();

  if (!showLyrics) return null;

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-xl z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-border">
        <div className="flex items-center gap-4">
          {currentTrack ? (
            <>
              <img 
                src={currentTrack.coverUrl} 
                alt={currentTrack.title}
                className="w-12 h-12 rounded-lg"
              />
              <div>
                <h3 className="font-semibold text-foreground">{currentTrack.title}</h3>
                <p className="text-sm text-muted-foreground">{currentTrack.artist}</p>
              </div>
            </>
          ) : (
            <>
              <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                <Music className="w-6 h-6 text-muted-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-muted-foreground">No track selected</h3>
              </div>
            </>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleLyrics}
          className="text-muted-foreground hover:text-foreground"
        >
          <X className="w-5 h-5" />
        </Button>
      </div>

      {/* Lyrics Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-2xl mx-auto">
          {currentTrack?.lyrics ? (
            <div className="space-y-4">
              {currentTrack.lyrics.split('\n').map((line, index) => (
                <p 
                  key={index}
                  className="text-lg leading-relaxed text-foreground/90 hover:text-primary transition-colors cursor-pointer"
                >
                  {line || '\u00A0'}
                </p>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Music className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-medium text-muted-foreground mb-2">
                No lyrics available
              </h3>
              <p className="text-muted-foreground">
                Lyrics for this track are not available.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
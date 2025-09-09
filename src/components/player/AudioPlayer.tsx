import { useEffect, useRef } from 'react';
import { usePlaybackStore } from '@/store/playbackStore';

export const AudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const { 
    currentTrack, 
    isPlaying, 
    volume, 
    setProgress, 
    setDuration, 
    playNext,
    repeatMode 
  } = usePlaybackStore();

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch(console.error);
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume / 100;
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack?.previewUrl) return;

    audio.src = currentTrack.previewUrl;
    audio.load();
    
    if (isPlaying) {
      audio.play().catch(console.error);
    }
  }, [currentTrack]);

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (!audio) return;

    setProgress((audio.currentTime / audio.duration) * 100);
  };

  const handleLoadedMetadata = () => {
    const audio = audioRef.current;
    if (!audio) return;

    setDuration(audio.duration);
  };

  const handleEnded = () => {
    if (repeatMode === 'one') {
      const audio = audioRef.current;
      if (audio) {
        audio.currentTime = 0;
        audio.play().catch(console.error);
      }
    } else {
      playNext();
    }
  };

  return (
    <audio
      ref={audioRef}
      onTimeUpdate={handleTimeUpdate}
      onLoadedMetadata={handleLoadedMetadata}
      onEnded={handleEnded}
      preload="metadata"
    />
  );
};
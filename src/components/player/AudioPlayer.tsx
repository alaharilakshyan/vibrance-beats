import { useEffect, useRef } from 'react';
import { useMusicStore } from '@/store/musicStore';

export const AudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const {
    playback: { currentTrack, isPlaying, volume, progress },
    setIsPlaying,
    setProgress,
    setDuration,
    nextTrack,
  } = useMusicStore();

  // Handle play/pause
  useEffect(() => {
    if (!audioRef.current || !currentTrack) return;

    if (isPlaying) {
      audioRef.current.play().catch(console.error);
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentTrack]);

  // Handle track change
  useEffect(() => {
    if (!audioRef.current || !currentTrack) return;

    audioRef.current.src = currentTrack.previewUrl;
    audioRef.current.load();

    if (isPlaying) {
      audioRef.current.play().catch(console.error);
    }
  }, [currentTrack]);

  // Handle volume change
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = volume / 100;
  }, [volume]);

  // Handle progress seek
  useEffect(() => {
    if (!audioRef.current) return;
    const audio = audioRef.current;
    const targetTime = (progress / 100) * audio.duration;
    
    if (Math.abs(audio.currentTime - targetTime) > 1) {
      audio.currentTime = targetTime;
    }
  }, [progress]);

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    const audio = audioRef.current;
    const newProgress = (audio.currentTime / audio.duration) * 100;
    setProgress(newProgress);
  };

  const handleLoadedMetadata = () => {
    if (!audioRef.current) return;
    setDuration(audioRef.current.duration);
  };

  const handleEnded = () => {
    nextTrack();
  };

  const handleError = () => {
    console.error('Audio playback error');
    setIsPlaying(false);
  };

  return (
    <audio
      ref={audioRef}
      onTimeUpdate={handleTimeUpdate}
      onLoadedMetadata={handleLoadedMetadata}
      onEnded={handleEnded}
      onError={handleError}
      onPlay={() => setIsPlaying(true)}
      onPause={() => setIsPlaying(false)}
      preload="metadata"
    />
  );
};
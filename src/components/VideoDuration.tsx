import React, { useState, useEffect } from 'react';

interface VideoDurationProps {
  videoUrl: string;
  onDurationLoaded: (duration: number) => void;
}

const VideoDuration: React.FC<VideoDurationProps> = ({ videoUrl, onDurationLoaded }) => {
  const [duration, setDuration] = useState<number | null>(null);

  useEffect(() => {
    const videoElement = document.createElement('video');

    const handleLoadedMetadata = () => {
      setDuration(videoElement.duration);
      onDurationLoaded(videoElement.duration);
    };

    videoElement.addEventListener('loadedmetadata', handleLoadedMetadata);
    videoElement.src = videoUrl;

    // Cleanup event listener on unmount
    return () => {
      videoElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, [videoUrl, onDurationLoaded]);

  const formatDuration = (duration: number) => {
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    const hoursString = hours > 0 ? `${hours}h ` : '';
    const minutesString = `${minutes}m`;
    return `${hoursString}${minutesString}`;
  };

  return (
    <div>
      {duration !== null && (
        <p>{formatDuration(duration)}</p>
      )}
    </div>
  );
};

export default VideoDuration;

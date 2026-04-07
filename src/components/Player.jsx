import React, { useContext, useState } from 'react';
import { 
  Play, Pause, SkipBack, SkipForward, 
  Shuffle, Repeat, Volume2, VolumeX, Heart 
} from 'lucide-react';
import { MusicContext } from '../context/MusicContext';
import './Player.css';

const formatTime = (time) => {
  if (isNaN(time)) return "0:00";
  const mins = Math.floor(time / 60);
  const secs = Math.floor(time % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

const Player = () => {
  const { 
    currentSong, isPlaying, togglePlay, volume, setVolume, 
    currentTime, duration, seek, playNextSong, playPrevSong,
    likedSongs, toggleLike
  } = useContext(MusicContext);

  const [isMuted, setIsMuted] = useState(false);
  const [prevVolume, setPrevVolume] = useState(volume);

  const isLiked = likedSongs.includes(currentSong?.id);

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (val === 0) setIsMuted(true);
    else setIsMuted(false);
  };

  const toggleMute = () => {
    if (isMuted) {
      setVolume(prevVolume > 0 ? prevVolume : 0.5);
      setIsMuted(false);
    } else {
      setPrevVolume(volume);
      setVolume(0);
      setIsMuted(true);
    }
  };

  const handleSeek = (e) => {
    seek(parseFloat(e.target.value));
  };

  const progressPercent = duration ? (currentTime / duration) * 100 : 0;
  const volumePercent = volume * 100;

  return (
    <div className="player">
      <div className="player-left">
        {currentSong && (
          <>
            <img src={currentSong.coverUrl} alt="cover" className="player-cover hover-scale" />
            <div className="player-info truncate">
              <div className="player-title truncate hover-scale">{currentSong.title}</div>
              <div className="player-artist truncate hover-scale">{currentSong.artist}</div>
            </div>
            <Heart 
              size={18} 
              className={`hover-scale ${isLiked ? 'liked' : 'text-subdued'}`}
              fill={isLiked ? "var(--accent-base)" : "transparent"}
              color={isLiked ? "var(--accent-base)" : "currentColor"}
              onClick={() => toggleLike(currentSong.id)}
              style={{ cursor: 'pointer', marginLeft: '16px' }}
            />
          </>
        )}
      </div>

      <div className="player-center">
        <div className="player-controls">
          <button className="control-btn text-subdued hover-scale"><Shuffle size={16} /></button>
          <button className="control-btn text-primary hover-scale" onClick={playPrevSong}><SkipBack size={20} fill="currentColor" /></button>
          
          <button className="play-pause-btn hover-scale" onClick={togglePlay}>
            {isPlaying ? <Pause size={20} fill="black" /> : <Play size={20} fill="black" style={{ marginLeft: '2px' }} />}
          </button>
          
          <button className="control-btn text-primary hover-scale" onClick={playNextSong}><SkipForward size={20} fill="currentColor" /></button>
          <button className="control-btn text-subdued hover-scale"><Repeat size={16} /></button>
        </div>
        
        <div className="playback-bar">
          <span className="time-text">{formatTime(currentTime)}</span>
          <div className="progress-container">
            <input 
              type="range" 
              min="0" 
              max={duration || 100} 
              value={currentTime} 
              onChange={handleSeek} 
              style={{ background: `linear-gradient(to right, ${isPlaying ? 'var(--accent-base)' : '#fff'} ${progressPercent}%, #535353 ${progressPercent}%)` }}
            />
          </div>
          <span className="time-text">{formatTime(duration)}</span>
        </div>
      </div>

      <div className="player-right">
        <div className="volume-controls">
          <button className="control-btn text-subdued hover-scale" onClick={toggleMute}>
            {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
          <div className="volume-bar">
            <input 
              type="range" 
              min="0" 
              max="1" 
              step="0.01" 
              value={volume} 
              onChange={handleVolumeChange}
              style={{ background: `linear-gradient(to right, #fff ${volumePercent}%, #535353 ${volumePercent}%)` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;

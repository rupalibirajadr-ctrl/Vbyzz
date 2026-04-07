import React, { createContext, useState, useRef, useEffect } from 'react';
import { songs as offlineData } from '../data';
import { getPlaylistTracks, searchSpotify } from '../spotifyApi';

export const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
  const [songs, setSongs] = useState(offlineData);
  const [currentSong, setCurrentSong] = useState(offlineData[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playlists, setPlaylists] = useState([
    { id: 1, name: 'My Favorite Hits', songs: [1, 2, 3] },
    { id: 2, name: 'Chill Vibes', songs: [4, 5] },
  ]);
  const [likedSongs, setLikedSongs] = useState([1, 4]); // IDs of liked songs
  
  const [volume, setVolume] = useState(0.5);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef(new Audio(currentSong?.audioUrl || ''));

  useEffect(() => {
    // Fetch initial tracks (Global Top 50 default)
    getPlaylistTracks().then(tracks => {
      if (tracks && tracks.length > 0) {
        setSongs(tracks);
        setCurrentSong(tracks[0]);
      }
    });
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    
    const setAudioData = () => {
      setDuration(audio.duration);
    };
    const setAudioTime = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
       playNextSong();
    };

    audio.addEventListener('loadeddata', setAudioData);
    audio.addEventListener('timeupdate', setAudioTime);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('loadeddata', setAudioData);
      audio.removeEventListener('timeupdate', setAudioTime);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  useEffect(() => {
    if (currentSong?.audioUrl) {
      audioRef.current.src = currentSong.audioUrl;
      if (isPlaying) {
        audioRef.current.play().catch(e => console.log('Playback prevented', e));
      }
    } else {
      audioRef.current.pause();
    }
  }, [currentSong]);

  useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play().catch(e => console.log('Playback prevented', e));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const playSong = (song) => {
    setCurrentSong(song);
    setIsPlaying(true);
  };

  const toggleLike = (songId) => {
    setLikedSongs(prev => 
      prev.includes(songId) 
        ? prev.filter(id => id !== songId) 
        : [...prev, songId]
    );
  };

  const createPlaylist = (name) => {
    setPlaylists([...playlists, { id: Date.now(), name, songs: [] }]);
  };
  
  const seek = (time) => {
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };
  
  const playNextSong = () => {
    const currentIndex = songs.findIndex(s => s.id === currentSong.id);
    const nextIndex = (currentIndex + 1) % songs.length;
    setCurrentSong(songs[nextIndex]);
    setIsPlaying(true);
  };

  const playPrevSong = () => {
    if (currentTime > 3) {
      seek(0);
      return;
    }
    const currentIndex = songs.findIndex(s => s.id === currentSong.id);
    const prevIndex = currentIndex === 0 ? songs.length - 1 : currentIndex - 1;
    setCurrentSong(songs[prevIndex]);
    setIsPlaying(true);
  };

  const [theme, setTheme] = useState('dark');
  const [searchQuery, setSearchQuery] = useState('');

  // Spotify Search Debounce
  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchQuery.trim().length > 2) {
        searchSpotify(searchQuery).then(tracks => {
          if (tracks && tracks.length > 0) setSongs(tracks);
        });
      } else if (searchQuery.trim().length === 0) {
        getPlaylistTracks().then(tracks => {
          if (tracks && tracks.length > 0) setSongs(tracks);
        });
      }
    }, 500);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <MusicContext.Provider value={{
      currentSong, isPlaying, playlists, likedSongs,
      volume, currentTime, duration, songs, theme, searchQuery,
      togglePlay, playSong, toggleLike, createPlaylist,
      setVolume, seek, playNextSong, playPrevSong, toggleTheme, setSearchQuery
    }}>
      {children}
    </MusicContext.Provider>
  );
};

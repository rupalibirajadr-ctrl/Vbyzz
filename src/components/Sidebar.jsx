import React, { useContext, useState } from 'react';
import { Home, Search, Library, PlusSquare, Heart, Plus, MapPin, AudioLines } from 'lucide-react';
import { MusicContext } from '../context/MusicContext';
import './Sidebar.css';

const Sidebar = () => {
  const { playlists, createPlaylist } = useContext(MusicContext);
  const [isCreating, setIsCreating] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');

  const handleCreatePlaylist = (e) => {
    e.preventDefault();
    if (newPlaylistName.trim()) {
      createPlaylist(newPlaylistName);
      setNewPlaylistName('');
      setIsCreating(false);
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar-box nav-box">
        <div className="spotify-brand">
          <div className="premium-logo">
            <AudioLines size={24} color="white" />
          </div>
          <span className="brand-text">Vbyzz</span>
        </div>
        <ul className="nav-links">
          <li className="nav-item active hover-scale">
            <Home size={24} />
            <span>Home</span>
          </li>
          <li className="nav-item hover-scale">
            <Search size={24} />
            <span>Search</span>
          </li>
        </ul>
      </div>

      <div className="sidebar-box library-box">
        <div className="library-header flex-center">
          <div className="nav-item">
            <Library size={24} />
            <span>Your Library</span>
          </div>
          <button className="add-btn hover-scale" onClick={() => setIsCreating(!isCreating)}>
            <Plus size={20} />
          </button>
        </div>

        <div className="action-buttons">
          <div className="action-btn hover-scale" onClick={() => setIsCreating(true)}>
            <div className="icon-bg square"><PlusSquare size={16} /></div>
            <span>Create Playlist</span>
          </div>
          <div className="action-btn hover-scale">
            <div className="icon-bg gradient"><Heart size={16} fill="white"/></div>
            <span>Liked Songs</span>
          </div>
        </div>

        {isCreating && (
          <form className="create-playlist-form fade-in" onSubmit={handleCreatePlaylist}>
            <input 
              autoFocus
              type="text" 
              placeholder="My Playlist #1" 
              value={newPlaylistName}
              onChange={(e) => setNewPlaylistName(e.target.value)}
            />
            <button type="submit">Create</button>
          </form>
        )}

        <hr className="divider" />

        <div className="playlists-container custom-scrollbar">
          <ul>
            {playlists.map(pl => (
              <li key={pl.id} className="playlist-item hover-scale">{pl.name}</li>
            ))}
          </ul>
        </div>
        
        <div className="sidebar-footer">
          <span>Crafted by RUPALI</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

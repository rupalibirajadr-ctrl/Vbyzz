import React, { useContext } from 'react';
import { Play, Heart, Clock, Moon, Sun, Search } from 'lucide-react';
import { MusicContext } from '../context/MusicContext';
import './MainContent.css';

const MainContent = () => {
  const { songs, playSong, currentSong, isPlaying, togglePlay, likedSongs, toggleLike, theme, toggleTheme, searchQuery, setSearchQuery } = useContext(MusicContext);

  const greeting = new Date().getHours() < 12 ? "Good morning" : new Date().getHours() < 18 ? "Good afternoon" : "Good evening";

  return (
    <div className="main-content">
      <div className="top-nav">
        <div className="nav-arrows">
           <button className="nav-arrow">&lt;</button>
           <button className="nav-arrow">&gt;</button>
           <div className="search-bar">
             <Search size={20} className="text-subdued search-icon" />
             <input 
               type="text" 
               placeholder="What do you want to listen to?" 
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               autoFocus
             />
           </div>
        </div>
        <div className="user-profile">
          <button className="theme-toggle-btn hover-scale" onClick={toggleTheme}>
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button className="upgrade-btn hover-scale">Explore Premium</button>
          <div className="profile-icon">A</div>
        </div>
      </div>

      <div className="header-bg"></div>

      <div className="content-container fade-in">
        <h1 className="greeting">{greeting}</h1>

        <div className="quick-picks grid-cards">
          {songs.slice(0, 6).map(song => {
            const isActive = currentSong?.id === song.id;
            return (
              <div 
                key={song.id} 
                className="quick-card hover-scale"
                onClick={() => isActive ? togglePlay() : playSong(song)}
              >
                <img src={song.coverUrl} alt={song.title} />
                <span className="truncate">{song.title}</span>
                <div className={`play-btn-overlay ${isActive && isPlaying ? 'active' : ''}`}>
                  <Play size={20} fill="black" />
                </div>
              </div>
            );
          })}
        </div>

        <div className="section-header">
           <h2>New Releases</h2>
        </div>
        
        <div className="featured-row">
          {songs.slice(6, 11).map(song => {
            const isActive = currentSong?.id === song.id;
            return (
              <div 
                key={`featured-${song.id}`} 
                className="featured-card hover-scale"
                onClick={() => isActive ? togglePlay() : playSong(song)}
              >
                <div className="featured-img-container">
                  <img src={song.coverUrl} alt={song.title} />
                  <div className={`play-btn-overlay ${isActive && isPlaying ? 'active' : ''}`}>
                    <Play size={24} fill="black" />
                  </div>
                </div>
                <div className="featured-card-info">
                  <span className="featured-title truncate">{song.title}</span>
                  <span className="featured-desc truncate text-subdued">{song.artist}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="section-header">
           <h2>Songs for you</h2>
        </div>

        <div className="songs-table">
          <div className="table-header text-subdued border-bottom">
            <div>#</div>
            <div>Title</div>
            <div>Album</div>
            <div><Clock size={16} /></div>
          </div>
          
          <div className="table-body">
            {songs.length > 0 ? songs.map((song, index) => {
              const isActive = currentSong?.id === song.id;
              const isLiked = likedSongs.includes(song.id);
              
              return (
                <div 
                  key={song.id} 
                  className={`table-row ${isActive ? 'active-row' : ''}`}
                  onDoubleClick={() => playSong(song)}
                >
                  <div className="row-num text-subdued">
                    {isActive && isPlaying ? <div className="equalizer-icon">ılılı</div> : index + 1}
                  </div>
                  <div className="row-title">
                    <img src={song.coverUrl} alt="cover" className="row-cover"/>
                    <div className="title-details truncate">
                      <div className={`title-name truncate ${isActive ? 'active-text' : ''}`}>{song.title}</div>
                      <div className="title-artist text-subdued truncate">{song.artist}</div>
                    </div>
                  </div>
                  <div className="row-album text-subdued truncate">{song.album}</div>
                  <div className="row-actions text-subdued">
                    <Heart 
                      size={18} 
                      className={`heart-icon ${isLiked ? 'liked' : 'hover-scale'}`} 
                      fill={isLiked ? "var(--accent-base)" : "transparent"}
                      color={isLiked ? "var(--accent-base)" : "currentColor"}
                      onClick={(e) => { e.stopPropagation(); toggleLike(song.id); }}
                    />
                    <span>{song.duration}</span>
                  </div>
                </div>
              );
            }) : <div style={{padding: '24px', color: 'var(--text-secondary)'}}>No songs found matching your search.</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContent;

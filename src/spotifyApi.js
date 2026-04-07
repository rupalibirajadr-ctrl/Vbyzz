const CLIENT_ID = '4a1ad2d2e3f046bd89b63c461bf1ff0a';
const CLIENT_SECRET = 'c04136e6c4bc475083b4a1c05c25d5c7';

let accessToken = '';

export const getAccessToken = async () => {
  if (accessToken) return accessToken;

  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET)
      },
      body: 'grant_type=client_credentials'
    });

    const data = await response.json();
    accessToken = data.access_token;
    
    // reset token after expiration
    setTimeout(() => { accessToken = ''; }, data.expires_in * 1000);
    
    return accessToken;
  } catch (error) {
    console.error('Error fetching Spotify token:', error);
    return null;
  }
};

export const searchSpotify = async (query) => {
  const token = await getAccessToken();
  if (!token) return [];

  try {
    const offsets = [0, 10, 20, 30, 40];
    const fetchPromises = offsets.map(offset => 
      fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=10&offset=${offset}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      }).then(res => res.json())
    );

    const results = await Promise.all(fetchPromises);
    
    let allTracks = [];
    results.forEach(data => {
      if (data && data.tracks && data.tracks.items) {
        allTracks = [...allTracks, ...data.tracks.items];
      }
    });

    return formatSpotifyTracks(allTracks);
  } catch (error) {
    console.error('Error searching Spotify:', error);
    return [];
  }
};

export const getPlaylistTracks = async () => {
  return await searchSpotify('top hits');
};

const formatSpotifyTracks = (tracks) => {
  return tracks.map((track, i) => {
    // Format duration from ms to m:ss
    const totalSeconds = Math.floor(track.duration_ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    
    return {
      id: track.id || i,
      title: track.name,
      artist: track.artists.map(a => a.name).join(', '),
      album: track.album.name,
      coverUrl: track.album.images[0]?.url || 'https://via.placeholder.com/300',
      audioUrl: track.preview_url, // Note: This will be null for some tracks
      duration: `${minutes}:${seconds.toString().padStart(2, '0')}`,
      spotifyUrl: track.external_urls?.spotify
    };
  });
};

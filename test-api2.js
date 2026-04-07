const CLIENT_ID = '4a1ad2d2e3f046bd89b63c461bf1ff0a';
const CLIENT_SECRET = 'c04136e6c4bc475083b4a1c05c25d5c7';

async function test() {
  const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64')
    },
    body: 'grant_type=client_credentials'
  });
  const { access_token } = await tokenRes.json();

  try {
    const sResponse = await fetch('https://api.spotify.com/v1/search?q=top%20hits&type=track&limit=5', {
        headers: { 'Authorization': 'Bearer ' + access_token }
    });
    const sData = await sResponse.json();
    
    const formatted = sData.tracks.items.map((track, i) => {
      const totalSeconds = Math.floor(track.duration_ms / 1000);
      return {
        title: track.name,
        artist: track.artists.map(a => a.name).join(', '),
        album: track.album.name,
        coverUrl: track.album.images[0]?.url,
        audioUrl: track.preview_url
      };
    });
    console.log("FORMATTED:", formatted);
  } catch(e) {
    console.error("ERROR:", e);
  }
}
test();

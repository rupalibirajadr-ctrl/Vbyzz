const CLIENT_ID = '4a1ad2d2e3f046bd89b63c461bf1ff0a';
const CLIENT_SECRET = 'c04136e6c4bc475083b4a1c05c25d5c7';

async function test() {
  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64')
      },
      body: 'grant_type=client_credentials'
    });

    const data = await response.json();

    if (data.access_token) {
        const pResponse = await fetch('https://api.spotify.com/v1/playlists/37i9dQZEVXbMDoHDwVN2tF/tracks?limit=5', {
            headers: { 'Authorization': 'Bearer ' + data.access_token }
        });
        const pData = await pResponse.json();
        console.log("PLAYLIST RESPONSE:", JSON.stringify(pData));

        const sResponse = await fetch('https://api.spotify.com/v1/search?q=taylor&type=track&limit=2', {
            headers: { 'Authorization': 'Bearer ' + data.access_token }
        });
        const sData = await sResponse.json();
        console.log("SEARCH RESPONSE:", JSON.stringify(sData));
    } else {
        console.log("No access token:", data);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}
test();

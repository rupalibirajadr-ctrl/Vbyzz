const fs = require('fs');

const englishSongs = [
  { title: "Cruel Summer", artist: "Taylor Swift", album: "Lover" },
  { title: "Paint The Town Red", artist: "Doja Cat", album: "Scarlet" },
  { title: "Vampire", artist: "Olivia Rodrigo", album: "GUTS" },
  { title: "Seven", artist: "Jung Kook", album: "Golden" },
  { title: "Flowers", artist: "Miley Cyrus", album: "Endless Summer Vacation" },
  { title: "Anti-Hero", artist: "Taylor Swift", album: "Midnights" },
  { title: "Kill Bill", artist: "SZA", album: "SOS" },
  { title: "Last Night", artist: "Morgan Wallen", album: "One Thing at a Time" },
  { title: "Greedy", artist: "Tate McRae", album: "Greedy" },
  { title: "Water", artist: "Tyla", album: "Water" },
  { title: "Is It Over Now?", artist: "Taylor Swift", album: "1989 (Taylor's Version)" },
  { title: "Snooze", artist: "SZA", album: "SOS" },
  { title: "Cruel Summer", artist: "Taylor Swift", album: "Lover" }, // duplicate for padding
  { title: "Calm Down", artist: "Rema, Selena Gomez", album: "Rave & Roses" },
  { title: "As It Was", artist: "Harry Styles", album: "Harry's House" }
];

const hindiSongs = [
  { title: "Chaleya", artist: "Arijit Singh", album: "Jawan" },
  { title: "Heeriye", artist: "Arijit Singh, Jasleen Royal", album: "Heeriye" },
  { title: "O Maahi", artist: "Arijit Singh", album: "Dunki" },
  { title: "Apna Bana Le", artist: "Arijit Singh", album: "Bhediya" },
  { title: "Satranga", artist: "Arijit Singh", album: "Animal" },
  { title: "Ve Kamleya", artist: "Arijit Singh, Shreya Ghoshal", album: "Rocky Aur Rani Kii Prem Kahaani" },
  { title: "Phir Aur Kya Chahiye", artist: "Arijit Singh", album: "Zara Hatke Zara Bachke" },
  { title: "Tere Vaaste", artist: "Varun Jain", album: "Zara Hatke Zara Bachke" },
  { title: "Sher Khul Gaye", artist: "Vishal Dadlani", album: "Fighter" },
  { title: "Pehle Bhi Main", artist: "Vishal Mishra", album: "Animal" },
  { title: "Kesariya", artist: "Arijit Singh", album: "Brahmastra" },
  { title: "Maan Meri Jaan", artist: "King", album: "Champagne Talk" },
  { title: "Jhoome Jo Pathaan", artist: "Arijit Singh", album: "Pathaan" },
  { title: "Kahani Suno 2.0", artist: "Kaifi Khalil", album: "Kahani Suno" },
  { title: "What Jhumka?", artist: "Arijit Singh", album: "Rocky Aur Rani Kii Prem Kahaani" }
];

const punjabiSongs = [
  { title: "Lover", artist: "Diljit Dosanjh", album: "MoonChild Era" },
  { title: "Excuses", artist: "AP Dhillon, Gurinder Gill", album: "Hidden Gems" },
  { title: "Brown Munde", artist: "AP Dhillon", album: "Brown Munde" },
  { title: "Maan Meri Jaan", artist: "King", album: "Champagne Talk" },
  { title: "Summer High", artist: "AP Dhillon", album: "Summer High" },
  { title: "No Love", artist: "Shubh", album: "No Love" },
  { title: "Elevated", artist: "Shubh", album: "Elevated" },
  { title: "Cheques", artist: "Shubh", album: "Still Rollin" },
  { title: "GOAT", artist: "Diljit Dosanjh", album: "G.O.A.T." },
  { title: "Peaches", artist: "Diljit Dosanjh", album: "Drive Thru" },
  { title: "We Rollin", artist: "Shubh", album: "We Rollin" },
  { title: "Lemonade", artist: "Diljit Dosanjh", album: "Drive Thru" },
  { title: "Kala Chashma", artist: "Amar Arshi", album: "Baar Baar Dekho" },
  { title: "Kya Baat Ay", artist: "Harrdy Sandhu", album: "Kya Baat Ay" },
  { title: "Naah", artist: "Harrdy Sandhu", album: "Naah" }
];

const urduSongs = [
  { title: "Pasoori", artist: "Ali Sethi, Shae Gill", album: "Coke Studio Season 14" },
  { title: "Kahani Suno", artist: "Kaifi Khalil", album: "Kahani Suno" },
  { title: "Aadat", artist: "Atif Aslam", album: "Jal Pari" },
  { title: "Tajdar-e-Haram", artist: "Atif Aslam", album: "Coke Studio Season 8" },
  { title: "Kana Yaari", artist: "Eva B, Kaifi Khalil", album: "Coke Studio Season 14" },
  { title: "Bikhra", artist: "Abdul Hannan, Rovalio", album: "Bikhra" },
  { title: "Iraaday", artist: "Abdul Hannan, Rovalio", album: "Iraaday" },
  { title: "Tu Jhoom", indicator: "Sufi", artist: "Naseebo Lal, Abida Parveen", album: "Coke Studio Season 14" },
  { title: "Dil Diyan Gallan", artist: "Atif Aslam", album: "Tiger Zinda Hai" },
  { title: "Gumaan", artist: "Young Stunners", album: "Gumaan" },
  { title: "Afsanay", artist: "Young Stunners", album: "Afsanay" },
  { title: "Samina", artist: "Asim Azhar", album: "Samina" },
  { title: "Jo Tu Na Mila", artist: "Asim Azhar", album: "Jo Tu Na Mila" },
  { title: "Teri Tasveer", artist: "Bayaan", album: "Suno" },
  { title: "Baari", artist: "Bilal Saeed, Momina Mustehsan", album: "Baari" }
];

const allSongsData = [...englishSongs, ...hindiSongs, ...punjabiSongs, ...urduSongs];

const covers = [
  "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=300&h=300",
  "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&q=80&w=300&h=300",
  "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=300&h=300",
  "https://images.unsplash.com/photo-1505118380757-91f5f5632af0?auto=format&fit=crop&q=80&w=300&h=300",
  "https://images.unsplash.com/photo-1505852903341-fc8d3db10436?auto=format&fit=crop&q=80&w=300&h=300",
  "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&q=80&w=300&h=300",
  "https://images.unsplash.com/photo-1493225457124-a1a2a5f5f9af?auto=format&fit=crop&q=80&w=300&h=300",
  "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=300&h=300",
  "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=300&h=300",
  "https://images.unsplash.com/photo-1525362081669-2b476bb628c3?auto=format&fit=crop&q=80&w=300&h=300"
];

const songs = allSongsData.map((s, i) => ({
  id: i + 1,
  title: s.title,
  artist: s.artist,
  album: s.album,
  coverUrl: covers[i % covers.length],
  audioUrl: \`https://www.soundhelix.com/examples/mp3/SoundHelix-Song-\${(i % 17) + 1}.mp3\`,
  duration: \`\${Math.floor(Math.random() * 3 + 3)}:\${Math.floor(Math.random() * 50 + 10)}\`
}));

const fileContent = \`export const songs = \${JSON.stringify(songs, null, 2)};\`;

fs.writeFileSync('src/data.js', fileContent);
console.log('Successfully wrote 60 songs to src/data.js');

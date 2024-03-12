const { MongoClient } = require("mongodb");

// Replace the uri string with your connection string.
const uri = "mongodb+srv://simikareem07:X4CEsRfUP4u8eM4e@dreamgang.tkw50gt.mongodb.net/?retryWrites=true&w=majority&appName=DREAMGANG";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


async function run() {
  try {
    // Connect the client to the server (important)
    await client.connect();
    console.log("Connected successfully to server");

    const database = client.db('dreamgang_album');
    const music_songs = database.collection('music');

    // Query for all music records in the collection
    const cursor = music_songs.find({});

    // Convert the cursor to an array of documents
    const allMusic = await cursor.toArray();

    // Log the entire array of music documents
    console.log("All music records:", allMusic);

    // Example: logging titles and artists of each record
    allMusic.forEach(music => {
      console.log("Music title:", music.title);
      console.log("Music artist:", music.artist);
    });

    return allMusic;
    
    } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

run().catch(console.dir);

module.exports = { run };
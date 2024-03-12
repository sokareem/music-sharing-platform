const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const cors = require('cors');
const { run } = require('./connect');
const Track = require('../db/schema');

const app = express();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/') // save files in "uploads" directory
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname) // prefix filenames with the current timestamp
    }
  });
  const upload = multer({ storage: storage });

// The rest of your server setup...
// CORS options
const corsOptions = {
    origin: 'http://localhost:3001', // Allow only the frontend origin to access
    optionsSuccessStatus: 200, // For legacy browsers
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Allowed HTTP methods
    allowedHeaders: "Content-Type,Authorization" // Allowed HTTP headers
  };
  
// Use CORS middleware with options
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define routes
app.get('/', (req, res) => {
  res.send('Music Sharing Platform API');
});


// Fetch tracks route
app.get('/api/tracks', async (req, res) => {
  try {
    // connect and retrieve data
    const music = await run(); // Make sure this function returns the data correctly
    console.log("Music content: ",music)
    res.json(music); // Send the data as JSON

  } catch (error) {
    console.error("Failed to fetch tracks:", error);
    res.status(500).send("Server error");
  }
});

app.post('/upload', upload.fields([{ name: 'audio', maxCount: 1 }, { name: 'image', maxCount: 1 }]), (req, res) => {
    // Example processing form submission and file paths
    const { title, artist } = req.body;
    const filePath = req.files['filePath'] ? req.files['filePath'][0].path : '';
    const musicImage = req.files['music_image'] ? req.files['music_image'][0].path : '';
    const uploadDate = new Date();
      // Assuming "Track" is your Mongoose model for the documents
    const track = new Track({
        title,
        artist,
        filePath,
        music_image: musicImage,
        uploadDate
    });


    console.log("TrackData: ",track);
    // Save trackData to your MongoDB collection
    track.save()
    .then(doc => {
        console.log('Track saved successfully:', doc);
        res.send({ message: 'File uploaded and saved successfully', trackId: doc._id });
    })
    .catch(err => {
        console.error('Error saving track to database:', err);
        res.status(500).send({ message: 'Error saving track to database' });
    });

    
    res.send('File uploaded successfully');
});
  
// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

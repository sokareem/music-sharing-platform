const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // Add any other fields you deem necessary, like creation date, profile info, etc.
});

const trackSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  uploadDate: { type: Date, default: Date.now },
  filePath: { type: String, required: true }, // Path to the file in the filesystem or URL if stored externally
  votes: { type: Number, default: 0 },
  music_image: { type: String, required: false},
  // You might want to reference the user who uploaded the track
//   uploader: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const voteSchema = new mongoose.Schema({
  track: { type: mongoose.Schema.Types.ObjectId, ref: 'Track', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  voteType: { type: String, enum: ['upvote', 'downvote'], required: true },
  voteDate: { type: Date, default: Date.now },
});

// Compile our models
const User = mongoose.model('User', userSchema);
const Track = mongoose.model('Track', trackSchema);
const Vote = mongoose.model('Vote', voteSchema);

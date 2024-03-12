const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('track'), (req, res) => {
  // req.file is the `track` file
  // req.body will hold the text fields, if there were any
  console.log(req.file, req.body);
  res.send('File uploaded successfully.');
});

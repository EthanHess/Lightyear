const massive = require('massive');
//const axios = require('axios');
const express = require('express');
const bodyPaser = require('body-parser');
const session = require('express-session');
const cloudinary = require('cloudinary'); 

//Controllers
const authController = require('./controllers/authController'); 
const friendsController = require('./controllers/friendsController'); 
const archiveController = require('./controllers/archiveController'); 
const postController = require('./controllers/postController'); 

require('dotenv').config();
massive(process.env.CONNECTION_STRING).then(db => app.set('db', db));

// --- When DB is ready for initialization do db.init here ---

const app = express();
app.use(bodyPaser.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  saveUninitialized: false,
  resave: false,
}));
app.use(express.static(`${__dirname}/../build`));

//Networking
app.get('/api/users', friendsController.getAllUsers); 

//Auth
app.get('/auth/callback', authController.handleCallback); 
app.get('/api/profile', authController.getProfile); //user data
app.post('/api/logout', authController.logout); 
app.get('/api/secure-data', checkLoggedIn, authController.getSecureData); 

//Archives (add update)
app.post('/api/archives', archiveController.createArchive); 
app.post('/api/archives/all', archiveController.getAllArchives); 
app.delete('/api/archives/:author_id/:id', archiveController.deleteArchive); 

//Posts (add update, and fetching queries)
app.get('/api/posts', postController.getAllPosts); 
app.post('/api/posts', postController.createPost); 
app.delete('/api/posts/:authorId/:id', postController.deletePost); 

//Cloudinary
app.get('/api/upload', (req, res) => {
  // get a timestamp in seconds which is UNIX format
      const timestamp = Math.round((new Date()).getTime() / 1000);
  // cloudinary API secret stored in the .env file
      const api_secret  = process.env.CLOUDINARY_API_SECRET;
  // user built in cloudinary api sign request function to  create hashed signature with your api secret and UNIX timestamp
      const signature = cloudinary.utils.api_sign_request({ timestamp: timestamp }, api_secret);
  // make a signature object to send to your react app
      const payload = {
          signature: signature,
          timestamp: timestamp
      };
          res.json(payload);
})

function checkLoggedIn(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.status(403).json({ message: 'Unauthorized' });
  }
}

//Listen
const SERVER_PORT = process.env.SERVER_PORT;
app.listen(SERVER_PORT, () => {
  console.log('Server listening on port ' + SERVER_PORT);
});

//Zeit specific
const path = require('path')
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html')); 
})
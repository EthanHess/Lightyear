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
const likeController = require('./controllers/likeController'); 
const commentController = require('./controllers/commentController'); 

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

//Friends 
app.get('/api/followers/:id', friendsController.getFollowers)
app.get('/api/following/:id', friendsController.getFriends)
app.post('/api/follow/:currentUserId/:toFollowId', friendsController.followUnfollowUser)

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
app.post('/api/posts/friends/', postController.getFriendsPosts); //post so we can pass array of ids in body
app.get('/api/posts/me/:id', postController.getPostsForUser);
app.put('/api/posts/:authorId/:id', postController.updatePost); 

//Likes
app.get('/api/likes/:postid', likeController.getLikesForPost); 
app.post('/api/likes/:postid/:likerid', likeController.likeHandler); 

//Comments
app.get('/api/comments/:postid', commentController.getCommentsForPost); 
app.post('/api/comments', commentController.commentHandler); 
app.delete('/api/comments/:commentid', commentController.deleteComment); 
//TODO have update as well

//Todo, add likes/share for comments

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
  console.log('Backend of Spacegram listening on port ' + SERVER_PORT);
});

//Zeit specific
const path = require('path')
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html')); 
})
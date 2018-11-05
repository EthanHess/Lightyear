const massive = require('massive');
const axios = require('axios');
const express = require('express');
const bodyPaser = require('body-parser');
const session = require('express-session');

//Controllers
const authController = require('./controllers/authController'); 
const friendsController = require('./controllers/friendsController'); 


require('dotenv').config();
massive(process.env.CONNECTION_STRING).then(db => app.set('db', db));

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
const massive = require('massive');
const axios = require('axios');
const express = require('express');
const bodyPaser = require('body-parser');
//const session = require('express-session');

const app = express();

require('dotenv').config();
//massive(process.env.CONNECTION_STRING).then(db => app.set('db', db));

//Networking

//Listen
const SERVER_PORT = process.env.SERVER_PORT;
app.listen(SERVER_PORT, () => {
  console.log('Server listening on port ' + SERVER_PORT);
});
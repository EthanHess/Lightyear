const proxy = require('http-proxy-middleware');

module.exports = app => {
  app.use(proxy('/auth/callback', { target: `http://localhost:${process.env.SERVER_PORT}` }));
  app.use(proxy('/api', { target: `http://localhost:${process.env.SERVER_PORT}` }));
};
let micro = require('micro');
let Router = require('../lib');

/**
 * Load and configure the express winston middleware
 */
let transports = require('winston').transports;
let expressWinston = require('express-winston');
let loggerOptions = {
  transports: [new transports.Console({ colorize: true })],
  meta: false,
  msg: '{{res.statusCode}} {{req.method}} {{req.url}} {{res.responseTime}}ms', // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
  colorStatus: true
};

// Create a new router
let router = Router();

router
  // Add compression middleware
  .use(
    (req, res) =>
      new Promise((next) =>
        expressWinston.logger(loggerOptions)(req, res, next)
      )
  )
  // its the same as
  // .use((req, res) => new Promise(resolve => expressWinston.logger(loggerOptions)(req, res, resolve)))
  .get('/', () => 'Welcome to micro');

// Init micro server
let server = micro(router);

// server.listen(3000, () => console.log('Micro listening on port 3000'));

module.exports = server;


  
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const http = require('http');
const mongoose = require('mongoose');
  const morgan = require('morgan');

  app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static(path.join(__dirname, 'client')));
app.use(express.static(path.join(__dirname, 'public')));




const modelsPath = './app/models';
const controllersPath = './app/controllers';

const routesPath = './app/routes';

app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  next();
});

//Bootstrap models
fs.readdirSync(modelsPath).forEach(function (file) {
  if (~file.indexOf('.js')) require(modelsPath + '/' + file)
});
// end Bootstrap models

// Bootstrap route
fs.readdirSync(routesPath).forEach(function (file) {
  if (~file.indexOf('.js')) {
    let route = require(routesPath + '/' + file);
    route.setRouter(app);
  }
});


const server = http.createServer(app);
// start listening to http server
// console.log();
server.listen(3000);
server.on('error', onError);
server.on('listening', onListening);




function onError(error) {
    if (error.syscall !== 'listen') {
      console.log(error.code + ' not equal listen', 'serverOnErrorHandler', 10)
      throw error;
    }
  
  
    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.log(error.code + ':elavated privileges required', 'serverOnErrorHandler', 10);
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.log(error.code + ':port is already in use.', 'serverOnErrorHandler', 10);
        process.exit(1);
        break;
      default:
        console.log(error.code + ':some unknown error occured', 'serverOnErrorHandler', 10);
        throw error;
    }
  }
  
  /**
   * Event listener for HTTP server "listening" event.
   */
  
  function onListening() {
    
    var addr = server.address();
    var bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
    ('Listening on ' + bind);
   console.log('server listening on port' + addr.port, 'serverOnListeningHandler', 10);
    let db = mongoose.connect("mongodb://127.0.0.1:27017/task1",{ useNewUrlParser: true });
  }
  
  process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
    // application specific logging, throwing an error, or other logic here
  });
  
  
  /**
   * database connection settings
   */
  mongoose.connection.on('error', function (err) {
    console.log('database connection error');
    console.log(err)
    
    //process.exit(1)
  }); // end mongoose connection error
  
  mongoose.connection.on('open', function (err) {
    if (err) {
      console.log("database error");
      console.log(err);
      
    } else {
      console.log("database connection open success");
     
    }
    //process.exit(1)
  }); // enr mongoose connection open handler
  
  
  
  // end socketio connection handler
  
  
  
  module.exports = app;
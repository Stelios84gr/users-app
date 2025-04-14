// First Example - default format console logging only

// const winston = require('winston');
// const logger = winston.createLogger(
//   {
//     format: winston.format.json(),
//     transports: [  // μέρη στα οποία θέλουμε να γίνεται το logging
//       new winston.transports.Console()
//     ]
//   }
// )


// Second Example - custom format console logging only

// const { format, createLogger, transports } = require('winston')
// const { combine, timestamp, label, printf } = format
// const CATEGORY  = "Users App Logs"

// const customFormat = printf(({level, message, label, timestamp}) => {
//     return `${timestamp} [${label}: ${level}, ${message}]`;
// })

// const logger = createLogger({
//   // level: "warn",
//   format: combine( // συνδυάζει label, timestamp και τα βάζει στο customFormat
//     label({label: CATEGORY}),
//     timestamp(),
//     customFormat
//   ),
//   transports: [new transports.Console()]
// })


// Third Example - custom format, console, MongoDB & 3 different-level file logging

require('winston-daily-rotate-file');
require('winston-mongodb')
const { format, createLogger, transports } = require('winston');
const { combine, timestamp, label, printf, prettyPrint } = format;
const CATEGORY  = "Users And Products App Logs";

const fileRotateTransport = new transports.DailyRotateFile({
  filename: "./logs/rotate-%DATE%.log",
  datePattern: "DD-MM-YYYY",
  maxFiles: "7d",
  level: "error"
});

const logger = createLogger({
  format: combine(
    label({label: "Users And Products App"}),
    timestamp({format:"DD-MM-YYYY HH:mm:ss"}),
    format.json()
    // prettyPrint()  // for console-logging
  ),
  transports: [
    new transports.Console(),
    fileRotateTransport,
    new transports.File(
      {
        filename:"logs/example.log"
      }
    ),
    new transports.File(
      {
        level: "warn",
        filename: 'logs/warn.log' 
      }
    ),
    new transports.File(
      {
        level: "info",
        filename: 'logs/info.log'
      }
    ),
    new transports.MongoDB({
      level: "warn",
      db: process.env.MONGODB_URI,
      collection: 'server_logs',
      format: format.combine(
          format.timestamp(),
          format.json()
      )
    })
  ]
})

module.exports = logger;
const { createLogger, format, transports } = require("winston");
const {
  combine,
  timestamp,
  label,
  json,
  prettyPrint,
  errors,
  colorize,
  splat,
} = format;
const path = require("path");

const logger = (fileName, level = "info") => {
  const logger = createLogger({
    level,
    format: combine(
      splat(),
      errors({ stack: true }),
      timestamp({
        format: "YYYY-MM-DD HH:mm:ss",
      }),
      label({ label: "right meow!" }),
      json(),
      prettyPrint()
    ),
    transports: [
      new transports.Console(),
      new transports.File({
        filename: path.join(__dirname, fileName),
        level: level,
        maxsize: 5242880, // 5MB
      }),
    ],
  });
  return logger;
};

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//

module.exports = {
  logger,
};

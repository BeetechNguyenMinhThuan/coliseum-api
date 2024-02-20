const { logger } = require("./winston");

const errorLogger = logger("errors.log", "error");

// Sử dụng logger
errorLogger.error("This is an error log message", new Error(`This is an error log message`));
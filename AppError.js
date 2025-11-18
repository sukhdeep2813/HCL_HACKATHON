// utils/AppError.js

class AppError extends Error {
  constructor(message, statusCode) {
    super(message);  // Parent class Error
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;  // Mark known errors

    Error.captureStackTrace(this, this.constructor); // Tracks WHERE error occurred
  }
}

export default AppError;

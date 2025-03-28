class ErrorHandler extends Error {
    constructor(message,statusCode,) {
      super(message);
      this.statusCode = statusCode;
    }
  }
  
  export const errorMiddleware = (err, req, res, next) => {
      // Ensure err has a valid message and statusCode
      err.message = err.message || "Internal Server Error";
      err.statusCode = Number(err.statusCode) || 500;
  
      if (err.code === 11000) {
          err.statusCode = 400;
          err.message = `Duplicate Field Value Entered`;
      }
      if (err.name === "JsonWebTokenError") {
          err.statusCode = 400;
          err.message = `JSON Web Token is invalid. Try again.`;
      }
      if (err.name === "TokenExpiredError") {
          err.statusCode = 400;
          err.message = `JSON Web Token has expired. Try again.`;
      }
      if (err.name === "CastError") {
          err.statusCode = 400;
          err.message = `Resource not found. Invalid: ${err.path}`;
      }
  
      // Ensure message is properly extracted from validation errors
      const errorMessage = err.errors 
          ? Object.values(err.errors).map((error) => error.message).join(" ") 
          : err.message;
  
      return res.status(err.statusCode).json({
          success: false,
          message: errorMessage
      });
  };
  
  export default ErrorHandler;
  
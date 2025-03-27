class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const errorMiddleware = (err, req, res, next) => {
    err.message = err.message || "Internal Server Error";
    err.statusCode = err.statusCode || 500;

    if(err.code === 11000){
        const statusCode = 400;
        const message = `Duplicate Field Value Entered`;
        err = new ErrorHandler(statusCode,message);
    }
    if(err.name === "jsonWebTokenError"){
        const statusCode = 400;
        const message = `JSON web token is invalid.. try again`;
        err = new ErrorHandler(statusCode,message);
    }

    if(err.name === "TokenExpiredError"){
        const statusCode = 400;
        const message = `JSON web token is expired.. try again`;
        err = new ErrorHandler(statusCode,message);
    }
    if(err.name === "CastError"){
        const statusCode = 400;
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new ErrorHandler(statusCode,message);
    }

    const errorMessage = err.errors ? Object.values(err.errors).map((error) => error.message).join(" ") : err.message;

        return res.status(err.statusCode).json({
            success : false,
            message: errorMessage
        })
}

export default ErrorHandler
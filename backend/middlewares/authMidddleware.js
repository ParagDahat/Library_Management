import { catchAsyncErrors } from "./catchAsyncError.js";
import jwt from "jsonwebtoken";
import ErrorHandler from "./errorMiddlewares.js";
import { User } from "../models/userModel.js";

export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
const { token } = req.cookies;
if(!token) {
    return next(new ErrorHandler("User is not auhtenticated", 400));
}
const decodedData = jwt.verify(token, process.env.JWT_SECRET);
req.user = await User.findById(decodedData.id);
next();

})
import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/errorMiddlewares.js";
import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { sendVerificationCode } from "../utils/sendVerificationCode.js";

export const register = catchAsyncErrors(async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        if(!name || !email || !password){
            return next(new ErrorHandler("Please enter all fields.", 400));
        }
        const isUserRegistered = await User.findOne({ email,accountVerified: true });

        if(isUserRegistered){
            return next(new ErrorHandler("User already exists.", 400));
        }
        const registrationAttemptsByUser = await User.find({ email,accountVerified: false });
        if(registrationAttemptsByUser.length >= 5){
            return next(new ErrorHandler("You have reached the maximum number of registration attempts. Please contact support.", 400));
        };

        if(password.length < 8 || password.length > 16){
            return next(new ErrorHandler("Password must be between 8 & 16 characters", 400));
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });
        // console.log(user);

        const verificationCode = await user.generateVerificationCode();
        // console.log(verificationCode);
        await user.save();
        sendVerificationCode(verificationCode, email , res);


    } catch (error) {
        next(error);
    }
});
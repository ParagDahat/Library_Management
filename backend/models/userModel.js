import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
      minlength: [8, "Your password must be longer than 6 characters"],
      select: false,
    },
    role: {
      type: String,
      enum: ["User", "Admin"],
      default: "User",
    },
    accountVerified: {
      type: Boolean,
      default: false,
    },
    borrowedBooks: [
      {
        bookId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Borrow",
        },
        returned: {
          type: Boolean,
          default: false,
        },
        bookTitle: String,
        borrowedDate: Date,
        dueDate: Date,
      },
    ],
    avatar: {
      public_id: String,
      url: String,
    },
    verificationCode: Number,
    verificationCodeExpired: Date,
    resetPasswordToken: String,
    resetPasswordExpired: Date,
  },
  {
    timestamps: true,
  }
);

userSchema.methods.generateVerificationCode =  function() {
  function generateRandomFiveDigitNumber() {
    const firstDigit = Math.floor(Math.random() * 9) + 1;
    const remainingDigits = Math.floor(  Math.random() * 10000).toString().padStart(4, 0);
    return parseInt(firstDigit + remainingDigits);
  }

  const verificationCode = generateRandomFiveDigitNumber();
  this.verificationCode = verificationCode;
  this.verificationCodeExpired = Date.now() + 15 * 60 * 1000;
  return verificationCode;
}
 
export const User = mongoose.model("User", userSchema);

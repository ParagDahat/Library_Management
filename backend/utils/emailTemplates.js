export function generateVerificationOtpEmailTemplate(otpCode){
    return `
    <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; text-align: center;">
        <div style="max-width: 500px; margin: 50px auto; background: #ffffff; padding: 30px; text-align: center; border-radius: 12px; box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1); border-top: 5px solid #007bff;">
            <h2 style="color: #007bff; font-size: 24px;">Verify Your Email</h2>
            <p style="color: #555; font-size: 16px;">Hello,</p>
            <p style="color: #555; font-size: 16px;">Use the OTP below to verify your email address. This code is valid for a limited time.</p>
            <div style="font-size: 28px; font-weight: bold; color: #333; background: #f3f3f3; padding: 15px 25px; border-radius: 8px; display: inline-block; margin: 20px 0; letter-spacing: 2px;">${otpCode}</div>
            <p style="color: #777; font-size: 14px;">If you didn’t request this, please ignore this email.</p>
            <p style="font-size: 12px; color: #888; margin-top: 20px;">&copy; Parag Dahat. All rights reserved.</p>
        </div>
    </div>
    `
}

export function generateForgotPasswordEmailTemplate(resertPasswordUrl){
    return `
    <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; text-align: center;">
        <div style="max-width: 500px; margin: 50px auto; background: #ffffff; padding: 30px; text-align: center; border-radius: 12px; box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1); border-top: 5px solid #007bff;">
            <h2 style="color: #007bff; font-size: 24px;">Reset Your Password</h2>
            <p style="color: #555; font-size: 16px;">Hello,</p>
            <p style="color: #555; font-size: 16px;">We received a request to reset your password. Click the link below to set a new password.</p>
            <a href="${resertPasswordUrl}" style="display: inline-block; background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-size: 16px;">Reset Password</a>
            <p style="color: #777; font-size: 14px;">If you didn’t request this, please ignore this email.</p>
            <p style="font-size: 12px; color: #888; margin-top: 20px;">&copy; Parag Dahat. All rights reserved.</p>
        </div>
    </div>
    `

}
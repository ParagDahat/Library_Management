import { generateVerificationOtpEmailTemplate } from "./emailTemplates.js";
import { sendEmail } from "./sendEmail.js";

export async function sendVerificationCode(verificationCode, email, res) {
    try {
        const message = generateVerificationOtpEmailTemplate(verificationCode);
        sendEmail({
            email,
            subject: "Verification Code( (Library management System)",
            message
        });

        res.status.json({
            success: true,
            message: "Verification code sent successfully. ",
        })
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Verification code could not be sent. ",
        });
        
    }
    
}
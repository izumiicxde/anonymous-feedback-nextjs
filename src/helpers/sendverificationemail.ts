import VerificationEmail from "../../emails/verificationemail";
import { IApiResponse } from "@/types/apiResponse";
import { Resend } from "resend";

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<IApiResponse> {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: email,
      subject: "Kaiton Feedback || Verification Code.",
      react: VerificationEmail({ username, otp: verifyCode }),
    });
    if (error) {
      return { success: false, message: error.message };
    }
    return { success: true, message: "Email sent successfully." };
  } catch (emailError) {
    console.log("Error sending verification email", emailError);
    return {
      success: false,
      message: "There was an error sending verification email.",
    };
  }
}

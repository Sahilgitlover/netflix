// email function for otp

import { resend } from "@/lib/resend";
import { EmailTemplate } from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";
import { error } from "console";

//The CreateEmailOptions type requires the text property to be present. Even if you are using the react property to define the content of the email, the text property is still required.


export async function sendVerificationEmail(
    email:string,
    verifyCode: string
): Promise<ApiResponse> {
    try {

        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Verifation email',
            text: `Hello user, please use the following code to verify your email: ${verifyCode}`,
            react: EmailTemplate({firstName:"user",verifyCode:verifyCode}),
        })
        
        return {success:true,message:"Verification emails send successfully"}

    } catch (emailError) {
        console.error("Error sending verifiction email",error);
        return {success:false,message:"Failed to send verification emails"}
    }
}


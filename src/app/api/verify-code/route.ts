import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
type dataRecieved = {
    id: string,
    code: string,
}
export async function POST(request:Request) {
    await dbConnect();

    try {
        const {id, code}:dataRecieved = await request.json()

        const user = await UserModel.findOne({_id: id})

        if(!user){
            return Response.json(
                {
                    success: false,
                    message: "User not found"
                },
                {status: 500}
            )
        }

        const isCodevalid = user.verifyCode === code;
        
        // const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date()
        const isCodeNotExpired = user.verifyCodeExpiry > new Date()

        console.log(user.verifyCodeExpiry);
        
        if(isCodeNotExpired && isCodevalid) {
            await user.save();

            return Response.json(
                {
                    success: true,
                    message: "Account verified successfully"
                },
                {status: 200}
            )
        }
        else if(!isCodeNotExpired) {
            return Response.json(
                {
                    success: false,
                    message: "Verification code expired. sign-up again"
                },
                {status: 400}
            )
        }
        else {
            return Response.json(
                {
                    success: false,
                    message: "Incorrect verification code"
                },
                {status: 400}
            )
        }



    } catch (error) {
        console.error("Error verifying user",error);

        return Response.json({
            success: false,
            message:"Error verifying user"
        },{status :500})
    }
}
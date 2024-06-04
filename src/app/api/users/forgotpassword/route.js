import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import {sendEmail} from "@/helpers/nodeMailer";

connect()

export const POST = async (request) => {
    try {
        const reqBody =await request.json()
        const {email} = reqBody;

        const user = await User.findOne({ email });
        if(!user){
            return new NextResponse("No user found with this email!", { status: 400 });
        }

        try {
            
            await sendEmail({email, emailType: "RESET",
                userId: user._id
            })

            return NextResponse.json({message:"Reset link sent successfully",
                success:true
            })

        } catch (error) {
            return NextResponse.json({error:error.message},{status:500})
        }

    } catch (error) {
        return NextResponse.json({error:error.message},{status:500})
    }
}

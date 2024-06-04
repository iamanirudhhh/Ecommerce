import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import {sendEmail} from "@/helpers/nodeMailer";

connect()

export const POST = async (request) => {
    try {
        
        const reqBody =await request.json()
        const {firstName,lastName,email,mobileNo,password} = reqBody;

        const user = await User.findOne({ email });
        if(user){
            return new NextResponse("User with this mail is already registered!", { status: 400 });
        }

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password,salt)

        const newUser = new User({
            firstName,
            lastName,
            email,
            mobileNo,
            password:hashedPassword
        })

        try {
            console.log("Attempting to save user:", newUser);
            const savedUser = await newUser.save();
            console.log("User saved successfully:", savedUser);

            await sendEmail({email, emailType: "VERIFY",
                userId: savedUser._id
            })

            return NextResponse.json({message:"User registered successfully!",
                success:true,
                savedUser
            })

        } catch (error) {
            return NextResponse.json({error:error.message},{status:500})
        }

    } catch (error) {
        return NextResponse.json({error:error.message},{status:500})
    }
}

import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();

export const POST = async (request) => {
    try {
        const reqBody = await request.json();
        const { userId, mobileNo } = reqBody;
        console.log(userId);
        const existingUser = await User.findById(userId);

        if (!existingUser) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        
        existingUser.mobileNo = mobileNo;

        try {

            const savedUser = await existingUser.save();

            return NextResponse.json({message:"User Number Updated successfully!",
                success:true,
                savedUser
            })

        } catch (error) {
            return NextResponse.json({error:error.message},{status:500})
        }

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};

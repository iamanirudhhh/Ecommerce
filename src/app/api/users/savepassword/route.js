import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();

export const POST = async (request) => {
    try {
        const reqBody = await request.json();
        const { tokenId, password } = reqBody;

        const existingUser = await User.findOne({ forgotPasswordToken: tokenId });

        if (!existingUser) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        
        existingUser.password = hashedPassword;

        existingUser.forgotPasswordToken = undefined;
        existingUser.forgotPasswordTokenExpiry = undefined;

        try {

            const savedUser = await existingUser.save();

            return NextResponse.json({message:"User Password Updated successfully!",
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

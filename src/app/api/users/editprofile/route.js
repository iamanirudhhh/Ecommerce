import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export const POST = async (request) => {
    try {
        const reqBody = await request.json();
        const { userId, firstName, lastName, gender, email } = reqBody;

        const existingUser = await User.findById(userId);

        if (!existingUser) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        existingUser.firstName = firstName; 
        existingUser.lastName = lastName;
        existingUser.gender = gender; 
        existingUser.email = email; 

        try {

            const savedUser = await existingUser.save();

            return NextResponse.json({message:"User Updated successfully!",
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

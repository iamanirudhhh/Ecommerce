import {connect} from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";
import User from "@/models/userModel";

connect()

export async function POST(request){

    try {
        const reqBody = await request.json()
        const {token} = reqBody

        const user = await User.findOne({forgotPasswordToken: token, forgotPasswordTokenExpiry: {$gt: Date.now()}});

        if (!user) {
            return NextResponse.json({error: "Invalid token"}, {status: 400})
        }
        
        return NextResponse.json({
            message: "Password Changed successfully",
            success: true
        })

    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500})
    }

}
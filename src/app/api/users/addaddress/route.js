import {connect} from "@/dbConfig/dbConfig";
import Address from "@/models/addressModel";
import { NextRequest, NextResponse } from "next/server";

connect()

export const POST = async (request) => {
    try {
        
        const reqBody =await request.json()
        const {userId,addressTitle,firstName,lastName,addressLine,city,pincode,state,mobileNo,byDefaultAddress} = reqBody;

        const newUser = new Address({
            userId,
            addressTitle,
            firstName,
            lastName,
            addressLine,
            city,
            pincode,
            state,
            mobileNo,
            byDefaultAddress
        })


        try {
            console.log(newUser);
            const savedUser = await newUser.save();
            console.log("User Address saved successfully:", savedUser);

            return NextResponse.json({message:"User Address added successfully!",
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

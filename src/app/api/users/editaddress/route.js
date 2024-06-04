import { connect } from "@/dbConfig/dbConfig";
import Address from "@/models/addressModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export const POST = async (request) => {
    try {
        const reqBody =await request.json()
        const {_id,addressTitle,firstName,lastName,addressLine,city,pincode,state,mobileNo,byDefaultAddress} = reqBody;
        console.log("Trying Id", _id)

        const existingUser = await Address.findById(_id);

        if (!existingUser) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        existingUser.addressTitle = addressTitle; 
        existingUser.firstName = firstName;
        existingUser.lastName = lastName; 
        existingUser.addressLine = addressLine;
        existingUser.city = city; 
        existingUser.pincode = pincode;
        existingUser.state = state; 
        existingUser.mobileNo = mobileNo; 
        existingUser.byDefaultAddress = byDefaultAddress;

        try {

            const savedUser = await existingUser.save();

            return NextResponse.json({message:"User Address Updated successfully!",
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

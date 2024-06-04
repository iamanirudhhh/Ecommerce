import {connect} from "@/dbConfig/dbConfig";
import Products from "@/models/productModel";
import { NextRequest, NextResponse } from "next/server";

connect()

export const POST = async (request) => {
    try {
        
        const reqBody =await request.json()
        const {productName,price,category,status} = reqBody;

        const newUser = new Products({
          productName,
          price,
          category,
          status
        })


        try {
            const savedUser = await newUser.save();

            return NextResponse.json({message:"Product added successfully!",
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

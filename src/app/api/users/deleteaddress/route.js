import { connect } from "@/dbConfig/dbConfig";
import Address from "@/models/addressModel";
import { NextRequest, NextResponse } from "next/server";
import { use } from "react";

connect();

export const DELETE = async (request) => {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get("id");
        
        const user = await Address.findOne({ _id:userId });

        if (user==null) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        await user.deleteOne();

        return NextResponse.json({message:"Address deleted Successfully!"}, {status: 200 });

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};

import { connect } from "@/dbConfig/dbConfig";
import Address from "@/models/addressModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export const GET = async (request) => {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get("userId");
        
        const user = await Address.find({ userId:userId });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ user }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};

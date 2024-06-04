import { connect } from "@/dbConfig/dbConfig";
import Address from "@/models/addressModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export const POST = async (request) => {
    try {
        const reqBody = await request.json();
        const { _id } = reqBody;

        if (!_id) {
            return NextResponse.json({ error: "User ID is required" }, { status: 400 });
        }

        const user = await Address.findOne({ _id });
        if (user) {
            return NextResponse.json(user, { status: 200 });
        } else {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};

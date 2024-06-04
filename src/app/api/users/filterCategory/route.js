import { connect } from "@/dbConfig/dbConfig";
import Products from "@/models/productModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export const GET = async (request) => {
    try {
        const { searchParams } = new URL(request.url);
        const category = searchParams.get("category");
        
        const user = await Products.find({ category:category });

        if (!user) {
            return NextResponse.json({ error: "Category not found" }, { status: 404 });
        }

        return NextResponse.json({ user }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};

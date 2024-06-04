import { connect } from "@/dbConfig/dbConfig";
import Products from "@/models/productModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export const GET = async () => {
    try {
        
        const products = await Products.find();

        if (!products) {
            return NextResponse.json({ error: "Category not found" }, { status: 404 });
        }

        return NextResponse.json({ products }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};

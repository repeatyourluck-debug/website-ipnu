import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export const dynamic = "force-dynamic";

// GET all gallery items
export async function GET() {
    const { data: gallery, error } = await supabase
        .from("gallery")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(gallery);
}

// POST new gallery item
export async function POST(request: Request) {
    const newItem = await request.json();

    const { id, ...itemData } = newItem;
    // Ensure date is present
    if (!itemData.date) {
        itemData.date = new Date().toISOString().split('T')[0];
    }

    const { data, error } = await supabase
        .from("gallery")
        .insert([itemData])
        .select()
        .single();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
}

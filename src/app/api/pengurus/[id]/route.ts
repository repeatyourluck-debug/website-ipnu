import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export const dynamic = "force-dynamic";

// GET single pengurus
export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    const { data: person, error } = await supabase
        .from("pengurus")
        .select("*")
        .eq("id", id)
        .single();

    if (error || !person) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(person);
}

// PUT update pengurus
export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const updatedData = await request.json();

    const { data, error } = await supabase
        .from("pengurus")
        .update(updatedData)
        .eq("id", id)
        .select()
        .single();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
}

// DELETE pengurus
export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    const { error } = await supabase
        .from("pengurus")
        .delete()
        .eq("id", id);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Deleted" });
}

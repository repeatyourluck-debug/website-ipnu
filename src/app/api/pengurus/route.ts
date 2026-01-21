import { NextResponse } from "next/server";
import { supabaseServer as supabase } from "@/lib/supabaseServer";

export const dynamic = "force-dynamic";

// GET all pengurus
export async function GET() {
    const { data: pengurus, error } = await supabase
        .from("pengurus")
        .select("*")
        .order("created_at", { ascending: true });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(pengurus);
}

// POST new pengurus
export async function POST(request: Request) {
    const newPengurus = await request.json();

    const { id, ...pengurusData } = newPengurus;

    const { data, error } = await supabase
        .from("pengurus")
        .insert([pengurusData])
        .select()
        .single();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
}

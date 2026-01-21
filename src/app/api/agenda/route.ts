import { NextResponse } from "next/server";
import { supabaseServer as supabase } from "@/lib/supabaseServer";

export const dynamic = "force-dynamic";

// GET all agenda
export async function GET() {
    const { data: agenda, error } = await supabase
        .from("agenda")
        .select("*")
        .order("date", { ascending: true }); // Order agenda by date

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(agenda);
}

// POST new agenda
export async function POST(request: Request) {
    const newAgenda = await request.json();

    // Remove 'id' if present
    const { id, ...agendaData } = newAgenda;

    const { data, error } = await supabase
        .from("agenda")
        .insert([agendaData])
        .select()
        .single();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
}

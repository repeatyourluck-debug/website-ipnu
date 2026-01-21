import { NextResponse } from "next/server";
import { supabaseServer as supabase } from "@/lib/supabaseServer";

export const dynamic = "force-dynamic";

// GET all articles
export async function GET() {
    const { data: articles, error } = await supabase
        .from("articles")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(articles);
}

// POST new article
export async function POST(request: Request) {
    const newArticle = await request.json();

    // Remove 'id' if present, let DB handle it
    const { id, ...articleData } = newArticle;

    const { data, error } = await supabase
        .from("articles")
        .insert([articleData])
        .select()
        .single();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
}

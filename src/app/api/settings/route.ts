import { NextResponse } from "next/server";
import { supabaseServer as supabase } from "@/lib/supabaseServer";

export const dynamic = "force-dynamic";

// GET settings
export async function GET() {
    const { data: settingsData, error } = await supabase
        .from("settings")
        .select("*");

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Convert array [{key: 'a', value: '1'}] to object {a: '1'}
    const settingsObject = settingsData.reduce((acc, curr) => {
        acc[curr.key] = curr.value;
        return acc;
    }, {} as Record<string, string>);

    return NextResponse.json(settingsObject);
}

// PUT update settings
export async function PUT(request: Request) {
    const newSettings = await request.json();

    // Upsert each key-value pair
    const updates = Object.entries(newSettings).map(([key, value]) => ({
        key,
        value: String(value),
    }));

    const { error } = await supabase
        .from("settings")
        .upsert(updates, { onConflict: "key" });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(newSettings);
}

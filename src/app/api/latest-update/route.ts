import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export const dynamic = "force-dynamic";

interface UpdateItem {
    type: string;
    title: string;
    date: string;
    link: string;
}

export async function GET() {
    const updates: UpdateItem[] = [];

    // Get latest article
    const { data: articles } = await supabase
        .from("articles")
        .select("id, title, date")
        .order("created_at", { ascending: false })
        .limit(1);

    if (articles && articles.length > 0) {
        updates.push({
            type: "Artikel",
            title: articles[0].title,
            date: articles[0].date,
            link: `/berita/${articles[0].id}`,
        });
    }

    // Get latest agenda
    const { data: agenda } = await supabase
        .from("agenda")
        .select("title, date")
        .order("created_at", { ascending: false })
        .limit(1);

    if (agenda && agenda.length > 0) {
        updates.push({
            type: "Agenda",
            title: agenda[0].title,
            date: agenda[0].date,
            link: "/agenda",
        });
    }

    // Get latest pengurus count (optional, logic same as before)
    const { count } = await supabase
        .from("pengurus")
        .select("*", { count: 'exact', head: true });

    if (count && count > 0) {
        updates.push({
            type: "Pengurus",
            title: `${count} pengurus terdaftar`,
            date: "",
            link: "/pengurus",
        });
    }

    // Return the most recent update (first logic for now)
    const latest = updates[0] || {
        type: "Info",
        title: "Selamat datang di website IPNU IPPNU Semarang",
        date: "",
        link: "/tentang",
    };

    return NextResponse.json(latest);
}

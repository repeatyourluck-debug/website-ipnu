import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

interface UpdateItem {
    type: string;
    title: string;
    date: string;
    link: string;
}

export async function GET() {
    const updates: UpdateItem[] = [];

    // Get latest article
    try {
        const articlesPath = path.join(process.cwd(), "src/data/articles.json");
        const articlesData = fs.readFileSync(articlesPath, "utf-8");
        const articles = JSON.parse(articlesData);
        if (articles.length > 0) {
            updates.push({
                type: "Artikel",
                title: articles[0].title,
                date: articles[0].date,
                link: `/berita/${articles[0].id}`,
            });
        }
    } catch { }

    // Get latest agenda
    try {
        const agendaPath = path.join(process.cwd(), "src/data/agenda.json");
        if (fs.existsSync(agendaPath)) {
            const agendaData = fs.readFileSync(agendaPath, "utf-8");
            const agenda = JSON.parse(agendaData);
            if (agenda.length > 0) {
                updates.push({
                    type: "Agenda",
                    title: agenda[0].title,
                    date: agenda[0].date,
                    link: "/agenda",
                });
            }
        }
    } catch { }

    // Get latest pengurus (if any updated)
    try {
        const pengurusPath = path.join(process.cwd(), "src/data/pengurus.json");
        const pengurusData = fs.readFileSync(pengurusPath, "utf-8");
        const pengurus = JSON.parse(pengurusData);
        if (pengurus.length > 0) {
            updates.push({
                type: "Pengurus",
                title: `${pengurus.length} pengurus terdaftar`,
                date: "",
                link: "/pengurus",
            });
        }
    } catch { }

    // Return the most recent update (first article for now)
    const latest = updates[0] || {
        type: "Info",
        title: "Selamat datang di website IPNU IPPNU Semarang",
        date: "",
        link: "/tentang",
    };

    return NextResponse.json(latest);
}

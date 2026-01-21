import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "src/data/agenda.json");

function readAgenda() {
    try {
        const data = fs.readFileSync(dataFilePath, "utf-8");
        return JSON.parse(data);
    } catch {
        return [];
    }
}

function writeAgenda(agenda: unknown[]) {
    fs.writeFileSync(dataFilePath, JSON.stringify(agenda, null, 2));
}

// GET all agenda
export async function GET() {
    const agenda = readAgenda();
    return NextResponse.json(agenda);
}

// POST new agenda
export async function POST(request: Request) {
    const agenda = readAgenda();
    const newAgenda = await request.json();

    const maxId = agenda.reduce((max: number, a: { id: number }) => Math.max(max, a.id), 0);
    newAgenda.id = maxId + 1;

    agenda.unshift(newAgenda);
    writeAgenda(agenda);

    return NextResponse.json(newAgenda, { status: 201 });
}

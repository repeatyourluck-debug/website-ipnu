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

// GET single agenda
export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const agenda = readAgenda();
    const item = agenda.find((a: { id: number }) => a.id === parseInt(id));

    if (!item) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(item);
}

// PUT update agenda
export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const agenda = readAgenda();
    const index = agenda.findIndex((a: { id: number }) => a.id === parseInt(id));

    if (index === -1) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const updatedData = await request.json();
    agenda[index] = { ...agenda[index], ...updatedData };
    writeAgenda(agenda);

    return NextResponse.json(agenda[index]);
}

// DELETE agenda
export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const agenda = readAgenda();
    const filtered = agenda.filter((a: { id: number }) => a.id !== parseInt(id));

    if (filtered.length === agenda.length) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    writeAgenda(filtered);
    return NextResponse.json({ message: "Deleted" });
}

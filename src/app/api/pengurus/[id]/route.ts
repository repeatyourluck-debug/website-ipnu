import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "src/data/pengurus.json");

function readPengurus() {
    try {
        const data = fs.readFileSync(dataFilePath, "utf-8");
        return JSON.parse(data);
    } catch {
        return [];
    }
}

function writePengurus(pengurus: unknown[]) {
    fs.writeFileSync(dataFilePath, JSON.stringify(pengurus, null, 2));
}

// GET single pengurus
export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const pengurus = readPengurus();
    const person = pengurus.find((p: { id: number }) => p.id === parseInt(id));

    if (!person) {
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
    const pengurus = readPengurus();
    const index = pengurus.findIndex((p: { id: number }) => p.id === parseInt(id));

    if (index === -1) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const updatedData = await request.json();
    pengurus[index] = { ...pengurus[index], ...updatedData };
    writePengurus(pengurus);

    return NextResponse.json(pengurus[index]);
}

// DELETE pengurus
export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const pengurus = readPengurus();
    const filtered = pengurus.filter((p: { id: number }) => p.id !== parseInt(id));

    if (filtered.length === pengurus.length) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    writePengurus(filtered);
    return NextResponse.json({ message: "Deleted" });
}

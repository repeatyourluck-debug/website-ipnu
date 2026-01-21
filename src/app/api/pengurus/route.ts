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

// GET all pengurus
export async function GET() {
    const pengurus = readPengurus();
    return NextResponse.json(pengurus);
}

// POST new pengurus
export async function POST(request: Request) {
    const pengurus = readPengurus();
    const newPengurus = await request.json();

    const maxId = pengurus.reduce((max: number, p: { id: number }) => Math.max(max, p.id), 0);
    newPengurus.id = maxId + 1;

    pengurus.push(newPengurus);
    writePengurus(pengurus);

    return NextResponse.json(newPengurus, { status: 201 });
}

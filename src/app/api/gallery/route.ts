import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic"; // Ensure API isn't cached

const dataFilePath = path.join(process.cwd(), "src/data/gallery.json");

function readGallery() {
    try {
        const data = fs.readFileSync(dataFilePath, "utf-8");
        return JSON.parse(data);
    } catch {
        return [];
    }
}

function writeGallery(gallery: unknown[]) {
    fs.writeFileSync(dataFilePath, JSON.stringify(gallery, null, 2));
}

// GET all gallery items
export async function GET() {
    const gallery = readGallery();
    return NextResponse.json(gallery);
}

// POST new gallery item
export async function POST(request: Request) {
    const gallery = readGallery();
    const newItem = await request.json();

    const maxId = gallery.reduce((max: number, item: { id: number }) => Math.max(max, item.id), 0);
    newItem.id = maxId + 1;
    newItem.date = new Date().toISOString().split('T')[0];

    gallery.unshift(newItem);
    writeGallery(gallery);

    return NextResponse.json(newItem, { status: 201 });
}

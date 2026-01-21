import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "src/data/settings.json");

function readSettings() {
    try {
        const data = fs.readFileSync(dataFilePath, "utf-8");
        return JSON.parse(data);
    } catch {
        return {};
    }
}

function writeSettings(settings: Record<string, string>) {
    fs.writeFileSync(dataFilePath, JSON.stringify(settings, null, 2));
}

// GET settings
export async function GET() {
    const settings = readSettings();
    return NextResponse.json(settings);
}

// PUT update settings
export async function PUT(request: Request) {
    const currentSettings = readSettings();
    const newSettings = await request.json();

    const merged = { ...currentSettings, ...newSettings };
    writeSettings(merged);

    return NextResponse.json(merged);
}

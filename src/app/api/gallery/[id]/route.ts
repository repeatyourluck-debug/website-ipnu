import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

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

// DELETE gallery item
export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        console.log("API Delete Request for ID:", id);

        const gallery = readGallery();
        const itemsToDelete = gallery.filter((g: { id: number | string }) => String(g.id) === String(id));

        if (itemsToDelete.length === 0) {
            console.log("Delete failed: Item not found");
            return NextResponse.json({ error: "Not found" }, { status: 404 });
        }

        // Delete associated files
        for (const item of itemsToDelete) {
            if (item.image) {
                // Remove leading slash if present to ensure path.join works correctly relative to public dir
                const relativePath = item.image.startsWith("/") ? item.image.slice(1) : item.image;
                const imagePath = path.join(process.cwd(), "public", relativePath);

                try {
                    if (fs.existsSync(imagePath)) {
                        fs.unlinkSync(imagePath);
                        console.log("Deleted image file:", imagePath);
                    } else {
                        console.log("Image file not found:", imagePath);
                    }
                } catch (err) {
                    console.error("Error deleting image file:", err);
                }
            }
        }

        const filtered = gallery.filter((g: { id: number | string }) => String(g.id) !== String(id));
        writeGallery(filtered);

        console.log("Delete successful");
        return NextResponse.json({ message: "Deleted" });
    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

import { NextResponse } from "next/server";
import { supabaseServer as supabase } from "@/lib/supabaseServer";

export const dynamic = "force-dynamic";

// DELETE gallery item
export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        console.log("API Delete Request for ID:", id);

        // Delete from DB
        const { error } = await supabase
            .from("gallery")
            .delete()
            .eq("id", id);

        if (error) {
            console.error("Delete failed:", error.message);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        console.log("Delete successful");
        return NextResponse.json({ message: "Deleted" });
    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

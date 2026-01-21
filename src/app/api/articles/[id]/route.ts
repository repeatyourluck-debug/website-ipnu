import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "src/data/articles.json");

function readArticles() {
    try {
        const data = fs.readFileSync(dataFilePath, "utf-8");
        return JSON.parse(data);
    } catch {
        return [];
    }
}

function writeArticles(articles: unknown[]) {
    fs.writeFileSync(dataFilePath, JSON.stringify(articles, null, 2));
}

// GET single article
export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const articles = readArticles();
    const article = articles.find((a: { id: number }) => a.id === parseInt(id));

    if (!article) {
        return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    return NextResponse.json(article);
}

// PUT update article
export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const articles = readArticles();
    const index = articles.findIndex((a: { id: number }) => a.id === parseInt(id));

    if (index === -1) {
        return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    const updatedData = await request.json();
    articles[index] = { ...articles[index], ...updatedData };
    writeArticles(articles);

    return NextResponse.json(articles[index]);
}

// DELETE article
export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const articles = readArticles();
    const filteredArticles = articles.filter((a: { id: number }) => a.id !== parseInt(id));

    if (filteredArticles.length === articles.length) {
        return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    writeArticles(filteredArticles);
    return NextResponse.json({ message: "Deleted successfully" });
}

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

// GET all articles
export async function GET() {
    const articles = readArticles();
    return NextResponse.json(articles);
}

// POST new article
export async function POST(request: Request) {
    const articles = readArticles();
    const newArticle = await request.json();

    // Generate new ID
    const maxId = articles.reduce((max: number, a: { id: number }) => Math.max(max, a.id), 0);
    newArticle.id = maxId + 1;
    newArticle.date = new Date().toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    articles.unshift(newArticle); // Add to beginning
    writeArticles(articles);

    return NextResponse.json(newArticle, { status: 201 });
}

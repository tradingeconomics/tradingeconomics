import fs from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

const OUT_DIR = path.resolve(process.cwd(), "out");
const ALLOWED = new Set([".csv", ".md", ".png"]);

export async function GET() {
  try {
    // If the directory doesn't exist, return empty array
    let dirents: string[] = [];
    try {
      const files = await fs.readdir(OUT_DIR);
      dirents = files;
    } catch (e: any) {
      if (e?.code === "ENOENT") {
        return NextResponse.json({ files: [] });
      }
      throw e;
    }

    const results: { name: string; bytes: number; updatedAt: string }[] = [];

    for (const name of dirents) {
      const ext = path.extname(name).toLowerCase();
      if (!ALLOWED.has(ext)) continue;
      try {
        const st = await fs.stat(path.join(OUT_DIR, name));
        results.push({ name, bytes: st.size, updatedAt: st.mtime.toISOString() });
      } catch {
        // ignore stat errors
      }
    }

    // sort by updatedAt desc
    results.sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1));

    return NextResponse.json({ files: results });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message ?? "Unknown error" }, { status: 502 });
  }
}

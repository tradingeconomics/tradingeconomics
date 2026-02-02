import fs from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

export const runtime = "nodejs"; // uses fs

const OUT_DIR = path.resolve(process.cwd(), "out");
const ALLOWED = new Map([
  [".csv", "text/csv; charset=utf-8"],
  [".md", "text/markdown; charset=utf-8"],
  [".png", "image/png"],
]);

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const raw = url.pathname.split("/").pop() || "";
    const name = decodeURIComponent(raw);

    // prevent path traversal
    if (name.includes("..") || name.includes("/")) {
      return NextResponse.json({ error: "Invalid file name" }, { status: 400 });
    }

    const ext = path.extname(name).toLowerCase();
    if (!ALLOWED.has(ext)) {
      return NextResponse.json({ error: "Unsupported file type" }, { status: 400 });
    }

    const abs = path.join(OUT_DIR, name);

    // ensure the file is inside the out directory
    if (!abs.startsWith(OUT_DIR)) {
      return NextResponse.json({ error: "Invalid file path" }, { status: 400 });
    }

    let buf: Buffer;
    try {
      buf = await fs.readFile(abs);
    } catch (e: any) {
      if (e?.code === "ENOENT") {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
      }
      throw e;
    }

    const contentType = ALLOWED.get(ext) || "application/octet-stream";

    // If ?download=1, set attachment disposition
    const download = url.searchParams.get("download") === "1";

    // Convert to Uint8Array for Response body (compatible with Web Response types)
    const body = buf instanceof Uint8Array ? buf : new Uint8Array(buf);
    // Convert to ArrayBuffer to satisfy Web Response types
    const arrayBuffer = body.buffer.slice(body.byteOffset, body.byteOffset + body.byteLength);

    return new Response(arrayBuffer as any, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Length": String(buf.length),
        "Content-Disposition": (download ? "attachment" : "inline") + `; filename="${name}"`,
      },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message ?? "Unknown error" }, { status: 502 });
  }
}

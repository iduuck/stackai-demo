import { NextResponse } from "next/server";
import { z } from "zod";
import { makeData } from "./make-data";

const TypeSchema = z.enum(["google-drive", "dropbox", "onedrive"]);

export async function GET(
	_: Request,
	{ params }: { params: Promise<{ type: string }> },
) {
	const p = await params;
	const type = TypeSchema.parse(p.type);

	if (type === "dropbox") {
		await new Promise((resolve) => setTimeout(resolve, 3_000));
	} else {
		await new Promise((resolve) => setTimeout(resolve, 1_000));
	}

	return NextResponse.json(makeData(type, type === "dropbox" ? 20 : 5));
}

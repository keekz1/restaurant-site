import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({ region: "eu-north-1" });
const BUCKET = "restaurant-menu-photos-2026";

export async function GET(request: Request) {
    const key = new URL(request.url).searchParams.get("key") ?? "";

    // Only allow files inside the menu/ folder
    if (!key.startsWith("menu/") || key.includes("..")) {
        return new Response("Not found", { status: 404 });
    }

    try {
        const obj = await s3.send(new GetObjectCommand({ Bucket: BUCKET, Key: key }));
        const bytes = await obj.Body!.transformToByteArray();
        return new Response(bytes as unknown as BodyInit, {
            headers: {
                "Content-Type": obj.ContentType ?? "image/jpeg",
                "Cache-Control": "public, max-age=86400",
            },
        });
    } catch {
        return new Response("Not found", { status: 404 });
    }
}
import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";

const REGION = "eu-north-1";
const TABLE = "catering-requests";
const OWNER_EMAIL = "eddiekiki4@gmail.com";

const db = DynamoDBDocumentClient.from(new DynamoDBClient({ region: REGION }));
const ses = new SESv2Client({ region: REGION });

const clean = (v: unknown, max = 500) => String(v ?? "").trim().slice(0, max);

export async function POST(request: Request) {
    let body: Record<string, unknown>;
    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const item = {
        id: randomUUID(),
        createdAt: new Date().toISOString(),
        name: clean(body.name, 100),
        phone: clean(body.phone, 40),
        email: clean(body.email, 150),
        date: clean(body.date, 20),
        guests: clean(body.guests, 10),
        eventType: clean(body.eventType, 50),
        budget: clean(body.budget, 50),
        details: clean(body.details, 2000),
    };

    if (!item.name || !item.email || !item.date || !item.guests) {
        return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    try {
        await db.send(new PutCommand({ TableName: TABLE, Item: item }));
    } catch (err) {
        console.error("Failed to save catering request", err);
        const e = err as Error;
        return NextResponse.json(
            { error: "Could not save", reason: `${e.name}: ${e.message}` },
            { status: 500 }
        );
    }

    // The request is already saved, so an email failure should not lose it.
    try {
        await ses.send(
            new SendEmailCommand({
                FromEmailAddress: OWNER_EMAIL,
                Destination: { ToAddresses: [OWNER_EMAIL] },
                ReplyToAddresses: [item.email],
                Content: {
                    Simple: {
                        Subject: { Data: `New catering request from ${item.name}` },
                        Body: {
                            Text: {
                                Data: [
                                    `Name: ${item.name}`,
                                    `Phone: ${item.phone}`,
                                    `Email: ${item.email}`,
                                    `Date: ${item.date}`,
                                    `Guests: ${item.guests}`,
                                    `Event: ${item.eventType}`,
                                    `Budget: ${item.budget}`,
                                    `Details: ${item.details}`,
                                ].join("\n"),
                            },
                        },
                    },
                },
            })
        );
    } catch (err) {
        console.error("Failed to save catering request", err);
        return NextResponse.json({ error: "Could not save" }, { status: 500 });
    }
    return NextResponse.json({ ok: true });
}
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";
import fallback from "@/data/menu.json";

export type MenuItem = {
  id: string;
  category: string;
  name: string;
  description: string;
  price: number;
  imageKey?: string;
  available?: boolean;
  sortOrder?: number;
};

export type MenuSection = { category: string; items: MenuItem[] };

const db = DynamoDBDocumentClient.from(new DynamoDBClient({ region: "eu-north-1" }));

function fromJson(): MenuSection[] {
  const data = fallback as {
    category: string;
    items: { name: string; description: string; price: number }[];
  }[];
  return data.map((s) => ({
    category: s.category,
    items: s.items.map((i) => ({ id: `${s.category}-${i.name}`, category: s.category, ...i })),
  }));
}

export async function getMenu(): Promise<MenuSection[]> {
  try {
    const res = await db.send(new ScanCommand({ TableName: "menu-items" }));
    const items = (res.Items ?? []) as MenuItem[];
    if (items.length === 0) return fromJson();

    const visible = items
      .filter((i) => i.available !== false)
      .sort(
        (a, b) =>
          (a.sortOrder ?? 999) - (b.sortOrder ?? 999) || a.name.localeCompare(b.name)
      );

    const groups = new Map<string, MenuItem[]>();
    for (const item of visible) {
      const list = groups.get(item.category) ?? [];
      list.push(item);
      groups.set(item.category, list);
    }
    return [...groups].map(([category, items]) => ({ category, items }));
  } catch (err) {
    console.error("Could not read menu from DynamoDB, using menu.json", err);
    return fromJson();
  }
}
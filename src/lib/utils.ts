import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Collection } from "@/types/dashboard"
import { MOCK_ITEM_TYPES } from "@/lib/mockData"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getCollectionThemeColor(col: Collection): string {
  if (col.items && col.items.length > 0) {
    const counts: Record<string, { count: number; color: string }> = {};
    col.items.forEach((item) => {
      const color = item.itemType?.color || "#a1a1aa";
      const name = item.itemType?.name || "note";
      if (!counts[name]) {
        counts[name] = { count: 0, color };
      }
      counts[name].count++;
    });

    let maxCount = -1;
    let themeColor = "#a1a1aa";
    Object.values(counts).forEach((info) => {
      if (info.count > maxCount) {
        maxCount = info.count;
        themeColor = info.color;
      }
    });
    return themeColor;
  }

  const itemTypeKey = col.defaultTypeId?.replace("type-", "") || "note";
  const typeConfig = MOCK_ITEM_TYPES[itemTypeKey] || MOCK_ITEM_TYPES.note;
  return typeConfig.color;
}

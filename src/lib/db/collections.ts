import { prisma } from '../prisma';
import { Collection, Item, ItemType, ContentType } from '@/types/dashboard';

// Helper to map DB content type
function mapContentType(typeName: string): ContentType {
  const lower = typeName.toLowerCase();
  if (lower === 'link') return 'URL';
  if (lower === 'file' || lower === 'image') return 'FILE';
  return 'TEXT';
}

// Helper to map DB proOnly item types
function mapProOnly(typeName: string): boolean {
  const lower = typeName.toLowerCase();
  return lower === 'file' || lower === 'image';
}

// Helper to map DB ItemType to UI ItemType
export function mapItemType(dbType: any): ItemType {
  return {
    id: `type-${dbType.name.toLowerCase()}`,
    name: dbType.name,
    icon: dbType.icon,
    color: dbType.color,
    contentType: mapContentType(dbType.name),
    proOnly: mapProOnly(dbType.name),
  };
}

// Helper to map DB Item to UI Item
export function mapItem(dbItem: any): Item {
  return {
    id: dbItem.id,
    title: dbItem.title,
    description: dbItem.description || undefined,
    contentType: dbItem.contentType as ContentType,
    content: dbItem.content || undefined,
    url: dbItem.url || undefined,
    fileUrl: dbItem.fileUrl || undefined,
    fileName: dbItem.fileName || undefined,
    fileSize: dbItem.fileSize || undefined,
    language: dbItem.language || undefined,
    isFavorite: dbItem.isFavorite,
    isPinned: dbItem.isPinned,
    itemType: mapItemType(dbItem.itemType),
    tags: dbItem.tags.map((t: any) => ({
      id: t.tag.id,
      name: t.tag.name,
    })),
    collections: dbItem.collections.map((c: any) => ({
      id: c.collection.id,
      name: c.collection.name,
    })),
    createdAt: dbItem.createdAt.toISOString(),
    updatedAt: dbItem.updatedAt.toISOString(),
  };
}

// Fetch all collections for the default demo user from the database
export async function getCollections(): Promise<Collection[]> {
  // Find the seeded demo user
  let user = await prisma.user.findUnique({
    where: { email: 'demo@devstash.io' },
  });

  if (!user) {
    // Fallback to first user in the database if demo user doesn't exist
    user = await prisma.user.findFirst();
  }

  if (!user) {
    return [];
  }

  // Load all item types to map defaultTypeId cuids to names
  const itemTypes = await prisma.itemType.findMany();
  const typeMap = new Map(itemTypes.map(t => [t.id, t]));

  const dbCollections = await prisma.collection.findMany({
    where: {
      userId: user.id,
    },
    include: {
      items: {
        include: {
          item: {
            include: {
              itemType: true,
              tags: {
                include: {
                  tag: true,
                },
              },
              collections: {
                include: {
                  collection: true,
                },
              },
            },
          },
        },
      },
    },
    orderBy: {
      updatedAt: 'desc',
    },
  });

  return dbCollections.map((col) => {
    const items = col.items.map((ci) => mapItem(ci.item));
    
    // Resolve defaultTypeId cuid to 'type-name' format
    const defaultType = col.defaultTypeId ? typeMap.get(col.defaultTypeId) : null;
    const defaultTypeId = defaultType ? `type-${defaultType.name.toLowerCase()}` : undefined;

    return {
      id: col.id,
      name: col.name,
      description: col.description || undefined,
      isFavorite: col.isFavorite,
      defaultTypeId,
      itemCount: items.length,
      items,
      createdAt: col.createdAt.toISOString(),
      updatedAt: col.updatedAt.toISOString(),
    };
  });
}

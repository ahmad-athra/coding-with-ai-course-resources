import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import * as dotenv from "dotenv";

// Load environment variables from .env
dotenv.config();

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not set in the environment variables.");
}

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🔌 Connecting to the database...");
  
  try {
    // Attempt a simple query to verify the connection and data
    const users = await prisma.user.count();
    const itemTypes = await prisma.itemType.findMany();
    const collections = await prisma.collection.count();
    const items = await prisma.item.count();
    const tags = await prisma.tag.count();
    
    console.log("✅ Database connection successful!");
    console.log(`📦 Seeded Record Counts:`);
    console.log(` - Users: ${users}`);
    console.log(` - Item Types: ${itemTypes.length}`);
    console.log(` - Collections: ${collections}`);
    console.log(` - Items: ${items}`);
    console.log(` - Tags: ${tags}`);
  } catch (error) {
    console.error("❌ Failed to connect or query the database:");
    console.error(error);
  } finally {
    // Properly close connections
    await prisma.$disconnect();
    await pool.end();
  }
}

main();

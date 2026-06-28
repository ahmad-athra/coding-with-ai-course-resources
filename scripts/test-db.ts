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
    const itemTypes = await prisma.itemType.findMany();
    
    console.log("✅ Database connection successful!");
    console.log(`📦 Found ${itemTypes.length} system item types seeded in the database:`);
    console.log(itemTypes.map(type => ` - ${type.name} (Icon: ${type.icon})`).join("\n"));
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

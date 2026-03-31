import * as dotenv from "dotenv";
import url from "node:url";
import path from "node:path";
import pg from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.js";

const { Pool } = pg;
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

// Carga el .env de la raíz del monorepo, modificar el path de ser necesario
dotenv.config({ path: path.join(__dirname, "../../../.env") });

const connectionString = process.env["DATABASE_URL"];

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool as any);
const prisma = new PrismaClient({ adapter });

export { prisma };
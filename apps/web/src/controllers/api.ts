import * as dotenv from "dotenv";
import url from "node:url";
import path from "node:path";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

// Carga el .env de la raíz del monorepo, modificar el path de ser necesario
dotenv.config({ path: path.join(__dirname, "../../../../.env") });

const API_URL = process.env.API_URL;

if (!API_URL) {
    throw new Error("API_URL is not defined");
}

export { API_URL };
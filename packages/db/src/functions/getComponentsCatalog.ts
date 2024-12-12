import { JSONFile } from "lowdb/node";
import type { DBSchema } from "../interfaces/dbSchema.js";
import path from "path";
import { fileURLToPath } from "url";
import DB from "../interfaces/DbWithLodash.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default async function getComponentsCatalog() {
  const defaultData: DBSchema = {
    components: [],
  };
  const filePath = path.resolve(
    __dirname,
    "../constants/components-catalog.json"
  );

  const adapter = new JSONFile<DBSchema>(filePath);

  const db = new DB(adapter, defaultData);
  await db.read();

  return db;
}

import { JSONFile } from "lowdb/node";
import type {
  ComponentsDBSchema
} from "../interfaces/Schemas.js";
import path from "path";
import { fileURLToPath } from "url";
import DB from "../classes/DbWithLodash.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default async function componentsDB() {
  const defaultData: ComponentsDBSchema = {
    components: [],
  };
  const filePath = path.resolve(
    __dirname,
    "../databases/componentsDB.json"
  );

  const adapter = new JSONFile<ComponentsDBSchema>(filePath);

  const db = new DB(adapter, defaultData);
  await db.read();

  return db;
}

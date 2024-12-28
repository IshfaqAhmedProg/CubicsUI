import { JSONFile } from "lowdb/node";
import type { LibraryComponentsDBSchema } from "../interfaces/Schemas.js";
import path from "path";
import { fileURLToPath } from "url";
import DB from "../classes/DbWithLodash.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default async function libraryComponentsDB() {
  const defaultData: LibraryComponentsDBSchema = {
    components: [],
  };
  const filePath = path.resolve(
    __dirname,
    "../constants/library-components-catalog.json"
  );

  const adapter = new JSONFile<LibraryComponentsDBSchema>(filePath);

  const db = new DB(adapter, defaultData);
  await db.read();

  return db;
}

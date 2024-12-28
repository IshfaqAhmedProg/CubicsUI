import { JSONFile } from "lowdb/node";
import type { ComponentCatalogSchema } from "../interfaces/Schemas.js";
import path from "path";
import { fileURLToPath } from "url";
import DB from "../classes/DbWithLodash.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default async function getComponentsCatalog() {
  const defaultData: ComponentCatalogSchema = {
    components: [],
  };
  const filePath = path.resolve(
    __dirname,
    "../constants/library-components-catalog.json"
  );

  const adapter = new JSONFile<ComponentCatalogSchema>(filePath);

  const db = new DB(adapter, defaultData);
  await db.read();

  return db;
}

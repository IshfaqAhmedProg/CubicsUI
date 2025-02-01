import { writeFile as _writeFile } from "fs/promises";
import mkDirSync from "./mkDirSync.js";
import { OpenMode } from "fs";

export default async function writeFile(
  filePath: string,
  data: string,
  flag: OpenMode | undefined = "w"
) {
  mkDirSync(filePath);
  await _writeFile(filePath, data, { flag });
}

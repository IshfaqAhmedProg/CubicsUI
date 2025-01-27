import { PrismaClient } from "@cubicsui/db";

const db = () => new PrismaClient();
// const db = (url?: string) =>
//   new PrismaClient({
//     datasources: {
//       db: {
//         url: url,
//       },
//     },
//   });

export default db;

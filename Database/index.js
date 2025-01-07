import { JsonDatabase } from "wio.db";

const db = new JsonDatabase({ databasePath: './Json/Configs'});

export { db }
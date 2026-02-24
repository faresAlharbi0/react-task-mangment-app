import initSqlJs from "sql.js";
import wasmUrl from "sql.js/dist/sql-wasm.wasm?url";
import { v4 as uuidv4 } from "uuid";

let dbInstance = null;

export const getDB = async () => {
  if (dbInstance) return dbInstance;

  const SQL = await initSqlJs({
    locateFile: () => wasmUrl,
  });

  const saved = localStorage.getItem("db_backup");

  if (saved) {
    const binary = Uint8Array.from(atob(saved), (c) => c.charCodeAt(0));
    dbInstance = new SQL.Database(binary);
  } else {
    dbInstance = new SQL.Database();
    console.log("creating_table");
    dbInstance.run(`
      CREATE TABLE IF NOT EXISTS buckets (
        id TEXT NOT NULL,
        title TEXT NOT NULL
      );
    `);
    dbInstance.run(`
    CREATE TABLE IF NOT EXISTS tasks (
      id TEXT NOT NULL,
      bucket_id INTEGER NOT NULL,
      title TEXT NOT NULL,
      description TEXT,
      FOREIGN KEY (bucket_id) REFERENCES buckets(id) ON DELETE CASCADE
    );`);
    saveDB();
  }

  return dbInstance;
};

export const getBuckets = async () => {
  const db = await getDB();
  const result = db.exec("SELECT * FROM buckets;");
  if (!result || !result[0] || !result[0].values) return [];

  const columns = result[0].columns ?? result[0].lc;
  const { values } = result[0];

  return values.map((row) =>
    Object.fromEntries(row.map((val, i) => [columns[i], val])),
  );
};

export const getTasks = async (bucket_id) => {
  const db = await getDB();
  const result = db.exec(
    `SELECT * FROM tasks WHERE bucket_id = '${bucket_id}';`,
  );
  if (!result || !result[0] || !result[0].values) return [];

  const columns = result[0].columns ?? result[0].lc;
  const { values } = result[0];

  return values.map((row) =>
    Object.fromEntries(row.map((val, i) => [columns[i], val])),
  );
};
export const insertNewTask = async (bucket_id, title, description) => {
  if (!title?.trim()) return;

  const db = await getDB();
  const id = uuidv4();
  const trimmed_title = title.trim().replace(/'/g, "''");
  const trimmed_description = description.trim().replace(/'/g, "''");
  const trimmed_bucket_id = bucket_id.trim().replace(/'/g, "''");

  try {
    db.run(
      `INSERT INTO tasks (id, bucket_id, title, description) VALUES ('${id}', '${trimmed_bucket_id}', '${trimmed_title}', '${trimmed_description}');`,
    );
    console.log("INSERT succeeded");
    saveDB();
  } catch (e) {
    console.error("INSERT failed:", e.message);
  }
};

export const insertNewBucket = async (title) => {
  if (!title?.trim()) return;

  const db = await getDB();
  const id = uuidv4();
  const trimmed = title.trim().replace(/'/g, "''");

  try {
    db.run(`INSERT INTO buckets (id, title) VALUES ('${id}', '${trimmed}');`);
    console.log("INSERT succeeded");
    saveDB();
  } catch (e) {
    console.error("INSERT failed:", e.message);
  }
};

const saveDB = () => {
  if (!dbInstance) return;

  const binaryArray = dbInstance.export();

  const base64 = btoa(
    binaryArray.reduce((data, byte) => data + String.fromCharCode(byte), ""),
  );

  localStorage.setItem("db_backup", base64);
};

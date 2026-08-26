import * as SQLite from "expo-sqlite";

const DATABASE_NAME = "enroute.db";

let database: SQLite.SQLiteDatabase | null = null;

export async function getDatabase() {
    if (database) { return database; }

    database = await SQLite.openDatabaseAsync(DATABASE_NAME);

    return database;
}

export async function initializeDatabase() {
    const db = await getDatabase();

    await db.execAsync(`
        CREATE TABLE IF NOT EXISTS trips (
            id INTEGER PRIMARY KEY AUTOINCREMENT,

            origin_name TEXT,
            origin_latitude REAL NOT NULL,
            origin_longitude REAL NOT NULL,

            destination_name TEXT,
            destination_latitude REAL NOT NULL,
            destination_longitude REAL NOT NULL,

            final_latitude REAL NOT NULL,
            final_longitude REAL NOT NULL,

            distance_miles REAL NOT NULL,
            duration_seconds INTEGER NOT NULL,

            transportation_mode TEXT NOT NULL,

            started_at INTEGER NOT NULL,
            ended_at INTEGER NOT NULL,

            arrived INTEGER NOT NULL
        );

        CREATE INDEX IF NOT EXISTS idx_trips_ended_at
        ON trips (ended_at DESC);
    `);
}
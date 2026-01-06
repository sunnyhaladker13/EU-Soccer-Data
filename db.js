const Database = require ("better-sqlite3");
const db = new Database ("database.sqlite");

// Get all records from any table
function getAllFromTable(tableName) {
    return db.prepare(`SELECT * FROM ${tableName}`).all();
}

// Get list of all tables in the database
function getTables() {
    return db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all();
}

// Getting the best players
function getTopPlayers(limit = 10) {
    return db.prepare(`
    SELECT
        p.player_name,
        p.player_api_id,
        best.best_rating,
        CAST((julianday(MAX(pa.date)) - julianday(p.birthday)) / 365.25 AS INT) AS age_at_rating,
        p.birthday
    FROM Player p
    JOIN (
        SELECT
            player_api_id,
            MAX(overall_rating) AS best_rating
        FROM Player_Attributes
        GROUP BY player_api_id
    ) best ON p.player_api_id = best.player_api_id
    JOIN Player_Attributes pa ON pa.player_api_id = p.player_api_id
    GROUP BY p.player_api_id
    ORDER BY best.best_rating DESC
    LIMIT ?
  `).all(limit);
}

module.exports = { getAllFromTable, getTables, getTopPlayers };
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

module.exports = { getAllFromTable, getTables };
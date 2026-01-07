const Database = require("better-sqlite3");
const db = new Database("database.sqlite");

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
  return db
    .prepare(
      `
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
  `
    )
    .all(limit);
}

// Getting player attributes by ID
function getPlayerAttributes(playerApiId) {
  return db
    .prepare(`
SELECT 
    Player.player_name,
    Player.birthday,
    CAST(
    (julianday('now') - julianday(Player.birthday)) / 365.2425
    AS INTEGER) 
    AS age,
    Player.height / 30.48 AS height_ft,
    Player.weight / 2.204 AS weight_kg,

    Player_Attributes.overall_rating,
    Player_Attributes.potential,
    Player_Attributes.preferred_foot,

	    ((
             Player_Attributes.finishing +
             Player_Attributes.shot_power +
             Player_Attributes.long_shots +
             Player_Attributes.volleys
         ) / 4.0) / 20.0
        AS shooting,

    ((
              Player_Attributes.short_passing +
              Player_Attributes.long_passing +
              Player_Attributes.vision
          ) / 3.0) / 20.0
        AS passing,

    ((
             Player_Attributes.dribbling +
             Player_Attributes.ball_control +
             Player_Attributes.agility
         ) / 3.0) / 20.0
        AS dribbling,

    ((
            Player_Attributes.marking +
            Player_Attributes.standing_tackle +
            Player_Attributes.sliding_tackle +
            Player_Attributes.interceptions
        ) / 4.0 ) / 20.0
        AS defending
    

FROM Player
LEFT JOIN Player_Attributes
    ON Player.player_api_id = Player_Attributes.player_api_id

WHERE Player.player_api_id = ?
ORDER BY Player_Attributes.date DESC
LIMIT 1;
        `
    )
    .all(playerApiId);
}

module.exports = {
  getAllFromTable,
  getTables,
  getTopPlayers,
  getPlayerAttributes,
};

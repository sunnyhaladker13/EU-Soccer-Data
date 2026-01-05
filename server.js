const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const { getAllFromTable, getTables, getTopPlayers } = require("./db");

app.use(cors());
app.use(express.json());

// Route to get list of tables in the database
app.get('/api/tables', (req, res) => {
    try {
    const tables = getTables();
    res.status(200).json(tables);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

// Route to get top players
app.get('/api/top-players', (req, res) => {
    try {
        const players = getTopPlayers(10);
        res.status(200).json(players);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

// Route to get all the data from a specefic table.
app.get('/api/:tableName', (req, res) => {
    try {
    const data = getAllFromTable(req.params.tableName);
    res.status(200).json(data);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

app.listen(port, () => {
    console.log(`The port is running on ${port}`)
})
/* eslint-disable @typescript-eslint/no-unused-vars -- Remove when used */
import 'dotenv/config';
import express, { application } from 'express';
import pg from 'pg';

import { ClientError, errorMiddleware } from './lib/index.js';

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const app = express();

// Create paths for static directories
const reactStaticDir = new URL('../client/dist', import.meta.url).pathname;
const uploadsStaticDir = new URL('public', import.meta.url).pathname;

app.use(express.static(reactStaticDir));
// Static directory for file uploads server/public/
app.use(express.static(uploadsStaticDir));
app.use(express.json());

app.get('/api/games', async (req, res, next) => {
  try {
    const sql = `
      SELECT * FROM "games";
    `;
    const result = await db.query(sql);
    const games = result.rows;
    res.json(games);
  } catch (err) {
    next(err);
  }
});

app.get('/api/getItemName', async (req, res, next) => {
  const { gamePin, playerName } = req.query;

  if (!gamePin || !playerName) {
    return res
      .status(400)
      .json({ error: 'GamePin and player name is required' });
  }
  try {
    const sql = `
    SELECT i."itemName"
    FROM "items" i
    JOIN "games" g USING ("itemId")
    JOIN "gamePlayers" gp USING ("gamePin")
    WHERE g."gamePin" = $1 AND gp."playerName" = $2 AND gp."isImposter" = false
    `;
    const values = [gamePin, playerName];

    const result = await db.query(sql, values);

    if (result.rows.length > 0) {
      res.json({ itemName: result.rows[0].itemName });
    } else {
      res
        .status(404)
        .json({ error: 'Item not found or player is an imposter' });
    }
  } catch (error) {
    console.error('Error fetching item name:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/submitHint', async (req, res, next) => {
  const { hint } = req.body;
  try {
    const sql = `
      INSERT INTO "hints" ("hint")
      VALUES ($1)
      RETURNING *;
    `;
    const params = [hint];
    const result = await db.query(sql, params);
    const aHint = result.rows[0];
  } catch (error) {
    console.error('Cannot submit hint', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/gamePlayers', async (req, res, next) => {
  try {
    const sql = `
      SELECT * FROM "gamePlayers";
    `;
    const result = await db.query(sql);
    const gamePlayers = result.rows;
    res.json(gamePlayers);
  } catch (err) {
    next(err);
  }
});

app.post('/api/gamePlayers', async (req, res, next) => {
  try {
    const { gamePlayersId, isImposter, isAlive } = req.body;

    if (
      typeof gamePlayersId !== 'number' ||
      typeof isImposter !== 'boolean' ||
      typeof isAlive !== 'boolean'
    ) {
      return res.status(400).json({ error: 'Invalid input data' });
    }

    const sql = `
      UPDATE gamePlayers
      SET isImposter = $1, isAlive = $2
      WHERE gamePlayersId = $3
      RETURNING *;
    `;
    const values = [isImposter, isAlive, gamePlayersId];

    const result = await db.query(sql, values);
    const updatedGamePlayer = result.rows[0];

    res.json(updatedGamePlayer);
  } catch (err) {
    next(err);
  }
});

app.get('/api/categories', async (req, res, next) => {
  try {
    const sql = `
      SELECT "categoryId", "categoryName"
      FROM "categories";
    `;
    const result = await db.query(sql);
    const categories = result.rows;
    res.json(categories);
  } catch (err) {
    next(err);
  }
});

app.post('/api/newGame', async (req, res, next) => {
  const { hostName, categoryId, itemId, gamePin } = req.body;
  try {
    const sql = `
      INSERT INTO "games" ("hostName", "categoryId", "itemId", "gamePin")
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const params = [hostName, categoryId, itemId, gamePin];
    const result = await db.query(sql, params);
    const newGame = result.rows[0];
    const players = `
      INSERT INTO "gamePlayers" ("gamePin", "playerName")
      VALUES ($1, $2)
      RETURNING *;
    `;
    const params1 = [newGame.gamePin, hostName];
    await db.query(players, params1);
    const sql2 = `
    Select * from "games"
    JOIN "categories" using ("categoryId")
    JOIN "items" using ("itemId")
    WHERE "games"."gamePin" = $1
    `;
    const params2 = [newGame.gamePin];
    const result2 = await db.query(sql2, params2);
    res.status(201).json(result2.rows[0]);
  } catch (err) {
    next(err);
  }
});

app.post('/api/joinGame', async (req, res, next) => {
  const { playerName, gamePin } = req.body;
  if (!playerName) {
    console.log('Error: playerName is missing or invalid');
    res.status(400).json({ error: 'Invalid input: playerName is required' });
    return;
  }

  try {
    const sql = `
      INSERT INTO "gamePlayers" ("gamePin", "playerName")
      VALUES ($1, $2)
      RETURNING *;
    `;
    const params = [gamePin, playerName];
    const result = await db.query(sql, params);
    const newPlayer = result.rows[0];
    console.log('New player added:', newPlayer);
    const sql2 = `
    Select * from "games"
    JOIN "categories" using ("categoryId")
    JOIN "items" using ("itemId")
    WHERE "games"."gamePin" = $1
    `;
    const params2 = [gamePin];
    const result2 = await db.query(sql2, params2);
    res.status(201).json(result2.rows[0]);
  } catch (err) {
    console.error('Error adding player:', err);
    next(err);
  }
});

app.get('/api/players', async (req, res, next) => {
  const { gamePin } = req.query;
  try {
    const sql = `
      SELECT *
      FROM "gamePlayers"
      WHERE "gamePin" = $1;
    `;
    const result = await db.query(sql, [gamePin]);
    const players = result.rows;
    res.json(players);
  } catch (err) {
    next(err);
  }
});

app.get('/api/players/:playerName', async (req, res, next) => {
  const { playerName } = req.params;
  try {
    const sql = `
      SELECT *
      FROM "gamePlayers"
      WHERE "playerName" = $1;
    `;
    const result = await db.query(sql, [playerName]);
    const players = result.rows[0];
    res.json(players);
  } catch (err) {
    next(err);
  }
});

app.get('/api/categories/:categoryId/items', async (req, res, next) => {
  const { categoryId } = req.params;
  try {
    const sql = `
      SELECT *
      FROM items
      WHERE "categoryId" = $1
      ORDER BY RANDOM()
      LIMIT 1;
    `;
    const result = await db.query(sql, [categoryId]);
    const randomItem = result.rows[0];

    if (randomItem) {
      res.json(randomItem);
    } else {
      res.status(404).json('No items found for the specified category.');
    }
  } catch (err) {
    console.error(`Error fetching items for category ${categoryId}:`, err);
    res.status(500).json({ error: 'An unexpected error occurred' });
  }
});

app.post('/api/startGame', async (req, res, next) => {
  const { gamePin } = req.body;
  try {
    const sql = `
      UPDATE "games"
      SET "gameState" = 'started'
      WHERE "gamePin" = $1
      RETURNING *;
    `;
    const result = await db.query(sql, [gamePin]);
    const game = result.rows[0];
    const sql2 = `
    select * from "gamePlayers" where "gamePin" = $1 ORDER BY RANDOM()
    LIMIT 1;
    `;
    const result2 = await db.query(sql2, [gamePin]);
    const player = result2.rows[0];
    const sql3 = `
    update "gamePlayers" set "isImposter" = true where "gamePlayersId" = $1
    `;
    await db.query(sql3, [player.gamePlayersId]);
    const sql4 = `
    Select * from "games"
    JOIN "categories" using ("categoryId")
    JOIN "items" using ("itemId")
    WHERE "games"."gamePin" = $1
    `;
    const params4 = [gamePin];
    const result4 = await db.query(sql4, params4);
    res.json(result4.rows[0]);
  } catch (err) {
    next(err);
  }
});

app.get('*', (req, res) => res.sendFile(`${reactStaticDir}/index.html`));

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  console.log('Listening on port', process.env.PORT);
});

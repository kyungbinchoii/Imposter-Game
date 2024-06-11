set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "users" (
  "userId" serial PRIMARY KEY,
  "userName" text,
  "passwordHash" text,
  "createdAt" timestamptz
);

CREATE TABLE "categories" (
  "categoryId" serial PRIMARY KEY,
  "userId" integer,
  "categoryName" text,
  "createdAt" timestamptz
);

CREATE TABLE "items" (
  "itemId" serial PRIMARY KEY,
  "categoryId" serial,
  "itemName" text,
  "createdAt" timestamptz
);

CREATE TABLE "players" (
  "playerId" serial PRIMARY KEY,
  "userName" text,
  "createdAt" timestamptz
);

CREATE TABLE "games" (
  "gameId" serial PRIMARY KEY,
  "gameState" text
);

CREATE TABLE "gamePlayers" (
  "gamePlayerId" serial PRIMARY KEY,
  "gameId" integer,
  "playerId" integer,
  "isStillInGame" bool,
  "isImposter" bool
);

CREATE TABLE "votes" (
  "voteId" serial PRIMARY KEY,
  "gameId" integer,
  "roundId" integer,
  "voterId" integer,
  "votedPlayerId" integer
);

ALTER TABLE "categories" ADD FOREIGN KEY ("userId") REFERENCES "users" ("userId");

ALTER TABLE "items" ADD FOREIGN KEY ("categoryId") REFERENCES "categories" ("categoryId");

ALTER TABLE "gamePlayers" ADD FOREIGN KEY ("gameId") REFERENCES "games" ("gameId");

ALTER TABLE "gamePlayers" ADD FOREIGN KEY ("playerId") REFERENCES "players" ("playerId");

ALTER TABLE "votes" ADD FOREIGN KEY ("voterId") REFERENCES "players" ("playerId");

ALTER TABLE "votes" ADD FOREIGN KEY ("votedPlayerId") REFERENCES "players" ("playerId");

ALTER TABLE "votes" ADD FOREIGN KEY ("gameId") REFERENCES "games" ("gameId");

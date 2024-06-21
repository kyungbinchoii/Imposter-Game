set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "games" (
  "gamePin" text PRIMARY KEY,
  "categoryId" integer,
  "hostName" text,
  "itemId" integer,
  "gameState" text
);

CREATE TABLE "categories" (
  "categoryId" serial PRIMARY KEY,
  "userId" integer,
  "categoryName" text
);

CREATE TABLE "items" (
  "itemId" serial PRIMARY KEY,
  "categoryId" serial,
  "itemName" text
);

CREATE TABLE "votes" (
  "voteId" serial PRIMARY KEY,
  "gamePin" text,
  "roundId" integer,
  "voterId" integer,
  "votedId" integer
);

CREATE TABLE "gamePlayers" (
  "gamePlayersId" serial PRIMARY KEY,
  "gamePin" text,
  "playerName" text unique not null,
  "isImposter" boolean default false,
  "isAlive" boolean default true
);

CREATE TABLE "hints" (
  "hintId" serial PRIMARY KEY,
  "playerId" integer,
  "roundId" integer,
  "gamePin" text,
  "hint" text
);


ALTER TABLE "gamePlayers" ADD FOREIGN KEY ("gamePin") REFERENCES "games" ("gamePin");

ALTER TABLE "votes" ADD FOREIGN KEY ("gamePin") REFERENCES "games" ("gamePin");

ALTER TABLE "items" ADD FOREIGN KEY ("categoryId") REFERENCES "categories" ("categoryId");

ALTER TABLE "hints" ADD FOREIGN KEY ("gamePin") REFERENCES "games" ("gamePin");
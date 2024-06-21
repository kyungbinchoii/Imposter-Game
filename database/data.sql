INSERT INTO "categories" ("categoryName") VALUES
('Fruits');

WITH fruits AS (
    SELECT unnest(ARRAY[
        'Apple',
        'Orange',
        'Banana',
        'Grapes',
        'Pineapple',
        'Strawberry',
        'Blueberry',
        'Raspberry',
        'Mango',
        'Peach',
        'Cherry',
        'Watermelon',
        'Cantaloupe',
        'Honeydew',
        'Kiwi',
        'Lemon',
        'Lime',
        'Papaya',
        'Lychee',
        'Pomegranate',
        'Pear',
        'Plum',
        'Apricot',
        'Fig',
        'Guava'
    ]) AS fruitName
)
INSERT INTO "items" ("categoryId", "itemName")
SELECT 1, fruitName FROM fruits;

INSERT INTO "categories" ("categoryName") VALUES
('Actors');

WITH actors AS (
    SELECT unnest(ARRAY[
        'Robert Downey Jr.',
        'Leonardo DiCaprio',
        'Brad Pitt',
        'Johnny Depp',
        'Tom Hanks',
        'Denzel Washington',
        'Morgan Freeman',
        'Will Smith',
        'Scarlett Johansson',
        'Jennifer Lawrence',
        'Chris Hemsworth',
        'Chris Evans',
        'Tom Cruise',
        'Angelina Jolie',
        'Natalie Portman',
        'Matt Damon',
        'Christian Bale',
        'Hugh Jackman',
        'Emma Stone',
        'Meryl Streep',
        'Anne Hathaway',
        'Ryan Reynolds',
        'Jake Gyllenhaal',
        'Robert De Niro',
        'Al Pacino'
    ]) AS actorName
)
INSERT INTO "items" ("categoryId", "itemName")
SELECT 2, actorName FROM actors;

INSERT INTO "categories" ("categoryName") VALUES ('Superheroes');

WITH superheroes AS (
    SELECT unnest(ARRAY[
        'Superman',
        'Batman',
        'Wonder Woman',
        'Spider-Man',
        'Iron Man',
        'Captain America',
        'Thor',
        'Hulk',
        'Black Widow',
        'Aquaman',
        'Flash',
        'Green Lantern',
        'Doctor Strange',
        'Black Panther',
        'Ant-Man',
        'Wolverine',
        'Deadpool',
        'Daredevil',
        'Green Arrow',
        'Hawkeye',
        'Shazam',
        'Cyborg',
        'Star-Lord',
        'Gamora',
        'Rocket Raccoon'
    ]) AS superheroName
)
INSERT INTO "items" ("categoryId", "itemName")
SELECT 3, superheroName FROM superheroes;

INSERT INTO "categories" ("categoryName") VALUES ('Athletes');

WITH athletes AS (
    SELECT unnest(ARRAY[
        'Michael Jordan',
        'LeBron James',
        'Serena Williams',
        'Lionel Messi',
        'Cristiano Ronaldo',
        'Tom Brady',
        'Usain Bolt',
        'Roger Federer',
        'Tiger Woods',
        'Muhammad Ali',
        'Michael Phelps',
        'Kobe Bryant',
        'Rafael Nadal',
        'Shaquille O Neal',
        'Peyton Manning',
        'Mia Hamm',
        'Simone Biles',
        'David Beckham',
        'Stephen Curry',
        'Lewis Hamilton',
        'Neymar',
        'Kevin Durant',
        'Venus Williams',
        'Wayne Gretzky',
        'Mike Tyson'
    ]) AS athleteName
)
INSERT INTO "items" ("categoryId", "itemName")
SELECT 4, athleteName FROM athletes;

INSERT INTO "categories" ("categoryName") VALUES ('Celebrities');

WITH celebrities AS (
    SELECT unnest(ARRAY[
        'Beyoncé',
        'Kim Kardashian',
        'Taylor Swift',
        'Oprah Winfrey',
        'Ellen DeGeneres',
        'Justin Bieber',
        'Rihanna',
        'Kanye West',
        'Ariana Grande',
        'Lady Gaga',
        'Selena Gomez',
        'Drake',
        'Katy Perry',
        'Miley Cyrus',
        'Chris Brown',
        'Nicki Minaj',
        'Cardi B',
        'Justin Timberlake',
        'Bruno Mars',
        'Jennifer Lopez',
        'Ed Sheeran',
        'Shakira',
        'Madonna',
        'Adele',
        'Kendall Jenner'
    ]) AS celebrityName
)
INSERT INTO "items" ("categoryId", "itemName")
SELECT 5, celebrityName FROM celebrities;

INSERT INTO "categories" ("categoryName") VALUES ('Animals');

WITH animals AS (
    SELECT unnest(ARRAY[
        'Lion',
        'Tiger',
        'Elephant',
        'Giraffe',
        'Zebra',
        'Kangaroo',
        'Panda',
        'Koala',
        'Leopard',
        'Cheetah',
        'Gorilla',
        'Chimpanzee',
        'Dolphin',
        'Whale',
        'Shark',
        'Penguin',
        'Polar Bear',
        'Eagle',
        'Owl',
        'Wolf',
        'Fox',
        'Raccoon',
        'Squirrel',
        'Hippopotamus',
        'Rhinoceros'
    ]) AS animalName
)
INSERT INTO "items" ("categoryId", "itemName")
SELECT 6, animalName FROM animals;

INSERT INTO "categories" ("categoryName") VALUES ('Random Objects');

WITH random_objects AS (
    SELECT unnest(ARRAY[
        'Chair',
        'Table',
        'Lamp',
        'Sofa',
        'Cup',
        'Pen',
        'Book',
        'Bottle',
        'Clock',
        'Phone',
        'Laptop',
        'Keyboard',
        'Mouse',
        'Headphones',
        'Backpack',
        'Watch',
        'Umbrella',
        'Scissors',
        'Toothbrush',
        'Mirror',
        'Camera',
        'Wallet',
        'Glasses',
        'Key',
        'Notebook'
    ]) AS objectName
)
INSERT INTO "items" ("categoryId", "itemName")
SELECT 7, objectName FROM random_objects;

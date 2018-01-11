DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS favourites;

CREATE TABLE users (
    id    SERIAL primary key,
    name VARCHAR(255) not null,
    email VARCHAR(255) not null UNIQUE,
    password VARCHAR(100) not null,
    createdate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE favourites (
    id    SERIAL primary key,
    userid INTEGER not null,
    characterId INTEGER not null UNIQUE,
    characterName VARCHAR(255) not null,
    characterPic VARCHAR(255) not null,
    createdate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id    SERIAL primary key,
    name VARCHAR(255) not null,
    email VARCHAR(255) not null UNIQUE,
    password VARCHAR(100) not null,
    createdate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

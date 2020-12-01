DROP DATABASE IF EXISTS seat_down;

CREATE DATABASE seat_down;

USE seat_down;

CREATE TABLE users (
    id VARCHAR(255) NOT NULL UNIQUE,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    PRIMARY KEY(id)
);

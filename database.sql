CREATE DATABASE library;

-- Crear la tabla de autores
CREATE TABLE author (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Crear la tabla de libros
CREATE TABLE book (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    chapters INT NOT NULL,
    pages INT NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    author_id INT REFERENCES author(id)
);

CREATE USER rs17 WITH PASSWORD 'root';

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO rs17;

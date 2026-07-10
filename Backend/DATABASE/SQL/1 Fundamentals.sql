-- 1. Create a new database (optional, but good practice)
CREATE DATABASE test_db;

-- 2. Use the database
USE test_db;

-- 3. Create a table to store data
-- This defines the structure: 'id' as a unique integer, 'message' as text
CREATE TABLE greetings (
    id INT PRIMARY KEY,
    message VARCHAR(255)
);

-- 4. Insert data into the table
-- This adds a row to the 'greetings' table
INSERT INTO greetings (id, message) 
VALUES (1, 'Hello, World!');

-- 5. Retrieve the data (The Core Fundamental Topic)
-- This query selects the 'message' column from the 'greetings' table
SELECT message FROM greetings;

-- Notes :
-- Key Concepts Demonstrated:

-- CREATE TABLE: Defines how data is structured (columns and data types). 
-- INSERT INTO: Adds new records to the database. 
-- SELECT: The most basic and essential SQL command, used to fetch data.
-- In this example, SELECT message FROM greetings; returns the output: Hello, World!. 

-- 1. CREATE TABLE :
-- CREATE statements allow us to create a new table in the database.
-- You can use the CREATE statement anytime you want to create a new table from scratch. The statement below creates a new table named user.
CREATE TABLE user (
   id INTEGER, 
   name TEXT, 
   age INTEGER);
-- NOTE :
-- * CREATE TABLE is a clause that tells SQL you want to create a new table.
-- * celebs is the name of the table.
-- * (id INTEGER, name TEXT, age INTEGER) is a list of parameters defining each column, or attribute in the table and its data type:
--    - id is the first column in the table. It stores values of data type INTEGER
--    - name is the second column in the table. It stores values of data type TEXT
--    - age is the third column in the table. It stores values of data type INTEGER

-- 2. INSERT TABLE :
-- The INSERT statement inserts a new row into a table.
INSERT INTO user (id, name, age) 
VALUES (1, 'LOKI', 22);

-- 3. SELECT TABLE :
-- SELECT statements are used to fetch data from a database. In the statement below, SELECT returns all data in the name column of the 'user' table.
SELECT name FROM user;
-- You can also query data from all columns in a table with SELECT.
SELECT * FROM user;
-- Here, * is a special wildcard character that we have been using. It allows you to select every column in a table without having to name each one individually.

-- 4. ALTER TABLE :
-- The ALTER TABLE statement adds a new column to a table.
-- You can use this command when you want to add columns to a table. The statement below adds a new column mobile_num to the user table.
ALTER TABLE user 
ADD COLUMN mobile_num INTEGER;

-- 5. UPDATE TABLE :
-- The UPDATE statement edits a row in a table. You can use the UPDATE statement when you want to change existing records.
-- The statement below updates the record with an id value of 1 to have the mobile_num 12345.
UPDATE user 
SET mobile_num = 12345,
WHERE id = 1; 

-- 6. DELETE TABLE :
-- The DELETE FROM statement deletes one or more rows from a table. You can use the statement when you want to delete existing records.
-- The statement below deletes all records in the celebs table with no mobile_num:
DELETE FROM user 
WHERE mobile_num IS NULL;

-- 7. CONSTRAINTS :
-- Constraints in SQL are the rules applied to the values of individual columns. They add information about how a column can be used after specifying the data type for a column.
-- They can be used to tell the database to reject inserted data that does not adhere to a certain restriction.
-- Here are some of the constraints that can be set:
--  - PRIMARY KEY columns can be used to uniquely identify the row. Attempts to insert a row with an identical value to a row already in the table will result in a constraint violation which will not allow you to insert the new row.
--  - UNIQUE columns have a different value for every row. This is similar to PRIMARY KEY except a table can have many different UNIQUE columns.
--  - NOT NULL columns must have a value. Attempts to insert a row without a value for a NOT NULL column will result in a constraint violation and the new row will not be inserted.
--  - DEFAULT columns take an additional argument that will be the assumed value for an inserted row if the new row does not specify a value for that column.
-- Note: There can be only one PRIMARY KEY column per table, but there can be multiple UNIQUE columns.

CREATE TABLE user (
   id INTEGER PRIMARY KEY, 
   name TEXT UNIQUE,
   age INTEGER NOT NULL,
   mobile_num INTEGER DEFAULT 'No Number'
);

-- ** PRIMARY KEY columns can be used to uniquely identify the row. Attempts to insert a row with an identical value to a row already in the table will result in a constraint violation which will not allow you to insert the new row.
-- ** UNIQUE columns have a different value for every row. This is similar to PRIMARY KEY except a table can have many different UNIQUE columns.
-- ** NOT NULL columns must have a value. Attempts to insert a row without a value for a NOT NULL column will result in a constraint violation and the new row will not be inserted.
-- ** DEFAULT columns take an additional argument that will be the assumed value for an inserted row if the new row does not specify a value for that column.

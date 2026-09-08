-- Calculations performed on multiple rows of a table are called 'aggregates'.

-- 1.COUNT() :
-- The fastest way to calculate how many rows are in a table is to use the COUNT() function.
-- COUNT() is a function that takes the name of a column as an argument and counts the number of non-empty values in that column.
SELECT COUNT(*)
FROM table_name;
-- Here, we want to count every row, so we pass * as an argument inside the parenthesis.

-- 2.SUM() :
-- SQL makes it easy to add all values in a particular column using SUM().
-- SUM() is a function that takes the name of a column as an argument and returns the sum of all the values in that column.
  -- EX: Assume a column name 'downloads' in table 'apps'. What is the total number of downloads for all of the apps combined?
SELECT SUM(downloads)
FROM apps;
  -- This adds all values in the downloads column.

-- 3.MIN() / MAX() :
-- The MAX() and MIN() functions return the highest and lowest values in a column, respectively.
  -- EX: How many downloads does the most popular app have?
SELECT MAX(downloads)
FROM apps;
  -- RESULT: The most popular app has 31,090 downloads!
-- i)  MAX() takes the name of a column as an argument and returns the largest value in that column. Here, we returned the largest value in the downloads column.
-- ii) MIN() works the same way but it does the exact opposite; it returns the smallest value.

-- 4.Average AVG() :
-- SQL uses the AVG() function to quickly calculate the average value of a particular column.
-- The statement below returns the average number of downloads for an app in our database:
SELECT AVG(downloads)
FROM apps;
-- The AVG() function works by taking a column name as an argument and returns the average value for that column.

-- 5.Round() :
-- By default, SQL tries to be as precise as possible without rounding.
-- We can make the result table easier to read using the ROUND() function.
-- ROUND() function takes two arguments inside the parenthesis:
  -- a column name
  -- an integer
-- It rounds the values in the column to the number of decimal places specified by the integer.
SELECT ROUND(price, 0)
FROM apps;
-- Here, we pass the column price and integer 0 as arguments.
-- SQL rounds the values in the column to 0 decimal places in the output.

-- 6.GROUP BY :
-- Oftentimes, we will want to calculate an aggregate for data with certain characteristics.
-- For instance, we might want to know the mean IMDb ratings for all movies each year.
-- We could calculate each number by a series of queries with different WHERE statements, like so:
SELECT AVG(imdb_rating)
FROM movies
WHERE year = 1999;

SELECT AVG(imdb_rating)
FROM movies
WHERE year = 2000;

SELECT AVG(imdb_rating)
FROM movies
WHERE year = 2001;

-- and so on.
-- Luckily, there’s a better way!
-- We can use GROUP BY to do this in a single step:
SELECT year,
   AVG(imdb_rating)
FROM movies
GROUP BY year
ORDER BY year;

-- GROUP BY is a clause in SQL that is used with aggregate functions.
-- It is used in collaboration with the SELECT statement to arrange identical data into groups.
-- The GROUP BY statement comes after any WHERE statements, but before ORDER BY or LIMIT.

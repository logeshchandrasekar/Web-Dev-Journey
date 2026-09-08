-- QUERIES :
  -- One of the core purposes of the SQL language is to retrieve information stored in a database.
  -- This is commonly referred to as querying.
  -- Queries allow us to communicate with the database by asking questions and returning a result set with data relevant to the question.

-- 1.SELECT :
SELECT * FROM movies;
-- Selects all columns in movies table and displays it.

-- Suppose we are only interested in two of the columns. We can select individual columns by their names (separated by a comma):
SELECT name, genre 
FROM movies;

-- 2. AS (alias) :
SELECT name AS 'Titles'
FROM movies;
-- AS is a keyword in SQL that allows you to rename a column or table using an alias.
-- The new name can be anything you want as long as you put it inside of single quotes.
-- Here we renamed the name column as Titles.

-- 3.DISTINCT :
-- DISTINCT is used to return unique values in the output. It filters out all duplicate values in the specified column(s).
SELECT DISTINCT genre 
FROM movies;
-- Removes duplicate genre from table.

-- 4.WHERE :
-- The statement below filters the result set to only include top rated movies (IMDb ratings greater than 8).
SELECT *
FROM movies
WHERE imdb_rating > 8;

-- The > is an operator. Operators create a condition that can be evaluated as either true or false.
-- Comparison operators used with the WHERE clause are:
--   = equal to
--   != not equal to
--   > greater than
--   < less than
--   >= greater than or equal to
--   <= less than or equal to

-- 5.LIKE :
-- i) LIKE can be a useful operator when you want to compare similar values.
  -- EX: The movies table contains two films with similar titles, ‘Se7en’ and ‘Seven’.
  -- How could we select all movies that start with ‘Se’ and end with ‘en’ and have exactly one character in the middle?
SELECT * 
FROM movies
WHERE name LIKE 'Se_en';
  -- LIKE is a special operator used with the WHERE clause to search for a specific pattern in a column.
  -- name LIKE 'Se_en' is a condition evaluating the name column for a specific pattern.
  -- Se_en represents a pattern with a wildcard character.
  -- The _ means you can substitute any individual character here without breaking the pattern.
  -- The names Seven and Se7en both match this pattern.

-- ii) The percentage sign % is another wildcard character that can be used with 
  -- EX: This statement below filters the result set to only include movies with names that begin with the letter ‘A’:
SELECT * 
FROM movies
WHERE name LIKE 'A%';
  -- % is a wildcard character that matches zero or more missing characters in the pattern. For example:
  -- A% matches all movies with names that begin with letter ‘A’
  -- %a matches all movies that end with ‘a’

  -- EX: We can also use % both before and after a pattern:
SELECT * 
FROM movies 
WHERE name LIKE '%man%';
  -- Here, any movie that contains the word ‘man’ in its name will be returned in the result.
  -- LIKE is not case sensitive. ‘Batman’ and ‘Man of Steel’ will both appear in the result of the query above.

-- 6.IS NULL :
-- Unknown values are indicated by NULL.
-- It is not possible to test for NULL values with comparison operators, such as = and !=.
-- Instead, we will have to use these operators:
  -- IS NULL
  -- IS NOT NULL

-- EX: To filter for all movies with an IMDb rating:
SELECT name
FROM movies 
WHERE imdb_rating IS NOT NULL;

-- 7.BETWEEN
-- between operator is used in a clause to filter the result set within a certain range. It accepts two values that are either numbers, text, or dates.
  -- EX: this statement filters the result set to only include movies with years from 1990 up to, and including 1999.
SELECT *
FROM movies
WHERE year BETWEEN 1990 AND 1999;

-- EX: When the values are text, BETWEEN filters the result set for within the alphabetical range.
-- In this statement, BETWEEN filters the result set to only include movies with names that begin with the letter ‘A’ up to, but not including ones that begin with ‘J’.
SELECT *
FROM movies
WHERE name BETWEEN 'A' AND 'J';
-- However, if a movie has a name of simply ‘J’, it would actually match.
-- This is because BETWEEN goes up to the second value — up to ‘J’.
-- So the movie named ‘J’ would be included in the result set but not ‘Jaws’.

-- 8.AND :
-- Sometimes we want to combine multiple conditions in a WHERE clause to make the result set more specific and useful.
-- One way of doing this is to use the AND operator.
  -- EX: Here, we use the AND operator to only return 90’s romance movies.
SELECT * 
FROM movies
WHERE year BETWEEN 1990 AND 1999
AND genre = 'romance';
-- With AND, both conditions must be true for the row to be included in the result.

-- 9.OR :
-- Similar to AND, the OR operator can also be used to combine multiple conditions in WHERE, but there is a fundamental difference:
  -- AND operator displays a row if all the conditions are true.
  -- OR operator displays a row if any condition is true.
    -- EX: Suppose we want to check out a new movie or something action :
SELECT *
FROM movies
WHERE year > 2014
   OR genre = 'action';

-- 10.ORDER BY :
-- We can sort the results using ORDER BY, either alphabetically or numerically. Sorting the results often makes the data more useful and easier to analyze.
  --EX: if we want to sort everything by the movie’s title from A through Z:
SELECT *
FROM movies
ORDER BY name;
--ORDER BY is a clause that indicates you want to sort the result set by a particular column.
-- Sometimes we want to sort things in a decreasing order.
  --EX: if we want to select all of the well-received movies, sorted from highest to lowest by their year:
SELECT *
FROM movies
WHERE imdb_rating > 8
ORDER BY year DESC;
-- DESC is a keyword used in ORDER BY to sort the results in descending order (high to low or Z-A).
-- ASC is a keyword used in ORDER BY to sort the results in ascending order (low to high or A-Z).
-- The column that we ORDER BY doesn’t even have to be one of the columns that we’re displaying.
-- Note: ORDER BY always goes after WHERE (if WHERE is present).

-- 11.LIMIT :
-- LIMIT is a clause that lets you specify the maximum number of rows the result set will have.
-- This saves space on our screen and makes our queries run faster.
SELECT *
FROM movies
LIMIT 10;
-- Here, we specify that the result set can’t have more than 10 rows.
-- LIMIT always goes at the very end of the query. Also, it is not supported in all SQL databases.

-- 12.CASE :
-- A CASE Returns different output based on the conditions of each statement.(usually in the SELECT statement).
-- It is SQL’s way of handling if-then logic.
  -- EX: Suppose we want to condense the ratings in movies to three levels:
  -- If the rating is above 8, then it is Fantastic.
  -- If the rating is above 6, then it is Poorly Received.
  -- Else, Avoid at All Costs.
SELECT name,
 CASE
  WHEN imdb_rating > 8 THEN 'Fantastic'
  WHEN imdb_rating > 6 THEN 'Poorly Received'
  ELSE 'Avoid at All Costs'
 END
FROM movies;
  -- Each WHEN tests a condition and the following THEN gives us the string if the condition is true.
  -- The ELSE gives us the string if all the above conditions are false.
  -- The CASE statement must end with END.
  -- In the result, you have to scroll right because the column name is very long. To shorten it, we can rename the column to ‘Review’ using AS
SELECT name,
 CASE
  WHEN imdb_rating > 8 THEN 'Fantastic'
  WHEN imdb_rating > 6 THEN 'Poorly Received'
  ELSE 'Avoid at All Costs'
 END AS 'Review'
FROM movies;
-- Now the new column's name won't be that long. Also dont forget to add comma before the CASE Statement.

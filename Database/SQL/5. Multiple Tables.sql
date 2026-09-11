-- INTRODUCTION :
-- In order to efficiently store data, we often spread related information across multiple tables.
  -- EX: imagine that we’re running a magazine company where users can have different types of subscriptions to different products.
  -- Different subscriptions might have many different properties. Each customer would also have lots of associated information.
  -- We could have one table with all of the following information in columns:
order_id
customer_id
customer_name
customer_address
subscription_id
subscription_description
subscription_monthly_price
subscription_length
purchase_date
-- However, a lot of this information would be repeated.
-- If the same customer has multiple subscriptions, that customer’s name and address will be reported multiple times.
-- If the same subscription type is ordered by multiple customers, then the subscription price and subscription description will be repeated.
-- This will make our table big and unmanageable.
-- So instead, we can split our data into three tables:
  --i.e:
  -- 1. orders would contain just the information necessary to describe what was ordered:
  order_id, customer_id, subscription_id, purchase_date
  -- 2. subscriptions would contain the information to describe each type of subscription:
  subscription_id, description, price_per_month, subscription_length
  -- 3. customers would contain the information for each customer:
  customer_id, customer_name, address
--  we’ll learn the SQL commands that will help us work with data that is stored in multiple tables.

-- Suppose we have the three tables described above:
orders
subscriptions
customers
-- If we just look at the orders table, we can’t really tell what’s happened in each order.
-- However, if we refer to the other tables, we can get a complete picture.
-- Let’s examine the order with an order_id of 2.
-- It was purchased by the customer with a customer_id of 2.
-- To find out the customer’s name, we look at the customers table and look for the item with a customer_id value of 2.
-- We can see that Customer 2’s name is ‘Jane Doe’ and that she lives at ‘456 Park Ave’.
-- Doing this kind of matching is called joining two tables.

-- 1.JOIN :
-- Combining tables manually is time-consuming.
-- Luckily, SQL gives us an easy sequence for this: it’s called a JOIN
-- The JOIN clause allows for the return of results from more than one table by joining them together with other results based on common column values specified using an ON clause.
-- If we want to combine orders and customers, we would type:
SELECT *
FROM orders
JOIN customers
  ON orders.customer_id = customers.customer_id;

-- 2.INNER JOIN :
-- For every possible value of customer_id in orders, there was a corresponding row of customers with the same customer_id.
-- What if that wasn’t true?
-- EX: imagine that our customers table was out of date, and was missing any information on customer 11.
-- If that customer had an order in orders, what would happen when we joined the tables?
-- When we perform a simple JOIN (often called an inner join) our result only includes rows that match our ON condition.

-- 3.LEFT JOIN :
-- What if we want to combine two tables and keep some of the un-matched rows?
-- SQL lets us do this through a command called LEFT JOIN
-- It Combines rows from two or more tables based on a related column, returning all records from the left table and matching records from the right table.
-- In simple, A left join will keep all rows from the first table, regardless of whether there is a matching row in the second table.
  --EX :
SELECT *
FROM table1
LEFT JOIN table2
  ON table1.c2 = table2.c2;
  -- The first line selects all columns from both tables.
  -- The second line selects table1 (the “left” table).
  -- The third line performs a LEFT JOIN on table2 (the “right” table).
  -- The fourth line tells SQL how to perform the join (by looking for matching values in column c2).

-- 4.PRIMARY KEY vs FOREIGN KEY :
-- we have three tables: orders, subscriptions, and customers.
-- Each of these tables has a column that uniquely identifies each row of that table:
  -- order_id for orders
  -- subscription_id for subscriptions
  -- customer_id for customers
-- These special columns are called primary keys.
-- Primary keys have a few requirements:
  -- None of the values can be NULL.
  -- Each value must be unique (i.e., you can’t have two customers with the same customer_id in the customers table).
  -- A table can not have more than one primary key column.
-- When the primary key for one table appears in a different table, it is called a foreign key.
-- So customer_id is a primary key when it appears in customers, but a foreign key when it appears in orders.
  --EX: Suppose Columbia University has two tables in their database:
    -- The classes table contains information on the classes that the school offers. Its primary key is id.
    -- The students table contains information on all students in the school. Its primary key is id.
    -- It contains the foreign key class_id, which corresponds to the primary key of classes.
    -- Now Performing an inner join of classes and students using the primary and foreign keys described above, and selecting all the columns looks like below.
SELECT * FROM classes
JOIN students
ON classes.id = students.class_id;

-- 5.CROSS JOIN :
-- Sometimes, we just want to combine all rows of one table with all rows of another table.

  -- EX: if we had a table of shirts and a table of pants, we might want to know all the possible combinations to create different outfits.
  -- Our code might look like this:
SELECT shirts.shirt_color, pants.pants_color
FROM shirts
CROSS JOIN pants;
  -- The first line select the columns shirt_color and pants_color.
  -- The second line pulls data from the table shirts.
  -- The third line performs a CROSS JOIN with pants.
-- Notice that cross joins don’t require an ON statement. You’re not really joining on any columns!

  -- EX 2: If we have 3 different shirts (white, grey, and olive) and 2 different pants (light denim and black), the results might look like this:
    shirt_color:  pants_color:
    white	        light denim
    white	        black
    grey	        light denim
    grey	        black
    olive	        light denim
    olive	        black
  -- So, 3 shirts × 2 pants = 6 combinations!
  -- This clothing example is fun, but it’s not very practically useful.
-- A more common usage of CROSS JOIN is when we need to compare each row of a table to a list of values.

-- 6.UNION :
-- Sometimes we just want to stack one dataset on top of the other. Well, the UNION operator allows us to do that.
-- Suppose we have two tables and they have the same columns.
  -- table1:
    pokemon	    type
    Bulbasaur	  Grass
    Charmander	Fire
    Squirtle	  Water
  -- table2:
    pokemon	    type
    Snorlax	    Normal
-- If we combine these two with UNION:
SELECT *
FROM table1
UNION
SELECT *
FROM table2;
-- The result would be:
  -- table :
    pokemon	    type
    Bulbasaur	  Grass
    Charmander	Fire
    Squirtle	  Water
    Snorlax	    Normal
-- SQL has strict rules for appending data:
  -- Tables must have the same number of columns.
  -- The columns must have the same data types in the same order as the first table.

-- SUMMARY :
  -- JOIN will combine rows from different tables if the join condition is true.
  -- LEFT JOIN will return every row in the left table, and if the join condition is not met, NULL values are used to fill in the columns from the right table.
  -- Primary key is a column that serves a unique identifier for the rows in the table.
  -- Foreign key is a column that contains the primary key to another table.
  -- CROSS JOIN lets us combine all rows of one table with all rows of another table.
  -- UNION stacks one dataset on top of another.

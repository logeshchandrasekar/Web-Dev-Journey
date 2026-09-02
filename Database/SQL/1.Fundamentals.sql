-- SQL Intro :
SQL stands for Structured Query Language, and is the programming language implemented by a database management system (DBMS) used for managing and querying data held in a relational database.
SQL - Structured Query Language, is a programming language designed to manage data stored in relational databases.
A database is a collection of structured information stored so it can be easily accessed and updated.
In a computer system, databases are commonly accessed through a database management system, or DBMS, regardless of size.

-- Notes :
- A relational database is a database that organizes information into one or more tables.

- A table is a collection of data organized into rows and columns. Tables are sometimes referred to as relations.

- A column is a set of data values of a particular type.

- A row is a single record in a table.

- All data stored in a relational database is of a certain data type.
    Some of the most common data types are:
    - INTEGER, a positive or negative whole number
    - TEXT, a text string
    - DATE, the date formatted as YYYY-MM-DD
    - REAL, a decimal value

- The code below is a SQL statement. A statement is text that the database recognizes as a valid command. Statements always end in a semicolon ;.

CREATE TABLE table_name (
   column_1 data_type, 
   column_2 data_type, 
   column_3 data_type
);

Let’s break down the components of a statement:

- CREATE TABLE is a clause. Clauses perform specific tasks in SQL. By convention, clauses are written in capital letters. Clauses can also be referred to as commands.
- table_name refers to the name of the table that the command is applied to.
- (column_1 data_type, column_2 data_type, column_3 data_type) is a parameter. A parameter is a list of columns, data types, or values that are passed to a clause as an argument.
- Here, the parameter is a list of column names and the associated data type.
- The structure of SQL statements vary. The number of lines used does not matter. A statement can be written all on one line, or split up across multiple lines if it makes it easier to read.

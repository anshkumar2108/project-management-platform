create table users(
id INT primary key,
first_name varchar(50) NOT NULL,
last_name varchar(50) NOT NULL,
email varchar(100) UNIQUE,
created_at DATE,
updated_at DATE
);
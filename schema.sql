CREATE TABLE IF NOT EXISTS people(
  id serial primary key,
  name varchar(64) not null unique
);
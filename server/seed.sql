CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(30),
    password VARCHAR(500),
    first_name VARCHAR(50),
    last_name VARCHAR(50)
)
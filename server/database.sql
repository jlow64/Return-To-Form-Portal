CREATE DATABASE physiopern;

CREATE TABLE physio_item(
    item_id SERIAL PRIMARY KEY,
    description VARCHAR(255),
    exercise_name VARCHAR(255),
    sets INT NOT NULL DEFAULT 0, 
    reps INT NOT NULL DEFAULT 0,
    frequency INT NOT NULL DEFAULT 0
);

--set extension
CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT 
    uuid_generate_v4(),
    title VARCHAR(255),
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(255) DEFAULT 'user'
);

--insert fake user
INSERT INTO users(title, first_name, last_name, email, password, role) VALUES ('', 'demo first', 'demo_last', 'demo@gmail.com', 'asdfg123', 'admin');INSERT INTO users(title, first_name, last_name, email, password, role) VALUES ('', 'demo first', 'demo_last', 'demo@gmail.com', 'asdfg123', 'admin');
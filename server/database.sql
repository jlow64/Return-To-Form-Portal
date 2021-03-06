CREATE DATABASE physio_portal_db;

CREATE TABLE exercises(
    exercise_id SERIAL PRIMARY KEY,
    patient_id VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    exercise_name VARCHAR(255),
    sets INT NOT NULL DEFAULT 0, 
    reps INT NOT NULL DEFAULT 0,
    frequency INT NOT NULL DEFAULT 0,
    video_url VARCHAR(255),
    video_id VARCHAR(255)
);

--set extension
CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT 
    uuid_generate_v4(),
    patient_id VARCHAR(255),
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    password VARCHAR(255),
    role VARCHAR(255) DEFAULT 'patient'
);

--insert fake user
INSERT INTO users(patient_id, first_name, last_name, email, password, role) VALUES ('58336508', 'demo first', 'demo_last', 'demo@gmail.com', 'asdfg123', 'admin');
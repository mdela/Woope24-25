-- Create Users Table
CREATE TABLE weather
(
    id       SERIAL PRIMARY KEY,
    day VARCHAR(255),
    startTime VARCHAR(255),
    endTime VARCHAR(255),
    temp INT,
    TempUnit VARCHAR(1),
    descr VARCHAR(255)
);
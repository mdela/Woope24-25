CREATE TABLE resources (
    resource_id SERIAL,
    user_id INT NOT NULL,
    title VARCHAR(300) NOT NULL,
    link VARCHAR(300) NOT NULL,
    description TEXT,
    category TEXT NOT NULL,
    end_time TIMESTAMP WITH TIME ZONE NOT NULL,
    is_active BOOLEAN default TRUE,
    PRIMARY KEY (resource_id, user_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);
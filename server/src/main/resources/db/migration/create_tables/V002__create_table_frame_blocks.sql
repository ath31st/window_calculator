CREATE TABLE frame_blocks
(
    id                     SERIAL PRIMARY KEY,
    frame_id               INTEGER REFERENCES frames (id) ON DELETE CASCADE,
    name                   VARCHAR(255) NOT NULL,
    is_window_size_enabled BOOLEAN   DEFAULT FALSE,
    input_title            VARCHAR(255) NOT NULL,
    description            TEXT,
    created_at             TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at             TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

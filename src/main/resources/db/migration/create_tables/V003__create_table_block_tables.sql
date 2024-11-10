CREATE TABLE block_tables
(
    id             SERIAL PRIMARY KEY,
    frame_block_id INTEGER REFERENCES frame_blocks (id) ON DELETE CASCADE,
    name           VARCHAR(255) NOT NULL,
    button_type    INTEGER      NOT NULL,
    created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE table_buttons
(
    id             SERIAL PRIMARY KEY,
    block_table_id INTEGER REFERENCES block_tables (id) ON DELETE CASCADE,
    name           VARCHAR(255),
    value          DECIMAL(10, 2),
    created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

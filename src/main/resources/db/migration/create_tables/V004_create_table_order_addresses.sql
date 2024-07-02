CREATE TABLE order_addresses
(
    id         SERIAL PRIMARY KEY,
    order_id   INTEGER REFERENCES orders (id) ON DELETE CASCADE,
    street     VARCHAR(255),
    house      VARCHAR(50),
    apartment  VARCHAR(50),
    floor      INTEGER,
    entrance   VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders
(
    id                  SERIAL PRIMARY KEY,
    width               INTEGER,
    height              INTEGER,
    material_type       VARCHAR(255),
    frame_type          VARCHAR(255),
    frame_color         VARCHAR(255),
    custom_color_code   VARCHAR(255),
    additional_elements TEXT[],
    notes               TEXT,
    unit_price          NUMERIC(10, 2),
    created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

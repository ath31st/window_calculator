ALTER TABLE users
    ADD COLUMN account_non_expired BOOLEAN NOT NULL DEFAULT TRUE,
    ADD COLUMN account_expiration_date TIMESTAMP NULL;

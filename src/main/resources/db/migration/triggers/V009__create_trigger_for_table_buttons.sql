CREATE TRIGGER update_table_buttons_timestamp
    BEFORE UPDATE
    ON table_buttons
    FOR EACH ROW
EXECUTE FUNCTION update_timestamp();
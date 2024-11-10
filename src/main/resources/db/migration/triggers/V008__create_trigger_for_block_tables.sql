CREATE TRIGGER update_block_tables_timestamp
    BEFORE UPDATE
    ON block_tables
    FOR EACH ROW
EXECUTE FUNCTION update_timestamp();
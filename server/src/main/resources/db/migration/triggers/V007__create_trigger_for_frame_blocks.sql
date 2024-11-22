CREATE TRIGGER update_frame_blocks_timestamp
    BEFORE UPDATE
    ON frame_blocks
    FOR EACH ROW
EXECUTE FUNCTION update_timestamp();
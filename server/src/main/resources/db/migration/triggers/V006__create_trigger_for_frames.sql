CREATE TRIGGER update_frames_timestamp
    BEFORE UPDATE
    ON frames
    FOR EACH ROW
EXECUTE FUNCTION update_timestamp();
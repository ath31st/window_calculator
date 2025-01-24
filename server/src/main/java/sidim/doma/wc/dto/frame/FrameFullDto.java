package sidim.doma.wc.dto.frame;

import java.io.Serializable;
import java.util.List;
import sidim.doma.wc.dto.frame_block.FrameBlockFullDto;

public record FrameFullDto(
    Integer id,
    String name,
    Integer order,
    List<FrameBlockFullDto> frameBlocks
) implements Serializable {
}

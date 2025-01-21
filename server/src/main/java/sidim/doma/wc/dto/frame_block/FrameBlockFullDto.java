package sidim.doma.wc.dto.frame_block;

import java.io.Serializable;
import java.util.List;
import sidim.doma.wc.dto.block_table.BlockTableFullDto;

public record FrameBlockFullDto(
    Integer id,
    String name,
    Boolean isWindowSizeEnabled,
    String inputTitle,
    String description,
    String formula,
    List<BlockTableFullDto> blockTables
) implements Serializable {
}

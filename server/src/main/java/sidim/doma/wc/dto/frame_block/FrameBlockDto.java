package sidim.doma.wc.dto.frame_block;

import java.io.Serializable;

public record FrameBlockDto(
    Integer id,
    String name,
    Boolean isWindowSizeEnabled,
    String inputTitle,
    String description,
    String formula
) implements Serializable {
}

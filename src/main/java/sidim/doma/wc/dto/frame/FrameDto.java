package sidim.doma.wc.dto.frame;

import java.io.Serializable;

public record FrameDto(
    Integer id,
    String name
) implements Serializable {
}

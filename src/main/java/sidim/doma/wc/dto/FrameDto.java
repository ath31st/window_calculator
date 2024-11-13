package sidim.doma.wc.dto;

import java.io.Serializable;

public record FrameDto(
    Integer id,
    String name
) implements Serializable {
}

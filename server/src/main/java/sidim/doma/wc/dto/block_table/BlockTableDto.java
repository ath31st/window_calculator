package sidim.doma.wc.dto.block_table;

import java.io.Serializable;
import sidim.doma.wc.util.ButtonType;

public record BlockTableDto(
    Integer id,
    Integer frameBlockId,
    String name,
    ButtonType buttonType
) implements Serializable {
}

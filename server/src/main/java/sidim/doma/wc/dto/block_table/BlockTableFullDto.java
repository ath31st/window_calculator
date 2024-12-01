package sidim.doma.wc.dto.block_table;

import java.io.Serializable;
import java.util.List;
import sidim.doma.wc.dto.table_button.TableButtonDto;
import sidim.doma.wc.util.ButtonType;

public record BlockTableFullDto(
    Integer id,
    Integer frameBlockId,
    String name,
    ButtonType buttonType,
    List<TableButtonDto> tableButtons
) implements Serializable {
}

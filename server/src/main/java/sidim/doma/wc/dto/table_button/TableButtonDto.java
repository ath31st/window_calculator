package sidim.doma.wc.dto.table_button;

import java.io.Serializable;
import java.math.BigDecimal;

public record TableButtonDto(
    Integer id,
    Integer blockTableId,
    String name,
    BigDecimal value
) implements Serializable {
}

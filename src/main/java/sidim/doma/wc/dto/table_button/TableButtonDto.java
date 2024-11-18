package sidim.doma.wc.dto.table_button;

import java.io.Serializable;
import java.math.BigDecimal;

public record TableButtonDto(
    Integer id,
    String name,
    BigDecimal value
) implements Serializable {
}

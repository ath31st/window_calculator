package sidim.doma.wc.dto.table_button;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.io.Serializable;
import java.math.BigDecimal;

@JsonIgnoreProperties(ignoreUnknown = true)
public record NewTableButtonDto(
    @NotNull(message = "Block table id is required and cannot be null")
    Integer blockTableId,
    @NotEmpty(message = "Name is required and cannot be empty")
    @Size(min = 3, max = 100, message = "Name must be between 3 and 100 characters")
    String name,
    @NotNull(message = "Value is required and cannot be null")
    @DecimalMin(value = "0.0", inclusive = false, message = "Value must be greater than 0")
    @DecimalMax(value = "1000000.0", message = "Value must be less than or equal to 1,000,000")
    BigDecimal value
) implements Serializable {
}

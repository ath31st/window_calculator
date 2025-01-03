package sidim.doma.wc.dto.block_table;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.io.Serializable;
import sidim.doma.wc.util.ButtonType;

public record NewBlockTableDto(
    @NotNull(message = "Frame block id is required and cannot be null")
    Integer frameBlockId,
    @NotEmpty(message = "Name is required and cannot be empty")
    @Size(min = 3, max = 100, message = "Name must be between 3 and 100 characters")
    String name,
    @NotNull(message = "Button type is required and cannot be null")
    ButtonType buttonType
) implements Serializable {
  public static NewBlockTableDto from(NewBlockTableDto dto) {
    return new NewBlockTableDto(
        dto.frameBlockId(),
        dto.name().trim(),
        dto.buttonType()
    );
  }
}

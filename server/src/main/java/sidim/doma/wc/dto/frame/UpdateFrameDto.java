package sidim.doma.wc.dto.frame;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.io.Serializable;

@JsonIgnoreProperties(ignoreUnknown = true)
public record UpdateFrameDto(
    @NotNull(message = "Frame id is required and cannot be null")
    Integer id,
    @NotEmpty(message = "Name is required and cannot be empty")
    @Size(min = 3, max = 100, message = "Name must be between 3 and 100 characters")
    String name,
    @Min(value = 0, message = "Order must be at least 0")
    @Max(value = 999, message = "Order must be at most 999")
    Integer order
) implements Serializable {
  public static UpdateFrameDto from(UpdateFrameDto dto) {
    return new UpdateFrameDto(dto.id, dto.name().trim(), dto.order);
  }
}

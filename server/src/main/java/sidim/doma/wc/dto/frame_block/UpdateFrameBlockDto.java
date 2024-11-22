package sidim.doma.wc.dto.frame_block;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.io.Serializable;

@JsonIgnoreProperties(ignoreUnknown = true)
public record UpdateFrameBlockDto(
    @NotNull(message = "Frame block id is required and cannot be null")
    Integer id,
    @NotEmpty(message = "Name is required and cannot be empty")
    @Size(min = 3, max = 100, message = "Name must be between 3 and 100 characters")
    String name,
    @NotNull(message = "Window size field must be define - true or false")
    Boolean isWindowSizeEnabled,
    @NotEmpty(message = "Input title is required and cannot be empty")
    @Size(min = 3, max = 100, message = "Input title must be between 3 and 100 characters")
    String inputTitle,
    String description
) implements Serializable {
  public static UpdateFrameBlockDto from(UpdateFrameBlockDto dto) {
    return new UpdateFrameBlockDto(
        dto.id(),
        dto.name().trim(),
        dto.isWindowSizeEnabled(),
        dto.inputTitle(),
        dto.description() != null ? dto.description().trim() : null
    );
  }
}

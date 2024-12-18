package sidim.doma.wc.dto.frame;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import java.io.Serializable;

@JsonIgnoreProperties(ignoreUnknown = true)
public record NewFrameDto(
    @NotEmpty(message = "Name is required and cannot be empty")
    @Size(min = 3, max = 100, message = "Name must be between 3 and 100 characters")
    String name
) implements Serializable {
  public static NewFrameDto from(NewFrameDto dto) {
    return new NewFrameDto(dto.name().trim());
  }
}

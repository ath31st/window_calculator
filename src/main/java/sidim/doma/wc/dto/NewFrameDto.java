package sidim.doma.wc.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;

@JsonIgnoreProperties(ignoreUnknown = true)
public record NewFrameDto(
    String name
) implements Serializable {
}

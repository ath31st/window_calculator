package sidim.doma.wc.mapper;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import sidim.doma.wc.dto.frame.FrameFullDto;
import sidim.doma.wc.entity.Frame;

@Component
@RequiredArgsConstructor
public class FrameMapper {
  private final FrameBlockMapper frameBlockMapper;

  public FrameFullDto fromEntityToFullDto(Frame entity) {
    return new FrameFullDto(
        entity.getId(),
        entity.getName(),
        entity.getFrameBlocks().stream()
            .map(frameBlockMapper::fromEntityToFullDto)
            .toList()
    );
  }
}

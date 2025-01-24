package sidim.doma.wc.mapper;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import sidim.doma.wc.dto.frame.FrameDto;
import sidim.doma.wc.dto.frame.FrameFullDto;
import sidim.doma.wc.dto.frame.NewFrameDto;
import sidim.doma.wc.entity.Frame;

@Component
@RequiredArgsConstructor
public class FrameMapper {
  private final FrameBlockMapper frameBlockMapper;

  public Frame fromNewDtoToEntity(NewFrameDto dto) {
    return Frame.builder()
        .id(null)
        .name(dto.name())
        .order(dto.order())
        .build();
  }

  public FrameDto fromEntityToDto(Frame entity) {
    return new FrameDto(entity.getId(), entity.getName(), entity.getOrder());
  }

  public FrameFullDto fromEntityToFullDto(Frame entity) {
    return new FrameFullDto(
        entity.getId(),
        entity.getName(),
        entity.getOrder(),
        entity.getFrameBlocks().stream()
            .map(frameBlockMapper::fromEntityToFullDto)
            .toList()
    );
  }
}

package sidim.doma.wc.mapper;

import java.time.Instant;
import java.time.LocalDateTime;
import org.springframework.stereotype.Component;
import sidim.doma.wc.dto.frame_block.FrameBlockDto;
import sidim.doma.wc.dto.frame_block.NewFrameBlockDto;
import sidim.doma.wc.entity.Frame;
import sidim.doma.wc.entity.FrameBlock;

@Component
public class FrameBlockMapper {
  public FrameBlock fromNewToEntity(NewFrameBlockDto dto, Frame frame) {
    return FrameBlock.builder()
        .id(null)
        .frame(frame)
        .name(dto.name())
        .isWindowSizeEnabled(dto.isWindowSizeEnabled())
        .inputTitle(dto.inputTitle())
        .description(dto.description())
        .createdAt(Instant.from(LocalDateTime.now()))
        .build();
  }

  public FrameBlockDto fromEntityToDto(FrameBlock entity) {
    return new FrameBlockDto(
        entity.getId(),
        entity.getName(),
        entity.getIsWindowSizeEnabled(),
        entity.getInputTitle(),
        entity.getDescription()
    );
  }
}

package sidim.doma.wc.mapper;

import java.time.LocalDateTime;
import java.time.ZoneId;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import sidim.doma.wc.dto.frame_block.FrameBlockDto;
import sidim.doma.wc.dto.frame_block.FrameBlockFullDto;
import sidim.doma.wc.dto.frame_block.NewFrameBlockDto;
import sidim.doma.wc.entity.Frame;
import sidim.doma.wc.entity.FrameBlock;

@Component
@RequiredArgsConstructor
public class FrameBlockMapper {
  private final BlockTableMapper blockTableMapper;

  public FrameBlock fromNewToEntity(NewFrameBlockDto dto, Frame frame) {
    return FrameBlock.builder()
        .id(null)
        .frame(frame)
        .name(dto.name())
        .isWindowSizeEnabled(dto.isWindowSizeEnabled())
        .inputTitle(dto.inputTitle())
        .description(dto.description())
        .createdAt(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant())
        .build();
  }

  public FrameBlockDto fromEntityToDto(FrameBlock entity) {
    return new FrameBlockDto(
        entity.getId(),
        entity.getName(),
        entity.getIsWindowSizeEnabled(),
        entity.getInputTitle(),
        entity.getDescription(),
        entity.getFormula()
    );
  }

  public FrameBlockFullDto fromEntityToFullDto(FrameBlock entity) {
    return new FrameBlockFullDto(
        entity.getId(),
        entity.getName(),
        entity.getIsWindowSizeEnabled(),
        entity.getInputTitle(),
        entity.getDescription(),
        entity.getFormula(),
        entity.getBlockTables().stream()
            .map(blockTableMapper::fromEntityToFullDto)
            .toList()
    );
  }
}

package sidim.doma.wc.mapper;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.HashSet;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import sidim.doma.wc.dto.block_table.BlockTableDto;
import sidim.doma.wc.dto.block_table.BlockTableFullDto;
import sidim.doma.wc.dto.block_table.NewBlockTableDto;
import sidim.doma.wc.entity.BlockTable;
import sidim.doma.wc.entity.FrameBlock;

@Component
@RequiredArgsConstructor
public class BlockTableMapper {
  private final TableButtonMapper tableButtonMapper;

  public BlockTableDto fromEntityToDto(BlockTable entity) {
    return new BlockTableDto(
        entity.getId(), entity.getFrameBlock().getId(), entity.getName(), entity.getButtonType());
  }

  public BlockTable fromNewToEntity(NewBlockTableDto dto, FrameBlock frameBlock) {
    return BlockTable.builder()
        .id(null)
        .frameBlock(frameBlock)
        .name(dto.name())
        .buttonType(dto.buttonType())
        .createdAt(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant())
        .tableButtons(new HashSet<>())
        .build();
  }

  public BlockTableFullDto fromEntityToFullDto(BlockTable entity) {
    return new BlockTableFullDto(
        entity.getId(),
        entity.getFrameBlock().getId(),
        entity.getName(),
        entity.getButtonType(),
        entity.getTableButtons().stream()
            .map(tableButtonMapper::fromEntityToDto)
            .toList()
    );
  }
}

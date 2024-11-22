package sidim.doma.wc.mapper;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.HashSet;
import org.springframework.stereotype.Component;
import sidim.doma.wc.dto.block_table.BlockTableDto;
import sidim.doma.wc.dto.block_table.NewBlockTableDto;
import sidim.doma.wc.entity.BlockTable;
import sidim.doma.wc.entity.FrameBlock;

@Component
public class BlockTableMapper {
  public BlockTableDto fromEntityToDto(BlockTable entity) {
    return new BlockTableDto(entity.getId(), entity.getName(), entity.getButtonType());
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
}

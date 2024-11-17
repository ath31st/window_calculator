package sidim.doma.wc.service;

import lombok.RequiredArgsConstructor;
import lombok.val;
import org.springframework.stereotype.Service;
import sidim.doma.wc.dto.block_table.BlockTableDto;
import sidim.doma.wc.dto.block_table.NewBlockTableDto;
import sidim.doma.wc.entity.FrameBlock;
import sidim.doma.wc.mapper.BlockTableMapper;
import sidim.doma.wc.repository.BlockTableRepository;

@Service
@RequiredArgsConstructor
public class BlockTableService {
  private final BlockTableRepository blockTableRepository;
  private final BlockTableMapper blockTableMapper;

  public BlockTableDto createNewBlockTable(NewBlockTableDto dto, FrameBlock frameBlock) {
    val blockTable = blockTableMapper.fromNewToEntity(dto, frameBlock);

    val savedBlockTable = blockTableRepository.save(blockTable);
    return blockTableMapper.fromEntityToDto(savedBlockTable);
  }
}

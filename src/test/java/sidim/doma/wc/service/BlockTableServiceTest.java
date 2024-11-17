package sidim.doma.wc.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import lombok.val;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import sidim.doma.wc.dto.block_table.BlockTableDto;
import sidim.doma.wc.dto.block_table.NewBlockTableDto;
import sidim.doma.wc.entity.BlockTable;
import sidim.doma.wc.entity.FrameBlock;
import sidim.doma.wc.mapper.BlockTableMapper;
import sidim.doma.wc.repository.BlockTableRepository;
import sidim.doma.wc.util.ButtonType;

@ExtendWith(MockitoExtension.class)
class BlockTableServiceTest {

  @Mock
  private BlockTableRepository blockTableRepository;

  @Mock
  private BlockTableMapper blockTableMapper;

  @InjectMocks
  private BlockTableService blockTableService;

  private BlockTable blockTable;
  private BlockTableDto blockTableDto;
  private String blockTableName;

  @BeforeEach
  void setUp() {
    blockTableName = "test_block_table";

    blockTable = BlockTable.builder()
        .id(2)
        .name(blockTableName)
        .buttonType(ButtonType.VALUE)
        .build();

    blockTableDto = new BlockTableDto(2, blockTableName, ButtonType.VALUE);
  }

  @Test
  void createNewBlockTable_success() {
    val frameBlock = new FrameBlock();
    val newBlockTable = new NewBlockTableDto(1, blockTableName, ButtonType.VALUE);

    when(blockTableMapper.fromNewToEntity(newBlockTable, frameBlock)).thenReturn(blockTable);
    when(blockTableMapper.fromEntityToDto(any(BlockTable.class))).thenReturn(blockTableDto);
    when(blockTableRepository.save(any(BlockTable.class))).thenReturn(blockTable);

    val savedBlockTableDto = blockTableService.createNewBlockTable(newBlockTable, frameBlock);

    assertEquals(blockTableDto, savedBlockTableDto);
    verify(blockTableRepository).save(any(BlockTable.class));
    verify(blockTableMapper).fromEntityToDto(any(BlockTable.class));
    verify(blockTableMapper).fromNewToEntity(any(NewBlockTableDto.class), any(FrameBlock.class));
  }
}
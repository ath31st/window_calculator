package sidim.doma.wc.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.math.BigDecimal;
import lombok.val;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import sidim.doma.wc.dto.table_button.NewTableButtonDto;
import sidim.doma.wc.dto.table_button.TableButtonDto;
import sidim.doma.wc.entity.BlockTable;
import sidim.doma.wc.entity.TableButton;
import sidim.doma.wc.mapper.TableButtonMapper;
import sidim.doma.wc.repository.TableButtonRepository;

@ExtendWith(MockitoExtension.class)
class TableButtonServiceTest {

  @Mock
  private TableButtonRepository tableButtonRepository;

  @Mock
  private TableButtonMapper tableButtonMapper;

  @InjectMocks
  private TableButtonService tableButtonService;

  private String tableButtonName;
  private BigDecimal value;
  private TableButton tableButton;
  private TableButtonDto tableButtonDto;
  private BlockTable blockTable;

  @BeforeEach
  void setUp() {
    tableButtonName = "test_table_button";
    value = BigDecimal.TEN;

    blockTable = new BlockTable();
    blockTable.setId(2);

    tableButton = TableButton.builder()
        .id(3)
        .blockTable(blockTable)
        .name(tableButtonName)
        .value(value)
        .build();

    tableButtonDto = new TableButtonDto(3, tableButtonName, value);
  }

  @Test
  void createTableButton_success() {
    val newTableButtonDto = new NewTableButtonDto(1, tableButtonName, value);

    when(tableButtonMapper.fromNewToEntity(newTableButtonDto, blockTable)).thenReturn(tableButton);
    when(tableButtonRepository.save(any(TableButton.class))).thenReturn(tableButton);
    when(tableButtonMapper.fromEntityToDto(any(TableButton.class))).thenReturn(tableButtonDto);

    val savedTableButton = tableButtonService.createTableButton(newTableButtonDto, blockTable);

    assertEquals(tableButtonDto, savedTableButton);
    verify(tableButtonRepository).save(any(TableButton.class));
    verify(tableButtonMapper).fromEntityToDto(any(TableButton.class));
    verify(tableButtonMapper).fromNewToEntity(any(NewTableButtonDto.class), any(BlockTable.class));
  }
}
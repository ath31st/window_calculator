package sidim.doma.wc.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.math.BigDecimal;
import java.util.Optional;
import lombok.val;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import sidim.doma.wc.dto.table_button.NewTableButtonDto;
import sidim.doma.wc.dto.table_button.TableButtonDto;
import sidim.doma.wc.dto.table_button.UpdateTableButtonDto;
import sidim.doma.wc.entity.BlockTable;
import sidim.doma.wc.entity.TableButton;
import sidim.doma.wc.exception.TableButtonServiceException;
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

  private Integer tableButtonId;
  private String tableButtonName;
  private String newTableButtonName;
  private BigDecimal value;
  private TableButton tableButton;
  private TableButtonDto tableButtonDto;
  private BlockTable blockTable;

  @BeforeEach
  void setUp() {
    tableButtonId = 3;
    tableButtonName = "test_table_button";
    newTableButtonName = "new_test_table_button";
    value = BigDecimal.TEN;

    blockTable = new BlockTable();
    blockTable.setId(2);

    tableButton = TableButton.builder()
        .id(tableButtonId)
        .blockTable(blockTable)
        .name(tableButtonName)
        .value(value)
        .build();

    tableButtonDto = new TableButtonDto(tableButtonId, blockTable.getId(), tableButtonName, value);
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

  @Test
  void updateTableButton_success() {
    val newValue = BigDecimal.TWO;
    val updateTableButtonDto = new UpdateTableButtonDto(tableButtonId, newTableButtonName, newValue);
    tableButton.setName(newTableButtonName);
    tableButton.setValue(newValue);
    val updatedTableButtonDto = new TableButtonDto(tableButtonId, blockTable.getId(), newTableButtonName, newValue);

    when(tableButtonRepository.existsById(tableButtonId)).thenReturn(true);
    when(tableButtonRepository.findById(tableButtonId)).thenReturn(Optional.ofNullable(tableButton));
    when(tableButtonRepository.save(tableButton)).thenReturn(tableButton);
    when(tableButtonMapper.fromEntityToDto(any(TableButton.class))).thenReturn(updatedTableButtonDto);

    val savedTableButtonDto = tableButtonService.updateTableButton(updateTableButtonDto);

    assertEquals(updatedTableButtonDto, savedTableButtonDto);
    verify(tableButtonRepository).save(any(TableButton.class));
    verify(tableButtonMapper).fromEntityToDto(any(TableButton.class));
  }

  @Test
  void updateTableButton_whenTableButtonNotFound() {
    val newValue = BigDecimal.TWO;
    val id = 4;
    val updateTableButtonDto = new UpdateTableButtonDto(id, newTableButtonName, newValue);

    when(tableButtonRepository.existsById(id)).thenReturn(false);

    assertThrows(TableButtonServiceException.class,
        () -> tableButtonService.updateTableButton(updateTableButtonDto));
  }

  @Test
  void getTableButton_success() {
    when(tableButtonRepository.existsById(tableButtonId)).thenReturn(true);
    when(tableButtonRepository.findById(tableButtonId)).thenReturn(Optional.ofNullable(tableButton));

    val existsTableButton = tableButtonService.getTableButton(tableButtonId);

    assertEquals(existsTableButton, tableButton);
    verify(tableButtonRepository).findById(tableButtonId);
    verify(tableButtonRepository).existsById(tableButtonId);
  }

  @Test
  void getTableButton_whenTableButtonNotFound() {
    when(tableButtonRepository.existsById(tableButtonId)).thenReturn(false);

    assertThrows(TableButtonServiceException.class,
        () -> tableButtonService.getTableButton(tableButtonId));
  }

  @Test
  void deleteTableButton_success() {
    when(tableButtonRepository.existsById(tableButtonId)).thenReturn(true);

    tableButtonService.deleteTableButton(tableButtonId);

    verify(tableButtonRepository).deleteById(tableButtonId);
  }

  @Test
  void deleteTableButton_whenTableButtonNotFound() {
    when(tableButtonRepository.existsById(tableButtonId)).thenReturn(false);

    assertThrows(TableButtonServiceException.class,
        () -> tableButtonService.deleteTableButton(tableButtonId));
  }
}
package sidim.doma.wc.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.math.BigDecimal;
import lombok.val;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.test.web.servlet.MockMvc;
import sidim.doma.wc.dto.table_button.NewTableButtonDto;
import sidim.doma.wc.dto.table_button.TableButtonDto;
import sidim.doma.wc.dto.table_button.UpdateTableButtonDto;
import sidim.doma.wc.entity.BlockTable;
import sidim.doma.wc.exception.BlockTableServiceException;
import sidim.doma.wc.exception.TableButtonServiceException;
import sidim.doma.wc.service.BlockTableService;
import sidim.doma.wc.service.TableButtonService;

@WebMvcTest(TableButtonController.class)
@AutoConfigureMockMvc(addFilters = false)
class TableButtonControllerTest {

  private static final String BASE_URL = "/api/v1/table_buttons";

  @MockBean
  private TableButtonService tableButtonService;

  @MockBean
  private BlockTableService blockTableService;

  @Autowired
  private MockMvc mockMvc;

  @Autowired
  private ObjectMapper objectMapper;

  private final Integer tableButtonId = 3;
  private final Integer blockTableId = 2;
  private final String name = "test_table_button";
  private final BigDecimal value = BigDecimal.valueOf(100);

  @Test
  void createNewTableButton_whenValidDataProvided() throws Exception {
    val blockTable = new BlockTable();
    val newTableButton = new NewTableButtonDto(blockTableId, name, value);
    val saveTableButtonDto = new TableButtonDto(tableButtonId, name, value);

    when(blockTableService.getBlockTable(blockTableId)).thenReturn(blockTable);
    when(tableButtonService.createTableButton(newTableButton, blockTable))
        .thenReturn(saveTableButtonDto);

    val result = mockMvc.perform(post(BASE_URL)
        .contentType("application/json")
        .content(objectMapper.writeValueAsString(newTableButton))
    ).andExpect(status().isCreated()).andReturn();

    val content = result.getResponse().getContentAsString();
    val tableButtonDto = objectMapper.readValue(content, TableButtonDto.class);

    assertEquals(tableButtonId, tableButtonDto.id());
    assertEquals(name, tableButtonDto.name());
    assertEquals(value, tableButtonDto.value());

    verify(blockTableService).getBlockTable(blockTableId);
    verify(tableButtonService).createTableButton(newTableButton, blockTable);
  }

  @Test
  void createNewTableButton_whenValidDataProvided_trimmed() throws Exception {
    val blockTable = new BlockTable();
    val nameWithSpaces = "  " + name + "  ";
    val newTableButton = new NewTableButtonDto(blockTableId, nameWithSpaces, value);
    val saveTableButtonDto = new TableButtonDto(tableButtonId, name, value);

    when(blockTableService.getBlockTable(blockTableId)).thenReturn(blockTable);
    when(tableButtonService.createTableButton(any(NewTableButtonDto.class), any(BlockTable.class)))
        .thenReturn(saveTableButtonDto);

    val result = mockMvc.perform(post(BASE_URL)
        .contentType("application/json")
        .content(objectMapper.writeValueAsString(newTableButton))
    ).andExpect(status().isCreated()).andReturn();

    val content = result.getResponse().getContentAsString();
    val tableButtonDto = objectMapper.readValue(content, TableButtonDto.class);

    assertEquals(tableButtonId, tableButtonDto.id());
    assertEquals(name, tableButtonDto.name());
    assertEquals(value, tableButtonDto.value());

    verify(blockTableService).getBlockTable(blockTableId);
    verify(tableButtonService).createTableButton(
        any(NewTableButtonDto.class), any(BlockTable.class));
  }

  @Test
  void createNewTableButton_whenBlockTableNotFound() throws Exception {
    val newTableButton = new NewTableButtonDto(blockTableId, name, value);

    doThrow(new BlockTableServiceException("Block table not found", HttpStatus.NOT_FOUND))
        .when(blockTableService).getBlockTable(blockTableId);

    mockMvc.perform(post(BASE_URL)
        .contentType("application/json")
        .content(objectMapper.writeValueAsString(newTableButton))
    ).andExpect(status().isNotFound()).andReturn();
  }

  @Test
  void createNewTableButton_whenInvalidDataProvided_1() throws Exception {
    val newTableButton = new NewTableButtonDto(null, null, null);

    mockMvc.perform(post(BASE_URL)
        .contentType("application/json")
        .content(objectMapper.writeValueAsString(newTableButton))
    ).andExpect(status().isBadRequest()).andReturn();
  }

  @ParameterizedTest
  @ValueSource(ints = {-1, -100, 1000000000, -1000000000})
  void createNewTableButton_whenInvalidDataProvided_2(int value) throws Exception {
    val newTableButton = new NewTableButtonDto(blockTableId, name, BigDecimal.valueOf(value));

    mockMvc.perform(post(BASE_URL)
        .contentType("application/json")
        .content(objectMapper.writeValueAsString(newTableButton))
    ).andExpect(status().isBadRequest()).andReturn();
  }

  @Test
  void updateTableButton_success() throws Exception {
    val newName = "new_table_button_name";
    val newValue = BigDecimal.TEN;
    val updateTableButtonDto = new UpdateTableButtonDto(tableButtonId, newName, newValue);
    val savedTableButtonDto = new TableButtonDto(tableButtonId, newName, newValue);

    when(tableButtonService.updateTableButton(updateTableButtonDto))
        .thenReturn(savedTableButtonDto);

    val result = mockMvc.perform(put(BASE_URL)
        .contentType("application/json")
        .content(objectMapper.writeValueAsString(updateTableButtonDto))
    ).andExpect(status().isOk()).andReturn();

    val content = result.getResponse().getContentAsString();
    val tableButtonDto = objectMapper.readValue(content, TableButtonDto.class);

    assertEquals(tableButtonId, tableButtonDto.id());
    assertEquals(newName, tableButtonDto.name());
    assertEquals(newValue, tableButtonDto.value());
  }

  @Test
  void updateTableButton_success_trimmed() throws Exception {
    val newNameWithSpaces = "  new_table_button_name   ";
    val newName = "new_table_button_name";
    val newValue = BigDecimal.TEN;
    val updateTableButtonDto = new UpdateTableButtonDto(tableButtonId, newNameWithSpaces, newValue);
    val savedTableButtonDto = new TableButtonDto(tableButtonId, newName, newValue);

    when(tableButtonService.updateTableButton(any(UpdateTableButtonDto.class)))
        .thenReturn(savedTableButtonDto);

    val result = mockMvc.perform(put(BASE_URL)
        .contentType("application/json")
        .content(objectMapper.writeValueAsString(updateTableButtonDto))
    ).andExpect(status().isOk()).andReturn();

    val content = result.getResponse().getContentAsString();
    val tableButtonDto = objectMapper.readValue(content, TableButtonDto.class);

    assertEquals(tableButtonId, tableButtonDto.id());
    assertEquals(newName, tableButtonDto.name());
    assertEquals(newValue, tableButtonDto.value());
  }

  @Test
  void updateTableButton_whenInvalidDataProvided_1() throws Exception {
    val updateTableButtonDto = new UpdateTableButtonDto(null, null, null);

    mockMvc.perform(put(BASE_URL)
        .contentType("application/json")
        .content(objectMapper.writeValueAsString(updateTableButtonDto))
    ).andExpect(status().isBadRequest()).andReturn();
  }

  @Test
  void updateTableButton_whenInvalidDataProvided_2() throws Exception {
    val updateTableButtonDto = new UpdateTableButtonDto(tableButtonId, name, null);

    mockMvc.perform(put(BASE_URL)
        .contentType("application/json")
        .content(objectMapper.writeValueAsString(updateTableButtonDto))
    ).andExpect(status().isBadRequest()).andReturn();
  }

  @Test
  void updateTableButton_whenInvalidDataProvided_3() throws Exception {
    val updateTableButtonDto = new UpdateTableButtonDto(tableButtonId, name, BigDecimal.valueOf(-100));

    mockMvc.perform(put(BASE_URL)
        .contentType("application/json")
        .content(objectMapper.writeValueAsString(updateTableButtonDto))
    ).andExpect(status().isBadRequest()).andReturn();
  }

  @Test
  void updateTableButton_whenTableButtonNotFound() throws Exception {
    val updateTableButtonDto = new UpdateTableButtonDto(tableButtonId, name, value);

    doThrow(new TableButtonServiceException("Table button not found", HttpStatus.NOT_FOUND))
        .when(tableButtonService).updateTableButton(updateTableButtonDto);

    mockMvc.perform(put(BASE_URL)
        .contentType("application/json")
        .content(objectMapper.writeValueAsString(updateTableButtonDto))
    ).andExpect(status().isNotFound()).andReturn();
  }

  @Test
  void deleteTableButton_success() throws Exception {
    mockMvc.perform(delete(BASE_URL + "/{id}", tableButtonId))
        .andExpect(status().isNoContent()).andReturn();

    verify(tableButtonService).deleteTableButton(tableButtonId);
  }

  @Test
  void deleteTableButton_whenTableButtonNotFound() throws Exception {
    doThrow(new TableButtonServiceException("Table button not found", HttpStatus.NOT_FOUND))
        .when(tableButtonService).deleteTableButton(tableButtonId);

    mockMvc.perform(delete(BASE_URL + "/{id}", tableButtonId))
        .andExpect(status().isNotFound()).andReturn();
  }
}
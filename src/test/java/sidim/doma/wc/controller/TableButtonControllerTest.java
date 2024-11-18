package sidim.doma.wc.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.math.BigDecimal;
import lombok.val;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.test.web.servlet.MockMvc;
import sidim.doma.wc.dto.table_button.NewTableButtonDto;
import sidim.doma.wc.dto.table_button.TableButtonDto;
import sidim.doma.wc.entity.BlockTable;
import sidim.doma.wc.exception.BlockTableServiceException;
import sidim.doma.wc.service.BlockTableService;
import sidim.doma.wc.service.TableButtonService;

@WebMvcTest(TableButtonController.class)
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
}
package sidim.doma.wc.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertInstanceOf;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.Map;
import lombok.val;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.test.web.servlet.MockMvc;
import sidim.doma.wc.dto.block_table.BlockTableDto;
import sidim.doma.wc.dto.block_table.NewBlockTableDto;
import sidim.doma.wc.dto.block_table.UpdateBlockTableDto;
import sidim.doma.wc.entity.FrameBlock;
import sidim.doma.wc.exception.FrameBlockServiceException;
import sidim.doma.wc.service.BlockTableService;
import sidim.doma.wc.service.FrameBlockService;
import sidim.doma.wc.util.ButtonType;

@WebMvcTest(BlockTableController.class)
class BlockTableControllerTest {

  private static final String BASE_URL = "/api/v1/block_tables";

  @MockBean
  private BlockTableService blockTableService;

  @MockBean
  private FrameBlockService frameBlockService;

  @Autowired
  private MockMvc mockMvc;

  @Autowired
  private ObjectMapper objectMapper;

  private final Integer frameBlockId = 1;
  private final Integer blockTableId = 2;
  private final String name = "test_block_table";

  @BeforeEach
  void setUp() {
  }

  @Test
  void createNewBlockTable_whenValidDataProvided() throws Exception {
    val frameBlock = new FrameBlock();
    val newBlockTable = new NewBlockTableDto(frameBlockId, name, ButtonType.VALUE);
    val saveBlockTableDto = new BlockTableDto(blockTableId, name, ButtonType.VALUE);

    when(frameBlockService.getFrameBlock(frameBlockId)).thenReturn(frameBlock);
    when(blockTableService.createNewBlockTable(newBlockTable, frameBlock))
        .thenReturn(saveBlockTableDto);

    val result = mockMvc.perform(post(BASE_URL)
        .contentType("application/json")
        .content(objectMapper.writeValueAsString(newBlockTable))
    ).andExpect(status().isCreated()).andReturn();

    val content = result.getResponse().getContentAsString();
    val blockTableDto = objectMapper.readValue(content, BlockTableDto.class);

    assertEquals(blockTableId, blockTableDto.id());
    assertEquals(name, blockTableDto.name());
    assertEquals(ButtonType.VALUE, blockTableDto.buttonType());

    verify(frameBlockService).getFrameBlock(frameBlockId);
    verify(blockTableService).createNewBlockTable(newBlockTable, frameBlock);
  }

  @Test
  void createNewBlockTable_whenInvalidDataProvided_1() throws Exception {
    val newBlockTable = new NewBlockTableDto(frameBlockId, name, null);

    mockMvc.perform(post(BASE_URL)
        .contentType("application/json")
        .content(objectMapper.writeValueAsString(newBlockTable))
    ).andExpect(status().isBadRequest()).andReturn();
  }

  @Test
  void createNewBlockTable_whenInvalidDataProvided_2() throws Exception {
    val newBlockTable = new NewBlockTableDto(frameBlockId, null, null);

    mockMvc.perform(post(BASE_URL)
        .contentType("application/json")
        .content(objectMapper.writeValueAsString(newBlockTable))
    ).andExpect(status().isBadRequest()).andReturn();
  }

  @Test
  void createNewBlockTable_whenInvalidDataProvided_3() throws Exception {
    val newBlockTable = new NewBlockTableDto(null, null, null);

    mockMvc.perform(post(BASE_URL)
        .contentType("application/json")
        .content(objectMapper.writeValueAsString(newBlockTable))
    ).andExpect(status().isBadRequest()).andReturn();
  }

  @Test
  void createNewBlockTable_whenFrameBlockNotFound() throws Exception {
    val newBlockTable = new NewBlockTableDto(frameBlockId, name, ButtonType.VALUE);

    doThrow(new FrameBlockServiceException("Frame block not found", HttpStatus.NOT_FOUND))
        .when(frameBlockService).getFrameBlock(frameBlockId);

    mockMvc.perform(post(BASE_URL)
        .contentType("application/json")
        .content(objectMapper.writeValueAsString(newBlockTable))
    ).andExpect(status().isNotFound()).andReturn();
  }

  @Test
  void deleteBlockTable_success() throws Exception {
    mockMvc.perform(delete(BASE_URL + "/{id}", blockTableId))
        .andExpect(status().isNoContent()).andReturn();
  }

  @Test
  void deleteBlockTable_whenBlockTableNotFound() throws Exception {
    doThrow(new FrameBlockServiceException("Block table not found", HttpStatus.NOT_FOUND))
        .when(blockTableService).deleteBlockTable(blockTableId);

    mockMvc.perform(delete(BASE_URL + "/{id}", blockTableId))
        .andExpect(status().isNotFound()).andReturn();
  }

  @Test
  void updateBlockTable_success() throws Exception {
    val newName = "new_block_table_name";
    val updateBlockTableDto = new UpdateBlockTableDto(blockTableId, newName, ButtonType.MODIFIER);

    when(blockTableService.updateBlockTable(updateBlockTableDto))
        .thenReturn(new BlockTableDto(blockTableId, newName, ButtonType.MODIFIER));

    val result = mockMvc.perform(put(BASE_URL)
            .contentType("application/json")
            .content(objectMapper.writeValueAsString(updateBlockTableDto)))
        .andExpect(status().isOk()).andReturn();

    val content = result.getResponse().getContentAsString();
    val blockTableDto = objectMapper.readValue(content, BlockTableDto.class);

    assertEquals(blockTableId, blockTableDto.id());
    assertEquals(newName, blockTableDto.name());
    assertEquals(ButtonType.MODIFIER, blockTableDto.buttonType());
  }

  @Test
  void updateBlockTable_whenBlockTableNotFound() throws Exception {
    doThrow(new FrameBlockServiceException("Block table not found", HttpStatus.NOT_FOUND))
        .when(blockTableService).updateBlockTable(any(UpdateBlockTableDto.class));

    mockMvc.perform(put(BASE_URL)
        .contentType("application/json")
        .content(objectMapper.writeValueAsString(
            new UpdateBlockTableDto(blockTableId, name, ButtonType.VALUE)))
    ).andExpect(status().isNotFound()).andReturn();
  }

  @Test
  void updateBlockTable_whenInvalidDataProvided_1() throws Exception {
    mockMvc.perform(put(BASE_URL)
        .contentType("application/json")
        .content(objectMapper.writeValueAsString(
            new UpdateBlockTableDto(blockTableId, null, null)))
    ).andExpect(status().isBadRequest()).andReturn();
  }

  @Test
  void updateBlockTable_whenInvalidDataProvided_2() throws Exception {
    mockMvc.perform(put(BASE_URL)
            .contentType("application/json")
            .content(objectMapper.writeValueAsString(
                Map.of(
                    "blockTableId", blockTableId,
                    "name", "new_name",
                    "buttonType", "INVALID_TYPE"
                ))
            )
        ).andExpect(status().isBadRequest())
        .andExpect(result ->
            assertInstanceOf(HttpMessageNotReadableException.class, result.getResolvedException())
        )
        .andReturn();
  }
}
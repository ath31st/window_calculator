package sidim.doma.wc.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.val;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import sidim.doma.wc.dto.frame_block.FrameBlockDto;
import sidim.doma.wc.dto.frame_block.NewFrameBlockDto;
import sidim.doma.wc.dto.frame_block.UpdateFrameBlockDto;
import sidim.doma.wc.entity.Frame;
import sidim.doma.wc.exception.FrameBlockServiceException;
import sidim.doma.wc.exception.FrameServiceException;
import sidim.doma.wc.service.FrameBlockService;
import sidim.doma.wc.service.FrameService;

@WebMvcTest(controllers = FrameBlockController.class)
class FrameBlockControllerTest {

  private static final String BASE_URL = "/api/v1/frame_blocks";

  @MockBean
  private FrameBlockService frameBlockService;

  @MockBean
  private FrameService frameService;

  @Autowired
  private MockMvc mockMvc;

  @Autowired
  private ObjectMapper objectMapper;

  private final Integer frameId = 1;
  private final Integer blockId = 2;
  private final String name = "test_block";
  private final String updateName = "another_test_block";
  private final Boolean isWindowSizeEnabled = false;
  private final String blockInput = "test_block_input";
  private final String updateBlockInput = "another_test_block_input";
  private Frame frame;
  private NewFrameBlockDto newFrameBlockDto;
  private NewFrameBlockDto invalidNewFrameBlockDto;
  private UpdateFrameBlockDto updateFrameBlockDto;
  private UpdateFrameBlockDto invalidUpdateFrameBlockDto;
  private FrameBlockDto frameBlockDto;
  private FrameBlockDto updatedFrameBlockDto;

  @BeforeEach
  void setUp() {
    newFrameBlockDto = new NewFrameBlockDto(frameId, name, isWindowSizeEnabled, blockInput, null);
    invalidNewFrameBlockDto = new NewFrameBlockDto(frameId, null, isWindowSizeEnabled, blockInput, null);
    frameBlockDto = new FrameBlockDto(blockId, name, isWindowSizeEnabled, blockInput, null);
    updatedFrameBlockDto = new FrameBlockDto(blockId, updateName, isWindowSizeEnabled, updateBlockInput, null);
    updateFrameBlockDto = new UpdateFrameBlockDto(blockId, updateName, isWindowSizeEnabled, updateBlockInput, null);
    invalidUpdateFrameBlockDto = new UpdateFrameBlockDto(blockId, null, isWindowSizeEnabled, updateBlockInput, null);

    frame = new Frame();
    frame.setId(frameId);
  }

  @Test
  void createFrameBlock_success() throws Exception {
    when(frameService.getFrame(frameId)).thenReturn(frame);
    when(frameBlockService.createFrameBlock(newFrameBlockDto, frame)).thenReturn(frameBlockDto);

    val mvcResult = mockMvc.perform(post(BASE_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(newFrameBlockDto)))
        .andExpect(status().isCreated()).andReturn();

    val content = mvcResult.getResponse().getContentAsString();
    val blockDto = objectMapper.readValue(content, FrameBlockDto.class);

    assertNotNull(blockDto.id());
    assertEquals(name, blockDto.name());
    assertEquals(blockInput, blockDto.inputTitle());
    assertEquals(isWindowSizeEnabled, blockDto.isWindowSizeEnabled());
    assertNull(blockDto.description());
  }

  @Test
  void createFrameBlock_whenFrameNotFound() throws Exception {
    when(frameService.getFrame(frameId)).thenThrow(
        new FrameServiceException("Frame not found", HttpStatus.NOT_FOUND));

    mockMvc.perform(post(BASE_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(newFrameBlockDto)))
        .andExpect(status().isNotFound());
  }

  @Test
  void createFrameBlock_whenInvalidDataProvided() throws Exception {
    mockMvc.perform(post(BASE_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(invalidNewFrameBlockDto)))
        .andExpect(status().isBadRequest());
  }

  @Test
  void updateFrameBlock_success() throws Exception {
    when(frameBlockService.updateFrameBlock(updateFrameBlockDto)).thenReturn(updatedFrameBlockDto);

    val mvcResult = mockMvc.perform(put(BASE_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(updateFrameBlockDto)))
        .andExpect(status().isOk()).andReturn();

    val content = mvcResult.getResponse().getContentAsString();
    val blockDto = objectMapper.readValue(content, FrameBlockDto.class);

    assertEquals(blockId, blockDto.id());
    assertEquals(updateName, blockDto.name());
    assertEquals(updateBlockInput, blockDto.inputTitle());
    assertEquals(isWindowSizeEnabled, blockDto.isWindowSizeEnabled());
    assertNull(blockDto.description());
  }

  @Test
  void updateFrameBlock_whenInvalidDataProvided() throws Exception {
    mockMvc.perform(put(BASE_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(invalidUpdateFrameBlockDto)))
        .andExpect(status().isBadRequest());
  }

  @Test
  void updateFrameBlock_whenFrameBlockNotFound() throws Exception {
    when(frameBlockService.updateFrameBlock(updateFrameBlockDto)).thenThrow(
        new FrameServiceException("Frame block not found", HttpStatus.NOT_FOUND));

    mockMvc.perform(put(BASE_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(updateFrameBlockDto)))
        .andExpect(status().isNotFound());
  }

  @Test
  void deleteFrameBlock_success() throws Exception {
    mockMvc.perform(delete(BASE_URL + "/{id}", blockId))
        .andExpect(status().isNoContent());
  }

  @Test
  void deleteFrameBlock_whenFrameBlockNotFound() throws Exception {
    doThrow(new FrameBlockServiceException("Frame block not found", HttpStatus.NOT_FOUND))
        .when(frameBlockService).deleteFrameBlock(blockId);

    mockMvc.perform(delete(BASE_URL + "/{id}", blockId))
        .andExpect(status().isNotFound());
  }
}
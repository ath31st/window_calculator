package sidim.doma.wc.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.val;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import sidim.doma.wc.dto.frame_block.FrameBlockDto;
import sidim.doma.wc.dto.frame_block.NewFrameBlockDto;
import sidim.doma.wc.entity.Frame;
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
  private Integer blockId = 2;
  private final String name = "test_block";
  private final Boolean isWindowSizeEnabled = false;
  private final String blockInput = "test_block_input";
  private Frame frame;
  private NewFrameBlockDto newFrameBlockDto;
  private FrameBlockDto frameBlockDto;

  @BeforeEach
  void setUp() {
    newFrameBlockDto = new NewFrameBlockDto(frameId, name, isWindowSizeEnabled, blockInput, null);
    frameBlockDto = new FrameBlockDto(blockId, name, isWindowSizeEnabled, blockInput, null);

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
}
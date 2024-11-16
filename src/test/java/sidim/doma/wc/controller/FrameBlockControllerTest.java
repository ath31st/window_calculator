package sidim.doma.wc.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.val;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import sidim.doma.wc.dto.frame_block.FrameBlockDto;
import sidim.doma.wc.dto.frame_block.NewFrameBlockDto;

@WebMvcTest(controllers = FrameBlockController.class)
class FrameBlockControllerTest {

  private static final String BASE_URL = "/api/v1/frame_blocks";

  @Autowired
  private MockMvc mockMvc;

  @Autowired
  private ObjectMapper objectMapper;

  @BeforeEach
  void setUp() {
  }

  @AfterEach
  void tearDown() {
  }

  @Test
  void createFrameBlock_success() throws Exception {
    val frameId = 1;
    val name = "test_block";
    val isWindowSizeEnabled = false;
    val blockInput = "test_block_input";
    val newFrameBlockDto = new NewFrameBlockDto(frameId, name, isWindowSizeEnabled, blockInput, null);

    val mvcResult = mockMvc.perform(post(BASE_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(newFrameBlockDto)))
        .andExpect(status().isCreated()).andReturn();

    val content = mvcResult.getResponse().getContentAsString();
    val frameBLockDto = objectMapper.readValue(content, FrameBlockDto.class);

    assertNotNull(frameBLockDto.id());
    assertEquals(name, frameBLockDto.name());
    assertEquals(blockInput, frameBLockDto.inputTitle());
    assertEquals(isWindowSizeEnabled, frameBLockDto.isWindowSizeEnabled());
    assertNull(frameBLockDto.description());
  }
}
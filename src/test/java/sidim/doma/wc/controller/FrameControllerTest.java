package sidim.doma.wc.controller;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import lombok.val;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import sidim.doma.wc.dto.FrameDto;
import sidim.doma.wc.dto.NewFrameDto;
import sidim.doma.wc.service.FrameService;

@WebMvcTest(controllers = FrameController.class)
class FrameControllerTest {

  @MockBean
  private FrameService frameService;

  @Autowired
  private MockMvc mockMvc;

  @Test
  void createNewFrame_whenValidDataProvided() throws Exception {
    val newFrameDto = new NewFrameDto("test");

    when(frameService.createFrame(newFrameDto)).thenReturn(new FrameDto(1, "test"));

    mockMvc.perform(post("/api/v1/frames")
            .contentType("application/json")
            .content("{\"name\":\"test\"}"))
        .andExpect(status().isCreated())
        .andExpect(jsonPath("$.id").value(1))
        .andExpect(jsonPath("$.name").value("test"));
  }

  @Test
  void createNewFrame_whenInvalidDataProvided() throws Exception {
    mockMvc.perform(post("/api/v1/frames")
            .contentType("application/json")
            .content("{\"name\":\"\"}"))
        .andExpect(status().isBadRequest());
  }
}

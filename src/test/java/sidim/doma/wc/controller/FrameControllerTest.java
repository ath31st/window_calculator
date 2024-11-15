package sidim.doma.wc.controller;

import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.val;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import sidim.doma.wc.dto.FrameDto;
import sidim.doma.wc.dto.NewFrameDto;
import sidim.doma.wc.exception.FrameServiceException;
import sidim.doma.wc.service.FrameService;

@WebMvcTest(controllers = FrameController.class)
class FrameControllerTest {

  @MockBean
  private FrameService frameService;

  @Autowired
  private MockMvc mockMvc;

  @Autowired
  private ObjectMapper objectMapper;

  @Test
  void createNewFrame_whenValidDataProvided() throws Exception {
    val name = "test";
    val id = 1;
    val newFrameDto = new NewFrameDto(name);

    when(frameService.createFrame(newFrameDto)).thenReturn(new FrameDto(id, name));

    mockMvc.perform(post("/api/v1/frames")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(newFrameDto)))
        .andExpect(status().isCreated())
        .andExpect(jsonPath("$.id").value(id))
        .andExpect(jsonPath("$.name").value(name));
  }

  @ParameterizedTest
  @ValueSource(strings = {"", "  ", "sh"})
  void createNewFrame_whenInvalidDataProvided(String emptyName) throws Exception {
    val newFrameDto = new NewFrameDto(emptyName);

    mockMvc.perform(post("/api/v1/frames")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(newFrameDto)))
        .andExpect(status().isBadRequest());
  }

  @Test
  void deleteFrame_whenValidDataProvided() throws Exception {
    val id = 1;

    mockMvc.perform(
            delete("/api/v1/frames/{id}", id))
        .andExpect(status().isNoContent());

    verify(frameService).deleteFrame(id);
  }

  @Test
  void deleteFrame_whenFrameNotFound() throws Exception {
    val id = 1;

    doThrow(new FrameServiceException("Frame not found", HttpStatus.NOT_FOUND))
        .when(frameService).deleteFrame(id);

    mockMvc.perform(delete("/api/v1/frames/{id}", id))
        .andExpect(status().isNotFound());
  }
}

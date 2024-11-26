package sidim.doma.wc.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.Collections;
import java.util.List;
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
import sidim.doma.wc.dto.frame.FrameDto;
import sidim.doma.wc.dto.frame.FrameFullDto;
import sidim.doma.wc.dto.frame.NewFrameDto;
import sidim.doma.wc.exception.FrameServiceException;
import sidim.doma.wc.service.FrameService;

@WebMvcTest(controllers = FrameController.class)
class FrameControllerTest {

  private static final String BASE_URL = "/api/v1/frames";

  @MockBean
  private FrameService frameService;

  @Autowired
  private MockMvc mockMvc;

  @Autowired
  private ObjectMapper objectMapper;

  private final Integer id = 1;
  private final String name = "test_frame";

  @Test
  void getAllFrames() throws Exception {
    when(frameService.getAllFrameDtos()).thenReturn(List.of(new FrameDto(id, name)));

    mockMvc.perform(get(BASE_URL))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$[0].id").value(id))
        .andExpect(jsonPath("$[0].name").value(name));
  }

  @Test
  void getFrameById() throws Exception {
    when(frameService.getFrameDto(id)).thenReturn(new FrameDto(id, name));

    mockMvc.perform(get(BASE_URL + "/{id}", id))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.id").value(id))
        .andExpect(jsonPath("$.name").value(name));
  }

  @Test
  void getFrameById_whenFrameNotFound() throws Exception {
    doThrow(new FrameServiceException("Frame not found", HttpStatus.NOT_FOUND))
        .when(frameService).getFrameDto(id);

    mockMvc.perform(get(BASE_URL + "/{id}", id))
        .andExpect(status().isNotFound());
  }

  @Test
  void createNewFrame_whenValidDataProvided() throws Exception {
    val newFrameDto = new NewFrameDto(name);

    when(frameService.createFrame(any(NewFrameDto.class))).thenReturn(new FrameDto(id, name));

    mockMvc.perform(post(BASE_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(newFrameDto)))
        .andExpect(status().isCreated())
        .andExpect(jsonPath("$.id").value(id))
        .andExpect(jsonPath("$.name").value(name));
  }

  @Test
  void createNewFrame_whenValidDataProvided_withTrailingSpace() throws Exception {
    val nameWithSpaces = "test   ";
    val trimmedName = "test";
    val newFrameDto = new NewFrameDto(nameWithSpaces);

    when(frameService.createFrame(any(NewFrameDto.class)))
        .thenReturn(new FrameDto(id, trimmedName));

    mockMvc.perform(post(BASE_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(newFrameDto)))
        .andExpect(status().isCreated())
        .andExpect(jsonPath("$.id").value(id))
        .andExpect(jsonPath("$.name").value(trimmedName));
  }

  @ParameterizedTest
  @ValueSource(strings = {"", "  ", "sh"})
  void createNewFrame_whenInvalidDataProvided(String emptyName) throws Exception {
    val newFrameDto = new NewFrameDto(emptyName);

    mockMvc.perform(post(BASE_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(newFrameDto)))
        .andExpect(status().isBadRequest());
  }

  @Test
  void deleteFrame_whenValidDataProvided() throws Exception {
    mockMvc.perform(
            delete(BASE_URL + "/{id}", id))
        .andExpect(status().isNoContent());

    verify(frameService).deleteFrame(id);
  }

  @Test
  void deleteFrame_whenFrameNotFound() throws Exception {
    doThrow(new FrameServiceException("Frame not found", HttpStatus.NOT_FOUND))
        .when(frameService).deleteFrame(id);

    mockMvc.perform(delete(BASE_URL + "/{id}", id))
        .andExpect(status().isNotFound());

    verify(frameService).deleteFrame(id);
  }

  @Test
  void updateFrame_whenValidDataProvided() throws Exception {
    val newName = "new_frame_test";
    val newFrameDto = new NewFrameDto(newName);

    when(frameService.renameFrame(id, newName)).thenReturn(new FrameDto(id, newName));

    val mvcResult = mockMvc.perform(put(BASE_URL + "/{id}", id)
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(newFrameDto)))
        .andExpect(status().isOk())
        .andReturn();

    val content = mvcResult.getResponse().getContentAsString();

    val frameDto = objectMapper.readValue(content, FrameDto.class);

    assertEquals(id, frameDto.id());
    assertEquals(newName, frameDto.name());
  }

  @ParameterizedTest
  @ValueSource(strings = {"", "  ", "sh"})
  void updateFrame_whenInvalidNameProvided(String invalidName) throws Exception {
    val newFrameDto = new NewFrameDto(invalidName);

    mockMvc.perform(put(BASE_URL + "/{id}", id)
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(newFrameDto)))
        .andExpect(status().isBadRequest());
  }

  @Test
  void updateFrame_whenFrameNotFound() throws Exception {
    val newName = "new_frame_test";
    val newFrameDto = new NewFrameDto(newName);

    doThrow(new FrameServiceException("Frame not found", HttpStatus.NOT_FOUND))
        .when(frameService).renameFrame(id, newName);

    mockMvc.perform(put(BASE_URL + "/{id}", id)
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(newFrameDto)))
        .andExpect(status().isNotFound());

    verify(frameService).renameFrame(id, newName);
  }

  @Test
  void getFrameFullDto_whenValidDataProvided() throws Exception {
    when(frameService.getFrameFullDto(id)).thenReturn(
        new FrameFullDto(id, name, Collections.emptyList()));

    mockMvc.perform(get(BASE_URL + "/{id}/full", id))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.id").value(id))
        .andExpect(jsonPath("$.name").value(name))
        .andExpect(jsonPath("$.frameBlocks").isEmpty());
  }

  @Test
  void getFrameFullDto_whenFrameNotFound() throws Exception {
    doThrow(new FrameServiceException("Frame not found", HttpStatus.NOT_FOUND))
        .when(frameService).getFrameFullDto(id);

    mockMvc.perform(get(BASE_URL + "/{id}/full", id))
        .andExpect(status().isNotFound());
  }
}

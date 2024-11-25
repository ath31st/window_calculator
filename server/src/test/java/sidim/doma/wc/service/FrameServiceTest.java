package sidim.doma.wc.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.argThat;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.List;
import java.util.Optional;
import lombok.val;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import sidim.doma.wc.dto.frame.FrameDto;
import sidim.doma.wc.dto.frame.NewFrameDto;
import sidim.doma.wc.entity.Frame;
import sidim.doma.wc.exception.FrameServiceException;
import sidim.doma.wc.repository.FrameRepository;

@ExtendWith(MockitoExtension.class)
class FrameServiceTest {

  @Mock
  private FrameRepository frameRepository;

  @InjectMocks
  private FrameService frameService;

  private NewFrameDto newFrameDto;
  private FrameDto expectedFrameDto;
  private Frame frame;
  private Integer id;

  @BeforeEach
  void setUp() {
    id = 1;
    newFrameDto = new NewFrameDto("test");
    frame = Frame.builder()
        .id(1)
        .name("test")
        .build();
    expectedFrameDto = new FrameDto(1, "test");
  }

  @Test
  void getFrameDtoById_whenValidDataProvided() {
    val frameDto = new FrameDto(id, "test");

    when(frameRepository.findById(id)).thenReturn(Optional.ofNullable(frame));

    val frameDto1 = frameService.getFrameDto(id);

    assertEquals(frameDto, frameDto1);
  }

  @Test
  void getFrameDtoById_whenFrameNotFound_thenThrow() {
    when(frameRepository.findById(id)).thenReturn(Optional.empty());

    assertThrows(FrameServiceException.class, () -> frameService.getFrameDto(id));
  }

  @Test
  void getAllFrameDtos() {
    val expetctedframeDtos = List.of(expectedFrameDto);

    when(frameRepository.findAll()).thenReturn(List.of(frame));

    val frameDtos = frameService.getAllFrameDtos();

    assertEquals(expetctedframeDtos, frameDtos);
    assertEquals(1, frameDtos.size());
    assertEquals(expectedFrameDto, frameDtos.get(0));
  }

  @Test
  void createNewFrame_whenValidDataProvided() {
    when(frameRepository.save(any(Frame.class))).thenReturn(frame);

    val savedFrame = frameService.createFrame(newFrameDto);

    assertEquals(expectedFrameDto, savedFrame);
    verify(frameRepository).save(argThat(f -> f.getName().equals("test")));
  }

  @Test
  void renameFrame_whenValidDataProvided() {
    val newName = "another_test";

    when(frameRepository.existsById(id)).thenReturn(true);
    when(frameRepository.findById(id)).thenReturn(Optional.ofNullable(frame));
    when(frameRepository.save(any(Frame.class))).thenReturn(frame);

    val savedFrame = frameService.renameFrame(id, newName);

    assertEquals(newName, savedFrame.name());
  }

  @Test
  void renameFrame_whenFrameNotFound_thenThrow() {
    val newName = "another_test";

    when(frameRepository.existsById(id)).thenReturn(false);

    assertThrows(FrameServiceException.class, () -> frameService.renameFrame(id, newName));
    verify(frameRepository).existsById(id);
  }

  @Test
  void deleteFrame_success() {
    when(frameRepository.existsById(id)).thenReturn(true);

    frameService.deleteFrame(id);

    verify(frameRepository).deleteById(id);
  }

  @Test
  void getFrameById_whenValidDataProvided() {
    when(frameRepository.findById(id)).thenReturn(Optional.ofNullable(frame));

    val frame1 = frameService.getFrame(id);

    assertEquals(frame, frame1);
  }

  @Test
  void getFrameById_whenFrameNotFound_thenThrow() {
    when(frameRepository.findById(id)).thenReturn(Optional.empty());
    assertThrows(FrameServiceException.class, () -> frameService.getFrame(id));
  }
}
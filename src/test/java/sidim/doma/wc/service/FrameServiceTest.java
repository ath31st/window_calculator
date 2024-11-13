package sidim.doma.wc.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.argThat;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Optional;
import lombok.val;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import sidim.doma.wc.dto.FrameDto;
import sidim.doma.wc.dto.NewFrameDto;
import sidim.doma.wc.entity.Frame;
import sidim.doma.wc.exception.FrameServiceException;
import sidim.doma.wc.repository.FrameRepository;

@ExtendWith(MockitoExtension.class)
class FrameServiceTest {

  @Mock
  private FrameRepository frameRepository;

  @InjectMocks
  private FrameService frameService;

  private NewFrameDto frameDto;
  private FrameDto expectedFrameDto;
  private Frame frame;

  @BeforeEach
  void setUp() {
    frameDto = new NewFrameDto("test");
    frame = Frame.builder()
        .id(1)
        .name("test")
        .build();
    expectedFrameDto = new FrameDto(1, "test");
  }

  @Test
  void createNewFrame_whenValidDataProvided() {
    when(frameRepository.save(any(Frame.class))).thenReturn(frame);

    val savedFrame = frameService.create(frameDto);

    assertEquals(expectedFrameDto, savedFrame);
    verify(frameRepository).save(argThat(f -> f.getName().equals("test")));
  }

  @Test
  void renameFrame_whenValidDataProvided() {
    val newName = "another_test";
    val id = 1;

    when(frameRepository.existsById(id)).thenReturn(true);
    when(frameRepository.findById(id)).thenReturn(Optional.ofNullable(frame));
    when(frameRepository.save(any(Frame.class))).thenReturn(frame);

    val savedFrame = frameService.renameFrame(newName, id);

    assertEquals(newName, savedFrame.name());
  }

  @Test
  void renameFrame_whenFrameNotFound_thenThrow() {
    val newName = "another_test";
    val id = 1;

    when(frameRepository.existsById(id)).thenReturn(false);

    assertThrows(FrameServiceException.class, () -> frameService.renameFrame(newName, id));
    verify(frameRepository).existsById(id);
  }
}
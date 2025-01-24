package sidim.doma.wc.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.argThat;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Collections;
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
import sidim.doma.wc.dto.frame.FrameFullDto;
import sidim.doma.wc.dto.frame.NewFrameDto;
import sidim.doma.wc.dto.frame.UpdateFrameDto;
import sidim.doma.wc.entity.Frame;
import sidim.doma.wc.exception.FrameServiceException;
import sidim.doma.wc.mapper.FrameMapper;
import sidim.doma.wc.repository.FrameRepository;

@ExtendWith(MockitoExtension.class)
class FrameServiceTest {

  @Mock
  private FrameRepository frameRepository;

  @Mock
  private FrameMapper frameMapper;

  @InjectMocks
  private FrameService frameService;

  private NewFrameDto newFrameDto;
  private FrameDto expectedFrameDto;
  private Frame frame;
  private Integer id;
  private Integer order;

  @BeforeEach
  void setUp() {
    id = 1;
    order = 0;
    newFrameDto = new NewFrameDto("test", order);
    frame = new Frame(1, "test", null, null, Collections.emptySet(), order);
    expectedFrameDto = new FrameDto(1, "test", order);
  }

  @Test
  void getFrameDtoById_whenValidDataProvided() {
    val frameDto = new FrameDto(id, "test", order);

    when(frameRepository.findById(id)).thenReturn(Optional.ofNullable(frame));
    when(frameMapper.fromEntityToDto(frame)).thenReturn(frameDto);

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
    val expectedFrameDtos = List.of(expectedFrameDto);

    when(frameRepository.findAll()).thenReturn(List.of(frame));
    when(frameMapper.fromEntityToDto(frame)).thenReturn(expectedFrameDto);

    val frameDtos = frameService.getAllFrameDtos();

    assertEquals(expectedFrameDtos, frameDtos);
    assertEquals(1, frameDtos.size());
    assertEquals(expectedFrameDto, frameDtos.get(0));
  }

  @Test
  void createNewFrame_whenValidDataProvided() {
    when(frameRepository.save(any(Frame.class))).thenReturn(frame);
    when(frameMapper.fromEntityToDto(frame)).thenReturn(expectedFrameDto);
    when(frameMapper.fromNewDtoToEntity(newFrameDto)).thenReturn(frame);

    val savedFrame = frameService.createFrame(newFrameDto);

    assertEquals(expectedFrameDto, savedFrame);
    verify(frameRepository).save(argThat(f -> f.getName().equals("test")));
  }

  @Test
  void updateFrame_whenValidDataProvided() {
    val newName = "another_test";
    val newOrder = 22;
    val updateFrameDto = new UpdateFrameDto(id, newName, newOrder);
    val updatedFrame = new Frame(id, newName, null, null, Collections.emptySet(), newOrder);
    val updatedFrameDto = new FrameDto(id, newName, newOrder);

    when(frameRepository.existsById(id)).thenReturn(true);
    when(frameRepository.findById(id)).thenReturn(Optional.ofNullable(frame));
    when(frameRepository.save(any(Frame.class))).thenReturn(updatedFrame);
    when(frameMapper.fromEntityToDto(any(Frame.class))).thenReturn(updatedFrameDto);

    val savedFrame = frameService.updateFrame(updateFrameDto);

    assertEquals(newName, savedFrame.name());
    assertEquals(newOrder, savedFrame.order());
    verify(frameRepository).save(argThat(f -> f.getName().equals(newName)));
    verify(frameRepository).findById(id);
  }

  @Test
  void updateFrame_whenFrameNotFound_thenThrow() {
    val updateFrameDto = new UpdateFrameDto(id, "another_test", 22);

    when(frameRepository.existsById(id)).thenReturn(false);

    assertThrows(FrameServiceException.class, () -> frameService.updateFrame(updateFrameDto));
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

  @Test
  void getFrameFullDtoById_whenValidDataProvided() {
    val expectedFrameFullDto = new FrameFullDto(id, "test", order, Collections.emptyList());

    when(frameRepository.findById(id)).thenReturn(Optional.ofNullable(frame));
    when(frameMapper.fromEntityToFullDto(frame)).thenReturn(expectedFrameFullDto);

    val frameFullDto = frameService.getFrameFullDto(id);

    assertEquals(expectedFrameFullDto, frameFullDto);
  }

  @Test
  void getFrameFullDtoById_whenFrameNotFound_thenThrow() {
    when(frameRepository.findById(id)).thenReturn(Optional.empty());

    assertThrows(FrameServiceException.class, () -> frameService.getFrameFullDto(id));
  }
}
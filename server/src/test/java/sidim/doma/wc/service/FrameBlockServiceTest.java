package sidim.doma.wc.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Collections;
import lombok.val;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import sidim.doma.wc.dto.frame_block.FrameBlockDto;
import sidim.doma.wc.dto.frame_block.NewFrameBlockDto;
import sidim.doma.wc.dto.frame_block.UpdateFrameBlockDto;
import sidim.doma.wc.entity.Frame;
import sidim.doma.wc.entity.FrameBlock;
import sidim.doma.wc.exception.FrameBlockServiceException;
import sidim.doma.wc.mapper.FrameBlockMapper;
import sidim.doma.wc.repository.FrameBlockRepository;

@ExtendWith(MockitoExtension.class)
class FrameBlockServiceTest {

  @Mock
  private FrameBlockRepository frameBlockRepository;

  @Mock
  private FrameBlockMapper mockedMapper;

  @InjectMocks
  private FrameBlockService frameBlockService;

  private NewFrameBlockDto newFrameBlockDto;
  private UpdateFrameBlockDto updateFrameBlockDto;
  private FrameBlockDto expectedFrameBlockDto;
  private FrameBlockDto updatedFrameBlockDto;
  private FrameBlock frameBlock;
  private Frame frame;

  @BeforeEach
  void setUp() {
    val frameId = 1;
    val name = "test_block";
    val updateName = "another_test_block";
    val isWindowSizeEnabled = false;
    val blockInput = "test_block_input";
    val updateBlockInput = "another_test_block_input";

    newFrameBlockDto = new NewFrameBlockDto(frameId, name, isWindowSizeEnabled, blockInput, null);

    frame = new Frame();
    frame.setId(frameId);

    frameBlock = new FrameBlock(1, frame, name, isWindowSizeEnabled, blockInput,
        null, LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant(),
        null, Collections.emptySet(), "");

    expectedFrameBlockDto = new FrameBlockDto(frameBlock.getId(), name,
        isWindowSizeEnabled, blockInput, null);
    updatedFrameBlockDto = new FrameBlockDto(frameBlock.getId(),
        updateName, isWindowSizeEnabled, updateBlockInput, null);

    updateFrameBlockDto = new UpdateFrameBlockDto(frameBlock.getId(),
        updateName, isWindowSizeEnabled, updateBlockInput, null);
  }

  @Test
  void createFrameBlock_success() {
    when(mockedMapper.fromNewToEntity(any(NewFrameBlockDto.class), any(Frame.class))).thenReturn(frameBlock);
    when(mockedMapper.fromEntityToDto(any(FrameBlock.class))).thenReturn(expectedFrameBlockDto);
    when(frameBlockRepository.save(any(FrameBlock.class))).thenReturn(frameBlock);

    val savedFrameBlockDto = frameBlockService.createFrameBlock(newFrameBlockDto, frame);

    assertEquals(expectedFrameBlockDto, savedFrameBlockDto);
    verify(frameBlockRepository).save(any(FrameBlock.class));
  }

  @Test
  void deleteFrameBlock_success() {
    when(frameBlockRepository.existsById(1)).thenReturn(true);

    frameBlockService.deleteFrameBlock(1);

    verify(frameBlockRepository).deleteById(1);
  }

  @Test
  void deleteFrameBlock_whenFrameBlockNotFound() {
    when(frameBlockRepository.existsById(1)).thenReturn(false);

    assertThrows(FrameBlockServiceException.class, () -> frameBlockService.deleteFrameBlock(1));
  }

  @Test
  void updateFrameBlock_success() {
    when(mockedMapper.fromEntityToDto(any(FrameBlock.class))).thenReturn(updatedFrameBlockDto);
    when(frameBlockRepository.existsById(1)).thenReturn(true);
    when(frameBlockRepository.findById(1)).thenReturn(java.util.Optional.of(frameBlock));
    when(frameBlockRepository.save(any(FrameBlock.class))).thenReturn(frameBlock);

    val savedFrameBlockDto = frameBlockService.updateFrameBlock(updateFrameBlockDto);

    assertEquals(updatedFrameBlockDto, savedFrameBlockDto);
    verify(frameBlockRepository).save(any(FrameBlock.class));
  }

  @Test
  void updateFrameBlock_whenFrameBlockNotFound() {
    when(frameBlockRepository.existsById(1)).thenReturn(false);

    assertThrows(FrameBlockServiceException.class, () -> frameBlockService.updateFrameBlock(updateFrameBlockDto));
  }

  @Test
  void getFrameBlock_success() {
    when(frameBlockRepository.existsById(1)).thenReturn(true);
    when(frameBlockRepository.findById(1)).thenReturn(java.util.Optional.of(frameBlock));

    val actualFrameBlock = frameBlockService.getFrameBlock(1);

    assertEquals(actualFrameBlock, frameBlock);
  }

  @Test
  void getFrameBlock_whenFrameBlockNotFound() {
    when(frameBlockRepository.existsById(1)).thenReturn(false);

    assertThrows(FrameBlockServiceException.class, () -> frameBlockService.getFrameBlock(1));
  }
}
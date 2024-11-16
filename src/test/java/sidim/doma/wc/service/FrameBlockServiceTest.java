package sidim.doma.wc.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import lombok.val;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import sidim.doma.wc.dto.frame_block.FrameBlockDto;
import sidim.doma.wc.dto.frame_block.NewFrameBlockDto;
import sidim.doma.wc.entity.Frame;
import sidim.doma.wc.entity.FrameBlock;
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

  private final FrameBlockMapper frameBlockMapper = new FrameBlockMapper();

  private NewFrameBlockDto newFrameBlockDto;
  private FrameBlockDto expectedFrameBlockDto;
  private FrameBlock frameBlock;
  private Frame frame;

  @BeforeEach
  void setUp() {
    val frameId = 1;
    val name = "test_block";
    val isWindowSizeEnabled = false;
    val blockInput = "test_block_input";

    newFrameBlockDto = new NewFrameBlockDto(frameId, name, isWindowSizeEnabled, blockInput, null);

    frame = new Frame();
    frame.setId(frameId);

    frameBlock = frameBlockMapper.fromNewToEntity(newFrameBlockDto, frame);
    frameBlock.setId(1);

    expectedFrameBlockDto = frameBlockMapper.fromEntityToDto(frameBlock);
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
}
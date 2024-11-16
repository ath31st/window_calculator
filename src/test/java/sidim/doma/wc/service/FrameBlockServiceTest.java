package sidim.doma.wc.service;

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

  @InjectMocks
  private FrameBlockService frameBlockService;

  private FrameBlockMapper frameBlockMapper = new FrameBlockMapper();

  private NewFrameBlockDto newFrameBlockDto;
  private FrameBlockDto expectedFrameBlockDto;
  private FrameBlock frameBlock;

  @BeforeEach
  void setUp() {
    val frameId = 1;
    val name = "test_block";
    val isWindowSizeEnabled = false;
    val blockInput = "test_block_input";

    newFrameBlockDto = new NewFrameBlockDto(frameId, name, isWindowSizeEnabled, blockInput, null);

    frameBlock = frameBlockMapper.fromNewToEntity(newFrameBlockDto, new Frame());
    frameBlock.setId(1);

    expectedFrameBlockDto = frameBlockMapper.fromEntityToDto(frameBlock);
  }

  @Test
  void createFrameBlock_success() {

  }
}
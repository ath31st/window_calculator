package sidim.doma.wc.service;

import lombok.RequiredArgsConstructor;
import lombok.val;
import org.springframework.stereotype.Service;
import sidim.doma.wc.dto.frame_block.FrameBlockDto;
import sidim.doma.wc.dto.frame_block.NewFrameBlockDto;
import sidim.doma.wc.entity.Frame;
import sidim.doma.wc.mapper.FrameBlockMapper;
import sidim.doma.wc.repository.FrameBlockRepository;

@Service
@RequiredArgsConstructor
public class FrameBlockService {
  private final FrameBlockRepository frameBlockRepository;
  private final FrameBlockMapper frameBlockMapper;

  public FrameBlockDto createFrameBlock(NewFrameBlockDto newFrameBlockDto, Frame frame) {
    val frameBlock = frameBlockMapper.fromNewToEntity(newFrameBlockDto, frame);

    val savedFrameBlock = frameBlockRepository.save(frameBlock);
    return frameBlockMapper.fromEntityToDto(savedFrameBlock);
  }
}

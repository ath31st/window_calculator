package sidim.doma.wc.service;

import lombok.RequiredArgsConstructor;
import lombok.val;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import sidim.doma.wc.dto.frame_block.FrameBlockDto;
import sidim.doma.wc.dto.frame_block.NewFrameBlockDto;
import sidim.doma.wc.dto.frame_block.UpdateFrameBlockDto;
import sidim.doma.wc.entity.Frame;
import sidim.doma.wc.entity.FrameBlock;
import sidim.doma.wc.exception.FrameBlockServiceException;
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

  public void deleteFrameBlock(Integer id) {
    checkExistsFrameBlock(id);

    frameBlockRepository.deleteById(id);
  }

  private void checkExistsFrameBlock(Integer id) {
    if (!frameBlockRepository.existsById(id)) {
      throw new FrameBlockServiceException(String.format("FrameBlock with id: %d not found", id),
          HttpStatus.NOT_FOUND);
    }
  }

  public FrameBlockDto updateFrameBlock(UpdateFrameBlockDto dto) {
    checkExistsFrameBlock(dto.id());

    val frameBlock = getFrameBlock(dto.id());

    frameBlock.setName(dto.name());
    frameBlock.setIsWindowSizeEnabled(dto.isWindowSizeEnabled());
    frameBlock.setInputTitle(dto.inputTitle());
    frameBlock.setDescription(dto.description());

    val updatedFrameBlock = frameBlockRepository.save(frameBlock);
    return frameBlockMapper.fromEntityToDto(updatedFrameBlock);
  }

  public FrameBlock getFrameBlock(Integer id) {
    checkExistsFrameBlock(id);

    return frameBlockRepository.findById(id).orElseThrow();
  }
}

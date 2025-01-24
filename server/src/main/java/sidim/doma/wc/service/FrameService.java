package sidim.doma.wc.service;

import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.val;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import sidim.doma.wc.dto.frame.FrameDto;
import sidim.doma.wc.dto.frame.FrameFullDto;
import sidim.doma.wc.dto.frame.NewFrameDto;
import sidim.doma.wc.dto.frame.UpdateFrameDto;
import sidim.doma.wc.entity.Frame;
import sidim.doma.wc.exception.FrameServiceException;
import sidim.doma.wc.mapper.FrameMapper;
import sidim.doma.wc.repository.FrameRepository;

@Service
@RequiredArgsConstructor
public class FrameService {
  private final FrameRepository frameRepository;
  private final FrameMapper frameMapper;

  public FrameDto createFrame(NewFrameDto frameDto) {
    val frame = frameMapper.fromNewDtoToEntity(frameDto);

    val savedFrame = frameRepository.save(frame);
    return frameMapper.fromEntityToDto(savedFrame);
  }

  public void deleteFrame(Integer frameId) {
    checkExistsFrame(frameId);
    frameRepository.deleteById(frameId);
  }

  public FrameDto updateFrame(UpdateFrameDto dto) {
    checkExistsFrame(dto.id());

    val frame = getFrame(dto.id());
    frame.setName(dto.name());
    frame.setOrder(dto.order());

    frameRepository.save(frame);

    return frameMapper.fromEntityToDto(frame);
  }

  public FrameDto getFrameDto(Integer id) {
    val frame = getFrame(id);
    return frameMapper.fromEntityToDto(frame);
  }

  public FrameFullDto getFrameFullDto(Integer id) {
    val frame = getFrame(id);
    return frameMapper.fromEntityToFullDto(frame);
  }

  public List<FrameDto> getAllFrameDtos() {
    return frameRepository.findAll().stream()
        .map(frameMapper::fromEntityToDto)
        .toList();
  }

  public Frame getFrame(Integer id) {
    return frameRepository.findById(id).orElseThrow(
        () -> new FrameServiceException(String.format("Frame with id: %d not found", id),
            HttpStatus.NOT_FOUND)
    );
  }

  private void checkExistsFrame(Integer frameId) {
    if (!frameRepository.existsById(frameId)) {
      throw new FrameServiceException(String.format("Frame with id: %d not found", frameId),
          HttpStatus.NOT_FOUND);
    }
  }
}

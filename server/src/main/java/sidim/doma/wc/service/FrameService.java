package sidim.doma.wc.service;

import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.val;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import sidim.doma.wc.dto.frame.FrameDto;
import sidim.doma.wc.dto.frame.NewFrameDto;
import sidim.doma.wc.entity.Frame;
import sidim.doma.wc.exception.FrameServiceException;
import sidim.doma.wc.repository.FrameRepository;

@Service
@RequiredArgsConstructor
public class FrameService {
  private final FrameRepository frameRepository;

  public FrameDto createFrame(NewFrameDto frameDto) {
    val frame = new Frame();
    frame.setName(frameDto.name());

    val savedFrame = frameRepository.save(frame);
    return new FrameDto(savedFrame.getId(), savedFrame.getName());
  }

  public void deleteFrame(Integer frameId) {
    checkExistsFrame(frameId);
    frameRepository.deleteById(frameId);
  }

  public FrameDto renameFrame(Integer id, String newName) {
    checkExistsFrame(id);

    val frame = getFrame(id);
    frame.setName(newName);
    frameRepository.save(frame);

    return new FrameDto(frame.getId(), frame.getName());
  }

  public FrameDto getFrameDto(Integer id) {
    val frame = getFrame(id);
    return new FrameDto(frame.getId(), frame.getName());
  }

  public List<FrameDto> getAllFrameDtos() {
    return frameRepository.findAll().stream()
        .map(f -> new FrameDto(f.getId(), f.getName()))
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

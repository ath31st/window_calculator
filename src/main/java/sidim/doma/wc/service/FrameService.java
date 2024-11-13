package sidim.doma.wc.service;

import lombok.RequiredArgsConstructor;
import lombok.val;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import sidim.doma.wc.dto.FrameDto;
import sidim.doma.wc.dto.NewFrameDto;
import sidim.doma.wc.entity.Frame;
import sidim.doma.wc.exception.FrameServiceException;
import sidim.doma.wc.repository.FrameRepository;

@Service
@RequiredArgsConstructor
public class FrameService {
  private final FrameRepository frameRepository;


  public FrameDto create(NewFrameDto frameDto) {
    val frame = new Frame();
    frame.setName(frameDto.name());

    val savedFrame = frameRepository.save(frame);
    return new FrameDto(savedFrame.getId(), savedFrame.getName());
  }

  public FrameDto renameFrame(String newName, Integer id) {
    checkExistsFrame(id);

    val frame = getFrame(id);
    frame.setName(newName);
    frameRepository.save(frame);

    return new FrameDto(frame.getId(), frame.getName());
  }

  private Frame getFrame(Integer id) {
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

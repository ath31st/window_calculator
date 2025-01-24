package sidim.doma.wc.controller;

import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.val;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import sidim.doma.wc.dto.frame.FrameDto;
import sidim.doma.wc.dto.frame.FrameFullDto;
import sidim.doma.wc.dto.frame.NewFrameDto;
import sidim.doma.wc.dto.frame.UpdateFrameDto;
import sidim.doma.wc.service.FrameService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class FrameController {
  private final FrameService frameService;

  @GetMapping("/frames/{id}")
  public ResponseEntity<FrameDto> getFrameById(@PathVariable Integer id) {
    val frameDto = frameService.getFrameDto(id);

    return ResponseEntity.ok(frameDto);
  }

  @GetMapping("/frames/{id}/full")
  public ResponseEntity<FrameFullDto> getFrameFullById(@PathVariable Integer id) {
    val frameDto = frameService.getFrameFullDto(id);

    return ResponseEntity.ok(frameDto);
  }

  @GetMapping("/frames")
  public ResponseEntity<List<FrameDto>> getAllFrames() {
    val frameDtos = frameService.getAllFrameDtos();

    return ResponseEntity.ok(frameDtos);
  }

  @PostMapping("/frames")
  public ResponseEntity<FrameDto> createNewFrame(@RequestBody @Valid NewFrameDto dto) {
    val trimmedDto = NewFrameDto.from(dto);
    val savedFrame = frameService.createFrame(trimmedDto);

    return new ResponseEntity<>(savedFrame, HttpStatus.CREATED);
  }

  @DeleteMapping("/frames/{id}")
  public ResponseEntity<HttpStatus> deleteFrame(@PathVariable Integer id) {
    frameService.deleteFrame(id);

    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }

  @PutMapping("/frames")
  public ResponseEntity<FrameDto> updateFrame(@RequestBody @Valid UpdateFrameDto dto) {
    val trimmedDto = UpdateFrameDto.from(dto);
    val updatedFrame = frameService.updateFrame(trimmedDto);

    return ResponseEntity.ok(updatedFrame);
  }
}

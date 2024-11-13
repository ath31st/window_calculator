package sidim.doma.wc.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import sidim.doma.wc.dto.FrameDto;
import sidim.doma.wc.dto.NewFrameDto;
import sidim.doma.wc.service.FrameService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class FrameController {
  private final FrameService frameService;

  @PostMapping("/frames")
  public ResponseEntity<FrameDto> createNewFrame(@RequestBody @Valid NewFrameDto dto) {
    return new ResponseEntity<>(frameService.createFrame(dto), HttpStatus.CREATED);
  }

}

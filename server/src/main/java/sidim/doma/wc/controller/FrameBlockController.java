package sidim.doma.wc.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.val;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import sidim.doma.wc.dto.frame_block.FrameBlockDto;
import sidim.doma.wc.dto.frame_block.NewFrameBlockDto;
import sidim.doma.wc.dto.frame_block.UpdateFrameBlockDto;
import sidim.doma.wc.dto.frame_block.UpdateFrameBlockFormulaDto;
import sidim.doma.wc.service.FrameBlockService;
import sidim.doma.wc.service.FrameService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class FrameBlockController {
  private final FrameBlockService frameBlockService;
  private final FrameService frameService;

  @PostMapping("/frame_blocks")
  public ResponseEntity<FrameBlockDto> createFrameBlock(@RequestBody @Valid NewFrameBlockDto dto) {
    val trimmedDto = NewFrameBlockDto.from(dto);
    val frame = frameService.getFrame(trimmedDto.frameId());
    val savedFrameBlockDto = frameBlockService.createFrameBlock(trimmedDto, frame);

    return new ResponseEntity<>(savedFrameBlockDto, HttpStatus.CREATED);
  }

  @PutMapping("/frame_blocks")
  public ResponseEntity<FrameBlockDto> updateFrameBlock(
      @RequestBody @Valid UpdateFrameBlockDto dto) {
    val trimmedDto = UpdateFrameBlockDto.from(dto);
    val updatedFrameBlock = frameBlockService.updateFrameBlock(trimmedDto);

    return new ResponseEntity<>(updatedFrameBlock, HttpStatus.OK);
  }

  @DeleteMapping("/frame_blocks/{id}")
  public ResponseEntity<HttpStatus> deleteFrameBlock(@PathVariable Integer id) {
    frameBlockService.deleteFrameBlock(id);

    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }

  @PatchMapping("/frame_blocks/formula")
  public ResponseEntity<HttpStatus> changeFormula(@RequestBody UpdateFrameBlockFormulaDto dto) {
    frameBlockService.changeFormula(dto);

    return new ResponseEntity<>(HttpStatus.OK);
  }
}

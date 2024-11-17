package sidim.doma.wc.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.val;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import sidim.doma.wc.dto.block_table.BlockTableDto;
import sidim.doma.wc.dto.block_table.NewBlockTableDto;
import sidim.doma.wc.service.BlockTableService;
import sidim.doma.wc.service.FrameBlockService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class BlockTableController {
  private final BlockTableService blockTableService;
  private final FrameBlockService frameBlockService;

  @PostMapping("/block_tables")
  public ResponseEntity<BlockTableDto> createNewBlockTable(@RequestBody @Valid NewBlockTableDto dto) {
    val frameBlock = frameBlockService.getFrameBlock(dto.frameBlockId());
    val savedBlockTableDto = blockTableService.createNewBlockTable(dto, frameBlock);

    return new ResponseEntity<>(savedBlockTableDto, HttpStatus.CREATED);
  }
}

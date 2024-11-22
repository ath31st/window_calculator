package sidim.doma.wc.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.val;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import sidim.doma.wc.dto.block_table.BlockTableDto;
import sidim.doma.wc.dto.block_table.NewBlockTableDto;
import sidim.doma.wc.dto.block_table.UpdateBlockTableDto;
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
    val trimmedDto = NewBlockTableDto.from(dto);
    val frameBlock = frameBlockService.getFrameBlock(trimmedDto.frameBlockId());
    val savedBlockTableDto = blockTableService.createNewBlockTable(trimmedDto, frameBlock);

    return new ResponseEntity<>(savedBlockTableDto, HttpStatus.CREATED);
  }

  @DeleteMapping("/block_tables/{id}")
  public ResponseEntity<HttpStatus> deleteBlockTable(@PathVariable Integer id) {
    blockTableService.deleteBlockTable(id);

    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }

  @PutMapping("/block_tables")
  public ResponseEntity<BlockTableDto> updateBlockTable(@RequestBody @Valid UpdateBlockTableDto dto) {
    val trimmedDto = UpdateBlockTableDto.from(dto);
    val blockTable = blockTableService.updateBlockTable(trimmedDto);

    return new ResponseEntity<>(blockTable, HttpStatus.OK);
  }
}

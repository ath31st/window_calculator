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
import sidim.doma.wc.dto.table_button.NewTableButtonDto;
import sidim.doma.wc.dto.table_button.TableButtonDto;
import sidim.doma.wc.dto.table_button.UpdateTableButtonDto;
import sidim.doma.wc.service.BlockTableService;
import sidim.doma.wc.service.TableButtonService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class TableButtonController {
  private final TableButtonService tableButtonService;
  private final BlockTableService blockTableService;

  @PostMapping("/table_buttons")
  public ResponseEntity<TableButtonDto> createTableButton(
      @RequestBody @Valid NewTableButtonDto dto) {
    val blockTable = blockTableService.getBlockTable(dto.blockTableId());
    val tableButton = tableButtonService.createTableButton(dto, blockTable);

    return new ResponseEntity<>(tableButton, HttpStatus.CREATED);
  }

  @PutMapping("/table_buttons")
  public ResponseEntity<TableButtonDto> updateTableButton(
      @RequestBody @Valid UpdateTableButtonDto dto) {
    val tableButton = tableButtonService.updateTableButton(dto);

    return new ResponseEntity<>(tableButton, HttpStatus.OK);
  }

  @DeleteMapping("/table_buttons/{id}")
  public ResponseEntity<HttpStatus> deleteTableButton(@PathVariable Integer id) {
    tableButtonService.deleteTableButton(id);

    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }
}

package sidim.doma.wc.service;

import lombok.RequiredArgsConstructor;
import lombok.val;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import sidim.doma.wc.dto.table_button.NewTableButtonDto;
import sidim.doma.wc.dto.table_button.TableButtonDto;
import sidim.doma.wc.dto.table_button.UpdateTableButtonDto;
import sidim.doma.wc.entity.BlockTable;
import sidim.doma.wc.entity.TableButton;
import sidim.doma.wc.exception.TableButtonServiceException;
import sidim.doma.wc.mapper.TableButtonMapper;
import sidim.doma.wc.repository.TableButtonRepository;

@Service
@RequiredArgsConstructor
public class TableButtonService {
  private final TableButtonRepository tableButtonRepository;
  private final TableButtonMapper tableButtonMapper;

  public TableButtonDto createTableButton(NewTableButtonDto dto, BlockTable blockTable) {
    val tableButton = tableButtonMapper.fromNewToEntity(dto, blockTable);
    val savedTableButton = tableButtonRepository.save(tableButton);

    return tableButtonMapper.fromEntityToDto(savedTableButton);
  }

  public TableButtonDto updateTableButton(UpdateTableButtonDto dto) {
    checkExistsTableButton(dto.id());
    val tableButton = getTableButton(dto.id());

    tableButton.setName(dto.name());
    tableButton.setValue(dto.value());

    val savedTableButton = tableButtonRepository.save(tableButton);

    return tableButtonMapper.fromEntityToDto(savedTableButton);
  }

  public TableButton getTableButton(Integer id) {
    checkExistsTableButton(id);
    return tableButtonRepository.findById(id).get();
  }

  private void checkExistsTableButton(Integer id) {
    if (!tableButtonRepository.existsById(id)) {
      throw new TableButtonServiceException(String.format("TableButton with id: %d not found", id),
          HttpStatus.NOT_FOUND);
    }
  }

  public void deleteTableButton(Integer tableButtonId) {
    checkExistsTableButton(tableButtonId);

    tableButtonRepository.deleteById(tableButtonId);
  }
}

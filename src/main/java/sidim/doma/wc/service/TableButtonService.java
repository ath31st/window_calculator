package sidim.doma.wc.service;

import lombok.RequiredArgsConstructor;
import lombok.val;
import org.springframework.stereotype.Service;
import sidim.doma.wc.dto.table_button.NewTableButtonDto;
import sidim.doma.wc.dto.table_button.TableButtonDto;
import sidim.doma.wc.entity.BlockTable;
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
}

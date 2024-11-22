package sidim.doma.wc.mapper;

import java.time.LocalDateTime;
import java.time.ZoneId;
import org.springframework.stereotype.Component;
import sidim.doma.wc.dto.table_button.NewTableButtonDto;
import sidim.doma.wc.dto.table_button.TableButtonDto;
import sidim.doma.wc.entity.BlockTable;
import sidim.doma.wc.entity.TableButton;

@Component
public class TableButtonMapper {
  public TableButtonDto fromEntityToDto(TableButton entity) {
    return new TableButtonDto(entity.getId(), entity.getName(), entity.getValue());
  }

  public TableButton fromNewToEntity(NewTableButtonDto dto, BlockTable blockTable) {
    return TableButton.builder()
        .id(null)
        .blockTable(blockTable)
        .name(dto.name())
        .value(dto.value())
        .createdAt(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant())
        .build();
  }
}

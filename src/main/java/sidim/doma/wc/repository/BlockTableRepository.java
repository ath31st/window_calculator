package sidim.doma.wc.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sidim.doma.wc.entity.BlockTable;

@Repository
public interface BlockTableRepository extends JpaRepository<BlockTable, Integer> {
}

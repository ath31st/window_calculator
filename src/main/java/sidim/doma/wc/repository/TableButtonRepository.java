package sidim.doma.wc.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sidim.doma.wc.entity.TableButton;

@Repository
public interface TableButtonRepository extends JpaRepository<TableButton, Integer> {
}

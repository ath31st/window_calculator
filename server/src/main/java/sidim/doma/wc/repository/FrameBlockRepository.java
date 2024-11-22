package sidim.doma.wc.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sidim.doma.wc.entity.FrameBlock;

@Repository
public interface FrameBlockRepository extends JpaRepository<FrameBlock, Integer> {
}

package sidim.doma.wc.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sidim.doma.wc.entity.Frame;

@Repository
public interface FrameRepository extends JpaRepository<Frame, Integer> {
}

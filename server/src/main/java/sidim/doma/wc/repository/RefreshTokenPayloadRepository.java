package sidim.doma.wc.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sidim.doma.wc.entity.RefreshTokenPayload;

@Repository
public interface RefreshTokenPayloadRepository extends JpaRepository<RefreshTokenPayload, Long> {

  boolean existsByUserEmailIgnoreCase(String email);
  Optional<RefreshTokenPayload> findByUserEmailIgnoreCase(String email);
}

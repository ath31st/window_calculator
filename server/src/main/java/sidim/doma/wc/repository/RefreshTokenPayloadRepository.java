package sidim.doma.wc.repository;

import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import sidim.doma.wc.entity.RefreshTokenPayload;

@Repository
public interface RefreshTokenPayloadRepository extends JpaRepository<RefreshTokenPayload, Long> {

  boolean existsByUserEmailIgnoreCase(String email);

  @Transactional
  @Modifying
  @Query("update RefreshTokenPayload p set p.payload = ?1 where upper(p.user.email) = upper(?2)")
  void updatePayloadByEmailIgnoreCase(UUID payload, String email);

  Optional<RefreshTokenPayload> findByUserEmailIgnoreCase(String email);
}

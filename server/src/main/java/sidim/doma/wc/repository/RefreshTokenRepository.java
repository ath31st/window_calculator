package sidim.doma.wc.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import sidim.doma.wc.entity.RefreshToken;

@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {

  @Query("select (count(rt) > 0) from RefreshToken rt where upper(rt.user.email) = upper(?1)")
  boolean existsByUserEmailIgnoreCase(String email);

  @Transactional
  @Modifying
  @Query("update RefreshToken rt set rt.token = ?1 where upper(rt.user.email) = upper(?2)")
  void updateTokenByEmailIgnoreCase(String token, String username);

  Optional<RefreshToken> findByUserEmailIgnoreCase(String email);
}

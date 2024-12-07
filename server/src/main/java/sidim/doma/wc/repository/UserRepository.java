package sidim.doma.wc.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sidim.doma.wc.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
  Optional<User> findByEmailIgnoreCase(String email);
}

package sidim.doma.wc.config;

import java.time.LocalDateTime;
import java.time.ZoneId;
import lombok.RequiredArgsConstructor;
import lombok.val;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import sidim.doma.wc.entity.User;
import sidim.doma.wc.repository.UserRepository;

@Component
@RequiredArgsConstructor
public class AdminInitializer implements CommandLineRunner {

  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;

  @Override
  public void run(String... args) {
    val adminEmail = System.getenv("ADMIN_EMAIL");
    val adminPassword = System.getenv("ADMIN_PASSWORD");

    if (adminEmail != null && adminPassword != null &&
        userRepository.findByEmailIgnoreCase(adminEmail).isEmpty()) {

      val user = User.builder()
          .email(adminEmail)
          .password(passwordEncoder.encode(adminPassword))
          .role(1)
          .isActive(true)
          .name("Administrator")
          .createdAt(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant())
          .build();

      userRepository.save(user);
      System.out.println("Admin user created from environment variables.");
    }
  }
}

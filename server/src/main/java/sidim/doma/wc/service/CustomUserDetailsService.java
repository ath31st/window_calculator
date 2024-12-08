package sidim.doma.wc.service;

import lombok.RequiredArgsConstructor;
import lombok.val;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import sidim.doma.wc.entity.CustomUserDetails;
import sidim.doma.wc.repository.UserRepository;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
  private final UserRepository userRepository;

  @Override
  public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
    val user = userRepository.findByEmailIgnoreCase(email).orElseThrow(
        () -> new UsernameNotFoundException("User with email " + email + " not found!"));

    return new CustomUserDetails(user);
  }
}

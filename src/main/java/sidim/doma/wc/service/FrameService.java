package sidim.doma.wc.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import sidim.doma.wc.repository.FrameRepository;

@Service
@RequiredArgsConstructor
public class FrameService {
  private final FrameRepository frameRepository;


}

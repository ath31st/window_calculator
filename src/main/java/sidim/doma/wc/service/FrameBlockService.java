package sidim.doma.wc.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import sidim.doma.wc.repository.FrameBlockRepository;

@Service
@RequiredArgsConstructor
public class FrameBlockService {
  private final FrameBlockRepository frameBlockRepository;
}

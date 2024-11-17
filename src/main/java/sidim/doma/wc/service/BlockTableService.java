package sidim.doma.wc.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import sidim.doma.wc.repository.BlockTableRepository;

@Service
@RequiredArgsConstructor
public class BlockTableService {
  private final BlockTableRepository blockTableRepository;
}

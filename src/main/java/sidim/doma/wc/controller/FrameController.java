package sidim.doma.wc.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import sidim.doma.wc.service.FrameService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class FrameController {
  private final FrameService frameService;


}

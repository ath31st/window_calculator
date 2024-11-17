package sidim.doma.wc.util;

import java.util.Arrays;

public enum ButtonType {
  MODIFIER, VALUE;

  public static ButtonType findByName(String name) {
    return Arrays.stream(values())
        .filter(buttonType -> buttonType.name().equalsIgnoreCase(name))
        .findFirst()
        .orElseThrow(() ->
            new IllegalArgumentException("No enum constant with name: " + name));
  }
}

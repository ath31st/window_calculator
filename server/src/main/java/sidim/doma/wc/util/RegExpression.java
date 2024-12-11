package sidim.doma.wc.util;

import lombok.experimental.UtilityClass;

@UtilityClass
public class RegExpression {
  public static final String TOKEN =
      "^([a-zA-Z0-9_=]+)\\.([a-zA-Z0-9_=]+)\\.([a-zA-Z0-9_\\-\\+\\/=]*)";
}

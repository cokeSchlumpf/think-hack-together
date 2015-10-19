package ws;

import java.util.HashSet;
import java.util.Set;

import javax.ws.rs.ApplicationPath;

@ApplicationPath("api")
public class Application extends javax.ws.rs.core.Application {

  @Override
  public Set<Class<?>> getClasses() {
      HashSet<Class<?>> classes = new HashSet<Class<?>>();
      classes.add(AuthService.class);
      classes.add(CoinService.class);
      classes.add(IdeasService.class);
      return classes;
  }
  
}

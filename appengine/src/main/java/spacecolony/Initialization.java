package spacecolony;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import com.googlecode.objectify.ObjectifyService;
import com.googlecode.objectify.annotation.Entity;

@Entity
public class Initialization implements ServletContextListener {

  public void contextInitialized(ServletContextEvent event) {
    ObjectifyService.register(Prospect.class);
  }

  public void contextDestroyed(ServletContextEvent event) {
  }

}

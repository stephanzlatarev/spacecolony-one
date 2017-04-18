package spacecolony;

import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;

@Entity
public class Prospect {

  @Id public String email;
  public String crew;
  public String duration;
  public String transport;
  public String food;
  public String missions;
  public String souvenirs;
  public String when;

}

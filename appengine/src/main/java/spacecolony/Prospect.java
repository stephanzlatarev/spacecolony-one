package spacecolony;

import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Index;

@Entity
public class Prospect {

  @Id public String email;
  @Index public Long timestamp;
  public String country;

  public String crew;
  public String duration;
  public String transport;
  public String food;
  public String missions;
  public String souvenirs;
  public String when;

}

package spacecolony;

import java.io.IOException;
import java.io.InputStreamReader;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.GsonBuilder;
import com.googlecode.objectify.ObjectifyService;

@SuppressWarnings("serial")
public class ProspectServlet extends HttpServlet {

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    InputStreamReader reader = new InputStreamReader(request.getInputStream());
    Prospect prospect = new GsonBuilder().create().fromJson(reader, Prospect.class);
    reader.close();

    prospect.country = request.getHeader("X-AppEngine-Country");
    prospect.timestamp = System.currentTimeMillis();

    ObjectifyService.ofy().save().entity(prospect).now();
  }

}

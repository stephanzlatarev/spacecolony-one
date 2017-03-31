package spacecolony;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@SuppressWarnings("serial")
public class ContentServlet extends HttpServlet {

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    String file = request.getPathInfo().replaceAll("/", "");
    InputStream stream = getServletContext().getResourceAsStream("/assets/content/" + file);
    byte[] buffer = new byte[10240];

    OutputStream output = response.getOutputStream();
    for (int length = 0; (length = stream.read(buffer)) > 0;) {
      output.write(buffer, 0, length);
    }
    output.close();
  }

}

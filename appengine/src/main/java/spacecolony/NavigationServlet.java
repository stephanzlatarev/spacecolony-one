package spacecolony;

import java.io.IOException;
import java.io.InputStream;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@SuppressWarnings("serial")
public class NavigationServlet extends HttpServlet {

  private String page = null;
  private String home = null;

  public void init() {
    try {
      page = read("/index.html");
      home = read("/assets/content/Home");
    } catch (IOException e) {
      e.printStackTrace();
    }
  }

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
    response.setContentType("text/html; charset=utf-8");
    response.getWriter().print(combine(page, data(request)));
  }

  private String read(String file) throws IOException {
    InputStream stream = getServletContext().getResourceAsStream(file);
    if (stream != null) {
      byte[] buffer = new byte[10240];
      String data = "";
      for (int length = 0; (length = stream.read(buffer)) > 0;) {
        data += new String(buffer, 0, length);
      }
      stream.close();
      return data;
    } else {
      return null;
    }
  }

  private String data(HttpServletRequest request) throws IOException {
    String file = request.getRequestURI().replaceAll("/", "");
    String data = read("/assets/content/" + file);

    return (data != null) ? data : home;
  }

  private String combine(String page, String data) {
    if (data != null) {
      int start = page.indexOf("null");
      return page.substring(0, start) + data + page.substring(start + 4);
    } else {
      return page;
    }
  }

}

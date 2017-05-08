package spacecolony;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@SuppressWarnings("serial")
public class NavigationServlet extends HttpServlet {

  private String page = null;

  public void init() {
    try {
      page = Content.file(getServletContext(), "/index.html");
    } catch (IOException e) {
      e.printStackTrace();
    }
  }

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
    response.setContentType("text/html; charset=utf-8");
    response.getWriter().print(combine(page, data(request)));
  }

  private String data(HttpServletRequest request) throws IOException {
    String file = request.getRequestURI().replaceAll("/", "");
    String data = Content.content(getServletContext(), request, file);

    return (data != null) ? data : Content.content(getServletContext(), request, "Home");
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

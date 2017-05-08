package spacecolony;

import java.io.IOException;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@SuppressWarnings("serial")
public class ContentServlet extends HttpServlet {

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    String file = request.getPathInfo().replaceAll("/", "");
    if (file.length() == 0) {
      file = "Home";
    }

    response.setContentType("application/json; charset=utf-8");
    response.getWriter().append(Content.content(getServletContext(), request, file));
  }

}

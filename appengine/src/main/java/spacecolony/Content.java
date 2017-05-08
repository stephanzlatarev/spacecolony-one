package spacecolony;

import java.io.IOException;
import java.io.InputStream;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;

public class Content {

  static String file(ServletContext servlet, String file) throws IOException {
    InputStream stream = servlet.getResourceAsStream(file);

    if (stream != null) {
      byte[] buffer = new byte[10240];
      String data = "";
      for (int length = 0; (length = stream.read(buffer)) > 0;) {
        data += new String(buffer, 0, length, "UTF-8");
      }
      stream.close();
      return data;
    } else {
      return null;
    }
  }

  static String content(ServletContext servlet, HttpServletRequest request, String file) throws IOException {
    String lang = request.getHeader("X-AppEngine-Country");
    String content = null;

    if ("bg".equalsIgnoreCase(lang)) {
      content = file(servlet, "/assets/content/bg/" + file);
    }

    return (content != null) ? content : file(servlet, "/assets/content/en/" + file);
  }

}

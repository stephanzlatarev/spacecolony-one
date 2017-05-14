package spacecolony;

import java.io.IOException;
import java.util.Properties;

import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.googlecode.objectify.ObjectifyService;
import com.googlecode.objectify.cmd.Query;

@SuppressWarnings("serial")
public class ReportServlet extends HttpServlet {

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    Query<Prospect> query = ObjectifyService.ofy().load().type(Prospect.class).order("-timestamp").limit(3);

    String list = "";
    for (Prospect prospect: query.iterable()) {
      list += prospect.email + " " + prospect.country + "; ";
    }
    send(list);
  }

  private final void send(String message) throws IOException {
    try {
      Session session = Session.getDefaultInstance(new Properties(), null);
      MimeMessage msg = new MimeMessage(session);
      msg.setFrom(new InternetAddress("report@spacecolony-one.appspotmail.com", "Space Colony One"));
      msg.addRecipient(MimeMessage.RecipientType.TO, new InternetAddress("stephan.zlatarev@gmail.com", "Stephan Zlatarev"));
      msg.setSubject("Space Colony One Tickets");
      msg.setText(message);
      Transport.send(msg);
    } catch (MessagingException e) {
      throw new IOException(e);
    }
  }

}

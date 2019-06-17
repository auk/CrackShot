package stx.shooterstatistic.security;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.security.authentication.event.AuthenticationSuccessEvent;
import org.springframework.security.oauth2.provider.authentication.OAuth2AuthenticationDetails;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import stx.shooterstatistic.model.User;
import stx.shooterstatistic.services.UserService;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
public class LoginSuccessListener implements ApplicationListener<AuthenticationSuccessEvent> {

  private static Logger log = LoggerFactory.getLogger(LoginSuccessListener.class);

  private final UserService userService;

  @Autowired
  public LoginSuccessListener(UserService userService) {
    this.userService = userService;
  }

  @Override
  public synchronized void onApplicationEvent(AuthenticationSuccessEvent event) {
    Object dd = ((OAuth2AuthenticationDetails) event.getAuthentication().getDetails()).getDecodedDetails();
    String authUsername = event.getAuthentication().getName();
    if (dd == null) {
      return;
    }

    Optional<User> opNewUser = mapper(((Map<String, Object>) dd), authUsername);
    opNewUser.ifPresent(user -> {
      if (!userService.findUserByUsername(user.getUsername()).isPresent()) {
        try {
          userService.createUser(user);
          log.info("user: " + user.toString() + " was created successfully");
        } catch (Exception e) {
          e.printStackTrace();
          log.error(e.getMessage());
        }
      }
    });
  }

  private static String substringAfter(String str, String term) {
    return str.substring(str.indexOf(term) + term.length());
  }

  private Optional<User> mapper(Map<String, Object> map, String externalUsername) {
    String email = (String) map.get("email");
    String name = (String) map.get("name");
    String userName = externalUsername;
    if (StringUtils.isEmpty(userName)) {
      String user_name = (String) map.get("user_name");
      if (!StringUtils.isEmpty(user_name)) {
        userName = user_name;
      } else if (!StringUtils.isEmpty(externalUsername)) {
        userName = (String) map.get("username");
      }
    }
    String source = (String) map.get("source");

    if (StringUtils.isEmpty(userName)) {
      if (StringUtils.isEmpty(email)) {
        return Optional.empty();
      }
      userName = email;
    }

    List<String> roles = (List<String>) map.get("authorities");
    if (roles != null)
      roles = roles.stream().map(r -> substringAfter(r, "ROLE_")).collect(Collectors.toList());

    User user = new User(userName);

    if (!StringUtils.isEmpty(email)) {
      user.setEmail(email);
    }

    if (!StringUtils.isEmpty(name)) {
      user.setName(name);
    }

    if (!StringUtils.isEmpty(source)) {
      user.setSource(source);
    }

    user.setRoles(roles);

    return Optional.of(user);
  }
}

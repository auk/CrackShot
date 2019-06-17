package stx.shooterstatistic.tests;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import stx.shooterstatistic.model.User;
import stx.shooterstatistic.services.UserService;

import java.util.Collections;

@Component
public class TestUtils {
  @Value(value = "${stx.crackshot.admin_role:Undefined role}")
  String globalAdminRole;

  @Autowired
  UserService userService;

  final String adminUsername = "admin@startext.ru", fakeUsername = "fake@startext.ru";

  public User createAdminUser() {
    User user = userService.saveUser("test-admin", adminUsername);
    user.setRoles(Collections.singletonList(globalAdminRole));
    return user;
  }
}

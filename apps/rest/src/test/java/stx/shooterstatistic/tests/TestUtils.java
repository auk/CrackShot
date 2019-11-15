package stx.shooterstatistic.tests;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import stx.shooterstatistic.model.User;
import stx.shooterstatistic.interfaces.IUserService;

import java.util.Collections;

@Component
public class TestUtils {
  @Value(value = "${stx.crackshot.admin_role:Undefined role}")
  String globalAdminRole;

  @Autowired
  IUserService userService;

  final String adminEmail = "admin@startext.ru", fakeUsername = "fake@startext.ru";

  public User createGlobalAdminUser() {
    User user = userService.createUser("test-admin", adminEmail);
    user.setRoles(Collections.singletonList(globalAdminRole));
    return user;
  }

  public String getGlobalAdminEmail() {
    return adminEmail;
  }

  public User getGlobalAdminUser() {
    return userService.findUserByEmail(getGlobalAdminEmail()).orElseGet(() -> createGlobalAdminUser());
  }
}

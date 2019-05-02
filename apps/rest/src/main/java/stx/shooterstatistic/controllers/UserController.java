package stx.shooterstatistic.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import stx.shooterstatistic.model.User;
import stx.shooterstatistic.services.UserService;

import java.security.Principal;
import java.util.List;

@RestController
public class UserController {
  private final static Logger log = LoggerFactory.getLogger(UserController.class);

  @Autowired
  UserService userService;

  @GetMapping(value = "/users")
  List<User> getUsers(Principal principal, Pageable pageable) {
    return userService.getUsers();
  }
}

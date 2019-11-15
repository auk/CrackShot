package stx.shooterstatistic.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import stx.shooterstatistic.jpa.UserSearchCriteria;
import stx.shooterstatistic.model.SecurityContext;
import stx.shooterstatistic.model.User;
import stx.shooterstatistic.interfaces.ISecurityService;
import stx.shooterstatistic.interfaces.IUserService;

import java.security.Principal;
import java.util.Objects;

@RestController
public class UserController implements UserApi {
  private static final Logger log = LoggerFactory.getLogger(UserController.class);

  @Autowired
  IUserService userService;

  @Autowired
  ISecurityService securityService;

  @Override
  public Page<User> getUsers(Principal principal, UserSearchCriteria userSearchCriteria, Pageable pageable) {
    SecurityContext context = securityService.createContext(principal);
    return userService.getUsers(context, userSearchCriteria, pageable);
  }

  @Override
  public ResponseEntity<User> getCurrentUser(Principal principal) {
    return new ResponseEntity<>(userService.getUser(principal), HttpStatus.OK);
  }

  @Override
  public ResponseEntity<User> getUser(Principal principal, String uid) {
    SecurityContext context = securityService.createContext(principal);
    return ResponseEntity.ok(userService.getUserById(context, uid));
  }

  @Override
  public void deleteUser(Principal principal, String uid) {
    SecurityContext context = securityService.createContext(principal);
    User user = userService.getUserById(context, uid);
    userService.deleteUser(context, user);
  }

  @Override
  public ResponseEntity<User> updateUser(
     Principal principal,
     @PathVariable String uid,
     @RequestParam String name,
     @RequestParam String username,
     @RequestParam String email,
     @RequestParam String phone
     )
  {
    Objects.requireNonNull(name);
    Objects.requireNonNull(username);

    SecurityContext context = securityService.createContext(principal);
    User user = userService.getUserById(context, uid);
    user.setName(name);
    user.setUsername(username);
    user.setEmail(email);
    user.setPhone(phone);
    user = userService.saveUser(user);
    return ResponseEntity.ok(user);
  }
}
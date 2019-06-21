package stx.shooterstatistic.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import stx.shooterstatistic.exceptions.ResourceNotFoundException;
import stx.shooterstatistic.jpa.UserSearchCriteria;
import stx.shooterstatistic.model.SecurityContext;
import stx.shooterstatistic.model.User;
import stx.shooterstatistic.services.SecurityService;
import stx.shooterstatistic.services.UserService;

import java.security.Principal;
import java.util.Objects;
import java.util.Optional;

@RestController
public class UserController {
  private final static Logger log = LoggerFactory.getLogger(UserController.class);

  @Autowired
  UserService userService;

  @Autowired
  SecurityService securityService;

  @GetMapping(value = "/users")
  Page<User> getUsers(Principal principal,
    @RequestParam(required = false) UserSearchCriteria userSearchCriteria,
    @PageableDefault(sort = {"name"}, direction = Sort.Direction.DESC) Pageable pageable
  ) {
    SecurityContext context = securityService.createContext(principal);
    return userService.getUsers(context, userSearchCriteria, pageable);
  }

  // return current user
  @GetMapping(value = "/user")
  public ResponseEntity<User> getUser(Principal principal) {
    return new ResponseEntity<>(userService.getUser(principal), HttpStatus.OK);
  }

  @DeleteMapping(value = "/user/{uid}")
  public void deleteUser(
     Principal principal,
     @PathVariable String uid) {
    SecurityContext context = securityService.createContext(principal);
    User user = userService.getUserById(context, uid);
    userService.deleteUser(context, user);
  }

  @PutMapping(value = "/user/{uid}")
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
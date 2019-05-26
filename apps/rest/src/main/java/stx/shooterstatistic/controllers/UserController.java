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
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import stx.shooterstatistic.exceptions.ResourceNotFoundException;
import stx.shooterstatistic.jpa.UserSearchCriteria;
import stx.shooterstatistic.model.SecurityContext;
import stx.shooterstatistic.model.User;
import stx.shooterstatistic.services.SecurityService;
import stx.shooterstatistic.services.UserService;

import java.security.Principal;
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

  @GetMapping(value = "/user")
  public ResponseEntity<User> getUser(Principal principal) {
    Optional<User> opUser = userService.findUser(principal);
    if (!opUser.isPresent())
      throw new ResourceNotFoundException("User", principal.getName());
    return new ResponseEntity<>(opUser.get(), HttpStatus.OK);
  }
}

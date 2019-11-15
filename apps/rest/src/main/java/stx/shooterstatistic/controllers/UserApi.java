package stx.shooterstatistic.controllers;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import stx.shooterstatistic.jpa.UserSearchCriteria;
import stx.shooterstatistic.model.User;

import java.security.Principal;

public interface UserApi {
  @GetMapping(value = "/users")
  Page<User> getUsers(
     Principal principal,
     @RequestParam(required = false) UserSearchCriteria userSearchCriteria,
     @PageableDefault(sort = {"name"}, direction = Sort.Direction.DESC) Pageable pageable
  );

  // return current user
  @GetMapping(value = "/user")
  ResponseEntity<User> getCurrentUser(Principal principal);

  @GetMapping(value = "/user/{uid}")
  ResponseEntity<User> getUser(Principal principal, @PathVariable String uid);

  @DeleteMapping(value = "/user/{uid}")
  void deleteUser(Principal principal, @PathVariable String uid);

  @PutMapping(value = "/user/{uid}")
  ResponseEntity<User> updateUser(
     Principal principal,
     @PathVariable String uid,
     @RequestParam String name,
     @RequestParam String username,
     @RequestParam String email,
     @RequestParam String phone
  );

}

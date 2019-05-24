package stx.shooterstatistic.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import stx.shooterstatistic.exceptions.ResourceNotFoundException;
import stx.shooterstatistic.jpa.UserRepository;
import stx.shooterstatistic.jpa.UserSearchCriteria;
import stx.shooterstatistic.model.SecurityContext;
import stx.shooterstatistic.model.User;

import javax.validation.constraints.NotNull;
import java.security.Principal;
import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class UserService {

  @Autowired
  UserRepository userRepository;

  @NotNull
  public User createUser(@NotNull String login) {
    User user = new User(login);
    return userRepository.save(user);
  }

  @NotNull
  public User createUser(@NotNull String login, @NotNull String email) {
    User user = new User(login);
    user.setEmail(email);
    return userRepository.save(user);
  }

  @NotNull
  public User createUser(User user) {
    Objects.requireNonNull(user);
//    checkUserExist(user.getUsername());
    return userRepository.save(user);
  }

  public void deleteUser(@NotNull SecurityContext context, User user) {
    Objects.requireNonNull(context);
    Objects.requireNonNull(user);
    userRepository.delete(user);
  }

  public Optional<User> findUser(@NotNull Principal principal) {
    Objects.requireNonNull(principal);
    return findUserByUsername(principal.getName());
  }

  public Optional<User> findUserByEmail(@NotNull String email) {
    return userRepository.findByEmail(email);
  }

  public Optional<User> findUserById(SecurityContext context, @NotNull String id) {
    return userRepository.findById(id);
  }

  public Optional<User> findUserByUsername(String username) {
    return userRepository.findByUsername(username);
  }

  public User getUser(@NotNull Principal principal) {
    return findUser(principal).orElseThrow(() -> new ResourceNotFoundException("User", principal.getName()));
  }

  public Page<User> getUsers(SecurityContext context, UserSearchCriteria userSearchCriteria, Pageable pageable) {
    return userRepository.findAll(pageable);
  }
}

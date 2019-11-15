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
import stx.shooterstatistic.interfaces.IUserService;
import stx.shooterstatistic.interfaces.ISecurityService;

import javax.validation.constraints.NotNull;
import java.security.Principal;
import java.util.Objects;
import java.util.Optional;

@Service
public class UserServiceImpl implements IUserService {

  @Autowired
  ISecurityService securityService;

  @Autowired
  UserRepository userRepository;

  @Override
  @NotNull public User createUser(@NotNull String login) {
    User user = new User(login);
    return userRepository.save(user);
  }

  @Override
  @NotNull public User createUser(@NotNull String login, @NotNull String email) {
    User user = new User(login);
    user.setEmail(email);
    return userRepository.save(user);
  }

  @Override
  @NotNull public User saveUser(User user) {
    Objects.requireNonNull(user);
//    checkUserExist(user.getUsername());
    return userRepository.save(user);
  }

  @Override
  public void deleteUser(@NotNull SecurityContext context, User user) {
    Objects.requireNonNull(context);
    Objects.requireNonNull(user);

    securityService.checkGlobalAdmin(context);
    userRepository.delete(user);
  }

  @Override
  public Optional<User> findUser(@NotNull Principal principal) {
    Objects.requireNonNull(principal);
    return findUserByUsername(principal.getName());
  }

  @Override
  public Optional<User> findUserByEmail(@NotNull String email) {
    return userRepository.findByEmail(email);
  }

  @Override
  public Optional<User> findUserById(SecurityContext context, @NotNull String id) {
    return userRepository.findById(id);
  }

  @Override
  public Optional<User> findUserByUsername(String username) {
    return userRepository.findByUsername(username);
  }

  @Override
  public User getUser(@NotNull Principal principal) {
    return findUser(principal).orElseThrow(() -> new ResourceNotFoundException("User", principal.getName()));
  }

  @Override
  public Page<User> getUsers(SecurityContext context, UserSearchCriteria userSearchCriteria, Pageable pageable) {
    return userRepository.findAll(pageable);
  }

  @Override
  @NotNull public User getUserById(@NotNull SecurityContext context, @NotNull String id) {
    return findUserById(context, id).orElseThrow(() -> new ResourceNotFoundException("User", id));
  }
}

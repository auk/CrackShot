package stx.shooterstatistic.interfaces;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import stx.shooterstatistic.jpa.UserSearchCriteria;
import stx.shooterstatistic.model.SecurityContext;
import stx.shooterstatistic.model.User;

import javax.validation.constraints.NotNull;
import java.security.Principal;
import java.util.Optional;

public interface IUserService {
  @NotNull User createUser(@NotNull String login);
  @NotNull User createUser(@NotNull String login, @NotNull String email);
  void deleteUser(@NotNull SecurityContext context, User user);
  Optional<User> findUser(@NotNull Principal principal);
  Optional<User> findUserByEmail(@NotNull String email);
  Optional<User> findUserById(SecurityContext context, @NotNull String id);
  Optional<User> findUserByUsername(String username);
  @NotNull User getUser(@NotNull Principal principal);
  @NotNull User getUserById(@NotNull SecurityContext context, @NotNull String id);
  Page<User> getUsers(SecurityContext context, UserSearchCriteria userSearchCriteria, Pageable pageable);
  @NotNull User saveUser(User user);
}
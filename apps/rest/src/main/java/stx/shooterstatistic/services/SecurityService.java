package stx.shooterstatistic.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import stx.shooterstatistic.model.Organization;
import stx.shooterstatistic.model.Permission;
import stx.shooterstatistic.model.SecurityContext;
import stx.shooterstatistic.model.User;

import javax.validation.constraints.NotNull;
import java.security.Principal;
import java.text.MessageFormat;
import java.util.Objects;

@Service
public class SecurityService {
  private final static String FORMAT_HasAccessException = "User ''{0}'' has no access to object ''{1}''";

  @Autowired
  UserService userService;

  @Value(value = "${stx.crackshot.admin_role:Crackshot admin}")
  String globalAdminRole;

  public SecurityContext createContext(@NotNull User user) {
    Objects.requireNonNull(user);
    return SecurityContext.create(user);
  }

  public SecurityContext createContext(@NotNull Principal principal) {
    Objects.requireNonNull(principal);
    return SecurityContext.create(userService.getUser(principal));
  }

  void checkHasAccess(SecurityContext context, Organization organization, Permission permission) {
    assert (context != null);
    if (!hasAccess(context, organization, permission))
      throw new SecurityException(MessageFormat.format(FORMAT_HasAccessException, context.getUser(), organization));
  }

  public String getGlobalAdminRole() {
    return globalAdminRole;
  }

  public boolean hasAccess(@NotNull SecurityContext context, @NotNull Organization organization, Permission permission) {
    Objects.requireNonNull(context);
//    Objects.requireNonNull(organization);

    // auk: TODO
    return true;
  }

  public void checkGlobalAdmin(@NotNull SecurityContext context) {
    if (!isGlobalAdmin(context))
      throw new SecurityException(MessageFormat.format("Access denied. User is not in global admin role ''{0}''. User roles:\r\n{1}", globalAdminRole, context.getUser().getRoles()));
  }

  public boolean isGlobalAdmin(@NotNull SecurityContext context) {
    return globalAdminRole != null && context.getUser().getRoles() != null && context.getUser().getRoles().contains(globalAdminRole);
  }

  public boolean isGlobalAdmin(@NotNull User user) {
    return globalAdminRole != null && user.getRoles() != null && user.getRoles().contains(globalAdminRole);
  }


}

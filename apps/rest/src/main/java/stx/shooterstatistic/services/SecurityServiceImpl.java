package stx.shooterstatistic.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import stx.shooterstatistic.model.Organization;
import stx.shooterstatistic.model.Permission;
import stx.shooterstatistic.model.SecurityContext;
import stx.shooterstatistic.model.User;
import stx.shooterstatistic.interfaces.ISecurityService;
import stx.shooterstatistic.interfaces.IUserService;

import javax.validation.constraints.NotNull;
import java.security.Principal;
import java.text.MessageFormat;
import java.util.Objects;

@Service
public class SecurityServiceImpl implements ISecurityService {
  private static final String FORMAT_HasAccessException = "User ''{0}'' has no access to object ''{1}''";

  @Autowired
  IUserService userService;

  @Value(value = "${stx.crackshot.admin_role:Crackshot admin}")
  String globalAdminRole;

  @Override
  public SecurityContext createContext(@NotNull User user) {
    Objects.requireNonNull(user);
    return SecurityContext.create(user);
  }

  @Override
  public SecurityContext createContext(@NotNull Principal principal) {
    Objects.requireNonNull(principal);
    return SecurityContext.create(userService.getUser(principal));
  }

  @Override
  public void checkHasAccess(SecurityContext context, Organization organization, Permission permission) {
    assert (context != null);
    if (!hasAccess(context, organization, permission))
      throw new SecurityException(MessageFormat.format(FORMAT_HasAccessException, context.getUser(), organization));
  }

  @Override
  public String getGlobalAdminRole() {
    return globalAdminRole;
  }

  @Override
  public boolean hasAccess(@NotNull SecurityContext context, @NotNull Organization organization, Permission permission) {
    Objects.requireNonNull(context);
//    Objects.requireNonNull(organization);

    // auk: TODO
    return true;
  }

  @Override
  public void checkGlobalAdmin(@NotNull SecurityContext context) {
    if (!isGlobalAdmin(context))
      throw new SecurityException(MessageFormat.format("Access denied. User is not in global admin role ''{0}''. User roles:\r\n{1}", globalAdminRole, context.getUser().getRoles()));
  }

  @Override
  public boolean isGlobalAdmin(@NotNull SecurityContext context) {
    Objects.requireNonNull(context);
    return globalAdminRole != null && context.getUser().getRoles() != null && context.getUser().getRoles().contains(globalAdminRole);
  }

  @Override
  public boolean isGlobalAdmin(@NotNull User user) {
    return globalAdminRole != null && user.getRoles() != null && user.getRoles().contains(globalAdminRole);
  }


}

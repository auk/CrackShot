package stx.shooterstatistic.interfaces;

import stx.shooterstatistic.model.Organization;
import stx.shooterstatistic.model.Permission;
import stx.shooterstatistic.model.SecurityContext;
import stx.shooterstatistic.model.User;

import java.security.Principal;

public interface ISecurityService {
  SecurityContext createContext(User user);
  SecurityContext createContext(Principal principal);
  void checkHasAccess(SecurityContext context, Organization organization, Permission permission);
  String getGlobalAdminRole();
  boolean hasAccess(SecurityContext context, Organization organization, Permission permission);
  void checkGlobalAdmin(SecurityContext context);
  boolean isGlobalAdmin(SecurityContext context);
  boolean isGlobalAdmin(User user);
}
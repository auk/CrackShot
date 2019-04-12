package stx.shooterstatistic.jpa;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import stx.shooterstatistic.model.User;

import javax.validation.constraints.NotNull;
import java.util.Optional;

@RepositoryRestResource(exported = false)
public interface UserRepository extends JpaRepository<User, String> {
  Optional<User> findByEmail(@NotNull String email);
  Optional<User> findByUsername(@NotNull String email);
}

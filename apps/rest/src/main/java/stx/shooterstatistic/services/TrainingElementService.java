package stx.shooterstatistic.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import stx.shooterstatistic.exceptions.ResourceAlreadyExistsException;
import stx.shooterstatistic.exceptions.ResourceNotFoundException;
import stx.shooterstatistic.jpa.TrainingElementRepository;
import stx.shooterstatistic.model.SecurityContext;
import stx.shooterstatistic.model.TrainingElement;

import javax.validation.constraints.NotNull;
import java.util.Objects;
import java.util.Optional;

@Service
public class TrainingElementService {
  @Autowired
  TrainingElementRepository trainingElementRepository;

  @Autowired
  SecurityService securityService;

  @NotNull
  public TrainingElement create(@NotNull SecurityContext context, @NotNull String name) {
    securityService.checkGlobalAdmin(context);

    trainingElementRepository.findByName(name).ifPresent(el -> {
      throw new ResourceAlreadyExistsException(TrainingElement.class.getName(), name);
    });

    TrainingElement el = new TrainingElement(name);
    return trainingElementRepository.save(el);
  }

  public void delete(@NotNull SecurityContext context, @NotNull String id) {
    securityService.checkGlobalAdmin(context);
    TrainingElement el = get(id);
    trainingElementRepository.delete(el);
  }

  public Optional<TrainingElement> find(@NotNull String id) {
    return trainingElementRepository.findById(id);
  }

  @NotNull
  public TrainingElement get(@NotNull String id) {
    return trainingElementRepository
       .findById(id)
       .orElseThrow(() -> new ResourceNotFoundException(TrainingElement.class.getName(), id));
  }

  @NotNull
  public Page<TrainingElement> all(@NotNull Pageable pageable) {
    return trainingElementRepository.findAll(pageable);
  }

  public TrainingElement save(@NotNull SecurityContext context, @NotNull TrainingElement trainingElement) {
    Objects.requireNonNull(context);

    securityService.checkGlobalAdmin(context);

    Objects.requireNonNull(trainingElement);
    return trainingElementRepository.save(trainingElement);
  }
}

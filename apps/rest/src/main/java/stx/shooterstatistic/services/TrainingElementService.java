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

@Service
public class TrainingElementService {
  @Autowired
  TrainingElementRepository trainingElementRepository;

  @Autowired
  SecurityService securityService;

  @NotNull
  public TrainingElement create(@NotNull SecurityContext context, @NotNull String name) {
//    securityService.checkGlobalAdmin(context);

    trainingElementRepository.findByName(name).ifPresent(el -> {
      throw new ResourceAlreadyExistsException(TrainingElement.class.getName(), name);
    });

    TrainingElement el = new TrainingElement(name);
    return trainingElementRepository.save(el);
  }

  public void delete(@NotNull SecurityContext context, @NotNull String id) {
    securityService.checkGlobalAdmin(context);
    TrainingElement el = get(context, id);
    trainingElementRepository.delete(el);
  }

  @NotNull
  public TrainingElement get(@NotNull SecurityContext context, @NotNull String id) {
    securityService.checkGlobalAdmin(context);
    return trainingElementRepository
       .findById(id)
       .orElseThrow(() -> new ResourceNotFoundException(TrainingElement.class.getName(), id));
  }

  @NotNull
  public Page<TrainingElement> all(SecurityContext context, @NotNull Pageable pageable) {
    return trainingElementRepository.findAll(pageable);
  }
}

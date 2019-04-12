package stx.shooterstatistic.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Training extends AbstractEntity {
  LocalDate date;

//  @Column(name = "ORGANIZATION_ID")
  private String organizationId;

  @JsonIgnore
  @OneToMany(mappedBy = "trainingId", fetch = FetchType.LAZY)
  private List<Stage> stages = new ArrayList<>(0);

  @ManyToMany
  List<User> shooters;

  List<Stage> getStages() {
    return stages;
  }
}

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

  private String organizationId;

  LocalDate date;

//  @Column(name = "ORGANIZATION_ID")

  @JsonIgnore
  @OneToMany(mappedBy = "trainingId", fetch = FetchType.LAZY)
  private List<Stage> stages = new ArrayList<>(0);

  @ManyToMany
  List<User> users;

  List<Stage> getStages() {
    return stages;
  }
}

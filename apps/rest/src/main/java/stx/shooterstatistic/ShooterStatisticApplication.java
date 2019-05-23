package stx.shooterstatistic;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.oauth2.client.EnableOAuth2Sso;
import org.springframework.context.annotation.Bean;
import stx.shooterstatistic.jpa.OrganizationRepository;
import stx.shooterstatistic.jpa.UserRepository;
import stx.shooterstatistic.model.Organization;
import stx.shooterstatistic.model.SecurityContext;
import stx.shooterstatistic.model.User;
import stx.shooterstatistic.services.OrganizationService;
import stx.shooterstatistic.services.UserService;

import javax.annotation.PostConstruct;

@SpringBootApplication
@EnableOAuth2Sso
public class ShooterStatisticApplication {
  
  private static final Logger log = LoggerFactory.getLogger(ShooterStatisticApplication.class);

  @Value("${spring.datasource.driverClassName:JDBC driver is not specified.}")
  String jdbcDriver;

  @Value("${spring.datasource.url:JDBC driver is not specified.}")
  String jdbcUrl;

  @Value("${spring.jpa.database-platform:JDBC platform is not specified.}")
  String jdbcPlatform;

  @Value("${spring.jpa.hibernate.ddl-auto:Hibernate DDL-auto is not specified.}")
  String jdbcDDLAuto;

  @Value("${spring.datasource.username:JDBC username is not specified.}")
  String jdbcUsername;

  public static void main(String[] args) {
    SpringApplication.run(ShooterStatisticApplication.class, args);
  }

  @PostConstruct
  public void dumpConfig() {
    log.info("* Config service - JDBC driver: {}", jdbcDriver);
    log.info("* Config service - JDBC URL: {}", jdbcUrl);
    log.info("* Config service - JDBC platform: {}", jdbcPlatform);
    log.info("* Config service - JDBC DDL-auto: {}", jdbcDDLAuto);
    log.info("* Config service - JDBC username: {}", jdbcUsername);
  }

  @Value("${stx.rest.admin.email:admin@startext.ru}")
  String adminEmail = "auk@startext.ru";

  @Value("${stx.rest.admin.username:admin}")
  String adminUsername = "admin";

  @Autowired
  OrganizationService organizationService;

  @Autowired
  OrganizationRepository organizationRepository;

  @Autowired
  UserRepository userRepository;

  @Autowired
  UserService userService;

  @Bean
  public synchronized InitializingBean insertDefaultUsers() {
    return () -> {
      User user = userRepository.findByEmail(adminEmail).orElseGet(() -> userService.createUser(adminUsername, adminEmail));
      if (organizationRepository.count() == 0) {
        Organization org = organizationService.createOrganization(user, "Initial organization");
        org.setAddress("Russia, Tomsk, 63400\r\nLenina av. 111");
        org.setEmail("org@ipsc.ru");
        org.setPhone("+7 (495) 111-2222");
        org.setWeb("http://ipsc.ru");

        organizationRepository.save(org);
      }
    };
  }
}

package stx.shooterstatistic;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import javax.annotation.PostConstruct;

@SpringBootApplication
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
}

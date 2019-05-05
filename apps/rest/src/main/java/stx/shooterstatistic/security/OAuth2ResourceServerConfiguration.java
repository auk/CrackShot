package stx.shooterstatistic.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.security.oauth2.provider.token.DefaultAccessTokenConverter;
import org.springframework.security.oauth2.provider.token.TokenStore;
import org.springframework.security.oauth2.provider.token.store.JwtAccessTokenConverter;
import org.springframework.security.oauth2.provider.token.store.JwtTokenStore;

import java.util.Map;

@Configuration
@EnableResourceServer
public class OAuth2ResourceServerConfiguration extends ResourceServerConfigurerAdapter {

  @Autowired
  private JwtAccessTokenConverter jwtAccessTokenConverter;

  @Override
  public void configure(HttpSecurity http) throws Exception {
    super.configure(http);
    // @formatter:off
      http
        .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.NEVER)
        .and()
          .requestMatchers().antMatchers("/**")
        .and()
          .authorizeRequests()
            .antMatchers(HttpMethod.OPTIONS, "/**").permitAll()
            .antMatchers(HttpMethod.GET, "/**").access("#oauth2.hasScope('read')")
            .antMatchers(HttpMethod.PATCH, "/**").access("#oauth2.hasScope('write')")
            .antMatchers(HttpMethod.POST, "/**").access("#oauth2.hasScope('write')")
            .antMatchers(HttpMethod.PUT, "/**").access("#oauth2.hasScope('write')")
            .antMatchers(HttpMethod.DELETE, "/**").access("#oauth2.hasScope('write')")
            .antMatchers("/admin/**").access("hasRole('ROLE_ADMIN')");
      // @formatter:on
  }

  @Bean
  public DefaultAccessTokenConverter defaultAccessTokenConverter() {
    return new DefaultAccessTokenConverter() {
      @Override
      public OAuth2Authentication extractAuthentication(Map<String, ?> map) {
        OAuth2Authentication authentication = super.extractAuthentication(map);
        authentication.setDetails(map);
        return authentication;
      }
    };
  }

  @Bean
  public TokenStore tokenStore() {
    jwtAccessTokenConverter.setAccessTokenConverter(defaultAccessTokenConverter());
    return new JwtTokenStore(jwtAccessTokenConverter);
  }
}

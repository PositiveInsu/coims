package ca.joyfactory.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;

/**
 * Created by Joinsu on 2017-03-16.
 */
@Configuration
@EnableWebSecurity
@Order(SecurityProperties.ACCESS_OVERRIDE_ORDER)
public class SecurityConfig extends WebSecurityConfigurerAdapter{
    Logger logger = LoggerFactory.getLogger( SecurityConfig.class);

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        logger.info( "Security Config Class");

        http
            .authorizeRequests()
                .antMatchers("/", "/*.js", "/*.map", "/assets/**").permitAll()
                .anyRequest().denyAll()
                .and()
            .formLogin()
                .loginPage("/");


//                .csrf()
//                    .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
//                    .and()
//                .httpBasic()
//                    .and()
//                .authorizeRequests()
//                    .antMatchers("/css/**", "/js/**", "/libs/**", "/html/**").permitAll()
//                    .antMatchers( "/", "/login", "/index.html").permitAll()
//                    .anyRequest().anonymous();

        super.configure(http);
    }
}

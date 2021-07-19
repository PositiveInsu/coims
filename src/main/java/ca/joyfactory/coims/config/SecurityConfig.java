package ca.joyfactory.coims.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;

/**
 * Created by Joinsu on 2017-03-16.
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter{

    Logger logger = LoggerFactory.getLogger( SecurityConfig.class);


    @Autowired
    private UserDetailsService userDetailsService;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService( userDetailsService).passwordEncoder( passwordEncoder());
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .formLogin()
                .loginPage( "/")
                .permitAll()
            .and()
                .csrf()
                    .csrfTokenRepository( CookieCsrfTokenRepository.withHttpOnlyFalse())
            .and()
                .authorizeRequests()
                    .antMatchers("/", "/*.js", "/*.map", "/assets/**").permitAll()
                    .antMatchers("/public/**").permitAll()
                    .antMatchers("/main/**").hasRole( "USER")
                    .anyRequest().denyAll()
            .and()
                .logout()
                .logoutSuccessUrl( "/").permitAll()
                .invalidateHttpSession( true);

        super.configure(http);
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder(16);
    }
}

package ca.joyfactory.coims.security;

import ca.joyfactory.coims.domain.*;
import ca.joyfactory.coims.service.RoleService;
import ca.joyfactory.coims.service.UserService;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.junit4.SpringRunner;

import javax.transaction.Transactional;
import java.util.Date;

/**
 * Created by Joinsu on 2018-04-08.
 */
@RunWith( SpringRunner.class)
@SpringBootTest
@Transactional
public class UserDetailsServiceImplTest {

    @Autowired
    UserDetailsService userDetailsService;

    @Autowired
    UserService userService;

    @Autowired
    RoleService roleService;

    @Autowired
    PasswordEncoder passwordEncoder;

    private User user;
    private Company company;

    @Before
    public void setup(){
        setupMockUser();
    }

    private void setupMockUser() {
        user =  new User();
        company  = new Company();

        company.setName( "JC WINs");
        company.setStreet( "76 Baylor Ave");
        company.setCity( "Winnipeg");
        company.setProvince( "MB");
        company.setCountry( "CA");
        company.setEmail( "test@coims.com");
        company.setCreatedDate( new Date());
        company.setLastModifiedDate( new Date());
        company.setWebsite( "jcwins.com");
        company.setPhone( "204-942-7065");
        company.setPostal( "R3Y 1Y1");

        user.setEmail( "jc@jcwins.com");
        user.setfName( "INSU");
        user.setlName("JO");
        user.setPassword( "testPassword1!");
        user.setMemberId( "R1234567");
        user.setCreatedDate( new Date());
        user.setLastModifiedDate( new Date());
        user.setType(UserType.MANAGER);
        user.setStatus(UserStatus.PENDING);
        user.setCompany( company);
        user.setRole( roleService.findRole( RoleType.ADMIN));

        userService.addUser( this.user);
    }

    @Test(expected = UsernameNotFoundException.class)
    public void loadUserByUsername_getUsernameNotFoundException(){

        // Given
        String userEmail = "nothing";

        // When
        userDetailsService.loadUserByUsername( userEmail);

        // Then
        Assert.fail( "Must get NoResultException.");
    }

    @Test
    public void loadUserByUsername_getUser(){

        // Given
        String userEmail = "jc@jcwins.com";

        // When
        UserDetails user = userDetailsService.loadUserByUsername( userEmail);

        // Then
        Assert.assertEquals( userEmail, user.getUsername());

    }
}
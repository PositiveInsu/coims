package ca.joyfactory.coims.service;

import ca.joyfactory.coims.domain.Role;
import ca.joyfactory.coims.domain.RoleType;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import javax.transaction.Transactional;

import java.util.List;

/**
 * Created by Joinsu on 2017-10-17.
 */
@RunWith( SpringRunner.class)
@SpringBootTest
@Transactional
public class RoleServiceTest {

    @Autowired
    RoleService roleService;

    @Test
    public void findRole(){
        // Given
        RoleType adminRole = RoleType.ADMIN;

        // When
        List<Role> foundRole = roleService.findRoles( adminRole);

        // Then
        Assert.assertEquals( adminRole, foundRole.get( 0).getRole());
    }
}
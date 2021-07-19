package ca.joyfactory.coims.service;

import ca.joyfactory.coims.common.TestDomain;
import ca.joyfactory.coims.domain.Company;
import ca.joyfactory.coims.domain.RoleType;
import ca.joyfactory.coims.domain.User;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.junit4.SpringRunner;

import javax.transaction.Transactional;

import java.util.List;

import static org.hamcrest.Matchers.hasProperty;
import static org.hamcrest.core.Is.is;
import static org.hamcrest.core.IsCollectionContaining.hasItem;
import static org.junit.Assert.assertThat;

/**
 * Created by Joinsu on 2018-08-10.
 */
@RunWith( SpringRunner.class)
@SpringBootTest
@Transactional
public class CompanyServiceTest {

    @Autowired
    CompanyService companyService;

    @Autowired
    UserService userService;

    @Autowired
    RoleService roleService;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Before
    public void setup(){
        setupMockCompany();
    }

    private void setupMockCompany() {
        User consultant = TestDomain.getTestConsultant();
        consultant.setRole( roleService.findRole( RoleType.ADMIN));

        deletePreviousUser( consultant.getEmail());

        User insertedUser = userService.addUser( consultant);

        User staff = TestDomain.getTestStaff();
        staff.setRole( roleService.findRole( RoleType.USER));
        staff.setCompany( insertedUser.getCompany());

        userService.addUser( staff);
    }

    private void deletePreviousUser(String email) {
        User foundUser = userService.findUserByEmail( email);
        if( foundUser != null){
            userService.deleteUserById( foundUser.getId());
        }

    }

    @Test
    public void getCompanyUser_success(){
        // Given
        String companyName = TestDomain.getTestCompany().getName();

        // When
        Company company = companyService.findByName( companyName);

        // Then
        List<User> users = company.getUsers();

        assertThat( users.size(), is( 2));
        assertThat( users, hasItem( hasProperty("email", is( TestDomain.getTestStaff().getEmail()))));
        assertThat( users, hasItem( hasProperty("email", is( TestDomain.getTestConsultant().getEmail()))));
    }
}
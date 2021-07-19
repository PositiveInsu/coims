package ca.joyfactory.coims.service;

import ca.joyfactory.coims.common.TestDomain;
import ca.joyfactory.coims.domain.RoleType;
import ca.joyfactory.coims.domain.User;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import javax.transaction.Transactional;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.core.IsNot.not;
import static org.junit.Assert.*;

/**
 * Created by Joinsu on 2018-12-13.
 */
@RunWith( SpringRunner.class)
@SpringBootTest
@Transactional
public class CaseNoServiceTest {

    @Autowired
    RoleService roleService;

    @Autowired
    UserService userService;

    @Autowired
    CaseNoService caseNoService;

    User defaultUser;

    @Before
    public void setup(){
        setupMockUser();
    }

    @SuppressWarnings("Duplicates")
    private void setupMockUser() {
        User user = TestDomain.getTestConsultant();
        user.setRole( roleService.findRole( RoleType.ADMIN));

        deleteExistUser( TestDomain.getTestConsultant().getEmail());
        deleteExistUser( TestDomain.getTestStaff().getEmail());

        this.defaultUser = userService.addUser( user);
        this.caseNoService.addNewCaseNo( this.defaultUser.getCompany().getId());
    }

    private void deleteExistUser( String email) {
        User foundUser = userService.findUserByEmail( email);
        if( foundUser != null){
            userService.deleteUserById( foundUser.getId());
        }
    }

    @Test
    public void getUniqueCaseNo_success(){
        // Given
        long companyId = this.defaultUser.getCompany().getId();

        this.caseNoService.addNewCaseNo( companyId);
        this.caseNoService.addNewCaseNo( companyId);

        // When
        String caseNo1 = this.caseNoService.getUniqueCaseNo( companyId);
        String caseNo2 = this.caseNoService.getUniqueCaseNo( companyId);

        // Then
        assertThat( caseNo1, is( not( caseNo2)));
        assertThat( caseNo1, is( "00000001"));
        assertThat( caseNo2, is( "00000002"));
    }
}























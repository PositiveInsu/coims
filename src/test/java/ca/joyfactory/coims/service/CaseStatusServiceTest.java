package ca.joyfactory.coims.service;

import ca.joyfactory.coims.common.TestDomain;
import ca.joyfactory.coims.domain.CaseStatus;
import ca.joyfactory.coims.domain.CaseStatusType;
import ca.joyfactory.coims.domain.RoleType;
import ca.joyfactory.coims.domain.User;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import javax.transaction.Transactional;
import java.util.List;

import static org.hamcrest.Matchers.greaterThan;
import static org.hamcrest.core.Is.is;
import static org.junit.Assert.assertThat;


/**
 * Created by Joinsu on 2018-12-13.
 */
@RunWith( SpringRunner.class)
@SpringBootTest
@Transactional
public class CaseStatusServiceTest {
    @Autowired
    RoleService roleService;

    @Autowired
    UserService userService;

    @Autowired
    CaseStatusService caseStatusService;

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
    }

    private void deleteExistUser( String email) {
        User foundUser = userService.findUserByEmail( email);
        if( foundUser != null){
            userService.deleteUserById( foundUser.getId());
        }
    }

    @Test
    public void findDefaultCaseStatus_success(){

        // Given
        CaseStatusType statusType = CaseStatusType.COMMON;

        // When
        List<CaseStatus> caseStatusList = caseStatusService.findCaseStatus( statusType);

        // Then
        assertThat( caseStatusList.size(), is( 9));
    }

    @Test
    public void findFirstCaseStatus_success(){

        // Given
        CaseStatusType statusType = CaseStatusType.COMMON;

        // When
        CaseStatus caseStatus = caseStatusService.findFirstCaseStatus( statusType);

        // Then
        assertThat( caseStatus.getStepNo(), is( 1));
    }

    @Test
    public void findNextCaseStatus_success(){

        // Given
        CaseStatusType statusType = CaseStatusType.COMMON;
        CaseStatus caseStatus = caseStatusService.findFirstCaseStatus( statusType);

        // When
        CaseStatus nextStatus = caseStatusService.findNextStatus( caseStatus);

        // Then
        assertThat( nextStatus.getStepNo(), is( caseStatus.getStepNo() + 1));
    }

    @Test
    public void findAllCaseStatus_success(){

        // Given

        // When
        List<CaseStatus> caseStatusList = caseStatusService.findAllCaseStatus();

        // Then
        assertThat( caseStatusList.size(), greaterThan( 1));
    }

    @Test
    public void findAllCaseStatusByType_success(){
        // Given
        CaseStatusType statusType = CaseStatusType.COMMON;

        // When
        List<CaseStatus> caseStatusList = caseStatusService.findAllCaseStatusByType( statusType);

        // Then
        assertThat( caseStatusList.get( 0), is( statusType));
    }
}
























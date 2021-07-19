package ca.joyfactory.coims.service;

import ca.joyfactory.coims.common.TestDomain;
import ca.joyfactory.coims.domain.*;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import javax.transaction.Transactional;
import java.util.List;

import static org.hamcrest.Matchers.is;
import static org.junit.Assert.assertThat;

/**
 * Created by Joinsu on 2018-11-21.
 */
@RunWith( SpringRunner.class)
@SpringBootTest
@Transactional
public class CaseTypeFeeServiceTest {

    @Autowired
    CaseTypeFeeService caseTypeFeeService;

    @Autowired
    CaseTypeService caseTypeService;


    @Autowired
    RoleService roleService;

    @Autowired
    UserService userService;

    private User defaultUser;

    private List<CaseTypeFee> defaultCaseTypeFeeList;

    @Before
    public void setup(){
        setupMockUser();
    }

    private void setupMockUser() {
        User user = TestDomain.getTestConsultant();
        user.setRole( roleService.findRole( RoleType.ADMIN));

        deleteExistUser( TestDomain.getTestConsultant().getEmail());
        deleteExistUser( TestDomain.getTestStaff().getEmail());

        this.defaultUser = userService.addUser( user);
        long companyId = this.defaultUser.getCompany().getId();
        caseTypeFeeService.addDefaultCaseTypeFeeList( companyId);
    }

    private void deleteExistUser( String email) {
        User foundUser = userService.findUserByEmail( email);
        if( foundUser != null){
            userService.deleteUserById( foundUser.getId());
        }
    }

    @Test
    public void setNewCaseTypeFee_success(){
        // Given
        long companyId = this.defaultUser.getCompany().getId();

        // When
        this.defaultCaseTypeFeeList = caseTypeFeeService.addDefaultCaseTypeFeeList( companyId);

        // Then
        assertThat( defaultCaseTypeFeeList.size(), is( caseTypeService.findDefaultUsingCaseTypeList().size()));
    }

    @Test
    public void findDefaultCaseTypeFeeList(){
        // Given
        long companyId = this.defaultUser.getCompany().getId();

        // When
        List<CaseTypeFee> caseTypeFeeList = caseTypeFeeService.findCaseTypeFeeList( companyId);

        // Then
        assertThat( caseTypeFeeList.size(), is( caseTypeService.findDefaultUsingCaseTypeList().size()));
    }

    @Test
    public void updateCaseTypeFee_success(){
        // Given
        long companyId = this.defaultUser.getCompany().getId();
        double targetFee = 3.33;
        String caseCode = "SP-NEW";

        CaseType caseType = caseTypeService.findCaseTypeByCode( caseCode);
        CaseTypeFee caseTypeFee = caseTypeFeeService.findCaseTypeFeeByCaseTypeAndCompanyId( caseType.getId(), companyId);
        caseTypeFee.setFee( targetFee);

        // When
        CaseTypeFee modifiedCaseTypeFee = caseTypeFeeService.modifyCaseTypeFee( caseTypeFee);

        // Then
        assertThat( modifiedCaseTypeFee.getFee(), is( targetFee));
        assertThat( caseTypeFeeService.findCaseTypeFeeByCaseTypeAndCompanyId( caseType.getId(), companyId).getFee(), is(targetFee));
    }

    @Test
    public void updateCaseTypeFeeList_success(){
        // Given
        long companyId = this.defaultUser.getCompany().getId();
        double targetFee = 3.33;

        List<CaseTypeFee> caseTypeFeeList = caseTypeFeeService.findCaseTypeFeeList( companyId);
        for( CaseTypeFee caseTypeFee : caseTypeFeeList){
            caseTypeFee.setFee( targetFee);
        }

        // When
        List<CaseTypeFee> modifiedCaseTypeFeeList = caseTypeFeeService.modifyCaseTypeFeeByCaseTypeList( caseTypeFeeList);

        // Then
        assertThat( modifiedCaseTypeFeeList.get( 0).getFee(), is( targetFee));
        assertThat( modifiedCaseTypeFeeList.get( caseTypeFeeList.size() - 1).getFee(), is( targetFee));
        assertThat( caseTypeFeeService.findCaseTypeFeeList( companyId).get( 0).getFee(), is(targetFee));
        assertThat( caseTypeFeeService.findCaseTypeFeeList( companyId).get( caseTypeFeeList.size() - 1).getFee(), is(targetFee));
    }

}

























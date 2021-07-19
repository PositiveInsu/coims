package ca.joyfactory.coims.service;

import ca.joyfactory.coims.common.CommonUtil;
import ca.joyfactory.coims.common.TestDomain;
import ca.joyfactory.coims.domain.*;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.junit4.SpringRunner;

import javax.transaction.Transactional;
import java.util.List;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.notNullValue;

/**
 * Created by Joinsu on 2019-05-02.
 */
@RunWith( SpringRunner.class)
@SpringBootTest
@Transactional
public class ClientCaseStatusServiceTest {

    @Autowired
    ClientCaseStatusService clientCaseStatusService;

    @Autowired
    RoleService roleService;

    @Autowired
    UserService userService;

    @Autowired
    CaseNoService caseNoService;

    @Autowired
    CaseTypeService caseTypeService;

    @Autowired
    CompanyService companyService;

    @Autowired
    ClientCaseService clientCaseService;

    @Autowired
    PasswordEncoder passwordEncoder;

    private String caseTypeCode = "SP-NEW";
    private String testUserEmail = "casetester@jcwins.com";

    private User testUser;
    private Company testCompany;
    private ClientCase testClientCase;

    @Before
    public void setup(){
        setupMockUser();
        setupClientCase();
    }

    private void setupClientCase() {
        ClientCaseDto.ForNewCase clientCaseInfo = getClientCaseInfo();
        String caseNo = this.caseNoService.getUniqueCaseNo( clientCaseInfo.getCompanyId());
        this.testClientCase = this.clientCaseService.addNewClientCase( clientCaseInfo, caseNo);
    }

    @SuppressWarnings("Duplicates")
    private void setupMockUser() {
        User user = TestDomain.getTestConsultant();
        user.setRole( roleService.findRole( RoleType.ADMIN));

        deleteExistUser( TestDomain.getTestConsultant().getEmail());
        deleteExistUser( TestDomain.getTestStaff().getEmail());

        this.testUser = userService.addUser( user);
        this.testCompany = this.companyService.findById( this.testUser.getCompany().getId());
        this.caseNoService.addNewCaseNo( this.testUser.getCompany().getId());
    }

    private void deleteExistUser( String email) {
        User foundUser = userService.findUserByEmail( email);
        if( foundUser != null){
            userService.deleteUserById( foundUser.getId());
        }
    }

    @SuppressWarnings("Duplicates")
    private ClientCaseDto.ForNewCase getClientCaseInfo() {

        User user = new User();
        user.setCountry( "KOR");
        user.setfName( "TESTER");
        user.setlName( "JO");
        user.setPhoneNo( "204-222-2920");
        user.setType( UserType.CLIENT);
        user.setEmail( this.testUserEmail);
        user.setCompany( this.testCompany);
        user.setBirthDate( CommonUtil.intToTimestamp(2018, 02, 22));

        ClientCaseFee caseFee = new ClientCaseFee();
        caseFee.setBasic( 100.00);
        caseFee.setDiscount( 10.00);
        caseFee.setExtra( 0.00);
        caseFee.setNote( "Child Fee");
        caseFee.setSubTotal( 90.00);
        caseFee.setTax( 4.5);
        caseFee.setProcessing( 94.5);
        caseFee.setGovernment( 120.00);

        CaseType foundCaseType = caseTypeService.findCaseTypeByCode( this.caseTypeCode);

        ClientCaseDto.ForNewCase clientCaseInfo = new ClientCaseDto.ForNewCase();
        clientCaseInfo.setUser( user);
        clientCaseInfo.setCaseFee( caseFee);
        clientCaseInfo.setCaseType( foundCaseType);
        clientCaseInfo.setCaseGrade( CaseGrade.MAIN);
        clientCaseInfo.setCompanyId( this.testUser.getCompany().getId());

        Document document = new Document();
        document.setName( "Additional Document For Client");
        document.setCategory( DocumentType.MORE);
        document.setCompanyId( this.testUser.getCompany().getId());
        clientCaseInfo.getDocumentList().add( document);

        return clientCaseInfo;
    }

    @Test
    public void addStatusPassedDate_success(){
        // Given
        String caseNo = this.testClientCase.getCaseNo();
        long companyId = this.testClientCase.getCompany().getId();

        // When
        List<ClientCaseStatus> addedClientCaseStatusList = clientCaseStatusService.addStatusPassedDate( caseNo, companyId);

        // Then
        assertThat( addedClientCaseStatusList.size(), is( 1));
        assertThat( addedClientCaseStatusList.get(0).getCaseStatus().getStepNo(), is( this.testClientCase.getCaseStatus().getStepNo()));
        assertThat( addedClientCaseStatusList.get(0).getPassedDate(), is( notNullValue()));
    }

    @Test
    public void findStatusByCaseId_success(){
        // Given
        Long caseId = this.testClientCase.getId();
        String caseNo = this.testClientCase.getCaseNo();
        long companyId = this.testClientCase.getCompany().getId();
        List<ClientCaseStatus> addedClientCaseStatusList = clientCaseStatusService.addStatusPassedDate( caseNo, companyId);

        // When
        List<ClientCaseStatus> foundClientCaseStatusList = clientCaseStatusService.findAllByCaseId( caseId);

        // Then
        assertThat( addedClientCaseStatusList.size(), is( foundClientCaseStatusList.size()));
        assertThat( addedClientCaseStatusList.get(0).getId(), is( foundClientCaseStatusList.get(0).getId()));
    }
}
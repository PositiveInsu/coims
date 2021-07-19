package ca.joyfactory.coims.service;

import ca.joyfactory.coims.common.CommonUtil;
import ca.joyfactory.coims.common.TestDomain;
import ca.joyfactory.coims.domain.*;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.junit4.SpringRunner;

import javax.transaction.Transactional;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;

import static org.hamcrest.Matchers.nullValue;
import static org.hamcrest.core.Is.is;
import static org.junit.Assert.assertThat;

/**
 * Created by Joinsu on 2018-12-11.
 */
@RunWith( SpringRunner.class)
@SpringBootTest
@Transactional
public class ClientCaseServiceTest {

    @Autowired
    ClientCaseService clientCaseService;

    @Autowired
    RoleService roleService;

    @Autowired
    UserService userService;

    @Autowired
    CompanyService companyService;

    @Autowired
    CaseNoService caseNoService;

    @Autowired
    CaseTypeService caseTypeService;

    @Autowired
    PasswordEncoder passwordEncoder;

    private User defaultUser;
    private String caseTypeCode = "SP-NEW";
    private String testUserEmail = "casetester@jcwins.com";
    private String clientEmail = "client@jcwins.com";
    private Company testCompany;
    private boolean isAddedClientCase = false;
    private ClientCase testClientCase;

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
        this.testCompany = this.companyService.findById( this.defaultUser.getCompany().getId());
        this.caseNoService.addNewCaseNo( this.defaultUser.getCompany().getId());
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
        clientCaseInfo.setCompanyId( this.defaultUser.getCompany().getId());

        Document document = new Document();
        document.setName( "Additional Document For Client");
        document.setCategory( DocumentType.MORE);
        document.setCompanyId( this.defaultUser.getCompany().getId());
        clientCaseInfo.getDocumentList().add( document);

        return clientCaseInfo;
    }

    @SuppressWarnings("Duplicates")
    private ClientCaseDto.ForNewCase getDependentClientCaseInfo() {

        User user = new User();
        user.setCountry( "KOR");
        user.setfName( "SUNMI");
        user.setlName( "PARK");
        user.setPhoneNo( "204-222-2920");
        user.setEmail( this.testUserEmail);
        user.setType( UserType.CLIENT);
        user.setCompany( this.testCompany);
        user.setBirthDate( CommonUtil.intToTimestamp(1999, 02, 22));

        ClientCaseFee caseFee = new ClientCaseFee();
        caseFee.setBasic( 100.00);
        caseFee.setDiscount( 10.00);
        caseFee.setExtra( 0.00);
        caseFee.setNote( "Child Fee");
        caseFee.setSubTotal( 90.00);
        caseFee.setTax( 4.5);
        caseFee.setProcessing( 94.5);
        caseFee.setGovernment( 120.00);

        CaseType foundCaseType = caseTypeService.findCaseTypeByCode( "SP-EXT");

        ClientCaseDto.ForNewCase clientCaseInfo = new ClientCaseDto.ForNewCase();
        clientCaseInfo.setUser( user);
        clientCaseInfo.setCaseFee( caseFee);
        clientCaseInfo.setCaseGrade( CaseGrade.DEPENDENT);
        clientCaseInfo.setCompanyId( this.defaultUser.getCompany().getId());
        clientCaseInfo.setCaseType( foundCaseType);

        Document document1 = new Document();
        document1.setName( "Additional Document 1 For Client");
        document1.setCategory( DocumentType.MORE);
        document1.setCompanyId( this.defaultUser.getCompany().getId());
        Document document2 = new Document();
        document2.setName( "Additional Document 2 For Client");
        document2.setCategory( DocumentType.MORE);
        document2.setCompanyId( this.defaultUser.getCompany().getId());
        clientCaseInfo.getDocumentList().add( document1);
        clientCaseInfo.getDocumentList().add( document2);

        return clientCaseInfo;
    }

    private ClientCase addClientCase() {
        if( isAddedClientCase){
            return this.testClientCase;
        }else{
            ClientCaseDto.ForNewCase clientCaseInfo = getClientCaseInfo();
            String caseNo = this.caseNoService.getUniqueCaseNo( clientCaseInfo.getCompanyId());
            return this.clientCaseService.addNewClientCase( clientCaseInfo, caseNo);
        }
    }

    @Test
    public void addSingleClientCase_success(){
        // Given
        ClientCaseDto.ForNewCase clientCaseInfo = getClientCaseInfo();
        String caseNo = this.caseNoService.getUniqueCaseNo( clientCaseInfo.getCompanyId());

        // When
        ClientCase clientCase = this.clientCaseService.addNewClientCase( clientCaseInfo, caseNo);

        // Then
        assertThat( clientCase.getCaseNo(), is( "00000001"));
        assertThat( clientCase.getCaseGrade(), is( CaseGrade.MAIN));
        assertThat( clientCase.getUser().getId(), is( userService.findClientByEmail( this.testUserEmail).get(0).getId()));
        assertThat( clientCase.getCaseType().getId(), is( caseTypeService.findCaseTypeByCode( caseTypeCode).getId()));
        assertThat( clientCase.getCaseFee().getBasic().intValue(), is( 100));

        this.testClientCase = clientCase;
        this.isAddedClientCase = true;
    }

    @Test
    public void addSingleClientCase_fail(){
        // Given
        User user = new User();
        ClientCaseDto.ForNewCase clientCaseInfo = getClientCaseInfo();
        String caseNo = caseNoService.getUniqueCaseNo( clientCaseInfo.getCompanyId());

        // When
        try {
            ClientCase clientCase = this.clientCaseService.addNewClientCase( clientCaseInfo, caseNo);
        } catch (Exception e) {

        } finally {
            user = userService.findUserByEmail( this.testUserEmail);
        }

        // Then
        assertThat( user, is( nullValue()));
    }

    @Test
    public void addMultiClientCase_success(){
        // Given
        List< ClientCaseDto.ForNewCase> newCaseList = new ArrayList<>();
        newCaseList.add( getClientCaseInfo());
        newCaseList.add( getDependentClientCaseInfo());

        //When
        List< ClientCase> addedClientCaseList = this.clientCaseService.addNewClientCase( newCaseList);

        // Then
        List<User> userList = userService.findClientByEmail( this.testUserEmail);
        assertThat( userList.size(), is(2));

        assertThat( addedClientCaseList.get(0).getCaseGrade(), is( CaseGrade.MAIN));
        assertThat( addedClientCaseList.get(0).getCaseType().getId(), is( caseTypeService.findCaseTypeByCode( caseTypeCode).getId()));
        assertThat( addedClientCaseList.get(0).getCaseFee().getBasic().intValue(), is( 100));

        assertThat( addedClientCaseList.get(1).getCaseGrade(), is( CaseGrade.DEPENDENT));
        assertThat( addedClientCaseList.get(1).getCaseType().getId(), is( caseTypeService.findCaseTypeByCode( caseTypeCode).getId()));
        assertThat( addedClientCaseList.get(1).getCaseFee().getBasic().intValue(), is( 120));

    }

    @Test
    public void addClientCaseStatus_success(){
        // Given
        ClientCaseDto.ForNewCase clientCaseInfo = getClientCaseInfo();
        String caseNo = caseNoService.getUniqueCaseNo( clientCaseInfo.getCompanyId());
        ClientCase clientCase = this.clientCaseService.addNewClientCase( clientCaseInfo, caseNo);

        // When
        ClientCase modifiedClientCase = this.clientCaseService.addStatusPassedDate( clientCase.getId());

        // Then
        assertThat( modifiedClientCase.getClientCaseStatusList().size(), is(1));
    }

    @Test
    public void countClientCaseByUserId_success(){
        // Given
        ClientCaseDto.ForNewCase clientCaseInfo = getClientCaseInfo();
        String caseNo = caseNoService.getUniqueCaseNo( clientCaseInfo.getCompanyId());
        this.clientCaseService.addNewClientCase( clientCaseInfo, caseNo);
        User user = userService.findUserByEmail( this.testUserEmail);

        // When
        long countCase = this.clientCaseService.countClientCaseByUserId( user.getId());

        // Then
        assertThat( countCase, is(1l));
    }

    @Test
    public void countClientCaseByUserIdAndCaseGrade_success(){
        // Given
        ClientCaseDto.ForNewCase clientCaseInfo = getClientCaseInfo();
        String caseNo = caseNoService.getUniqueCaseNo( clientCaseInfo.getCompanyId());
        this.clientCaseService.addNewClientCase( clientCaseInfo, caseNo);
        User user = userService.findUserByEmail( this.testUserEmail);

        // When
        long countCase = this.clientCaseService.countClientCaseByUserIdAndCaseGrade( user.getId(), CaseGrade.MAIN);

        // Then
        assertThat( countCase, is(1l));
    }

    @Test
    public void countMainAndDependentClientCaseByUserList_success(){
        // Given
        List<User> clientList = userService.findClientByEmail( this.clientEmail);

        // When
        List<ClientCaseDto.ForCountClientCase> countClientCaseList = this.clientCaseService.countMainAndDependentClientCase( clientList);

        // Then
        assertThat( countClientCaseList.size(), is(5));
        assertThat( countClientCaseList.get( 0).getUserId(), is( clientList.get( 0).getId()));
    }

    @Test
    public void findClientCasesByCompanyId_success(){
        // Given
        long companyId = this.defaultUser.getCompany().getId();

        List< ClientCaseDto.ForNewCase> newCaseList = new ArrayList<>();
        newCaseList.add( getClientCaseInfo());
        newCaseList.add( getDependentClientCaseInfo());
        this.clientCaseService.addNewClientCase( newCaseList);

        // When
        Page<ClientCase> clientCaseList = this.clientCaseService.findMainCasesByCompanyId( companyId, PageRequest.of( 0, 9, new Sort( Sort.Direction.ASC, "createdDate")));

        // Then
        assertThat( clientCaseList.getContent().size(), is( 1));
    }

    @Test
    public void findClientCasesBySearchDto_success(){
        // Given : Use InitClientCase Data
        List<User> clientList = userService.findClientByEmail( clientEmail);
        long companyId = clientList.get( 0).getCompany().getId();

        SearchDto.ForCaseSearch caseSearchDto = new SearchDto.ForCaseSearch();
        caseSearchDto.setFirstName( "insu");
        CaseType foundCaseType = caseTypeService.findCaseTypeByCode( this.caseTypeCode);
        caseSearchDto.setCaseCode( foundCaseType.getCode());
        caseSearchDto.setCaseYear( 2019);

        // When
        Page<ClientCase> clientCaseList = this.clientCaseService.findMainCasesBySearchDto( companyId, caseSearchDto, PageRequest.of( 0, 9));

        // Then
        assertThat( clientCaseList.getContent().size(), is( 2));
    }

    @Test
    public void findClientCaseById_success(){
        // Given
        ClientCaseDto.ForNewCase clientCaseInfo = getClientCaseInfo();
        String caseNo = this.caseNoService.getUniqueCaseNo( clientCaseInfo.getCompanyId());

        // When
        ClientCase clientCase = this.clientCaseService.addNewClientCase( clientCaseInfo, caseNo);

        // When
        ClientCase foundClientCase = this.clientCaseService.findById( clientCase.getId());

        // Then
        assertThat( foundClientCase.getId(), is( clientCase.getId()));
    }


    @Test
    public void findClientCaseByCaseNo_success(){
        // Given
        List< ClientCaseDto.ForNewCase> newCaseList = new ArrayList<>();
        newCaseList.add( getClientCaseInfo());
        newCaseList.add( getDependentClientCaseInfo());
        List< ClientCase> addedClientCaseList = this.clientCaseService.addNewClientCase( newCaseList);
        String caseNo = addedClientCaseList.get( 0).getCaseNo();
        long companyId = addedClientCaseList.get( 0).getCompany().getId();

        // When
        List<ClientCase> foundClientCaseList = this.clientCaseService.findAllByCaseNo( caseNo, companyId);

        // Then
        assertThat( foundClientCaseList.size(), is( addedClientCaseList.size()));
    }

    @Test
    public void findAllYear_success(){
        // Given
        Long companyId = this.testCompany.getId();

        // When
        List<BigInteger> yearList = this.clientCaseService.findAllYear( companyId);

        // Then
        assertThat( yearList.size(), is( 1));
    }

    @Test
    public void changeCaseStatus_success(){
        // Given
        ClientCase clientCase = addClientCase();
        String caseNo = clientCase.getCaseNo();
        Long companyId = clientCase.getCompany().getId();
        Integer statusStepNo = clientCase.getCaseStatus().getStepNo();

        // When
        List<ClientCase> modifiedClientCaseList = this.clientCaseService.changeCaseStatus( caseNo, companyId);

        // Then
        assertThat( modifiedClientCaseList.get(0).getCaseStatus().getStepNo(), is( statusStepNo + 1));
    }
}























package ca.joyfactory.coims.service;

import ca.joyfactory.coims.common.TestDomain;
import ca.joyfactory.coims.domain.*;
import ca.joyfactory.coims.exception.NotFoundDataException;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.test.context.junit4.SpringRunner;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.hamcrest.Matchers.*;
import static org.junit.Assert.*;

/**
 * Created by Joinsu on 2018-09-12.
 */
@RunWith( SpringRunner.class)
@SpringBootTest
@Transactional
public class CaseTypeServiceTest {

    @Autowired
    CaseTypeService caseTypeService;

    @Autowired
    DocumentService documentService;

    @Autowired
    RoleService roleService;

    @Autowired
    UserService userService;

    private User defaultUser;

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
    public void addCaseTypeWithCompanyId_success(){
        // Given
        long companyId = this.defaultUser.getCompany().getId();
        CaseType caseType = new CaseType( "Test Permit1", "TP1", CaseTypeCategory.VISA, companyId);

        // When
        CaseType addedCaseType = caseTypeService.addCaseType( caseType);

        // Then
        assertThat( addedCaseType.getCompanyId(), is( companyId));
    }

    @Test(expected = DataIntegrityViolationException.class)
    public void addCaseTypeWithoutCompanyId_fail(){
        // Given
        long companyId = defaultUser.getCompany().getId();
        CaseType caseType = new CaseType( "Test Permit2", "TP2", CaseTypeCategory.VISA, null);

        // When
        CaseType addedCaseType = caseTypeService.addCaseType( caseType);

        // Then
    }

    @Test(expected = DataIntegrityViolationException.class)
    public void addCaseType_duplicate_code_fail(){
        // Given
        long companyId = this.defaultUser.getCompany().getId();
        CaseType caseType = new CaseType( "Test Permit3", "TP3", CaseTypeCategory.VISA, companyId);
        caseTypeService.addCaseType( caseType);

        CaseType caseType2 = new CaseType( "Test Permit3", "TP3", CaseTypeCategory.VISA, companyId);
        caseTypeService.addCaseType( caseType2);

        // When
        caseTypeService.findCaseTypeList( companyId);

        // Then - Exception
    }

    @Test
    public void getCaseTypeListWithCompanyId_success(){
        // Given
        long companyId = this.defaultUser.getCompany().getId();
        CaseType caseType = new CaseType( "Test Permit5", "TP5", CaseTypeCategory.VISA, companyId);
        caseTypeService.addCaseType( caseType);

        CaseType caseType2 = new CaseType( "Test Permit6", "TP6", CaseTypeCategory.VISA, companyId);
        caseTypeService.addCaseType( caseType2);

        // When
        List<CaseType> caseTypeList = caseTypeService.findCaseTypeList( companyId);

        // Then
        assertThat( caseTypeList.size(), is( 2));
    }

    @Test(expected = NotFoundDataException.class)
    public void getCaseTypeListWithCompanyId_nullData_fail(){
        // Given

        // When
        List<CaseType> caseTypeList = caseTypeService.findCaseTypeList( 123);

        // Then
    }


    @Test
    public void getCaseTypeWithCode_success(){
        // Given
        long companyId = this.defaultUser.getCompany().getId();
        String testCode = "TP";
        CaseType caseType = new CaseType( "Test Permit", testCode, CaseTypeCategory.VISA, companyId);
        caseTypeService.addCaseType( caseType);

        // When
        CaseType foundCaseType = caseTypeService.findCaseTypeByCode( testCode);

        // Then
        assertThat( foundCaseType.getCode(), is( testCode));
    }

    @Test(expected = NotFoundDataException.class)
    public void getCaseTypeWithCode_nullData_fail(){
        // Given

        // When
        caseTypeService.findCaseTypeByCode( "AA");

        // Then
    }

    @Test
    public void addChildCaseType_success(){
        // Given
        long companyId = defaultUser.getCompany().getId();
        CaseType addedCaseType = caseTypeService.addCaseType( new CaseType( "Parent Permit", "PP", CaseTypeCategory.VISA, companyId));
        CaseType childCaseType = new CaseType( "Child Permit", "CP", CaseTypeCategory.VISA, companyId);

        // When
        CaseType addedChildCaseType = caseTypeService.addChildCaseType( addedCaseType.getId(), childCaseType);

        // Then
        CaseType parentCaseType = caseTypeService.findCaseTypeByCode( "PP");

        assertThat( addedChildCaseType.getPid(), is( parentCaseType.getId()));
        assertThat( parentCaseType.isHasChild(), is( true));
    }

    @Test
    public void findCaseTypeById_success(){
        // Given
        long companyId = this.defaultUser.getCompany().getId();
        CaseType caseType = new CaseType( "Test Permit9", "TP9", CaseTypeCategory.VISA, companyId);
        CaseType addedCaseType = caseTypeService.addCaseType( caseType);

        // When
        CaseType findedCaseType = caseTypeService.findCaseTypeById( addedCaseType.getId());

        // Then
        assertThat( findedCaseType.getId(), is( addedCaseType.getId()));
    }

    @Test
    public void deleteCaseTypeById_success(){
        // Given
        long companyId = this.defaultUser.getCompany().getId();
        caseTypeService.addCaseType( new CaseType( "Test Permit10", "TP10", CaseTypeCategory.VISA, companyId));
        CaseType addedCaseType = caseTypeService.addCaseType( new CaseType( "Test Permit11", "TP11", CaseTypeCategory.VISA, companyId));

        // When
        caseTypeService.deleteCaseTypeById( addedCaseType.getId());
        List<CaseType> caseTypeList = caseTypeService.findCaseTypeList( companyId);

        // Then
        assertThat( caseTypeList.size(), is(1));
    }

    @Test
    public void addDocumentToCaseType_success(){
        // Given
        String testCode = "RSM";
        Document document = documentService.findDocumentByCode( testCode);
        CaseType caseTypeSPNew = caseTypeService.findCaseTypeByCode("SP-NEW");

        // When
        caseTypeService.addCaseTypeDocument( caseTypeSPNew.getId(), document.getId());

        // Then
        List<CaseTypeDocument> caseTypeDocumentList = caseTypeService.findCaseTypeById( caseTypeSPNew.getId()).getCaseTypeDocumentList();
        boolean flag = false;
        for( CaseTypeDocument caseTypeDocument : caseTypeDocumentList){
            if( caseTypeDocument.getDocument().getCode().equals( testCode)){
                flag = true;
            }
        }
        assertThat( flag, is( true));
    }

    @Test
    public void deleteDocumentFromCaseType_success(){
        // Given
        Document document = documentService.findDocumentByCode( "PM");
        CaseType caseTypeWPNew = caseTypeService.findCaseTypeByCodeAndCompanyId("WP-EX", -1L);
        caseTypeService.addCaseTypeDocument( caseTypeWPNew.getId(), document.getId());
        assertThat( caseTypeService.findCaseTypeById( caseTypeWPNew.getId()).getCaseTypeDocumentList().size(), is(1));

        // When
        caseTypeService.deleteCaseTypeDocument( caseTypeWPNew.getId(), document.getId());

        // Then
        List<CaseTypeDocument> caseTypeDocumentList = caseTypeService.findCaseTypeById( caseTypeWPNew.getId()).getCaseTypeDocumentList();
        assertThat( caseTypeDocumentList.size(), is(0));
    }

    @Test
    public void setDocumentListToCaseType_success(){
        // Given
        String[] studyPermitDocuments = new String[]{ "PSPT", "PM", "PT", "MC", "BC", "FC", "QE", "LOA", "PSGRAD", "PSTRS", "ENLT", "TRCPT", "RFSLT", "RLPRF", "FRPRF", "BSTMT", "3MTRS", "5646C", "CUSLT", "FSLT", "RSM", "EMEDI"};
        CaseType addedCaseType = caseTypeService.findCaseTypeByCode( "WP-C");
        List<Document> documentList = documentService.findDefaultDocumentList();

        // When
        List<Document> studyPermitDocumentList = new ArrayList<>();
        for( Document doc: documentList){
            boolean result = Arrays.stream( studyPermitDocuments).anyMatch( doc.getCode()::equals);
            if( result){
                studyPermitDocumentList.add( doc);
            }
        }
        caseTypeService.addDocumentListById( addedCaseType.getId(), studyPermitDocumentList);


        // Then
        CaseType resultCaseType = caseTypeService.findCaseTypeById( addedCaseType.getId());
        assertThat( resultCaseType.getCaseTypeDocumentList().size(), is( studyPermitDocuments.length));
    }

    @Test
    public void findDocumentListByCompanyId_success(){
        // Given
        long companyId = this.defaultUser.getCompany().getId();
        Document document1 = new Document("Test Document", DocumentType.PERSONAL, companyId, "TEST-D1");
        Document document2 = new Document("Test Document2", DocumentType.PERSONAL, 99L, "TEST-D2");
        Document addedDocument1 = documentService.addDocument( document1);
        Document addedDocument2 = documentService.addDocument( document2);

        String[] workPermitDocuments = new String[]{ "PSPT", "PM", "PT"};
        CaseType addedCaseType = caseTypeService.findCaseTypeByCode( "WP-OP");

        List<Document> documentList = documentService.findDefaultDocumentList();
        List<Document> workPermitDocumentList = new ArrayList<>();

        for( Document doc: documentList){
            boolean result = Arrays.stream( workPermitDocuments).anyMatch( doc.getCode()::equals);
            if( result){
                workPermitDocumentList.add( doc);
            }
        }
        workPermitDocumentList.add( addedDocument1);
        workPermitDocumentList.add( addedDocument2);

        caseTypeService.addDocumentListById( addedCaseType.getId(), workPermitDocumentList);
        CaseType resultCaseType = caseTypeService.findCaseTypeById( addedCaseType.getId());
        assertThat( resultCaseType.getCaseTypeDocumentList().size(), is( workPermitDocuments.length + 2));

        // When
        CaseType caseType = caseTypeService.findDocumentListByCompanyId( addedCaseType.getId(), companyId);

        // Then
        assertThat( caseType.getCaseTypeDocumentList().size(), is( workPermitDocuments.length + 1));
    }

    @Test
    public void updateGovernmentFee_success(){
        // Given
        double governmentFee = 150.00;
        String targetCaseTypeCode = "SP-NEW";

        // When
        caseTypeService.modifyGovernmentFeeToCaseType( targetCaseTypeCode, governmentFee);

        // Then
        CaseType updatedCasetype = caseTypeService.findCaseTypeByCode( targetCaseTypeCode);
        assertThat( updatedCasetype.getGovernmentFee(), is( governmentFee));
    }

    @Test
    public void updateGovernmentFeeList_success(){
        // Given
        double targetFee = 150.00;

        List<CaseType> caseTypeList = caseTypeService.findDefaultCaseTypeList();
        for( CaseType caseType : caseTypeList){
            caseType.setGovernmentFee( targetFee);
        }

        // When
        List<CaseType> modifiedGovernmentFeeList = caseTypeService.modifyGovernmentFeeByCaseTypeList( caseTypeList);

        // Then
        assertThat( modifiedGovernmentFeeList.get( 0).getGovernmentFee(), is( targetFee));
        assertThat( modifiedGovernmentFeeList.get( caseTypeList.size() - 1).getGovernmentFee(), is( targetFee));
    }

}


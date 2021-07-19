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

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.hamcrest.Matchers.is;
import static org.junit.Assert.*;

/**
 * Created by Joinsu on 2018-11-27.
 */
@RunWith( SpringRunner.class)
@SpringBootTest
@Transactional
public class CaseTypeDocumentServiceTest {

    @Autowired
    CaseTypeDocumentService caseTypeDocumentService;

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
    public void findDocumentListByCaseTypeIdAndCompanyId_success(){
        // Given
        long companyId = this.defaultUser.getCompany().getId();
        Document document = new Document("Test Document", DocumentType.PERSONAL, companyId, "TEST-D");
        Document addedDocument = documentService.addDocument( document);

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
        workPermitDocumentList.add( addedDocument);

        caseTypeService.addDocumentListById( addedCaseType.getId(), workPermitDocumentList);
        CaseType resultCaseType = caseTypeService.findCaseTypeById( addedCaseType.getId());
        assertThat( resultCaseType.getCaseTypeDocumentList().size(), is( workPermitDocuments.length + 1));

        // When
        List<CaseTypeDocument> caseTypeDocumentList = caseTypeDocumentService.findDocumentListByTypeAndCompanyId( addedCaseType, companyId);

        // Then
        assertThat( caseTypeDocumentList.size(), is( workPermitDocuments.length + 1));
    }

    @Test
    public void deleteDocumentByDocument(){
        // Given
        long companyId = this.defaultUser.getCompany().getId();
        CaseType spExt = caseTypeService.findCaseTypeByCode( "SP-EXT");
        CaseType spNew = caseTypeService.findCaseTypeByCode( "SP-NEW");
        int originSize = spExt.getCaseTypeDocumentList().size();

        Document document = new Document("Test Document1", DocumentType.PERSONAL, companyId, "TEST-D");
        long documentId = documentService.addDocument( document).getId();
        caseTypeService.addCaseTypeDocument( spExt.getId(), document.getId());
        caseTypeService.addCaseTypeDocument( spNew.getId(), document.getId());
        CaseType addedCaseType = caseTypeService.findCaseTypeByCode( "SP-EXT");
        int addedSize = addedCaseType.getCaseTypeDocumentList().size();
        assertThat( addedSize, is( originSize + 1));

        // When
        caseTypeDocumentService.deleteCaseTypeDocumentByDocument( document);

        // Then
        checkDocumentExist( caseTypeService.findCaseTypeByCode( "SP-EXT").getCaseTypeDocumentList(), documentId);
        checkDocumentExist( caseTypeService.findCaseTypeByCode( "SP-NEW").getCaseTypeDocumentList(), documentId);
        CaseType deletedCaseType = caseTypeService.findCaseTypeByCode( "SP-EXT");
        assertThat( deletedCaseType.getCaseTypeDocumentList().size(), is( originSize));
        assertThat( true, is(true));

    }

    private void checkDocumentExist( List<CaseTypeDocument> caseTypeDocumentList, long documentId){
        for( CaseTypeDocument caseTypeDocument: caseTypeDocumentList){
            if( caseTypeDocument.getDocument().getId() == documentId){
                fail( "NOT DELETED!");
            }
        }
    }
}
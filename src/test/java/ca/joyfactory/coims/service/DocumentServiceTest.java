package ca.joyfactory.coims.service;

import ca.joyfactory.coims.common.TestDomain;
import ca.joyfactory.coims.domain.Document;
import ca.joyfactory.coims.domain.DocumentType;
import ca.joyfactory.coims.domain.RoleType;
import ca.joyfactory.coims.domain.User;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import javax.transaction.Transactional;

import java.util.ArrayList;
import java.util.List;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.arrayContaining;
import static org.hamcrest.Matchers.greaterThan;
import static org.hamcrest.Matchers.hasItem;
import static org.hamcrest.core.Is.is;
import static org.hamcrest.core.IsNull.notNullValue;

/**
 * Created by Joinsu on 2018-09-26.
 */
@RunWith( SpringRunner.class)
@SpringBootTest
@Transactional
public class DocumentServiceTest {

    @Autowired
    DocumentService documentService;

    @Autowired
    UserService userService;

    @Autowired
    RoleService roleService;

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
    public void addDocument_success(){
        // Given
        Document document = new Document( "Test", DocumentType.PERSONAL, this.defaultUser.getCompany().getId(), "TST");

        // When
        Document addedDocument = documentService.addDocument( document);

        // Then
        assertThat( addedDocument.getId(), is( notNullValue()));
    }

    @Test
    public void deleteDocument_success(){
        // Given
        long companyID = this.defaultUser.getCompany().getId();
        documentService.addDocument( new Document( "Test", DocumentType.PERSONAL, companyID, "TST"));
        Document addedDocument = documentService.addDocument( new Document( "Test2", DocumentType.PERSONAL, companyID, "TST2"));

        // When
        documentService.deleteDocumentById( addedDocument.getId());

        // Then
        List<Document> documentList = documentService.findDocumentListByCompanyId( companyID);
        assertThat( documentList.size(), is( 1));
    }

    @Test
    public void findBasicDocumentList_success(){
        // Given
        documentService.addDocument( new Document( "Test1", DocumentType.PERSONAL, -1L, "TST1" ));
        documentService.addDocument( new Document( "Test2", DocumentType.PERSONAL, -1L, "TST2"));

        // When
        List<Document> documentList = documentService.findDefaultDocumentList();

        // Then
        assertThat( documentList.size(), greaterThan( 0));
    }

    @Test
    public void findAllBasicDocumentList_success(){
        // Given

        // When
        List<Document> documentList = documentService.findDefaultDocumentList();

        // Then
        List<String> codeList = new ArrayList<>();
        for( Document doc : documentList){
            codeList.add( doc.getCode());
        }
        assertThat( codeList, hasItem( "PSPT"));
        assertThat( codeList, hasItem( "EMEDI"));
    }
}

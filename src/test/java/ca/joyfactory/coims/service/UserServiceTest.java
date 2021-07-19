package ca.joyfactory.coims.service;

import ca.joyfactory.coims.common.InitUser;
import ca.joyfactory.coims.common.TestDomain;
import ca.joyfactory.coims.domain.*;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.junit4.SpringRunner;

import javax.transaction.Transactional;

import java.util.List;

import static org.hamcrest.Matchers.hasItem;
import static org.hamcrest.Matchers.hasProperty;
import static org.hamcrest.core.Is.is;
import static org.junit.Assert.assertThat;

/**
 * Created by Joinsu on 2017-10-03.
 */

@RunWith( SpringRunner.class)
@SpringBootTest
@Transactional
public class UserServiceTest {

    @Autowired
    UserService userService;

    @Autowired
    CompanyService companyService;

    @Autowired
    RoleService roleService;

    @Autowired
    PasswordEncoder passwordEncoder;

    private User user;

    @Before
    public void setup(){
        setupMockUser();
    }

    private void setupMockUser() {
        user = TestDomain.getTestConsultant();
        user.setRole( roleService.findRole( RoleType.ADMIN));
        deleteExistUser( TestDomain.getTestConsultant().getEmail());
        deleteExistUser( TestDomain.getTestStaff().getEmail());
    }

    private void deleteExistUser( String email) {
        User findedUser = userService.findUserByEmail( email);
        if( findedUser != null){
            userService.deleteUserById( findedUser.getId());
        }
    }

    @Test
    public void addUser_success(){
        // Given

        // When
        User user = userService.addUser( this.user);

        // Then
        assertThat( user.getEmail(), is( this.user.getEmail()));
    }

    @Test
    public void findUser_success(){
        // Given
        String testID = "jc@jcwins.com";

        // When
        User addedUserId = userService.addUser( this.user);
        User findedUser = userService.findUserByEmail( testID);

        // Then

        assertThat( findedUser.getId(), is( user.getId()));
    }

    @Test(expected = RuntimeException.class)
    public void saveDuplicateUser_get_exception(){
        // Given

        // When
        userService.addUser( this.user);
        userService.addUser( this.user);

        // Then
        Assert.fail( "Must get exception.");
    }

    @Test
    public void isDuplicateEmail_duplicate(){
        //Given

        // When
        userService.addUser( this.user);
        boolean duplicateResult = userService.isDuplicateUserByEmail( this.user.getEmail());

        // Then
        assertThat( duplicateResult, is( true));
    }

    @Test
    public void isDuplicateUser_not_duplicate(){
        //Given
        String newEmailID = "newTest@coims.com";

        // When
        userService.addUser( this.user);
        boolean duplicateResult = userService.isDuplicateUserByEmail( newEmailID);

        // Then
        assertThat( duplicateResult, is( false));
    }


    @Test
    public void isDuplicateMemberID_duplicate(){
        // Given
        String duplicateID = "R1234567";

        // When
        userService.addUser( this.user);
        boolean duplicateResult = userService.isDuplicateMemberID( duplicateID);

        // Then
        assertThat( duplicateResult, is(true));
    }

    @Test
    public void isDuplicateMemberID_not_duplicate(){
        // Given
        String duplicateID = "R7654321";

        // When
        userService.addUser( this.user);
        boolean duplicateResult = userService.isDuplicateMemberID( duplicateID);

        // Then
        assertThat( duplicateResult, is(false));
    }

    @Test
    public void checkPasswordEncoder_success(){
        // Given

        // When
        User addedUser = userService.addUser( this.user);
        boolean matchResult = passwordEncoder.matches( "testPassword1!", addedUser.getPassword());

        // Then
        assertThat( matchResult, is( true));
    }

    @Test
    public void checkUserRole_getAdmin_success(){
        // Given

        // When
        User addedUser = userService.addUser( this.user);

        // Then
        assertThat( addedUser.getRoles().size(), is( 1));
        assertThat( addedUser.getRoles().get(0).getRole(), is( RoleType.ADMIN));
    }

    @Test
    public void addStaff_success(){
        // Given
        User consultant = userService.addUser( this.user);

        // When
        User staff =  TestDomain.getTestStaff();
        staff.setCompany( consultant.getCompany());
        staff.setRole( roleService.findRole( RoleType.USER));
        User addedUser = userService.addUser( staff);

        // Then
        assertThat( addedUser.getEmail(), is( staff.getEmail()));
        assertThat( addedUser.getCompany().getId(), is( consultant.getCompany().getId()));
    }

    @Test
    public void getUserListByCompanyId_success(){
        // Given
        User consultant = userService.addUser( this.user);
        User staff =  TestDomain.getTestStaff();
        staff.setCompany( consultant.getCompany());
        staff.setRole( roleService.findRole( RoleType.USER));
        userService.addUser( staff);

        // When
        Page<User> users = userService.findStaffByCompanyId( consultant.getCompany().getId(), PageRequest.of( 0, 9));

        // Then
        assertThat( users.getContent().size(), is( 2));
        assertThat( users, hasItem( hasProperty( "email", is( consultant.getEmail()))));
        assertThat( users, hasItem( hasProperty( "email", is( staff.getEmail()))));
    }

    @Test
    public void getUserListByUnknownCompanyId_fail(){
        // Given

        // When
        Page<User> users = userService.findStaffByCompanyId( 99999L, PageRequest.of( 0, 9));

        // Then
        assertThat( users.getContent().size(), is(0));
    }

    @Test
    public void modifyUserInformation_success(){
        // Given
        User originalUser = userService.addUser( this.user);
        this.user.setfName( "changeName");

        // When
        User modifiedUser = userService.modifyUser( this.user);

        // Then
        assertThat( modifiedUser.getfName(), is( originalUser.getfName()));
    }

    @Test
    public void getClientUserList_success(){

        // Given
        String clientEmail = "client@jcwins.com";

        // When
        List<User> clientUserList = userService.findClientByEmail( clientEmail);

        // Then
        assertThat( clientUserList.size(), is(InitUser.TEST_CLIENT_COUNT - 1));
    }
}
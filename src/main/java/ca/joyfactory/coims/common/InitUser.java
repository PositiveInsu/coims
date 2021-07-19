package ca.joyfactory.coims.common;

import ca.joyfactory.coims.domain.*;
import ca.joyfactory.coims.service.CaseNoService;
import ca.joyfactory.coims.service.CaseTypeFeeService;
import ca.joyfactory.coims.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Date;

/**
 * Created by Joinsu on 2018-11-28.
 */
@Component
public class InitUser {

    @Autowired
    UserService userService;

    @Autowired
    CaseTypeFeeService caseTypeFeeService;

    @Autowired
    CaseNoService caseNoService;

    public static int TEST_CLIENT_COUNT = 5;

    public void init() {
        addSampleUser();
//        addStaffUsers();
        addClientUser();
    }

    private void addClientUser() {
        for(int i = 1; i < TEST_CLIENT_COUNT; i++){
            User user =  new User();
            user.setEmail( "client@jcwins.com");
            user.setfName("INSU");
            user.setlName("JO" + i);
            user.setPassword( "testPassword1!");
            user.setPhoneNo("202-202-2029");
            user.setCreatedDate( new Date());
            user.setLastModifiedDate( new Date());
            user.setType( UserType.CLIENT);
            user.setStatus( UserStatus.ACTIVE);
            user.setBirthDate( new Date());

            userService.addUser( user, RoleType.USER, 2L);
        }
    }

    private void addStaffUsers() {
        for(int i = 1 ; i < 10 ; i++){
            User user =  new User();
            user.setEmail( "jc" + i + "@jcwins.com");
            user.setfName( "INSU" + i);
            user.setlName("JO");
            user.setPassword( "testPassword1!");
            user.setPhoneNo("202-202-2029");
            user.setCreatedDate( new Date());
            user.setLastModifiedDate( new Date());
            user.setType( UserType.STAFF);
            user.setStatus( UserStatus.ACTIVE);

            userService.addUser( user, RoleType.USER, 2L);
        }
    }

    private void addSampleUser() {

        User user =  new User();

        user.setEmail( "jc@jcwins.com");
        user.setfName( "INSU");
        user.setlName("JO");
        user.setPassword( "testPassword1!");
        user.setMemberId( "R1234567");
        user.setPhoneNo("202-202-2029");
        user.setCreatedDate( new Date());
        user.setLastModifiedDate( new Date());
        user.setType( UserType.BOSS);
        user.setStatus( UserStatus.PENDING);
        user.setCompany( getCompany());
        User addedUser = userService.addUser( user, RoleType.MANAGER);
        addNewCaseNo( addedUser);
        addCaseTypeFeeList( addedUser);
    }

    private void addNewCaseNo(User addedUser) {
        if( addedUser != null){
            caseNoService.addNewCaseNo( addedUser.getCompany().getId());
        }else{
            throw new RuntimeException( "Error add user");
        }
    }

    private void addCaseTypeFeeList(User user) {
        caseTypeFeeService.addDefaultCaseTypeFeeList( user.getCompany().getId());
    }

    private Company getCompany() {
        Company company  = new Company();

        company.setName( "JC WINs");
        company.setStreet( "76 Baylor Ave");
        company.setCity( "Winnipeg");
        company.setProvince( "MB");
        company.setCountry( "CA");
        company.setEmail( "test@coims.com");
        company.setCreatedDate( new Date());
        company.setLastModifiedDate( new Date());
        company.setWebsite( "jcwins.com");
        company.setPhone( "204-942-7065");
        company.setPostal( "R3Y 1Y1");
        return company;
    }
}

package ca.joyfactory.coims.common;

import ca.joyfactory.coims.domain.*;

import java.util.Date;

/**
 * Created by Joinsu on 2018-08-10.
 */
public class TestDomain {

    public static User getTestConsultant(){
        User user =  new User();


        user.setEmail( "jc@jcwins.com");
        user.setfName( "INSU");
        user.setlName("JO");
        user.setPassword( "testPassword1!");
        user.setMemberId( "R1234567");
        user.setCreatedDate( new Date());
        user.setLastModifiedDate( new Date());
        user.setType(UserType.MANAGER);
        user.setStatus(UserStatus.PENDING);
        user.setCompany( getTestCompany());

        return user;
    }

    public static User getTestStaff(){
        User staff =  new User();
        staff.setEmail( "test@jcwins.com");
        staff.setfName( "TESTER");
        staff.setlName("JO");
        staff.setPassword( "testPassword1!");
        staff.setMemberId( "");
        staff.setCreatedDate( new Date());
        staff.setLastModifiedDate( new Date());
        staff.setType(UserType.STAFF);
        staff.setStatus(UserStatus.PENDING);
        return staff;
    }

    @SuppressWarnings("Duplicates")
    public static Company getTestCompany(){
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

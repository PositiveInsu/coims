package ca.joyfactory.coims.domain;

import lombok.Data;

import java.util.Date;

/**
 * Created by Joinsu on 2018-07-11.
 */
public class UserDto {

    @Data
    public static class ResponseSimpleUser{
        private String email;
    }

    @Data
    public static class staffInfoUser{
        private Long id;
        private String email;
        private String fName;
        private String lName;
        private String type;
        private String phoneNo;
        private UserStatus Status;
    }

    @Data
    public static class clientUser{
        private Long id;
        private String email;
        private String fName;
        private String lName;
        private String type;
        private String phoneNo;
        private Date birthDate;
    }
}

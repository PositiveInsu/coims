package ca.joyfactory.coims.domain;

import lombok.Data;

/**
 * Created by Joinsu on 2018-08-31.
 */
public class CompanyDto {
    @Data
    public static class WithoutUser{
        private Long id;
        private String name;
        private String country;
        private String street;
        private String city;
        private String province;
        private String postal;
        private String phone;
        private String email;
        private String website;
        private String fax;
        private Long gstNo;
    }
}

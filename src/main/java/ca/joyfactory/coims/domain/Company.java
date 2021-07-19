package ca.joyfactory.coims.domain;

import ca.joyfactory.coims.common.CommonUtil;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by Joinsu on 2017-09-27.
 */
@Entity
public class Company {

    @Transient
    public static long DEFAULT_ID = -1L;

    @Id
    @Column(name = "COMPANY_ID")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @OneToMany( mappedBy = "company", orphanRemoval = true)
    // TODO: 무한루프 없애기 위해 일단은 조치 확인 필요
//    @JsonIgnoreProperties( "company")
    @JsonIgnore
    private List<User> users = new ArrayList<User>();

    @OneToMany( mappedBy = "company", orphanRemoval = true)
//    @JsonIgnoreProperties( "company")
    @JsonIgnore
    private List<CaseTypeFee> caseTypeFees = new ArrayList<>();

    @Column(length = 50)
    private String name;
    @Column(length = 10)
    private String country;
    @Column(length = 50)
    private String street;
    @Column(length = 20)
    private String city;
    @Column(length = 10)
    private String province;
    @Column(length = 10)
    private String postal;
    @Column(length = 13)
    private String phone;
    @Column(length = 50)
    private String email;
    @Column(length = 20)
    private String website;
    @Column(length = 13)
    private String fax;
    @Column(length = 15)
    private Integer gstNo;

    private Date createdDate;
    private Date lastModifiedDate;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getProvince() {
        return province;
    }

    public void setProvince(String province) {
        this.province = province;
    }

    public String getPostal() {

        return this.postal;
    }

    public void setPostal(String postal) {
        this.postal = postal;
    }

    public String getPhone() {
        return this.phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getWebsite() {
        return this.website;
    }

    public void setWebsite(String website) {
        this.website = website;
    }

    public String getFax() {

        return this.fax;
    }

    public void setFax(String fax) {
        this.fax = fax;
    }

    public Date getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }

    public Date getLastModifiedDate() {
        return lastModifiedDate;
    }

    public void setLastModifiedDate(Date lastModifiedDate) {
        this.lastModifiedDate = lastModifiedDate;
    }

    public String getFullAddress(){
        String divide = ", ";
        return this.getStreet() + divide + this.getCity() + divide + this.getProvince() + divide + this.getCountry() + divide + this.getPostal();
    }

    public List<CaseTypeFee> getCaseTypeFees() {
        return caseTypeFees;
    }

    public void setCaseTypeFees(List<CaseTypeFee> caseTypeFees) {
        this.caseTypeFees = caseTypeFees;
    }

    public Integer getGstNo() {
        return gstNo;
    }

    public void setGstNo(Integer gstNo) {
        this.gstNo = gstNo;
    }
}

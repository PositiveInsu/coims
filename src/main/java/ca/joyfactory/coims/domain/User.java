package ca.joyfactory.coims.domain;

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
public class User {

    @Id
    @Column( name = "USER_ID")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column( length = 20)
    private String fName;
    @Column( length = 20)
    private String lName;
    @Column( length = 30, nullable = false)
    private String email;
    @Column( length = 60, nullable = false)
    private String password;
    @Column( length = 10, unique = true)
    private String memberId;

    @Enumerated( EnumType.STRING)
    private UserType type;

    @Enumerated( EnumType.STRING)
    private UserStatus status;

    private String messageNote;

    @ManyToOne( cascade = CascadeType.PERSIST)
    @JoinColumn( name = "COMPANY_ID", nullable = false)
    private Company company;

    @ManyToMany( cascade = CascadeType.PERSIST)
    @JoinTable( name="USERS_ROLES", joinColumns = @JoinColumn( name = "USER_ID"), inverseJoinColumns = @JoinColumn( name = "ROLE_ID"))
    @JsonIgnoreProperties( "users")
    private List<Role> roles = new ArrayList<Role>();

    @Temporal( TemporalType.TIMESTAMP)
    private Date createdDate;

    @Temporal( TemporalType.TIMESTAMP)
    private Date lastModifiedDate;

    @Column( length = 15)
    private String phoneNo;

    @Temporal( TemporalType.TIMESTAMP)
    private Date birthDate;

    @Column( length = 10)
    private String country;

    @Column(length = 50)
    private String street;

    @Column(length = 20)
    private String city;

    @Column(length = 10)
    private String province;

    @Column(length = 10)
    private String postal;

    @OneToMany( mappedBy = "user", orphanRemoval = true)
    @JsonIgnore
    private List<ClientCase> clientCases = new ArrayList<ClientCase>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getfName() {
        return fName;
    }

    public void setfName(String fName) {
        this.fName = fName;
    }

    public String getlName() {
        return lName;
    }

    public void setlName(String lName) {
        this.lName = lName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getMemberId() {
        return memberId;
    }

    public void setMemberId(String memberId) {
        this.memberId = memberId;
    }

    public UserType getType() {
        return type;
    }

    public void setType(UserType type) {
        this.type = type;
    }

    public UserStatus getStatus() {
        return status;
    }

    public void setStatus(UserStatus status) {
        this.status = status;
    }

    public String getMessageNote() {
        return messageNote;
    }

    public void setMessageNote(String messageNote) {
        this.messageNote = messageNote;
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

    public Company getCompany() {
        return company;
    }

    public void setCompany(Company company) {

        if( this.company != null){
            this.company.getUsers().remove( this);
        }

        this.company = company;

        if( !this.company.getUsers().contains( this)){
            this.company.getUsers().add( this);
        }
    }

    public List<Role> getRoles() {
        return roles;
    }

    public void setRole( Role role){

        this.roles.add( role);
        role.getUsers().add( this);
    }

    public String getPhoneNo() {
        return phoneNo;
    }

    public void setPhoneNo(String phoneNo) {
        this.phoneNo = phoneNo;
    }

    public Date getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(Date birthDate) {
        this.birthDate = birthDate;
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
        return postal;
    }

    public void setPostal(String postal) {
        this.postal = postal;
    }

    public List<ClientCase> getClientCases() {
        return clientCases;
    }

    public void setClientCases(List<ClientCase> clientCases) {
        this.clientCases = clientCases;
    }
}

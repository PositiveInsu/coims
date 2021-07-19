package ca.joyfactory.coims.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by Joinsu on 2017-10-16.
 */
@Entity
public class Role {

    @Id
    @Column( name = "ROLE_ID")
    @GeneratedValue( strategy = GenerationType.AUTO)
    private long id;

    @Column( length = 20, nullable = false)
    @Enumerated( EnumType.STRING)
    private RoleType role;

    @ManyToMany( mappedBy = "roles")
    @JsonIgnoreProperties( "roles")
    private List<User> users = new ArrayList<User>();

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public RoleType getRole() {
        return role;
    }

    public void setRole(RoleType role) {
        this.role = role;
    }

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }
}

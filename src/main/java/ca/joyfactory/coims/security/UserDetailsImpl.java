package ca.joyfactory.coims.security;

import ca.joyfactory.coims.domain.Role;
import ca.joyfactory.coims.domain.RoleType;
import ca.joyfactory.coims.domain.User;
import ca.joyfactory.coims.domain.UserStatus;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

/**
 * Created by Joinsu on 2018-05-27.
 */
public class UserDetailsImpl extends org.springframework.security.core.userdetails.User {

    public UserDetailsImpl(User user) {
        super( user.getEmail(), user.getPassword(), isEnabled( user), true, true, true, authorities( user));
    }

    private static Collection<? extends GrantedAuthority> authorities(User user) {
        List<Role> userRoles = user.getRoles();
        List<GrantedAuthority> authorities = new ArrayList<>();

        for( Role role : userRoles){
            if( role.getRole().equals(RoleType.ADMIN)){
                authorities.add( new SimpleGrantedAuthority( "ROLE_ADMIN"));
            }else if( role.getRole().equals( RoleType.MANAGER)){
                authorities.add( new SimpleGrantedAuthority( "ROLE_MANAGER"));
            }else if( role.getRole().equals( RoleType.USER)){
                authorities.add( new SimpleGrantedAuthority( "ROLE_USER"));
            }
        }

        return authorities;
    }


    private static boolean isEnabled( User user) {
        boolean flag = false;
        // TODO PENDING을 임시로 열리게 해놓았습니다. ACTIVE 로 변경해야 합니다
        if( user.getStatus().equals( UserStatus.PENDING)){
            flag = true;
        }else if(user.getStatus().equals( UserStatus.ACTIVE)){
            flag = true;
        }
        return flag;
    }
}

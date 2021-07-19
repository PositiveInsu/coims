package ca.joyfactory.coims.security;

import ca.joyfactory.coims.domain.User;
import ca.joyfactory.coims.exception.NotFoundUserException;
import ca.joyfactory.coims.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

/**
 * Created by Joinsu on 2017-10-19.
 * Login Process
 */
@Transactional
@Service("userDetailsService")
public class UserDetailsServiceImpl implements UserDetailsService{

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String userEmail) throws UsernameNotFoundException {

        User user = null;

        try {
            user = findUser( userEmail);
        } catch ( EmptyResultDataAccessException e) {
            throw new UsernameNotFoundException( userEmail);
        }

        return new UserDetailsImpl( user);
    }

    private User findUser(String userEmail){
        return userRepository.findByEmail( userEmail);
    }

}

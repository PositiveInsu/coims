package ca.joyfactory.coims.service;

import ca.joyfactory.coims.domain.Role;
import ca.joyfactory.coims.domain.RoleType;
import ca.joyfactory.coims.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Joinsu on 2017-10-17.
 */
@Service
@Transactional
public class RoleService {

    @Autowired
    private RoleRepository roleRepository;

    public List<Role> findRoles( RoleType role){
        return roleRepository.findAllByRole( role);
    }

    public Role findRole( RoleType role){
        return roleRepository.findByRole( role);
    }
}

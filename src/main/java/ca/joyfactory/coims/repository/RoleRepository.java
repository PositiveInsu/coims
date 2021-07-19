package ca.joyfactory.coims.repository;

import ca.joyfactory.coims.domain.Role;
import ca.joyfactory.coims.domain.RoleType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

/**
 * Created by Joinsu on 2017-10-17.
 */
@Repository
public interface RoleRepository extends JpaRepository<Role, Long>{

    List<Role> findAllByRole( RoleType role);

    Role findByRole( RoleType role);
}

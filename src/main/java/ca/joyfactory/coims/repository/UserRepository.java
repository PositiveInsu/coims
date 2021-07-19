package ca.joyfactory.coims.repository;

import ca.joyfactory.coims.domain.User;
import ca.joyfactory.coims.domain.UserType;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.Collection;
import java.util.Date;
import java.util.List;

/**
 * Created by Joinsu on 2017-10-03.
 */
@Repository
public interface UserRepository extends JpaRepository< User, Long>{

    User findByEmail( String email);

    List<User> findAllByEmail( String email);

    List<User> findAllByEmailAndType(String email, UserType userType);

    User findByMemberId( String memberID);

    Page<User> findAllByCompanyIdAndTypeIn(Long id, Collection<UserType> staffTypes, Pageable pageRequest);

    User findByEmailAndBirthDate(String email, Date date);

    User findByCompanyIdAndType(Long companyId, UserType boss);
}

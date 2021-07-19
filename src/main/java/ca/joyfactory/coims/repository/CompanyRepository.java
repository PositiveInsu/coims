package ca.joyfactory.coims.repository;

import ca.joyfactory.coims.domain.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

/**
 * Created by Joinsu on 2017-10-03.
 */
@Repository
public interface CompanyRepository extends JpaRepository<Company, Long>{

    Company findByName( String name);
}

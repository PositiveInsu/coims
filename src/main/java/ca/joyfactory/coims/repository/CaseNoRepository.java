package ca.joyfactory.coims.repository;

import ca.joyfactory.coims.domain.CaseNo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by Joinsu on 2018-12-12.
 */
@Repository
public interface CaseNoRepository extends JpaRepository<CaseNo, Long>{
    CaseNo findByCompanyId( long companyId);
}

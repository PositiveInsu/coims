package ca.joyfactory.coims.repository;

import ca.joyfactory.coims.domain.CaseTypeFee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by Joinsu on 2018-08-31.
 */
@Repository
public interface CaseTypeFeeRepository extends JpaRepository<CaseTypeFee, Long>{
    List<CaseTypeFee> findAllByCompanyId(long companyId);

    CaseTypeFee findByCaseTypeIdAndCompanyId(long caseTypeId, long companyId);
}

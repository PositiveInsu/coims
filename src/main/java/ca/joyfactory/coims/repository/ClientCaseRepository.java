package ca.joyfactory.coims.repository;

import ca.joyfactory.coims.domain.CaseGrade;
import ca.joyfactory.coims.domain.ClientCase;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigInteger;
import java.util.List;

/**
 * Created by Joinsu on 2018-12-11.
 */
@Repository
public interface ClientCaseRepository extends JpaRepository<ClientCase, Long>, JpaSpecificationExecutor<ClientCase> {
    long countByUserId( long userId);

    long countByUserIdAndCaseGrade(Long userId, CaseGrade caseGrade);

    Page<ClientCase> findAllByCompanyIdAndCaseGrade(long companyId, CaseGrade caseGrade, Pageable pageRequest);

    @Query(value = "SELECT DISTINCT year(c.created_date) FROM client_case c where c.company_id = ?1", nativeQuery = true)
    List<BigInteger> concatYear( long companyId);

    List<ClientCase> findAllByCaseNoAndCompanyId(String caseNo, long companyId);
}

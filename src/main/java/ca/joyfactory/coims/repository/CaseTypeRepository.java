package ca.joyfactory.coims.repository;

import ca.joyfactory.coims.domain.CaseType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by Joinsu on 2018-09-12.
 */
@Repository
public interface CaseTypeRepository extends JpaRepository<CaseType, Long>{
    List<CaseType> findByCompanyId(Long companyId);

    CaseType findByCode(String testCode);

    CaseType findByCodeAndCompanyId(String code, Long companyId);

}

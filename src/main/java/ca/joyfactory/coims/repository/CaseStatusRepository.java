package ca.joyfactory.coims.repository;

import ca.joyfactory.coims.domain.CaseStatus;
import ca.joyfactory.coims.domain.CaseStatusType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * Created by Joinsu on 2018-12-13.
 */
public interface CaseStatusRepository extends JpaRepository<CaseStatus, Long>{
    List<CaseStatus> findAllByCaseStatusType(CaseStatusType caseStatusType);
}

package ca.joyfactory.coims.repository;

import ca.joyfactory.coims.domain.CaseType;
import ca.joyfactory.coims.domain.CaseTypeDocument;
import ca.joyfactory.coims.domain.Document;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by Joinsu on 2018-11-27.
 */
@Repository
public interface CaseTypeDocumentRepository extends JpaRepository<CaseTypeDocument, Long> {

    @Query("select c from CaseTypeDocument c where c.caseType = :caseType and (c.companyId = :companyId or c.companyId = :defaultCompanyId)")
    List<CaseTypeDocument> findByCaseTypeIdAndCompanyIdOrCompanyId( @Param( "caseType")CaseType caseType,
                                                                    @Param( "companyId")long companyId,
                                                                    @Param( "defaultCompanyId")long defaultCompanyId);

    List<CaseTypeDocument> findAllByDocument( Document document);
}

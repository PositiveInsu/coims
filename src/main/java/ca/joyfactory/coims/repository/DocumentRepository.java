package ca.joyfactory.coims.repository;

import ca.joyfactory.coims.domain.Document;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by Joinsu on 2018-09-26.
 */
@Repository
public interface DocumentRepository extends JpaRepository<Document, Long> {
    List<Document> findAllByCompanyId(long companyId);

    Document findByCode(String code);
}









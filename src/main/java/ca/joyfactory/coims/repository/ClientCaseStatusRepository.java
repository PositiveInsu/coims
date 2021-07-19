package ca.joyfactory.coims.repository;

import ca.joyfactory.coims.domain.ClientCase;
import ca.joyfactory.coims.domain.ClientCaseStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by Joinsu on 2019-05-02.
 */
@Repository
public interface ClientCaseStatusRepository extends JpaRepository<ClientCaseStatus, Long> {

    List<ClientCaseStatus> findAllByClientCase(ClientCase clientCase);
}

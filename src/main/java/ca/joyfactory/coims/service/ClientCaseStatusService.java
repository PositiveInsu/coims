package ca.joyfactory.coims.service;

import ca.joyfactory.coims.domain.ClientCase;
import ca.joyfactory.coims.domain.ClientCaseStatus;
import ca.joyfactory.coims.exception.NotFoundDataException;
import ca.joyfactory.coims.repository.ClientCaseStatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by Joinsu on 2019-05-02.
 */
@Service
@Transactional
public class ClientCaseStatusService {

    @Autowired
    ClientCaseStatusRepository clientCaseStatusRepository;

    @Autowired
    ClientCaseService clientCaseService;

    public List<ClientCaseStatus> addStatusPassedDate(String caseNo, long companyId) {
        List<ClientCase> clientCaseList = this.clientCaseService.findAllByCaseNo( caseNo, companyId);
        return addStatusPassedDate( clientCaseList);
    }

    public List<ClientCaseStatus> addStatusPassedDate( List<ClientCase> clientCaseList) {
        List<ClientCaseStatus> addedClientCaseStatusList = new ArrayList<>();
        Date currentDate = new Date();
        for( ClientCase clientCase : clientCaseList){
            ClientCaseStatus clientCaseStatus = new ClientCaseStatus();
            clientCaseStatus.setClientCase( clientCase);
            clientCaseStatus.setCaseStatus( clientCase.getCaseStatus());
            clientCaseStatus.setPassedDate( currentDate);
            ClientCaseStatus addedClientCaseStatus = this.clientCaseStatusRepository.save( clientCaseStatus);
            ExceptionService.checkNullData( clientCaseStatus, "ClientCaseStatus do not added, [ClientCase ID] - " + clientCase.getId());
            addedClientCaseStatusList.add( addedClientCaseStatus);
        }
        return addedClientCaseStatusList;
    }

    public List<ClientCaseStatus> findAllByCaseId(Long caseId) {
        ClientCase clientCase = this.clientCaseService.findById( caseId);
        List<ClientCaseStatus> foundClientCaseStatus = clientCaseStatusRepository.findAllByClientCase( clientCase);
        return foundClientCaseStatus;
    }
}

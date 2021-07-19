package ca.joyfactory.coims.controller;

import ca.joyfactory.coims.domain.ClientCaseStatus;
import ca.joyfactory.coims.service.ClientCaseStatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.List;

/**
 * Created by Joinsu on 2019-05-16.
 */
@Controller
@RequestMapping("/client-case-status")
public class ClientCaseStatusController {

    @Autowired
    ClientCaseStatusService clientCaseStatusService;

    @RequestMapping( value = "/find-list-by-case-id", method = RequestMethod.POST)
    public ResponseEntity findListByCaseId( @RequestBody String caseId){
        List<ClientCaseStatus> clientCaseStatusList = this.clientCaseStatusService.findAllByCaseId( Long.parseLong( caseId));
        for( ClientCaseStatus clientCaseStatus: clientCaseStatusList){
            clientCaseStatus.setClientCase( null);
        }
        return new ResponseEntity( clientCaseStatusList, HttpStatus.OK);
    }
}

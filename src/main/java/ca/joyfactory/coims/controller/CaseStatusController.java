package ca.joyfactory.coims.controller;

import ca.joyfactory.coims.domain.CaseStatus;
import ca.joyfactory.coims.domain.CaseStatusType;
import ca.joyfactory.coims.service.CaseStatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.List;

/**
 * Created by Joinsu on 2019-05-01.
 */
@Controller
@RequestMapping("/case-status")
public class CaseStatusController {

    @Autowired
    CaseStatusService caseStatusService;

    @RequestMapping( value = "/find-all", method = RequestMethod.GET)
    public ResponseEntity findAllCaseStatus(){
        return new ResponseEntity( caseStatusService.findAllCaseStatus(), HttpStatus.OK);
    }

    @RequestMapping( value = "/find-all-by-type", method = RequestMethod.POST)
    public ResponseEntity<List<CaseStatus>> findAllByType(@RequestBody String type){
        CaseStatusType caseStatusType = CaseStatusType.valueOf( type);
        return new ResponseEntity( this.caseStatusService.findAllCaseStatusByType( caseStatusType), HttpStatus.OK);
    }
}

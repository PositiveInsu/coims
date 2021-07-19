package ca.joyfactory.coims.controller;

import ca.joyfactory.coims.domain.CaseTypeFeeDto;
import ca.joyfactory.coims.service.CaseTypeFeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * Created by Joinsu on 2018-11-23.
 */
@Controller
@RequestMapping("/case-type-fee")
public class CaseTypeFeeController {

    @Autowired
    CaseTypeFeeService caseTypeFeeService;

    @RequestMapping( value = "/find-list", method = RequestMethod.POST)
    public ResponseEntity findCaseTypeFeeList(@RequestBody long companyId){
        return new ResponseEntity( caseTypeFeeService.findCaseTypeFeeList( companyId), HttpStatus.OK);
    }

    @RequestMapping( value = "/find", method = RequestMethod.POST)
    public ResponseEntity findCaseTypeFeeByCaseTypeAndCompanyId(@RequestBody CaseTypeFeeDto.ForFindSingleFee request){
        return new ResponseEntity( caseTypeFeeService.findCaseTypeFeeByCaseTypeAndCompanyId( request.getCaseTypeId(), request.getCompanyId()), HttpStatus.OK);
    }
}

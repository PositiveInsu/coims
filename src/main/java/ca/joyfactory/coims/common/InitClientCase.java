package ca.joyfactory.coims.common;

import ca.joyfactory.coims.domain.*;
import ca.joyfactory.coims.service.CaseNoService;
import ca.joyfactory.coims.service.CaseTypeService;
import ca.joyfactory.coims.service.ClientCaseService;
import ca.joyfactory.coims.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Created by Joinsu on 2019-04-26.
 */
@Component
public class InitClientCase {

    @Autowired
    ClientCaseService clientCaseService;

    @Autowired
    UserService userService;

    @Autowired
    CaseTypeService caseTypeService;

    @Autowired
    CaseNoService caseNoService;

    private String caseTypeCodeSP = "SP-NEW";
    private String caseTypeCodeSPEX = "SP-EXT";
    private String clientEmail = "client@jcwins.com";

    public void init() {
        addClientCase();
    }

    private void addClientCase() {
        List<User> clientList = userService.findClientByEmail( clientEmail);
        int index = 0;

        for( User user : clientList){
            ClientCaseFee caseFee = new ClientCaseFee();
            caseFee.setBasic( 100.00);
            caseFee.setDiscount( 10.00);
            caseFee.setExtra( 0.00);
            caseFee.setNote( "Child Fee");
            caseFee.setSubTotal( 90.00);
            caseFee.setTax( 4.5);
            caseFee.setProcessing( 94.5);
            caseFee.setGovernment( 120.00);
            CaseType foundCaseType = null;
            if( index == 0 || index == 1){
                foundCaseType = caseTypeService.findCaseTypeByCode( this.caseTypeCodeSP);
            }else{
                foundCaseType = caseTypeService.findCaseTypeByCode( this.caseTypeCodeSPEX);
            }

            ClientCaseDto.ForNewCase clientCaseInfo = new ClientCaseDto.ForNewCase();
            clientCaseInfo.setUser( user);
            clientCaseInfo.setCaseFee( caseFee);
            clientCaseInfo.setCaseType( foundCaseType);
            clientCaseInfo.setCaseGrade( CaseGrade.MAIN);
            clientCaseInfo.setCompanyId( clientList.get( 0).getCompany().getId());

            Document document = new Document();
            document.setName( "Additional Document For Client");
            document.setCategory( DocumentType.MORE);
            document.setCompanyId( clientList.get( 0).getCompany().getId());
            clientCaseInfo.getDocumentList().add( document);
            caseNoService.addNewCaseNo( clientCaseInfo.getCompanyId());
            String caseNo = caseNoService.getUniqueCaseNo( clientCaseInfo.getCompanyId());

            ClientCase addedClientCase = this.clientCaseService.addNewClientCase( clientCaseInfo, caseNo);
            addedClientCase.setUciNo( 123456 + index);
            this.clientCaseService.modifyUciNo( addedClientCase);
            index++;
        }

    }
}

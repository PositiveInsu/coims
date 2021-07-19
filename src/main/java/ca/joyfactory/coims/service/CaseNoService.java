package ca.joyfactory.coims.service;

import ca.joyfactory.coims.domain.CaseNo;
import ca.joyfactory.coims.exception.NotFoundDataException;
import ca.joyfactory.coims.repository.CaseNoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

/**
 * Created by Joinsu on 2018-12-12.
 */
@Service
@Transactional
public class CaseNoService {
    @Autowired
    CaseNoRepository caseNoRepository;

    @Autowired
    CompanyService companyService;

    public String getUniqueCaseNo( long companyId){
        CaseNo caseNo = caseNoRepository.findByCompanyId( companyId);
        ExceptionService.checkNullData( caseNo, "[CompanyId] " + companyId);
        caseNo = increaseCaseNo( caseNo);
        return caseNo.getCaseNo();
    }

    private CaseNo increaseCaseNo(CaseNo caseNo) {
        caseNo.setCaseNo( increaseNo( caseNo.getCaseNo()));
        CaseNo updatedCaseNo = caseNoRepository.save( caseNo);
        return updatedCaseNo;
    }

    private String increaseNo( String caseNo) {
        Integer no = Integer.parseInt( caseNo);
        no += 1;
        return intToCaseNoString( no);
    }

    public void addNewCaseNo(long companyId){
        CaseNo existedCaseNo = caseNoRepository.findByCompanyId( companyId);
        if( existedCaseNo == null){
            CaseNo caseNo = new CaseNo();
            caseNo.setCaseNo( intToCaseNoString( 0));
            caseNo.setCompany( companyService.findById( companyId));
            CaseNo addedCaseNo = caseNoRepository.save( caseNo);
            ExceptionService.checkNullData( addedCaseNo, "[CompanyId] " + companyId);
        }
    }

    private String intToCaseNoString(int no) {
        return String.format( "%08d", no);
    }
}

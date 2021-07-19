package ca.joyfactory.coims.service;

import ca.joyfactory.coims.domain.CaseStatus;
import ca.joyfactory.coims.domain.CaseStatusType;
import ca.joyfactory.coims.exception.NotFoundDataException;
import ca.joyfactory.coims.repository.CaseStatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Comparator;
import java.util.List;

/**
 * Created by Joinsu on 2018-12-13.
 */
@Service
@Transactional
public class CaseStatusService {

    @Autowired
    CaseStatusRepository caseStatusRepository;

    public List<CaseStatus> findAllCaseStatus() {
        return caseStatusRepository.findAll();
    }

    public List<CaseStatus> findCaseStatus( CaseStatusType caseStatusType) {
        List<CaseStatus> foundCaseStatusList = caseStatusRepository.findAllByCaseStatusType( caseStatusType);
        ExceptionService.checkNullData( foundCaseStatusList, "[CaseStatusType] " + caseStatusType);
        caseStatusSort( foundCaseStatusList);
        return foundCaseStatusList;
    }

    public CaseStatus findFirstCaseStatus( CaseStatusType statusType) {
        List<CaseStatus> caseStatusList = findCaseStatus( statusType);
        return caseStatusList.get(0);
    }

    private void caseStatusSort(List<CaseStatus> caseStatusList) {
        caseStatusList.sort( Comparator.comparing( CaseStatus::getStepNo));

    }

    public CaseStatus findNextStatus(CaseStatus caseStatus) {
        List<CaseStatus> caseStatusList = findCaseStatus( caseStatus.getCaseStatusType());
        if( isLastStatus( caseStatus, caseStatusList)){
            return caseStatus;
        }else{
            int index = 0;
            for( CaseStatus obj: caseStatusList){
                index += 1;
                if( caseStatus.getStepNo() == obj.getStepNo()){
                    break;
                }
            }
            return caseStatusList.get( index);
        }
    }

    private boolean isLastStatus( CaseStatus currentCaseStatus, List<CaseStatus> caseStatusList) {
        CaseStatus lastCaseStatus = caseStatusList.get( caseStatusList.size() - 1);
        if( currentCaseStatus.getStepNo() == lastCaseStatus.getStepNo()){
            return true;
        }
        return false;
    }

    public CaseStatusType getCaseStatusTypeFromCaseTypeCode( String caseTypeCode){
        return CaseStatusType.COMMON;
    }

    public CaseStatus findCaseStatusById( Long caseStatusId) {
        CaseStatus caseStatus = caseStatusRepository.findById( caseStatusId).get();
        ExceptionService.checkNullData( caseStatus, "[CaseStatus ID] " + caseStatusId);
        return caseStatus;
    }

    public List<CaseStatus> findAllCaseStatusByType(CaseStatusType statusType) {
        List<CaseStatus> foundStatusList = caseStatusRepository.findAllByCaseStatusType( statusType);
        ExceptionService.checkNullData( foundStatusList, "[CaseStatusType] " + statusType);
        return foundStatusList;
    }
}

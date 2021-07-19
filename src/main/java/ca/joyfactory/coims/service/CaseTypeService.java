package ca.joyfactory.coims.service;

import ca.joyfactory.coims.domain.*;
import ca.joyfactory.coims.exception.NotFoundDataException;
import ca.joyfactory.coims.repository.CaseTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

/**
 * Created by Joinsu on 2018-09-12.
 */
@Service
@Transactional
public class CaseTypeService {

    @Autowired
    CaseTypeRepository caseTypeRepository;

    @Autowired
    CompanyService companyService;

    @Autowired
    CaseTypeFeeService caseTypeFeeService;

    @Autowired
    CaseTypeDocumentService caseTypeDocumentService;

    @Autowired
    DocumentService documentService;

    public List<CaseType> findDefaultCaseTypeList(){
        return findCaseTypeList( -1L);
    }

    public List<CaseType> findDefaultCaseTypeList( long companyId){
        List<CaseType> caseTypeList = findCaseTypeList( -1L);
        addCompanyCaseType( companyId, caseTypeList);
        return caseTypeList;
    }

    private void addCompanyCaseType( long companyId, List<CaseType> caseTypeList) {
        List<CaseType> companyCaseTypeList = findCaseTypeList( companyId);
        if( companyCaseTypeList != null && companyCaseTypeList.size() > 0){
            for( CaseType caseType: companyCaseTypeList){
                caseTypeList.add( caseType);
            }
        }
    }

    public List<CaseType> findDefaultUsingCaseTypeList(){
        return getUsingCaseTypeList( this.findDefaultCaseTypeList());
    }

    private List<CaseType> getUsingCaseTypeList( List<CaseType> defaultCaseTypeList) {
        List<CaseType> usingCaseTypeList = new ArrayList<>();
        for( CaseType caseType : defaultCaseTypeList){
            if( !caseType.isHasChild()){
                usingCaseTypeList.add( caseType);
            }
        }
        return usingCaseTypeList;
    }

    public List<CaseType> findCaseTypeList( long companyId){
        List<CaseType> caseTypeList = caseTypeRepository.findByCompanyId( companyId);
        return caseTypeList;
    }

    public CaseType findCaseTypeByCode( String code) {
        CaseType foundCaseType = caseTypeRepository.findByCode( code);
        ExceptionService.checkNullData( foundCaseType, "[CaseType Code] " + code);
        return foundCaseType;
    }

    public CaseType findCaseTypeById( Long id) {
        CaseType foundCaseType = caseTypeRepository.findById( id).get();
        ExceptionService.checkNullData( foundCaseType, "[CaseType ID] " + id);
        return foundCaseType;
    }

    public CaseType findCaseTypeByCodeAndCompanyId( String code, Long companyId){
        CaseType foundCaseType = caseTypeRepository.findByCodeAndCompanyId( code, companyId);
        ExceptionService.checkNullData( foundCaseType, "[CaseType Code] " + code + " [Company ID] " + companyId);
        return foundCaseType;
    }

    public CaseType addCaseType( CaseType caseType) {
        return caseTypeRepository.save( caseType);
    }

    public CaseType addChildCaseType(Long parentCaseTypeId, CaseType childCaseType) {
        CaseType parentCaseType = caseTypeRepository.findById( parentCaseTypeId).get();
        ExceptionService.checkNullData( parentCaseType, "[CaseType ID] " + parentCaseTypeId);

        childCaseType.setPid( parentCaseType.getId());
        CaseType addedChildCaseType = caseTypeRepository.save( childCaseType);
        updateParetnCaseType( parentCaseType);

        return addedChildCaseType;
    }

    private void updateParetnCaseType( CaseType parentCaseType) {
        parentCaseType.setHasChild( true);
        caseTypeRepository.save( parentCaseType);
    }

    public void deleteCaseTypeById( Long id) {
        caseTypeRepository.deleteById( id);
    }

    public CaseType addCaseTypeDocument(Long caseTypeId, long documentId) {
        CaseType foundCaseType = this.findCaseTypeById( caseTypeId);
        ExceptionService.checkNullData( foundCaseType, "[CaseType ID] " + caseTypeId);
        Document document = documentService.findDocumentById( documentId);

        if( !isExistDocument( foundCaseType.getCaseTypeDocumentList(), document)){
            CaseTypeDocument caseTypeDocument = new CaseTypeDocument();
            caseTypeDocument.setDocument( document);
            caseTypeDocument.setCompanyId( document.getCompanyId());
            foundCaseType.addCaseTypeDocument( caseTypeDocument);
            CaseType returnedCaseType = caseTypeRepository.save( foundCaseType);
            ExceptionService.checkNullData( returnedCaseType, "[CaseType ID] " + caseTypeId);
            return returnedCaseType ;
        }else{
            return foundCaseType;
        }
    }

    public void deleteCaseTypeDocument(Long caseTypeId, long documentId) {
        CaseType caseType = this.findCaseTypeById( caseTypeId);
        Document document = documentService.findDocumentById( documentId);
        List<CaseTypeDocument> caseTypeDocumentList = caseType.getCaseTypeDocumentList();

        Iterator<CaseTypeDocument> itr = caseTypeDocumentList.iterator();
        while (itr.hasNext()) {
            CaseTypeDocument caseTypeDocument = itr.next();

            if (caseTypeDocument.getDocument().getId() == document.getId()) {
                itr.remove();
            }
        }

        caseType.setCaseTypeDocumentList( caseTypeDocumentList);
        caseTypeRepository.save( caseType);
    }

    public void addDocumentListById(Long caseTypeId, List<Document> documentList) {
        CaseType caseType = this.findCaseTypeById( caseTypeId);
        List<CaseTypeDocument> caseTypeDocumentList = caseType.getCaseTypeDocumentList();

        for( Document document: documentList){
            if( !isExistDocument( caseTypeDocumentList, document)){
                CaseTypeDocument caseTypeDocument = new CaseTypeDocument();
                caseTypeDocument.setDocument( document);
                caseTypeDocument.setCompanyId( document.getCompanyId());
                caseType.addCaseTypeDocument( caseTypeDocument);
            }
        }
        caseTypeRepository.save( caseType);
    }

    private boolean isExistDocument(List<CaseTypeDocument> caseTypeDocumentList, Document document) {
        for( CaseTypeDocument caseTypeDocument : caseTypeDocumentList){
            if( caseTypeDocument.getDocument().getId() == document.getId()){
                return true;
            }
        }
        return false;
    }

    public CaseType findDocumentListByCompanyId(Long caseTypeId, long companyId) {
        CaseType caseType = this.findCaseTypeById( caseTypeId);
        List<CaseTypeDocument> caseTypeDocumentList = caseTypeDocumentService.findDocumentListByTypeAndCompanyId( caseType, companyId);
        caseType.setCaseTypeDocumentList( caseTypeDocumentList);
        return caseType;
    }

    public CaseType modifyGovernmentFeeToCaseType(String targetCaseTypeCode, double governmentFee) {
        CaseType caseType = this.findCaseTypeByCode( targetCaseTypeCode);
        caseType.setGovernmentFee( governmentFee);
        return caseTypeRepository.save( caseType);
    }

    public List<CaseType> modifyGovernmentFeeByCaseTypeList(List<CaseType> caseTypeList) {
        ExceptionService.checkNullData( caseTypeList, ", Request Data is null");

        for( CaseType caseType : caseTypeList){
            CaseType foundCaseType = caseTypeRepository.findById( caseType.getId()).get();
            if( isDifferentFeeData( foundCaseType, caseType)){
                foundCaseType.setGovernmentFee( caseType.getGovernmentFee());
                caseTypeRepository.save( foundCaseType);
            }
        }

        return this.findDefaultCaseTypeList();
    }

    private boolean isDifferentFeeData(CaseType foundCaseType, CaseType modifyCaseType) {
        if( foundCaseType.getGovernmentFee() != modifyCaseType.getGovernmentFee()){
            return true;
        }else{
            return false;
        }
    }
}

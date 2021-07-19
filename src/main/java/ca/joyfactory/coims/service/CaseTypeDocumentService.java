package ca.joyfactory.coims.service;

import ca.joyfactory.coims.domain.CaseType;
import ca.joyfactory.coims.domain.CaseTypeDocument;
import ca.joyfactory.coims.domain.Company;
import ca.joyfactory.coims.domain.Document;
import ca.joyfactory.coims.exception.FileControlException;
import ca.joyfactory.coims.exception.NotFoundDataException;
import ca.joyfactory.coims.repository.CaseTypeDocumentRepository;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.io.*;
import java.util.List;

/**
 * Created by Joinsu on 2018-11-27.
 */
@Service
@Transactional
public class CaseTypeDocumentService {
    @Autowired
    CaseTypeDocumentRepository caseTypeDocumentRepository;



    @Autowired
    DocumentService documentService;

    @Autowired
    CompanyService companyService;

    @Autowired
    ExcelFileService excelFileService;

    @Autowired
    CaseTypeService caseTypeService;

    public List<CaseTypeDocument> findDocumentListByTypeAndCompanyId( CaseType caseType, long companyId) {
        List<CaseTypeDocument> caseTypeDocumentList = caseTypeDocumentRepository.findByCaseTypeIdAndCompanyIdOrCompanyId( caseType, companyId, Company.DEFAULT_ID);
        ExceptionService.checkNullData( caseTypeDocumentList, getEvidenceMessage( companyId, caseType.getId()));
        return caseTypeDocumentList;
    }

    public void deleteCaseTypeDocumentByDocumentId(long documentId) {
        Document document = documentService.findDocumentById( documentId);
        this.deleteCaseTypeDocumentByDocument( document);
    }

    public void deleteCaseTypeDocumentByDocument(Document document) {
        List<CaseTypeDocument> targetCaseTypeDocumentList = caseTypeDocumentRepository.findAllByDocument( document);
        ExceptionService.checkNullData( targetCaseTypeDocumentList, "[DocumentId] " + document.getId());

        for( CaseTypeDocument targetCaseTypeDocument: targetCaseTypeDocumentList){
            CaseType caseType = targetCaseTypeDocument.getCaseType();
            caseTypeService.deleteCaseTypeDocument( caseType.getId(), targetCaseTypeDocument.getDocument().getId());
        }
    }

    public byte[] getCaseTypeDocumentListExcelFile(Long caseTypeId, Long companyId) {
        Company company = this.companyService.findById( companyId);
        CaseType caseType = this.caseTypeService.findCaseTypeById( caseTypeId);
        List<CaseTypeDocument> caseTypeDocumentList = this.findDocumentListByTypeAndCompanyId( caseType, companyId);
        byte[] byteList = null;

        try{
            byteList = excelFileService.getCaseTypeDocumentListExcelFile( company, caseType, caseTypeDocumentList);
        } catch (FileNotFoundException e) {
            throw new FileControlException( e, getEvidenceMessage( companyId, caseTypeId));
        } catch (IOException e) {
            throw new FileControlException( e, getEvidenceMessage( companyId, caseTypeId));
        }

        return byteList;
    }

    private String getEvidenceMessage( Long companyId, Long caseTypeId){
        return "[Company ID] - " + companyId + " [CaseType ID] - " + caseTypeId;
    }
}








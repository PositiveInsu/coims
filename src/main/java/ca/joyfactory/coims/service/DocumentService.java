package ca.joyfactory.coims.service;

import ca.joyfactory.coims.domain.*;
import ca.joyfactory.coims.exception.NotFoundDataException;
import ca.joyfactory.coims.repository.DocumentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

/**
 * Created by Joinsu on 2018-09-26.
 */
@Service
@Transactional
public class DocumentService {

    @Autowired
    DocumentRepository documentRepository;

    @Autowired
    CaseTypeDocumentService caseTypeDocumentService;

    @Autowired
    ClientCaseService clientCaseService;

    @Autowired
    StorageService storageService;

    public Document addDocument( Document document) {
        Document addedDocument = documentRepository.save( document);
        ExceptionService.checkNullData( addedDocument, "[Document Name]" + document.getName());
        return addedDocument;
    }

    public void deleteDocumentById(long documentId) {
        caseTypeDocumentService.deleteCaseTypeDocumentByDocumentId( documentId);
        documentRepository.deleteById( documentId);
    }

    public List<Document> findDocumentListByCompanyId(long companyId) {
        List<Document> foundDocumentList = documentRepository.findAllByCompanyId( companyId);
        ExceptionService.checkNullData( foundDocumentList, "[Company ID]" + companyId);
        return foundDocumentList;
    }

    public Document modifyDocument(Document document) {
        Document foundDocument = this.documentRepository.findById( document.getId()).get();
        ExceptionService.checkNullData( foundDocument, "[Document ID]" + document.getId());
        foundDocument.setName( document.getName());
        return this.documentRepository.save( foundDocument);
    }

    public List<Document> findDefaultDocumentList() {
        return documentRepository.findAllByCompanyId( -1L);
    }

    public Document findDocumentByCode(String code) {
        Document foundDocument = documentRepository.findByCode( code);
        ExceptionService.checkNullData( foundDocument, "[Document Code]" + code);
        return foundDocument;
    }

    public Document findDocumentById( long documentId) {
        Document foundDocument = documentRepository.findById( documentId).get();
        ExceptionService.checkNullData( foundDocument, "[Document ID]" + documentId);
        return foundDocument;
    }
}

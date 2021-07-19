package ca.joyfactory.coims.service;

import ca.joyfactory.coims.domain.*;
import ca.joyfactory.coims.exception.FileControlException;
import ca.joyfactory.coims.repository.ClientCaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.io.*;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static ca.joyfactory.coims.common.ClientCaseSpecifications.*;

/**
 * Created by Joinsu on 2018-12-11.
 */
@Service
@Transactional
public class ClientCaseService {

    @Autowired
    ClientCaseRepository clientCaseRepository;

    @Autowired
    CompanyService companyService;

    @Autowired
    CaseTypeService caseTypeService;

    @Autowired
    CaseNoService caseNoService;

    @Autowired
    CaseStatusService caseStatusService;

    @Autowired
    DocumentService documentService;

    @Autowired
    StorageService storageService;

    @Autowired
    UserService userService;

    @Autowired
    RoleService roleService;

    @Autowired
    ClientCaseStatusService clientCaseStatusService;

    @Autowired
    ExcelFileService excelFileService;

    public List< ClientCase> addNewClientCase( List<ClientCaseDto.ForNewCase> newClientCaseList) {

        List<ClientCase> addedClientCaseList = new ArrayList<>();
        String caseNo = caseNoService.getUniqueCaseNo( newClientCaseList.get( 0).getCompanyId());
        for( ClientCaseDto.ForNewCase newClientCase: newClientCaseList){
            addedClientCaseList.add( addNewClientCase( newClientCase, caseNo));
        }
        return addedClientCaseList;
    }

    public ClientCase addNewClientCase(ClientCaseDto.ForNewCase clientCaseInfo, String caseNo) {
        ClientCase clientCase = new ClientCase();

        Company company = companyService.findById( clientCaseInfo.getCompanyId());
        User client = setClientUser( clientCaseInfo, company);

        ClientCaseFee clientCaseFee = clientCaseInfo.getCaseFee();
        CaseType caseType = caseTypeService.findCaseTypeByCode( clientCaseInfo.getCaseType().getCode());

        clientCase.setCaseGrade( clientCaseInfo.getCaseGrade());
        clientCase.setUser( client);
        clientCase.setCompany( company);
        clientCase.setCaseFee( clientCaseFee);
        clientCase.setCaseType( caseType);
        clientCase.setCaseNo( caseNo);
        clientCase.setCaseStatus( caseStatusService.findFirstCaseStatus( caseStatusService.getCaseStatusTypeFromCaseTypeCode( caseType.getCode())));
        clientCase.setCaseGrade( clientCaseInfo.getCaseGrade());
        clientCase.setPayStatus( PayStatus.UNPAID);
        clientCase.setCreatedDate( new Date());

        setDocumentListToClientCase( clientCase, clientCaseInfo.getDocumentList());

        ClientCase addedClientCase = clientCaseRepository.save( clientCase);
        ExceptionService.checkNullData( addedClientCase, "[ClientCase Name] " + client.getfName() +  " " + client.getlName());
        return addedClientCase;
    }


    private void setDocumentListToClientCase(ClientCase clientCase, List<Document> documentList) {
        List<Document> clientCaseDocumentList =  new ArrayList<>();

        for( Document caseDocument : documentList) {
            setCaseDocument( clientCaseDocumentList, caseDocument);
        }

        setClientCaseDocumentListToClientCase( clientCase, clientCaseDocumentList);
    }


    private void setCaseDocument(List<Document> clientCaseDocumentList, Document caseDocument) {
        Document document = new Document();
        document.setName( caseDocument.getName());
        document.setCategory( caseDocument.getCategory());
        document.setCompanyId( caseDocument.getCompanyId());
        if( caseDocument.getCategory().equals( DocumentType.MORE)){
            Document addedDocument = documentService.addDocument( document);
            clientCaseDocumentList.add( addedDocument);
        }else{
            document.setId( caseDocument.getId());
            clientCaseDocumentList.add( document);
        }
    }

    private void setClientCaseDocumentListToClientCase(ClientCase clientCase, List<Document> defaultDocumentList) {
        for( Document document: defaultDocumentList){
            ClientCaseDocument clientCaseDocument = new ClientCaseDocument();
            clientCaseDocument.setDocument( document);
            clientCaseDocument.setClientCase( clientCase);
        }
    }


    private User setClientUser(ClientCaseDto.ForNewCase clientCaseInfo, Company company) {
        User user = clientCaseInfo.getUser();

        if( user.getEmail() != null && user.getId() != null){
            User foundUser = userService.findUserById( user.getId());
            if( userService.isNotNullUser( foundUser)){
                setUserTypeAndStatus( foundUser, clientCaseInfo);
                return foundUser;
            }
        }

        user.setCompany( company);
        user.setType( UserType.CLIENT);
        user = setUserTypeAndStatus( user, clientCaseInfo);
        user = userService.setDateInfo( user);
        user.setRole( roleService.findRole( RoleType.USER));
        user.setPassword( userService.getClientDefaultPassword());

        return user;
    }

    private User setUserTypeAndStatus(User user, ClientCaseDto.ForNewCase clientCaseInfo) {
        if( clientCaseInfo.getCaseGrade().equals(CaseGrade.MAIN)){
            user.setStatus( UserStatus.ACTIVE);
        }else{
            user.setStatus( UserStatus.DEPENDENT);
        }

        return user;
    }

    public long countClientCaseByUserId(Long userId) {
        long count = clientCaseRepository.countByUserId( userId);
        return count;
    }

    public long countClientCaseByUserIdAndCaseGrade(Long userId, CaseGrade caseGrade) {
        long count = clientCaseRepository.countByUserIdAndCaseGrade( userId, caseGrade);
        return count;
    }

    public List<ClientCaseDto.ForCountClientCase> countMainAndDependentClientCase(List<User> clientList) {
        List<ClientCaseDto.ForCountClientCase> countClientCaseList = new ArrayList<>();
        for( User user: clientList){
            ClientCaseDto.ForCountClientCase countClientCase = new ClientCaseDto.ForCountClientCase();
            countClientCase.setUserId( user.getId());
            countClientCase.setCountMainCase( this.countClientCaseByUserIdAndCaseGrade( user.getId(), CaseGrade.MAIN));
            countClientCase.setCountDependentCase( this.countClientCaseByUserIdAndCaseGrade( user.getId(), CaseGrade.DEPENDENT));
            countClientCaseList.add( countClientCase);
        }
        return countClientCaseList;
    }

    public Page<ClientCase> findMainCasesByCompanyId(long companyId, Pageable pageRequest) {
        return clientCaseRepository.findAllByCompanyIdAndCaseGrade( companyId, CaseGrade.MAIN, pageRequest);
    }

    public Page<ClientCase> findMainCasesBySearchDto(long companyId, SearchDto.ForCaseSearch caseSearchDto, Pageable pageRequest) {
        Company company = companyService.findById( companyId);
        Page<ClientCase> resultList = clientCaseRepository.findAll( getQuery( company, caseSearchDto, CaseGrade.MAIN), pageRequest);
        return resultList;
    }

    private Specification<ClientCase> getQuery( Company company, SearchDto.ForCaseSearch caseSearchDto, CaseGrade caseGrade) {
        List<Specification<ClientCase>> specList = new ArrayList<>();

        specList.add( hasCompany( company));

        if( caseGrade != null){
            specList.add( hasCaseGrade( caseGrade));
        }

        if( caseSearchDto.getFirstName() != null){
            specList.add( hasUser( caseSearchDto.getFirstName()));
        }

        if( caseSearchDto.getUciNo() != null){
            specList.add( hasUCINo( caseSearchDto.getUciNo()));
        }

        if( caseSearchDto.getFileNo() != null){
            specList.add( hasFileNo( caseSearchDto.getFileNo()));
        }

        if( caseSearchDto.getCaseNo() != null){
            specList.add( hasCaseNo( caseSearchDto.getCaseNo()));
        }

        if( caseSearchDto.getCaseCode() != null){
            CaseType caseType = caseTypeService.findCaseTypeByCode( caseSearchDto.getCaseCode());
            specList.add( hasCaseType( caseType));
        }

        if( caseSearchDto.getCaseStatusId() != null){
            CaseStatus caseStatus = caseStatusService.findCaseStatusById( caseSearchDto.getCaseStatusId());
            specList.add( hasCaseStatus( caseStatus));
        }

        if( caseSearchDto.getCaseYear() != null){
            specList.add( hasOverYear( caseSearchDto.getCaseYear()));
            specList.add( hasLessYear( caseSearchDto.getCaseYear()));
        }

        return combineSpecification( specList);
    }

    private Specification<ClientCase> combineSpecification(List<Specification<ClientCase>> specList) {
        Specification<ClientCase> completeQuery = Specification.where( specList.get(0));
        if( specList.size() > 1){
            for( int i = 1; i < specList.size(); i++){
                completeQuery = completeQuery.and( specList.get( i));
            }
        }
        return completeQuery;
    }

    public List<BigInteger> findAllYear( long companyId) {
        return this.clientCaseRepository.concatYear( companyId);
    }

    public ClientCase findById( long id) {
        ClientCase foundClientCase = this.clientCaseRepository.findById( id).get();
        ExceptionService.checkNullData( foundClientCase, "[ClientCase Id] " + id);
        return foundClientCase;
    }

    public List<ClientCase> findAllByCaseNo(String caseNo, long companyId) {
        List<ClientCase> foundClientCaseList = this.clientCaseRepository.findAllByCaseNoAndCompanyId( caseNo, companyId);
        ExceptionService.checkNullData( foundClientCaseList, getErrorArgument( caseNo, companyId));
        return foundClientCaseList;
    }

    public ClientCase modifyUciNo( ClientCase clientCase) {
        ClientCase foundClientCase = this.clientCaseRepository.findById( clientCase.getId()).get();
        ExceptionService.checkNullData( foundClientCase, "[ClientCase Id] " + clientCase.getId());
        if( foundClientCase.getUciNo() != clientCase.getUciNo()){
            foundClientCase.setUciNo( clientCase.getUciNo());
            return this.clientCaseRepository.save( foundClientCase);
        }
        return clientCase;
    }

    public ClientCase addStatusPassedDate( Long id) {
        ClientCase foundClientCase = this.clientCaseRepository.findById( id).get();
        ExceptionService.checkNullData( foundClientCase, "[ClientCase Id] " + id);
        ClientCaseStatus clientCaseStatus = new ClientCaseStatus();
        clientCaseStatus.setCaseStatus( foundClientCase.getCaseStatus());
        clientCaseStatus.setPassedDate( new Date());
        foundClientCase.addClientCaseStatus( clientCaseStatus);
        ClientCase modifiedClientCase = this.clientCaseRepository.save( foundClientCase);
        return modifiedClientCase;
    }

    private boolean isEqualDocument( ClientCaseDocument document, long docId) {
        if( document.getDocument().getId() == docId){
            return true;
        }
        return false;
    }

    public String addFileToCaseDocument(FileDto.ForDocumentFile fileDto) {
        ClientCase foundClientCase = clientCaseRepository.findById( fileDto.getCaseId()).get();
        ExceptionService.checkNullData( foundClientCase, "[ClientCase Id] " + fileDto.getCaseId());
        List<ClientCaseDocument> documentList = foundClientCase.getCaseDocumentList();
        String fileName = "";
        for( ClientCaseDocument document : documentList){
            if( isEqualDocument( document, fileDto.getDocId())){
                FileDto.ForAfterStore result = this.storageService.store( fileDto.getFile(), foundClientCase, document.getDocument().getName());
                fileName = result.getOriginalName();
                document.setFilePath( this.getFilePath( result));
            }
        }
        foundClientCase.setCaseDocumentList( documentList);
        clientCaseRepository.save( foundClientCase);
        return fileName;
    }

    private FilePath getFilePath( FileDto.ForAfterStore result) {
        FilePath filePath = new FilePath();
        filePath.setOriginName( result.getOriginalName());
        filePath.setFilePath( result.getFilePath());
        return filePath;
    }

    public boolean deleteFileFromCaseDocument(FileDto.ForDocumentFile fileDto) {
        ClientCase foundClientCase = clientCaseRepository.findById( fileDto.getCaseId()).get();
        ExceptionService.checkNullData( foundClientCase, "[ClientCase ID] " + fileDto.getCaseId());
        List<ClientCaseDocument> documentList = foundClientCase.getCaseDocumentList();
        boolean resultFlag = false;

        for( ClientCaseDocument document : documentList){
            if( isEqualDocument( document, fileDto.getDocId())){
                resultFlag = this.storageService.delete( document.getFilePath().getFilePath());
                document.setFilePath( null);
            }
        }

        foundClientCase.setCaseDocumentList( documentList);
        clientCaseRepository.save( foundClientCase);

        return resultFlag;
    }

    public List<ClientCase> changeCaseStatus(String caseNo, Long companyId) {
        List<ClientCase> foundClientCaseList = this.clientCaseRepository.findAllByCaseNoAndCompanyId( caseNo, companyId);
        ExceptionService.checkNullData( foundClientCaseList, getErrorArgument( caseNo, companyId));
        clientCaseStatusService.addStatusPassedDate( foundClientCaseList);
        return changeNextCaseStatus( foundClientCaseList);
    }

    private List<ClientCase> changeNextCaseStatus( List<ClientCase> foundClientCaseList) {
        List<ClientCase> modifiedClientCaseList = new ArrayList<>();
        for( ClientCase clientCase : foundClientCaseList){
            CaseStatus nextCaseStatus = this.caseStatusService.findNextStatus( clientCase.getCaseStatus());
            clientCase.setCaseStatus( nextCaseStatus);
            ClientCase modifiedClientCase = this.clientCaseRepository.save( clientCase);
            ExceptionService.checkNullData( modifiedClientCase, "[ClientCase ID] " + clientCase.getId());
            modifiedClientCaseList.add( modifiedClientCase);
        }
        return modifiedClientCaseList;
    }

    public byte[] getInvoiceExcelFile(String caseNo, long companyId) {
        List<ClientCase> foundClientCaseList = this.clientCaseRepository.findAllByCaseNoAndCompanyId( caseNo, companyId);
        ExceptionService.checkNullData( foundClientCaseList, getErrorArgument( caseNo, companyId));
        byte[] fileByteArray = null;

        try {
            fileByteArray = this.excelFileService.getInvoiceExcelFile( foundClientCaseList);
        }catch (FileNotFoundException e) {
            throw new FileControlException(e, "Error creating case invoice excel file. " + getErrorArgument( caseNo, companyId));
        } catch (IOException e) {
            throw new FileControlException(e, "Error creating case invoice excel file. " + getErrorArgument( caseNo, companyId));
        }
        return fileByteArray;
    }

    public byte[] getReceiptExcelFile(String caseNo, long companyId) {
        List<ClientCase> foundClientCaseList = this.clientCaseRepository.findAllByCaseNoAndCompanyId( caseNo, companyId);
        ExceptionService.checkNullData( foundClientCaseList, getErrorArgument( caseNo, companyId));

        byte[] fileByteArray = null;

        try {
            fileByteArray = this.excelFileService.getReceiptExcelFile( foundClientCaseList);
        }catch (FileNotFoundException e) {
            throw new FileControlException(e, "Error creating case invoice excel file. " + getErrorArgument( caseNo, companyId));
        } catch (IOException e) {
            throw new FileControlException(e, "Error creating case invoice excel file. " + getErrorArgument( caseNo, companyId));
        }
        return fileByteArray;
    }

    private String getErrorArgument(String caseNo, long companyId) {
        return "[ClientCase Case Number] " + caseNo + " [Company ID] " + companyId;
    }
}













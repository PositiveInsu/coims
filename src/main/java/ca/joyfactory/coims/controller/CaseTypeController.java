package ca.joyfactory.coims.controller;

import ca.joyfactory.coims.domain.*;
import ca.joyfactory.coims.service.CaseTypeDocumentService;
import ca.joyfactory.coims.service.CaseTypeFeeService;
import ca.joyfactory.coims.service.CaseTypeService;
import ca.joyfactory.coims.service.DocumentService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.ServletContext;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by Joinsu on 2018-09-12.
 */
@Controller
@RequestMapping("/case-type")
public class CaseTypeController {

    @Autowired
    CaseTypeService caseTypeService;

    @Autowired
    CaseTypeFeeService caseTypeFeeService;

    @Autowired
    CaseTypeDocumentService caseTypeDocumentService;

    @Autowired
    DocumentService documentService;

    @Autowired
    ModelMapper modelMapper;

    @Autowired
    ServletContext servletContext;

    @RequestMapping( value = "/find", method = RequestMethod.POST)
    public ResponseEntity findCaseType(@RequestBody String code){
        CaseType caseType = caseTypeService.findCaseTypeByCode( code);
        return new ResponseEntity( getCaseTypeDtoAfterSetData( caseType), HttpStatus.OK);
    }

    @RequestMapping( value = "/find-list", method = RequestMethod.POST)
    public ResponseEntity findCaseTypeList(@RequestBody long companyId){
        List< CaseType> caseTypeList = caseTypeService.findDefaultCaseTypeList( companyId);
        List<CaseTypeDto.ForResponse> resultCaseTypeList = new ArrayList<>();

        for( CaseType caseType : caseTypeList){
            resultCaseTypeList.add( getCaseTypeDtoAfterSetData( caseType));
        }
        // TODO: 두번 호출 하지 않고 한번의 쿼리로 CaseTypeFee Table 까지 조회할 수 있도록 변경
        setFeeToCaseType( resultCaseTypeList, companyId);

        return new ResponseEntity( resultCaseTypeList, HttpStatus.OK);
    }

    private CaseTypeDto.ForResponse getCaseTypeDtoAfterSetData(CaseType caseType) {
        CaseTypeDto.ForResponse caseTypeDto= new CaseTypeDto.ForResponse();
        caseTypeDto.setName( caseType.getName());
        caseTypeDto.setCode( caseType.getCode());
        caseTypeDto.setId( caseType.getId());
        caseTypeDto.setPid( caseType.getPid());
        caseTypeDto.setCompanyId( caseType.getCompanyId());
        caseTypeDto.setHasChild( caseType.isHasChild());
        caseTypeDto.setCategory( caseType.getCategory());
        caseTypeDto.setParentCaseType( caseType.getParentCaseType());
        caseTypeDto.setGovernmentFee( caseType.getGovernmentFee());
        List<Document> documentList = new ArrayList<>();
        for(CaseTypeDocument caseTypeDocument : caseType.getCaseTypeDocumentList()){
            documentList.add( caseTypeDocument.getDocument());
        }
        caseTypeDto.setDocumentList( documentList);
        return caseTypeDto;
    }

    private void setFeeToCaseType(List<CaseTypeDto.ForResponse> caseTypeList, Long companyId) {
        List<CaseTypeFee> caseTypeFeeList = this.caseTypeFeeService.findCaseTypeFeeList( companyId);
        for( CaseTypeDto.ForResponse caseType : caseTypeList){
            setFee( caseType, caseTypeFeeList);
        }
    }

    private void setFee(CaseTypeDto.ForResponse caseType, List<CaseTypeFee> caseTypeFeeList) {
        for( CaseTypeFee caseTypeFee : caseTypeFeeList){
            if( caseTypeFee.getCaseTypeId() == caseType.getId()){
                caseType.setFee( caseTypeFee.getFee());
                caseType.setCaseTypeFeeId( caseTypeFee.getId());
            }
        }
    }

    @RequestMapping( value = "/modify-fee-by-list", method = RequestMethod.POST)
    public ResponseEntity modifyCaseTypeFeeByList(@RequestBody List<CaseTypeDto.ForResponse> modifyCaseTypeList){
        List<CaseTypeFee> caseTypeFeeList = this.caseTypeFeeService.modifyCaseTypeFeeByCaseTypeList( changeDtoToCaseTypeFeeObj( modifyCaseTypeList));
        long companyId = caseTypeFeeList.get(0).getCompany().getId();
        return this.findCaseTypeList( companyId);
    }

    private List<CaseTypeFee> changeDtoToCaseTypeFeeObj(List<CaseTypeDto.ForResponse> modifyCaseTypeList) {
        List<CaseTypeFee> modifyCaseTypeFeeList = new ArrayList<>();

        for( CaseTypeDto.ForResponse caseType : modifyCaseTypeList){
            CaseTypeFee caseTypeFee = new CaseTypeFee();
            caseTypeFee.setId( caseType.getCaseTypeFeeId());
            caseTypeFee.setCaseTypeId( caseType.getId());
            caseTypeFee.setFee( caseType.getFee());
            modifyCaseTypeFeeList.add( caseTypeFee);
        }

        return modifyCaseTypeFeeList;
    }

    @RequestMapping( value = "/modify-gov-fee-by-list", method = RequestMethod.POST)
    public ResponseEntity modifyGovernmentFeeByList(@RequestBody List<CaseTypeDto.ForResponse> modifyCaseTypeList){
        long companyId = modifyCaseTypeList.get(0).getCompanyId();
        this.caseTypeService.modifyGovernmentFeeByCaseTypeList( changeDtoToCaseTypeObj( modifyCaseTypeList));
        return this.findCaseTypeList( companyId);
    }

    private List<CaseType> changeDtoToCaseTypeObj(List<CaseTypeDto.ForResponse> caseTypeDtoList) {
        List<CaseType> caseTypeList = new ArrayList<>();

        for( CaseTypeDto.ForResponse caseTypeDto : caseTypeDtoList){
            CaseType caseType = new CaseType();
            caseType.setId( caseTypeDto.getId());
            caseType.setGovernmentFee( caseTypeDto.getGovernmentFee());
            caseTypeList.add( caseType);
        }

        return caseTypeList;
    }

    @RequestMapping( value = "/fee-excel", method = RequestMethod.GET)
    public ResponseEntity getCaseTypeFeeExcelFile(@RequestParam( value = "id") String companyId){

        byte[] contents = caseTypeFeeService.getCaseTypeFeeExcelFile( Long.parseLong( companyId));
        ByteArrayResource resource = new ByteArrayResource( contents);

        MediaType mediaType = MediaType.APPLICATION_OCTET_STREAM;

        return ResponseEntity.ok()
                // Content-Disposition
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment;filename=" + "CaseFee.xlsx")
                // Content-Type
                .contentType(mediaType)
                // Contet-Length
                .contentLength( contents.length)
                .body(resource);
    }

    @RequestMapping( value = "modify-additional-doc", method = RequestMethod.POST)
    public ResponseEntity modifyAdditionalDocument(@RequestBody CaseTypeDto.ForAddtionalDoc param){
        long companyId = param.getDocument().getCompanyId();
        Document additionalDocument = new Document();
        additionalDocument.setName( param.getDocument().getName());
        additionalDocument.setCategory( param.getDocument().getCategory());
        additionalDocument.setCompanyId( companyId);
        Document addedDocument = documentService.addDocument( additionalDocument);
        CaseTypeDto.ForResponse caseTypeDto = getCaseTypeDtoAfterSetData( caseTypeService.addCaseTypeDocument( param.getCaseTypeId(), addedDocument.getId()));
        return new ResponseEntity( caseTypeDto, HttpStatus.OK);
    }

    @RequestMapping( value = "delete-additional-doc", method = RequestMethod.DELETE)
    public ResponseEntity deleteAdditionalDocument( @RequestParam(value = "id") Long documentId, @RequestParam(value="caseTypeId") Long caseTypeId){
        documentService.deleteDocumentById( documentId);
        CaseType caseType = caseTypeService.findCaseTypeById( caseTypeId);
        CaseTypeDto.ForResponse caseTypeDto = getCaseTypeDtoAfterSetData( caseType);
        return new ResponseEntity( caseTypeDto , HttpStatus.OK);
    }

    @RequestMapping( value = "down-doc-list", method = RequestMethod.GET)
    public ResponseEntity getCaseTypeDocumentListExcelFile(@RequestParam( value = "id") Long companyId, @RequestParam(value="caseTypeId") Long caseTypeId){

        byte[] contents = caseTypeDocumentService.getCaseTypeDocumentListExcelFile( caseTypeId, companyId);
        ByteArrayResource resource = new ByteArrayResource( contents);

        MediaType mediaType = MediaType.APPLICATION_OCTET_STREAM;

        return ResponseEntity.ok()
                // Content-Disposition
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment;filename=" + "CaseTypeDocumentList.xlsx")
                // Content-Type
                .contentType(mediaType)
                // Contet-Length
                .contentLength( contents.length)
                .body(resource);
    }
}

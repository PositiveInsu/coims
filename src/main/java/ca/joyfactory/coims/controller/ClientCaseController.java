package ca.joyfactory.coims.controller;

import ca.joyfactory.coims.common.CommonUtil;
import ca.joyfactory.coims.domain.*;
import ca.joyfactory.coims.service.ClientCaseService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

/**
 * Created by Joinsu on 2019-04-22.
 */
@Controller
@RequestMapping("/client-case")
public class ClientCaseController {

    @Autowired
    ClientCaseService clientCaseService;

    @Autowired
    ModelMapper modelMapper;

    @RequestMapping( value = "/add", method = RequestMethod.PUT)
    public ResponseEntity addCase( @RequestBody ArrayList<ClientCaseDto.ForNewCase> clientCaseDto){
        List< ClientCase> clientCaseList = clientCaseService.addNewClientCase( clientCaseDto);
        HashMap<String, String> result = new HashMap<>();
        result.put( "caseNo", clientCaseList.get( 0).getCaseNo());
        return new ResponseEntity( result, HttpStatus.OK);
    }

    @RequestMapping( value = "/count-by-user-list", method = RequestMethod.POST)
    public ResponseEntity countCaseByUserList( @RequestBody List<User> clientList){
        List<ClientCaseDto.ForCountClientCase> countClientCaseList = this.clientCaseService.countMainAndDependentClientCase( clientList);
        return new ResponseEntity( countClientCaseList, HttpStatus.OK);
    }

    @RequestMapping( value = "/find-list", method = RequestMethod.POST)
    public ResponseEntity<PageDto> findCaseList( @RequestBody PageDto.WithCaseSearchDto pageDto){
        Pageable pageRequest = CommonUtil.getPageRequest( pageDto.getPageRequest());
        Page<ClientCase> response = this.clientCaseService.findMainCasesBySearchDto( pageDto.getCompanyId(), pageDto.getCaseSearchDto(), pageRequest);
        changeSecureData( response.getContent());
        PageDto responseDto = getResponseDto( response);
        return new ResponseEntity( responseDto, HttpStatus.OK);
    }

    @RequestMapping( value = "/find-list-by-case-no", method = RequestMethod.POST)
    public ResponseEntity<List<ClientCaseDto.ForDetail>> findCaseList( @RequestBody ClientCaseDto.ForCaseNo clientCaseDto){
        List<ClientCaseDto.ForDetail> responseDto = new ArrayList<>();
        List<ClientCase> foundClientCase = this.clientCaseService.findAllByCaseNo( clientCaseDto.getCaseNo(), clientCaseDto.getCompanyId());
        for( ClientCase clientCase : foundClientCase){
            ClientCaseDto.ForDetail mappedData = modelMapper.map( clientCase, ClientCaseDto.ForDetail.class);
            mappedData.getCaseType().setCaseTypeDocumentList( null);
            responseDto.add( mappedData);
        }
        return new ResponseEntity( responseDto, HttpStatus.OK);
    }

    @RequestMapping( value = "/find-all-year", method = RequestMethod.GET)
    public ResponseEntity<List<BigInteger>> findAllYear( @RequestParam( value = "id") String companyId){
        return new ResponseEntity( this.clientCaseService.findAllYear( Long.parseLong( companyId)), HttpStatus.OK);
    }

    private PageDto getResponseDto(Page<ClientCase> response) {
        PageDto responseDto = new PageDto();
        responseDto.setContent( new ArrayList<ClientCaseDto.ForCaseList>());
        for( ClientCase clientCase : response.getContent()){
            responseDto.getContent().add( modelMapper.map( clientCase, ClientCaseDto.ForCaseList.class));
        }
        responseDto.setTotalElement( response.getTotalElements());
        responseDto.setTotalPage( response.getTotalPages());
        return responseDto;
    }

    private void changeSecureData(List<ClientCase> clientCaseList) {
        for( ClientCase clientCase : clientCaseList){
            clientCase.getUser().setPassword( "");
        }
    }

    @RequestMapping( value = "/change-next-case-status", method = RequestMethod.POST)
    public ResponseEntity<Boolean> changeNextCaseStatus( @RequestBody ClientCaseDto.ForCaseNo clientCaseDto){
        this.clientCaseService.changeCaseStatus( clientCaseDto.getCaseNo(), clientCaseDto.getCompanyId());
        return new ResponseEntity( true, HttpStatus.OK);
    }

    @RequestMapping( value = "/down-invoice", method = RequestMethod.POST)
    public ResponseEntity getCaseInvoiceExcelFile( @RequestBody ClientCaseDto.ForCaseNo clientCaseDto){
        byte[] contents =  this.clientCaseService.getInvoiceExcelFile( clientCaseDto.getCaseNo(), clientCaseDto.getCompanyId());
        ByteArrayResource resource = new ByteArrayResource( contents);

        MediaType mediaType = MediaType.APPLICATION_OCTET_STREAM;

        return ResponseEntity.ok()
                // Content-Disposition
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment;filename=" + "Invoice.xlsx")
                // Content-Type
                .contentType(mediaType)
                // Contet-Length
                .contentLength( contents.length)
                .body(resource);
    }

    @RequestMapping( value = "/down-receipt", method = RequestMethod.POST)
    public ResponseEntity getCaseReceiptExcelFile( @RequestBody ClientCaseDto.ForCaseNo clientCaseDto){
        byte[] contents =  this.clientCaseService.getReceiptExcelFile( clientCaseDto.getCaseNo(), clientCaseDto.getCompanyId());
        ByteArrayResource resource = new ByteArrayResource( contents);

        MediaType mediaType = MediaType.APPLICATION_OCTET_STREAM;

        return ResponseEntity.ok()
                // Content-Disposition
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment;filename=" + "Invoice.xlsx")
                // Content-Type
                .contentType(mediaType)
                // Contet-Length
                .contentLength( contents.length)
                .body(resource);
    }
}

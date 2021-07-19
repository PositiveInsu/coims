package ca.joyfactory.coims.controller;

import ca.joyfactory.coims.domain.FileDto;
import ca.joyfactory.coims.service.ClientCaseDocumentService;
import ca.joyfactory.coims.service.ClientCaseService;
import ca.joyfactory.coims.service.StorageService;
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
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;

/**
 * Created by Joinsu on 2019-05-06.
 */
@Controller
@RequestMapping("/storage")
public class StorageController {

    @Autowired
    StorageService storageService;

    @Autowired
    ClientCaseService clientCaseService;

    @Autowired
    ClientCaseDocumentService clientCaseDocumentService;

    @RequestMapping( value = "/find-case-doc-name", method = RequestMethod.POST)
    public ResponseEntity findDocNameByCaseIdAndDocId( @RequestBody FileDto.ForDocumentFile fileDto){
        HashMap<String, String> result = new HashMap<>();
        result.put( "fileName", clientCaseDocumentService.findDocNameByCaseIdAndDocId( fileDto.getCaseId(), fileDto.getDocId()));
        return new ResponseEntity( result, HttpStatus.OK);
    }

    @RequestMapping( value = "/upload-doc-file", method = RequestMethod.POST)
    public ResponseEntity<String> uploadCaseDocFile(@RequestParam("file") MultipartFile file, @RequestParam("caseId") long caseId, @RequestParam("docId") long docId){
        FileDto.ForDocumentFile fileDto = new FileDto.ForDocumentFile( file, caseId, docId);
        return new ResponseEntity( clientCaseService.addFileToCaseDocument( fileDto), HttpStatus.OK);
    }

    @RequestMapping( value = "down-doc-file", method = RequestMethod.POST)
    public ResponseEntity getDocFile( @RequestBody FileDto.ForDocumentFile fileDto){

        byte[] contents = storageService.getFileByCaseIdAndDocId( fileDto.getCaseId(), fileDto.getDocId());
        ByteArrayResource resource = new ByteArrayResource( contents);

        MediaType mediaType = MediaType.APPLICATION_OCTET_STREAM;

        return ResponseEntity.ok()
                // Content-Disposition
                .header( HttpHeaders.CONTENT_DISPOSITION, "attachment;filename=" + "file.pdf")
                // Content-Type
                .contentType(mediaType)
                // Contet-Length
                .contentLength( contents.length)
                .body(resource);
    }

    @RequestMapping( value = "/delete-doc-file", method = RequestMethod.POST)
    public ResponseEntity<Boolean> deleteDocFile(  @RequestBody FileDto.ForDocumentFile fileDto){
        return new ResponseEntity( clientCaseService.deleteFileFromCaseDocument( fileDto), HttpStatus.OK);
    }
}

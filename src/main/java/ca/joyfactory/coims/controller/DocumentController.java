package ca.joyfactory.coims.controller;

import ca.joyfactory.coims.domain.Document;
import ca.joyfactory.coims.domain.FileDto;
import ca.joyfactory.coims.service.DocumentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

/**
 * Created by Joinsu on 2018-09-28.
 */
@Controller
@RequestMapping("/document")
public class DocumentController {

    @Autowired
    DocumentService documentService;

    @RequestMapping( value = "/add", method = RequestMethod.PUT)
    public ResponseEntity< List<Document>> addDocument(@RequestBody Document document){
        documentService.addDocument( document);
        List<Document> documentList = documentService.findDefaultDocumentList();
        return new ResponseEntity( documentList, HttpStatus.OK);
    }

    @RequestMapping( value = "/add-more", method = RequestMethod.POST)
    public ResponseEntity< Document> addMoreDocument(@RequestBody Document document){
        return new ResponseEntity( documentService.addDocument( document), HttpStatus.OK);
    }

    @RequestMapping( value = "/find-default-list", method = RequestMethod.GET)
    public ResponseEntity< List<Document>> findDefaultDocumentList(){
        List<Document> documentList = documentService.findDefaultDocumentList();
        return new ResponseEntity( documentList, HttpStatus.OK);
    }

    @RequestMapping( value = "/find-by-doc-code", method = RequestMethod.POST)
    public ResponseEntity<Document> findByDocCode( @RequestBody String docCode){
        return new ResponseEntity( documentService.findDocumentByCode( docCode), HttpStatus.OK);
    }

    @RequestMapping( value = "/delete-and-return-doc-list", method = RequestMethod.DELETE)
    public ResponseEntity< List<Document>> deleteDocument(@RequestParam(value = "id") Long documentId){
        documentService.deleteDocumentById( documentId);
        List<Document> documentList = documentService.findDefaultDocumentList();
        return new ResponseEntity( documentList, HttpStatus.OK);
    }

    @RequestMapping( value = "/modify", method = RequestMethod.PUT)
    public ResponseEntity< List<Document>> modifyDocument(@RequestBody Document document){
        documentService.modifyDocument( document);
        List<Document> documentList = documentService.findDefaultDocumentList();
        return new ResponseEntity( documentList, HttpStatus.OK);
    }
}

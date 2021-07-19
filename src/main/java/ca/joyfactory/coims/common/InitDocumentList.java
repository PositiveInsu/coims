package ca.joyfactory.coims.common;

import ca.joyfactory.coims.domain.CaseType;
import ca.joyfactory.coims.domain.Document;
import ca.joyfactory.coims.service.CaseTypeFeeService;
import ca.joyfactory.coims.service.CaseTypeService;
import ca.joyfactory.coims.service.DocumentService;
import ca.joyfactory.coims.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

/**
 * Created by Joinsu on 2018-11-27.
 */
@Component
public class InitDocumentList {

    @Autowired
    private Environment env;

    @Autowired
    UserService userService;

    @Autowired
    CaseTypeFeeService caseTypeFeeService;

    @Autowired
    CaseTypeService caseTypeService;

    @Autowired
    DocumentService documentService;

    private String COMMA = ",";

    public void init(){
        HashMap<String, String[]> caseTypeAndDocCodeList = new HashMap<>();
        initDataList( caseTypeAndDocCodeList);
        setDocumentListToCaseType( caseTypeAndDocCodeList);
    }

    private void initDataList(HashMap<String, String[]> caseTypeAndDocCodeList) {
        caseTypeAndDocCodeList.put( "SP-NEW", getDocCodeList( "coims.doc.code.list.sp-new"));
        caseTypeAndDocCodeList.put( "SP-EXT", getDocCodeList( "coims.doc.code.list.sp-ext"));
    }

    private String[] getDocCodeList(String propKey) {
        return env.getProperty( propKey).split( this.COMMA);
    }

    private void setDocumentListToCaseType(HashMap<String, String[]> caseTypeAndDocCodeList) {
        for( String caseTypeCode :caseTypeAndDocCodeList.keySet()){
            String[] docCodeList = caseTypeAndDocCodeList.get( caseTypeCode);
            List<Document> documentList = getDocumentList( docCodeList);
            CaseType caseType = getCaseTypeByCode( caseTypeCode);
            caseTypeService.addDocumentListById( caseType.getId(), documentList);
        }
    }

    private CaseType getCaseTypeByCode(String code) {
        return caseTypeService.findCaseTypeByCode( code);
    }

    private List<Document> getDocumentList(String[] docCodeList) {
        List<Document> documentList = documentService.findDefaultDocumentList();

        List<Document> resultDocumentList = new ArrayList<>();
        for( Document doc: documentList){
            boolean result = Arrays.stream( docCodeList).anyMatch( doc.getCode()::equals);
            if( result){
                resultDocumentList.add( doc);
            }
        }
        return resultDocumentList;
    }

}

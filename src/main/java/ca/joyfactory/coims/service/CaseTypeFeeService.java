package ca.joyfactory.coims.service;

import ca.joyfactory.coims.domain.CaseType;
import ca.joyfactory.coims.domain.CaseTypeDto;
import ca.joyfactory.coims.domain.CaseTypeFee;
import ca.joyfactory.coims.domain.Company;
import ca.joyfactory.coims.exception.FileControlException;
import ca.joyfactory.coims.exception.NotFoundDataException;
import ca.joyfactory.coims.repository.CaseTypeFeeRepository;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.io.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by Joinsu on 2018-11-21.
 */
@Service
@Transactional
public class CaseTypeFeeService {

    @Autowired
    CaseTypeFeeRepository caseTypeFeeRepository;

    @Autowired
    CompanyService companyService;

    @Autowired
    CaseTypeService caseTypeService;

    public List<CaseTypeFee> findCaseTypeFeeList( long companyId) {
        List<CaseTypeFee> caseTypeFeeList = caseTypeFeeRepository.findAllByCompanyId( companyId);
        this.checkNullData( caseTypeFeeList, "Company ID - " + companyId);
        return caseTypeFeeList;
    }

    public List<CaseTypeFee> addDefaultCaseTypeFeeList( long companyId) {

        List<CaseTypeFee> resultList = new ArrayList<>();
        Company company = companyService.findById( companyId);
        List<CaseType> caseTypeList = caseTypeService.findDefaultUsingCaseTypeList();

        try {
            List<CaseTypeFee> existFeeList = findCaseTypeFeeList( companyId);
            setDefaultFeeListExceptExistFee( caseTypeList, existFeeList, company);
        } catch ( NotFoundDataException e) {
            resultList = setDefaultFeeList( caseTypeList, company);
        } catch ( Exception e){
            throw e;
        }

        return resultList;
    }

    public CaseTypeFee modifyCaseTypeFee(CaseTypeFee caseTypeFee) {
        CaseTypeFee findedCaseTypeFee = caseTypeFeeRepository.findById( caseTypeFee.getId()).get();
        findedCaseTypeFee.setFee( caseTypeFee.getFee());
        return caseTypeFeeRepository.save( findedCaseTypeFee);
    }

    public CaseTypeFee findCaseTypeFeeByCaseTypeAndCompanyId(long caseTypeId, long companyId) {
        CaseTypeFee caseTypeFee = caseTypeFeeRepository.findByCaseTypeIdAndCompanyId( caseTypeId, companyId);
        checkNullData( caseTypeFee, "CaseTypeId - " + caseTypeId + ", CompanyId - " + companyId);
        return caseTypeFee;
    }

    private List<CaseTypeFee> setDefaultFeeListExceptExistFee(List<CaseType> caseTypeList, List<CaseTypeFee> existFeeList, Company company) {

        for( CaseType caseType : caseTypeList){
            if( !checkExist( caseType, existFeeList)){
                setCaseTypeFeeFromDefaultCaseType( caseType, company);
            }
        }
        return findCaseTypeFeeList( existFeeList.get(0).getCompany().getId());
    }

    private boolean checkExist(CaseType caseType, List<CaseTypeFee> existCaseTypeFeeList) {
        for( CaseTypeFee caseTypeFee: existCaseTypeFeeList){
            if( caseTypeFee.getCaseTypeId() == caseType.getId()){
                return true;
            }
        }
        return false;
    }

    private List<CaseTypeFee> setDefaultFeeList(List<CaseType> caseTypeList, Company company) {

        for( CaseType caseType : caseTypeList){
            setCaseTypeFeeFromDefaultCaseType( caseType, company);
        }
        return findCaseTypeFeeList( company.getId());
    }

    private void setCaseTypeFeeFromDefaultCaseType(CaseType caseType, Company company){
        CaseTypeFee caseTypeFee = new CaseTypeFee();
        caseTypeFee.setCaseTypeId( caseType.getId());
        caseTypeFee.setCompany( company);
        caseTypeFeeRepository.save( caseTypeFee);
    }

    private void checkNullData( CaseTypeFee caseTypeFee, String requestValue) {
        if( caseTypeFee == null){
            throw new NotFoundDataException( "requested value for caseTypeFee : " + requestValue);
        }
    }

    private void checkNullData( List<CaseTypeFee> caseTypeFeeList, String requestValue) {
        if( caseTypeFeeList == null || caseTypeFeeList.size() == 0){
            throw new NotFoundDataException( "requested value for caseTypeFeeList : " + requestValue);
        }
    }

    public List<CaseTypeFee> modifyCaseTypeFeeByCaseTypeList(List<CaseTypeFee> caseTypeFeeList) {
        checkNullData( caseTypeFeeList, "caseTypeFeeList is Null");
        long companyId = -1L;

        for( CaseTypeFee caseTypeFee : caseTypeFeeList){
            CaseTypeFee foundCaseTypeFee = caseTypeFeeRepository.findById( caseTypeFee.getId()).get();
            companyId = foundCaseTypeFee.getCompany().getId();
            if( isDifferentFeeData( foundCaseTypeFee, caseTypeFee)){
                foundCaseTypeFee.setFee( caseTypeFee.getFee());
                companyId = foundCaseTypeFee.getCompany().getId();
                caseTypeFeeRepository.save( foundCaseTypeFee);
            }
        }

        return this.findCaseTypeFeeList( companyId);
    }

    private boolean isDifferentFeeData(CaseTypeFee foundCaseTypeFee, CaseTypeFee modifyCaseTypeFee) {
        if( foundCaseTypeFee.getFee() != modifyCaseTypeFee.getFee()){
            return true;
        }else{
            return false;
        }
    }

    public byte[] getCaseTypeFeeExcelFile( long companyId) {

        Company company = this.companyService.findById( companyId);
        List< CaseType> caseTypeList = this.caseTypeService.findDefaultCaseTypeList( companyId);
        List<CaseTypeFee> caseTypeFeeList = this.findCaseTypeFeeList( companyId);

        List<CaseType> arrangedCaseTypeList = arrangeCaseType( caseTypeList);
        ByteArrayOutputStream bos = new ByteArrayOutputStream();

        try {
            File file = new ClassPathResource("/excel-template/Template_CaseTypeFee.xlsx").getFile();
            FileInputStream fis = new FileInputStream(file);
            XSSFWorkbook workbook = new XSSFWorkbook(fis); // xlsx 파일 Open
            XSSFSheet sheet = workbook.getSheetAt(0);
            sheet.getRow(1).getCell(3).setCellValue( company.getName());
            sheet.getRow( 3).getCell( 3).setCellValue( company.getFullAddress());
            sheet.getRow( 4).getCell( 3).setCellValue( "Phone: " + getNAOrCompanyData( company.getPhone()) + " Fax: " + getNAOrCompanyData( company.getFax()));
            sheet.getRow( 5).getCell( 3).setCellValue( "E-mail: " + getNAOrCompanyData( company.getEmail()) + " Website: " + getNAOrCompanyData( company.getWebsite()));

            int rowStart = 8;
            int cellName = 2;
            int cellFee = 4;

            for( CaseType caseType : arrangedCaseTypeList){
                if( rowStart == 44){
                    rowStart = 8;
                    cellName = 6;
                    cellFee = 8;
                }
                sheet.getRow( rowStart).getCell( cellName).setCellValue( getCaseTypeNameWithParent( caseType));
                sheet.getRow( rowStart).getCell( cellFee).setCellValue( getFeeInfoFromCaseType( caseType, caseTypeFeeList));
                rowStart += 1;
            }

            workbook.write( bos);
            bos.close();
        } catch (FileNotFoundException e) {
            throw new FileControlException( e, "[COMPANY_ID]" + companyId);
        } catch (IOException e) {
            throw new FileControlException( e, "[COMPANY_ID]" + companyId);
        }

        return bos.toByteArray();
    }

    private double getFeeInfoFromCaseType(CaseType caseType, List<CaseTypeFee> caseTypeFeeList) {
        for( CaseTypeFee caseTypeFee : caseTypeFeeList){
            if( caseType.getId() == caseTypeFee.getCaseTypeId()){
                return caseTypeFee.getFee();
            }
        }
        return -1;
    }

    private String getCaseTypeNameWithParent(CaseType caseType) {
        CaseType parent = caseType.getParentCaseType();
        if( parent != null){
            return parent.getName() + "-" + caseType.getName();
        }
        return caseType.getName();
    }

    private List<CaseType> arrangeCaseType(List<CaseType> caseTypeList) {
        List<CaseType> parentCaseTypeList = new ArrayList<>();
        List<CaseType> arrangedCaseTypeList = new ArrayList<>();

        for( CaseType caseType : caseTypeList){
            if( caseType.isHasChild()){
                parentCaseTypeList.add( caseType);
            }else{
                arrangedCaseTypeList.add( caseType);
            }
        }

        for( CaseType child: arrangedCaseTypeList){
            for( CaseType parent: parentCaseTypeList){
                if( child.getPid() == parent.getId()){
                    child.setParentCaseType( parent);
                }
            }
        }

        return arrangedCaseTypeList;
    }

    private String getNAOrCompanyData(String data) {
        if( data == null || data.length() == 0){
            return "N/A";
        }
        return data;
    }
}

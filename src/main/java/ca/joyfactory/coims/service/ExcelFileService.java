package ca.joyfactory.coims.service;

import ca.joyfactory.coims.common.CommonUtil;
import ca.joyfactory.coims.domain.*;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.awt.Color;
import java.io.*;
import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

/**
 * Created by Joinsu on 2019-05-16.
 */
@Component
public class ExcelFileService {

    @Autowired
    UserService userService;

    @Autowired
    CaseTypeService caseTypeService;

    private final String INVOICE_TEMPLATE_PATH = "/excel-template/Template_CaseInvoice.xlsx";
    private final String CASE_RECEIPT_TEMPLATE_PATH = "/excel-template/Template_CaseReceipt.xlsx";
    private final String CASE_TYPE_DOCUMENT_LIST_TEMPLATE_PATH = "/excel-template/Template_CaseTypeDocumentList.xlsx";

    private final Color GRAY_COLOR = new java.awt.Color(217,217,217);
    private final Color RED_COLOR = new java.awt.Color(244,176,132);

    public byte[] getInvoiceExcelFile( List<ClientCase> clientCaseList) throws IOException{

        ByteArrayOutputStream bos = new ByteArrayOutputStream();
        Company company = clientCaseList.get(0).getCompany();
        User user = clientCaseList.get(0).getUser();

        try {
            File file = new ClassPathResource( this.INVOICE_TEMPLATE_PATH).getFile();
            FileInputStream fis = new FileInputStream(file);

            XSSFWorkbook workbook = new XSSFWorkbook(fis);
            XSSFSheet sheet = workbook.getSheetAt(0);
            sheet.getRow(4).getCell(0).setCellValue( company.getName());
            sheet.getRow(5).getCell(0).setCellValue( "GST No.: " + CommonUtil.getStringValueOrHypen(company.getGstNo()));
            sheet.getRow(5).getCell(6).setCellValue( "Issued Date: " + CommonUtil.getCurrentDateString());
            sheet.getRow(6).getCell(6).setCellValue( "To: " + user.getfName() + " " + user.getlName());
            sheet.getRow(7).getCell(0).setCellValue( company.getStreet());
            sheet.getRow(8).getCell(0).setCellValue( company.getCity() + ", " + company.getProvince() + ", " + company.getPostal() + ", " + company.getCountry());
            sheet.getRow(9).getCell(0).setCellValue( "Phone: " + CommonUtil.getStringValueOrHypen(company.getPhone()) + ", Fax: " + CommonUtil.getStringValueOrHypen(company.getFax()));
            sheet.getRow(10).getCell(0).setCellValue( "E-Mail: " + CommonUtil.getStringValueOrHypen(company.getEmail()) + ", Homepage: " + CommonUtil.getStringValueOrHypen(company.getWebsite()));

            int rowIndex = 11;
            rowIndex = setFeeDataToExcel( workbook, sheet, rowIndex, clientCaseList);

            rowIndex += 5;
            sheet.addMergedRegion( new CellRangeAddress( rowIndex, rowIndex, 0, 7));
            sheet.getRow( rowIndex).getCell(0).setCellValue( "Make all checks payable to " + company.getName());
            sheet.getRow( rowIndex).getCell( 0).setCellStyle( getCenterAlignStyle( workbook));

            rowIndex += 1;
            setCellUnderLineBorder( workbook, sheet, rowIndex, 0, 7, null);
            sheet.addMergedRegion( new CellRangeAddress( rowIndex, rowIndex, 0, 7));
            sheet.getRow( rowIndex).getCell(0).setCellValue( "THANK YOU FOR YOUR BUSINESS!");

            workbook.write(bos);
            bos.close();
            workbook.close();

        } catch (FileNotFoundException e) {
            throw e;
        } catch (IOException e) {
            throw e;
        }

        return bos.toByteArray();
    }

    public byte[] getReceiptExcelFile( List<ClientCase> clientCaseList) throws IOException {
        ByteArrayOutputStream bos = new ByteArrayOutputStream();
        Company company = clientCaseList.get(0).getCompany();
        User user = clientCaseList.get(0).getUser();

        try {
            File file = new ClassPathResource( this.CASE_RECEIPT_TEMPLATE_PATH).getFile();
            FileInputStream fis = new FileInputStream(file);

            XSSFWorkbook workbook = new XSSFWorkbook(fis);
            XSSFSheet sheet = workbook.getSheetAt(0);
            sheet.getRow(4).getCell(0).setCellValue(company.getName());
            sheet.getRow(4).getCell(6).setCellValue("Receipt No.: " + CommonUtil.timestampToString( new Timestamp( new Date().getTime())));
            sheet.getRow(5).getCell(0).setCellValue("GST No.: " + CommonUtil.getStringValueOrHypen(company.getGstNo()));
            sheet.getRow(5).getCell(6).setCellValue("Issued Date: " + CommonUtil.getCurrentDateString());
            sheet.getRow(7).getCell(0).setCellValue(company.getStreet());
            sheet.getRow(7).getCell(6).setCellValue("Charged To: " + user.getfName() + " " + user.getlName());
            sheet.getRow(8).getCell(0).setCellValue(company.getCity() + ", " + company.getProvince() + ", " + company.getPostal() + ", " + company.getCountry());
            sheet.getRow(9).getCell(0).setCellValue("Phone: " + CommonUtil.getStringValueOrHypen(company.getPhone()) + ", Fax: " + CommonUtil.getStringValueOrHypen(company.getFax()));
            sheet.getRow( 10).getCell(0).setCellValue("E-Mail: " + CommonUtil.getStringValueOrHypen(company.getEmail()) + ", Homepage: " + CommonUtil.getStringValueOrHypen(company.getWebsite()));

            int rowIndex = 14;
            rowIndex = setFeeDataToExcel( workbook, sheet, rowIndex, clientCaseList);

            rowIndex += 2;
            setMergeCellBorder( workbook, sheet, rowIndex, 0, 7, this.RED_COLOR, false);
            sheet.addMergedRegion( new CellRangeAddress( rowIndex, rowIndex, 0, 1));
            sheet.getRow( rowIndex).getCell(0).setCellValue( "Received Processing Fee");
            sheet.addMergedRegion( new CellRangeAddress( rowIndex, rowIndex, 3, 4));
            sheet.getRow( rowIndex).getCell(3).setCellValue( "Received Government Fee");
            sheet.addMergedRegion( new CellRangeAddress( rowIndex, rowIndex, 6, 7));
            sheet.getRow( rowIndex).getCell(6).setCellValue( "Received Other Fee");

            rowIndex += 1;
            sheet.addMergedRegion( new CellRangeAddress( rowIndex, rowIndex, 0, 1));
            sheet.getRow( rowIndex).getCell(0).setCellValue( "");
            sheet.addMergedRegion( new CellRangeAddress( rowIndex, rowIndex, 3, 4));
            sheet.getRow( rowIndex).getCell(3).setCellValue( "");
            sheet.addMergedRegion( new CellRangeAddress( rowIndex, rowIndex, 6, 7));
            sheet.getRow( rowIndex).getCell(6).setCellValue( "");

            rowIndex += 5;
            setCellUnderLineBorder( workbook, sheet, rowIndex, 4, 7, null);
            sheet.addMergedRegion( new CellRangeAddress( rowIndex, rowIndex, 4, 7));

            rowIndex += 1;
            sheet.addMergedRegion( new CellRangeAddress( rowIndex, rowIndex, 4, 7));
            sheet.getRow( rowIndex).getCell(4).setCellValue( getCEOName( company));
            XSSFCellStyle italicStyle = getCenterAlignStyle( workbook);
            italicStyle.getFont().setItalic(true);
            sheet.getRow( rowIndex).getCell(4).setCellStyle( italicStyle);

            rowIndex += 1;
            sheet.addMergedRegion( new CellRangeAddress( rowIndex, rowIndex, 4, 7));
            sheet.getRow( rowIndex).getCell(4).setCellValue( company.getName());
            sheet.getRow( rowIndex).getCell(4).setCellStyle( italicStyle);

            rowIndex += 3;
            setCellUnderLineBorder( workbook, sheet, rowIndex, 0, 7, null);
            sheet.addMergedRegion( new CellRangeAddress( rowIndex, rowIndex, 0, 7));
            sheet.getRow( rowIndex).getCell(0).setCellValue( "THANK YOU FOR YOUR BUSINESS!");

            workbook.write(bos);
            bos.close();

        } catch (FileNotFoundException e) {
            throw e;
        } catch (IOException e) {
            throw e;
        }

        return bos.toByteArray();
    }

    private int setFeeDataToExcel( XSSFWorkbook workbook, XSSFSheet sheet, int rowIndex, List<ClientCase> clientCaseList) {
        Double totalProcessingFee = 0.00;
        Double totalGovernmentFee = 0.00;
        Double totalOtherFee = 0.00;

        for (ClientCase clientCase : clientCaseList) {
            ClientCaseFee caseFee = clientCase.getCaseFee();

            rowIndex += 1;
            sheet.addMergedRegion( new CellRangeAddress( rowIndex, rowIndex, 0, 7));
            sheet.getRow( rowIndex).getCell(0).setCellValue( clientCase.getCaseType().getCode() + " " + clientCase.getUser().getfName() + " " + clientCase.getUser().getlName());
            setMergeCellBorder( workbook, sheet, rowIndex, 0, 7, this.GRAY_COLOR, false);

            rowIndex += 1;
            setMergeCellBorder( workbook, sheet, rowIndex, 0, 7, this.GRAY_COLOR, false);
            sheet.addMergedRegion( new CellRangeAddress( rowIndex, rowIndex, 0, 1));
            sheet.getRow( rowIndex).getCell(0).setCellValue( "Processing Fee");

            sheet.addMergedRegion( new CellRangeAddress( rowIndex, rowIndex, 3, 4));
            sheet.getRow( rowIndex).getCell(3).setCellValue( "Government Fee");

            sheet.addMergedRegion( new CellRangeAddress( rowIndex, rowIndex, 6, 7));
            sheet.getRow( rowIndex).getCell(6).setCellValue( "Other Fee");

            rowIndex += 1;
            sheet.getRow( rowIndex).getCell(0).setCellValue( "Basic");
            sheet.getRow( rowIndex).getCell(1).setCellValue( getValueFromFee( caseFee.getBasic()));
            sheet.getRow( rowIndex).getCell(3).setCellValue( "Basic");
            sheet.getRow( rowIndex).getCell(4).setCellValue( getValueFromFee( caseFee.getGovernment()));
            totalGovernmentFee += getValueFromFee( caseFee.getGovernment());
            if ( isFeeExist( caseFee.getOther1())) {
                sheet.getRow( rowIndex).getCell(6).setCellValue( caseFee.getOtherNote1());
                sheet.getRow( rowIndex).getCell(7).setCellValue( getValueFromFee( caseFee.getOther1()));
                totalOtherFee += getValueFromFee( caseFee.getOther1());
            }

            if ( isFeeExist( caseFee.getExtra()) || isFeeExist( caseFee.getDiscount())) {
                rowIndex += 1;
                sheet.getRow(rowIndex).getCell(0).setCellValue( getExtraName( caseFee));
                sheet.getRow(rowIndex).getCell(1).setCellValue( getExtraCharge( caseFee));
            }

            if ( isFeeExist( caseFee.getOther2())) {
                sheet.getRow(rowIndex).getCell(6).setCellValue( caseFee.getOtherNote2());
                sheet.getRow(rowIndex).getCell(7).setCellValue( getValueFromFee( caseFee.getOther2()));
                totalOtherFee += getValueFromFee( caseFee.getOther2());
            }

            rowIndex += 1;
            sheet.getRow(rowIndex).getCell(0).setCellValue( "Sub Total");
            sheet.getRow(rowIndex).getCell(1).setCellValue( getValueFromFee( caseFee.getSubTotal()));
            if ( isFeeExist( caseFee.getOther3())) {
                sheet.getRow(rowIndex).getCell(6).setCellValue( caseFee.getOtherNote3());
                sheet.getRow(rowIndex).getCell(7).setCellValue( getValueFromFee( caseFee.getOther3()));
                totalOtherFee += getValueFromFee( caseFee.getOther3());
            }

            rowIndex += 1;
            sheet.getRow(rowIndex).getCell(0).setCellValue( "Tax");
            sheet.getRow(rowIndex).getCell(1).setCellValue( getValueFromFee( caseFee.getTax()));
            rowIndex += 1;

            sheet.getRow(rowIndex).getCell(0).setCellValue( "Total");
            sheet.getRow(rowIndex).getCell(1).setCellValue( getValueFromFee(caseFee.getSubTotal() + caseFee.getTax()));
            totalProcessingFee += getValueFromFee(caseFee.getSubTotal() + caseFee.getTax());
        }

        rowIndex += 1;
        setMergeCellBorder( workbook, sheet, rowIndex, 0, 7, this.GRAY_COLOR, false);
        sheet.addMergedRegion( new CellRangeAddress( rowIndex, rowIndex, 0, 1));
        sheet.getRow( rowIndex).getCell(0).setCellValue( "Processing Fee Total");
        sheet.addMergedRegion( new CellRangeAddress( rowIndex, rowIndex, 3, 4));
        sheet.getRow( rowIndex).getCell(3).setCellValue( "Government Fee Total");
        sheet.addMergedRegion( new CellRangeAddress( rowIndex, rowIndex, 6, 7));
        sheet.getRow( rowIndex).getCell(6).setCellValue( "Other Fee Total");

        rowIndex += 1;
        XSSFCellStyle totalFeeFontStyle = workbook.createCellStyle();
        totalFeeFontStyle.getFont().setBold( true);
        totalFeeFontStyle.setDataFormat((short)8);

        sheet.getRow( rowIndex).getCell(0).setCellValue( "Total");
        sheet.getRow( rowIndex).getCell(0).setCellStyle( totalFeeFontStyle);
        sheet.getRow( rowIndex).getCell(1).setCellValue( totalProcessingFee);
        sheet.getRow( rowIndex).getCell(1).setCellStyle( totalFeeFontStyle);
        sheet.getRow( rowIndex).getCell(3).setCellValue( "Total");
        sheet.getRow( rowIndex).getCell(3).setCellStyle( totalFeeFontStyle);
        sheet.getRow( rowIndex).getCell(4).setCellValue( totalGovernmentFee);
        sheet.getRow( rowIndex).getCell(4).setCellStyle( totalFeeFontStyle);
        sheet.getRow( rowIndex).getCell(6).setCellValue( "Total");
        sheet.getRow( rowIndex).getCell(6).setCellStyle( totalFeeFontStyle);
        sheet.getRow( rowIndex).getCell(7).setCellValue( totalOtherFee);
        sheet.getRow( rowIndex).getCell(7).setCellStyle( totalFeeFontStyle);

        return rowIndex;
    }


    private XSSFCellStyle getCenterAlignStyle( XSSFWorkbook workbook) {
        XSSFCellStyle style = workbook.createCellStyle();
        style.setAlignment( HorizontalAlignment.CENTER);
        return style;
    }

    private void setCellUnderLineBorder( XSSFWorkbook workbook, XSSFSheet sheet, int row, int startCell, int endCell, Color color){
        for( int i = startCell; i <= endCell; i++ ){
            sheet.getRow( row).getCell( i).setCellStyle( singleUnderLineBorder( workbook, color));
        }
    }

    private CellStyle singleUnderLineBorder( XSSFWorkbook workbook, Color color) {
        XSSFCellStyle style = workbook.createCellStyle();
        style.setBorderBottom( BorderStyle.THIN);
        style.setBottomBorderColor( IndexedColors.BLACK.getIndex());
        style.setAlignment( HorizontalAlignment.CENTER);
        drawHeaderColor( workbook, style, color);
        return style;
    }

    private void setMergeCellBorder( XSSFWorkbook workbook, XSSFSheet sheet, int row, int startCell, int endCell, Color color, boolean isCurrency){
        for( int i = startCell; i <= endCell; i++ ){
            sheet.getRow( row).getCell( i).setCellStyle( drawTopBottomBorder( workbook, color, isCurrency));
        }
    }

    private CellStyle singleBorderLine( XSSFWorkbook workbook, Color color, boolean isCurrency) {
        XSSFCellStyle style = workbook.createCellStyle();
        style.setBorderLeft( BorderStyle.THIN);
        style.setLeftBorderColor( IndexedColors.BLACK.getIndex());
        style.setBorderBottom( BorderStyle.THIN);
        style.setBottomBorderColor( IndexedColors.BLACK.getIndex());
        style.setBorderTop( BorderStyle.THIN);
        style.setTopBorderColor( IndexedColors.BLACK.getIndex());
        style.setBorderRight( BorderStyle.THIN);
        style.setRightBorderColor( IndexedColors.BLACK.getIndex());
        style.getFont().setFontHeightInPoints( (short)10);
        if( isCurrency){
            style.setDataFormat((short)8);
        }
        drawHeaderColor( workbook, style, color);
        return style;
    }

    private CellStyle drawTopBottomBorder( XSSFWorkbook workbook, Color color, boolean isCurrency) {
        XSSFCellStyle style = workbook.createCellStyle();
        style.setBorderBottom( BorderStyle.THIN);
        style.setBottomBorderColor( IndexedColors.BLACK.getIndex());
        style.setBorderTop( BorderStyle.THIN);
        style.setTopBorderColor( IndexedColors.BLACK.getIndex());
        style.setAlignment( HorizontalAlignment.CENTER);
        style.getFont().setFontHeightInPoints( (short)10);
        if( isCurrency){
            style.setDataFormat((short)8);
        }
        drawHeaderColor( workbook, style, color);
        return style;
    }

    private CellStyle drawHeaderColor( XSSFWorkbook workbook, XSSFCellStyle style, Color color) {
        if( color != null){
            IndexedColorMap colorMap = workbook.getStylesSource().getIndexedColors();
            XSSFColor backgroundColor = new XSSFColor( color, colorMap);
            style.setFillForegroundColor( backgroundColor);
            style.setFillPattern( FillPatternType.SOLID_FOREGROUND);
        }
        return style;
    }

    private double getExtraCharge( ClientCaseFee caseFee) {
        if( caseFee.getDiscount() != null){
            Double fee = getValueFromFee( caseFee.getDiscount());
            String value = "-" + fee.toString();
            return Double.parseDouble( value);
        }else{
            Double fee = getValueFromFee( caseFee.getExtra());
            String value = fee.toString();
            return Double.parseDouble( value);
        }
    }

    private String getExtraName( ClientCaseFee caseFee) {
        if( caseFee.getDiscount() != null || caseFee.getExtra() != null){
            return caseFee.getNote();
        }else{
            return "N/A";
        }
    }

    private boolean isFeeExist( Double fee) {
        if( fee != null && fee != 0.00){
            return true;
        }
        return false;
    }

    private double getValueFromFee( Double fee) {
        if( fee != null){
            return fee;
        }
        return 0.00;
    }

    private String getCEOName( Company company) {
        User user = userService.findCeoByCompanyId( company.getId());
        return user.getfName() + " " + user.getlName() + " (ICCRC No.: " + user.getMemberId() + ")";
    }

    public byte[] getCaseTypeDocumentListExcelFile( Company company, CaseType caseType, List<CaseTypeDocument> caseTypeDocumentList) throws IOException{
        ByteArrayOutputStream bos = new ByteArrayOutputStream();

        try {
            File file = new ClassPathResource( this.CASE_TYPE_DOCUMENT_LIST_TEMPLATE_PATH).getFile();
            FileInputStream fis = new FileInputStream(file);
            XSSFWorkbook workbook = new XSSFWorkbook(fis); // xlsx 파일 Open
            XSSFSheet sheet = workbook.getSheetAt(0);
            sheet.getRow(1).getCell(3).setCellValue( company.getName());
            sheet.getRow(3).getCell(3).setCellValue( company.getFullAddress());
            sheet.getRow(4).getCell(3).setCellValue( "Phone: " + getNAOrCompanyData( company.getPhone()) + " Fax: " + getNAOrCompanyData( company.getFax()));
            sheet.getRow(5).getCell(3).setCellValue( "E-mail: " + getNAOrCompanyData( company.getEmail()) + " Website: " + getNAOrCompanyData( company.getWebsite()));
            if( caseType.getPid() != 0){
                CaseType parentCaseType = this.caseTypeService.findCaseTypeById( caseType.getPid());
                sheet.getRow(6).getCell(3).setCellValue( parentCaseType.getName().toUpperCase() + " (" + caseType.getName().toUpperCase() + ")");
            }else{
                sheet.getRow(6).getCell(3).setCellValue( caseType.getName().toUpperCase());
            }


            int rowStart = 10;
            int cellNo = 2;
            int cellDocName = 3;
            int index = 1;

            for( CaseTypeDocument caseTypeDocument: caseTypeDocumentList){
                sheet.getRow( rowStart).getCell( cellNo).setCellValue( index);
                sheet.getRow( rowStart).getCell( cellDocName).setCellValue( caseTypeDocument.getDocument().getName());
                rowStart += 1;
                index += 1;
            }

            workbook.write( bos);
            bos.close();
        } catch (FileNotFoundException e) {
            throw e;
        } catch (IOException e) {
            throw e;
        }

        return bos.toByteArray();
    }


    private String getNAOrCompanyData(String data) {
        if( data == null || data.length() == 0){
            return "N/A";
        }
        return data;
    }
}

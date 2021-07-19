package ca.joyfactory.coims.service;

import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.core.io.ClassPathResource;
import org.springframework.test.context.junit4.SpringRunner;

import javax.transaction.Transactional;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;

/**
 * Created by Joinsu on 2018-09-26.
 */
@RunWith( SpringRunner.class)
@SpringBootTest
@Transactional
public class ExcelServiceTest {

    @Autowired
    ExcelService excelService;

    @Test
    public void downLoadSampleExcel_success(){
        // Given

        // When
        Workbook wb = new XSSFWorkbook();
        excelService.getSampleExcelFile( wb);

        try{
            File file = new ClassPathResource("/excel-template/Template_CaseTypeFee.xlsx").getFile();
            FileInputStream fis = new FileInputStream( file);
            XSSFWorkbook workbook = new XSSFWorkbook(fis); // xlsx 파일 Open
            XSSFSheet sheet = workbook.getSheetAt(0);
            XSSFRow row = sheet.getRow( 1);
            XSSFCell cell = row.getCell( 3);
            cell.setCellValue( "JC WINS");

            FileOutputStream fileOut = new FileOutputStream("/Users/Joinsu/Downloads/ooxml-table.xlsx");
            workbook.write(fileOut);

        }catch (Exception e){
            e.printStackTrace();
        }

        // Then

    }
}

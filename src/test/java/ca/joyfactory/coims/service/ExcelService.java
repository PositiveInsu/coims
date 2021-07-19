package ca.joyfactory.coims.service;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.util.AreaReference;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.ss.util.CellReference;
import org.apache.poi.xssf.usermodel.*;
import org.springframework.stereotype.Service;

import java.io.FileOutputStream;

/**
 * Created by Joinsu on 2018-09-26.
 */
@Service
public class ExcelService {


    public Workbook getSampleExcelFile(Workbook wb) {
        Sheet sheet = wb.createSheet("new sheet");

        Row row = sheet.createRow((short) 1);
        Cell cell = row.createCell((short) 1);
        cell.setCellValue(new XSSFRichTextString("This is a test of merging"));

        sheet.addMergedRegion(new CellRangeAddress(1, 1, 1, 2));
        return wb;

    }
}

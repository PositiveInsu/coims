package ca.joyfactory.coims.common;

import ca.joyfactory.coims.domain.ClientCase;
import ca.joyfactory.coims.domain.PageDto;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.multipart.MultipartFile;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;

/**
 * Created by Joinsu on 2018-12-12.
 */
public class CommonUtil {
    public static Timestamp intToTimestamp(int year, int month, int day){
        Timestamp timestamp = Timestamp.valueOf( LocalDateTime.of( year, month, day, 0, 0));
        return timestamp;
    }

    public static String timestampToString( Timestamp yearMonthDay){
        return yearMonthDay.toLocalDateTime().format( DateTimeFormatter.BASIC_ISO_DATE);
    }

    public static String getCurrentDateString(){
        Date date = new Date();
        SimpleDateFormat sdf = new SimpleDateFormat("MMM dd, yyyy");
        return sdf.format( date);
    }

    public static Pageable getPageRequest(PageDto pageRequestDto) {
        Pageable pageRequest = null;
        if( pageRequestDto.getSortList() != null){
            Sort sort = getSortList( pageRequestDto.getSortList());
            pageRequest = PageRequest.of( pageRequestDto.getPage(), pageRequestDto.getSize(), sort);
        }else{
            pageRequest = PageRequest.of( pageRequestDto.getPage(), pageRequestDto.getSize());
        }
        return pageRequest;
    }

    public static Sort getSortList( List<PageDto.SortDto> sortList) {

        PageDto.SortDto sortDto = sortList.get(0);
        Sort sort = new Sort( sortDto.getDirection(), sortDto.getTarget());

        if( sortList.size() < 1){
            return sort;
        }

        for( int i = 1; i < sortList.size() ; i++){
            sort.and( new Sort( sortList.get(i).getDirection(), sortList.get(i).getTarget()));
        }
        return sort;
    }

    public static String getFileExtension(String fileName) {
        int lastIndexOf = fileName.lastIndexOf(".");
        if (lastIndexOf == -1) {
            return "";
        }
        return fileName.substring(lastIndexOf);
    }

    public static String changeDocFileName( MultipartFile file, ClientCase clientCase, String docName){
        return docName + "-" + clientCase.getUser().getfName() + "-" + clientCase.getCaseNo() + getFileExtension( file.getOriginalFilename());
    }

    public static String getStringValueOrHypen(String value) {
        if( value != null && value.length() > 0){
            return value;
        }
        return "-";
    }

    public static String getStringValueOrHypen(Integer value) {
        if( value != null){
            return value + "";
        }
        return "-";
    }
}

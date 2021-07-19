package ca.joyfactory.coims.domain;

import lombok.Data;
import org.springframework.data.domain.Sort;

import java.util.List;

/**
 * Created by Joinsu on 2018-08-13.
 */
@Data
public class PageDto {

    private int page;
    private int totalPage;
    private long totalElement;
    private int size;

    private List<SortDto> sortList;
    private List content;

    @Data
    public static class WithCompanyId{
        private int companyId;
        private PageDto pageRequest;
    }

    @Data
    public static class SortDto{
        private Sort.Direction direction;
        private String target;
    }

    @Data
    public static class WithCaseSearchDto{
        private int companyId;
        private SearchDto.ForCaseSearch caseSearchDto;
        private PageDto pageRequest;
    }
}

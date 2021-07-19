package ca.joyfactory.coims.domain;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Joinsu on 2018-11-23.
 */
public class CaseTypeDto {
    @Data
    public static class ForResponse {
        private Long id;
        private List<Document> documentList = new ArrayList<>();
        private Long pid = 0L;
        private String name;
        private CaseTypeCategory category;
        private String code;
        private boolean hasChild = false;
        private Long companyId;
        private CaseType parentCaseType;
        private double fee;
        private Long caseTypeFeeId;
        private double governmentFee;
    }

    @Data
    public static class ForAddtionalDoc {
        private Document document;
        private Long caseTypeId;
    }
}

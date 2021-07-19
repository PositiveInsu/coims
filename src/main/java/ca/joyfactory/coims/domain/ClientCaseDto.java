package ca.joyfactory.coims.domain;

import lombok.Data;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by Joinsu on 2018-12-11.
 */
public class ClientCaseDto {

    @Data
    public static class ForCaseNo{
        private String caseNo;
        private long companyId;
    }

    @Data
    public static class ForNewCase {

        private CaseGrade caseGrade;
        private long companyId;
        private CaseType caseType;

        // User
        private User user;

        // Fee
        private ClientCaseFee caseFee;

        // Document
        private List<Document> documentList = new ArrayList<>();
    }

    @Data
    public static class ForCountClientCase {
        private long userId;
        private long countMainCase;
        private long countDependentCase;
    }

    @Data
    public static class ForCaseList{
        private Long id;
        private CaseType caseType;
        private CaseStatus caseStatus;
        private User user;
        private String caseNo;
        private Integer uciNo;
        private String fileNo;
        private PayStatus payStatus;
        private CaseResult result;
        private Date createdDate;
        private Date appliedDate;
        private Date fileNoDate;
        private Date resultDate;
        private Integer version;
    }

    @Data
    public static class ForDetail{
        private Long id;
        private CaseType caseType;
        private CaseStatus caseStatus;
        private ClientCaseFee caseFee;
        private User user;
        private String caseNo;
        private Integer uciNo;
        private String fileNo;
        private CaseGrade caseGrade;
        private PayStatus payStatus;
        private CaseResult result;
        private Date createdDate;
        private Date appliedDate;
        private Date fileNoDate;
        private Date resultDate;
        private Integer version;
    }
}

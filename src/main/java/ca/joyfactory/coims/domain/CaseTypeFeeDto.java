package ca.joyfactory.coims.domain;

import lombok.Data;

/**
 * Created by Joinsu on 2019-03-25.
 */
public class CaseTypeFeeDto {
    @Data
    public static class ForFindSingleFee {
        long caseTypeId;
        long companyId;
    }
}

package ca.joyfactory.coims.domain;

import lombok.Data;

import javax.persistence.Column;

/**
 * Created by Joinsu on 2018-12-11.
 */
public class DocumentDto {
    @Data
    public static class ForNewCase {
        private String name;
        private String clientName;
    }
}

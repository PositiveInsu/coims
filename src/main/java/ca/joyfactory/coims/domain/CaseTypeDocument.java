package ca.joyfactory.coims.domain;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

/**
 * Created by Joinsu on 2018-11-27.
 */
@Entity
@Getter
@Setter
@Table(name = "CASE_TYPE_DOCUMENT")
public class CaseTypeDocument {

    @Id @GeneratedValue
    @Column(name = "CASE_TYPE_DOCUMENT_ID")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn( name = "CASE_TYPE_ID")
    private CaseType caseType;

    @ManyToOne
    @JoinColumn( name = "DOCUMENT_ID")
    private Document document;

    @Column(nullable = false)
    private Long companyId;

    public CaseTypeDocument(){}
}

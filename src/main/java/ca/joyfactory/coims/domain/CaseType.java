package ca.joyfactory.coims.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by Joinsu on 2018-09-12.
 */
@Entity
@Getter
@Setter
@Table(name = "CASE_TYPE")
public class CaseType {

    public CaseType() {
    }

    public CaseType(String name, String code, CaseTypeCategory category, Long companyId) {
        this.name = name;
        this.code = code;
        this.category = category;
        this.companyId = companyId;
    }

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "CASE_TYPE_ID")
    private Long id;

    @OneToMany( mappedBy = "caseType", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties( "caseType")
    private List<CaseTypeDocument> caseTypeDocumentList = new ArrayList<>();

    @Column(nullable = false)
    private Long pid = 0L;

    @Column(length = 50, nullable = false)
    private String name;

    @Column(length = 2, nullable = false)
    private CaseTypeCategory category;

    @Column(length = 10, nullable = false, unique = true)
    private String code;

    @Column(nullable = false)
    private boolean hasChild = false;

    @Column(nullable = false)
    private Long companyId;

    @Column(length = 10)
    private double governmentFee = 0.00;

    @Transient
    private CaseType parentCaseType;

    public void addCaseTypeDocument(CaseTypeDocument caseTypeDocument){
        caseTypeDocument.setCaseType( this);
        this.caseTypeDocumentList.add( caseTypeDocument);
    }
}

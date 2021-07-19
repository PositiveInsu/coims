package ca.joyfactory.coims.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

/**
 * Created by Joinsu on 2018-12-11.
 */
@Entity
@Getter
@Setter
public class CaseStatus {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "CASE_STATUS_ID")
    private Long id;

    @Column(name = "STEP_NO", length = 2)
    private Integer stepNo;

    @Column(name = "NAME", length = 10)
    private String name;

    @Column(name = "TYPE", length = 10)
    @Enumerated(EnumType.STRING)
    private CaseStatusType caseStatusType;
}

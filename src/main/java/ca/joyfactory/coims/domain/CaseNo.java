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
public class CaseNo {

    @Id @GeneratedValue( strategy = GenerationType.AUTO)
    @Column( name = "CASE_NO_ID")
    private Long id;

    @OneToOne
    @JoinColumn( name = "COMPANY_ID")
    private Company company;

    @Column( name = "CASE_NO", length = 8)
    private String caseNo;
}

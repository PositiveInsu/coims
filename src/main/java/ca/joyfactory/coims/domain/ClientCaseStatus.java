package ca.joyfactory.coims.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

/**
 * Created by Joinsu on 2019-05-01.
 */
@Entity
@Getter
@Setter
@Table(name = "CLIENT_CASE_STATUS")
public class ClientCaseStatus {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "CLIENT_CASE_STATUS_ID")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn( name = "CASE_ID")
    private ClientCase clientCase;

    @ManyToOne
    @JoinColumn( name = "CASE_STATUS_ID")
    private CaseStatus caseStatus;

    @Column( name = "PASSED_DATE")
    @Temporal( TemporalType.TIMESTAMP)
    private Date passedDate;
}

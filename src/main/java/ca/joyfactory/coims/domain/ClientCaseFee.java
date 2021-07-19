package ca.joyfactory.coims.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

/**
 * Created by Joinsu on 2018-12-10.
 */
@Entity
@Getter
@Setter
public class ClientCaseFee {

    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "CASE_FEE_ID")
    private Long id;

    @Column(length = 10)
    private Double basic;

    @Column(length = 10)
    private Double discount;

    @Column(length = 10)
    private Double extra;

    @Column( name = "NOTE")
    private String note;

    @Column( name = "SUB_TOTAL")
    private Double subTotal;

    @Column(length = 10)
    private Double tax;

    @Column(length = 10)
    private Double processing;

    @Column(length = 10)
    private Double government;

    @Column(length = 10)
    private Double other1;

    @Column( name = "OTHER_NOTE_1")
    private String otherNote1;

    @Column(length = 10)
    private Double other2;

    @Column( name = "OTHER_NOTE_2")
    private String otherNote2;

    @Column(length = 10)
    private Double other3;

    @Column( name = "OTHER_NOTE_3")
    private String otherNote3;

    @OneToOne
    @JoinColumn(name = "CASE_ID")
    private ClientCase clientCase;
}

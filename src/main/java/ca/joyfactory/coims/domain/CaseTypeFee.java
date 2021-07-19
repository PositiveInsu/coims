package ca.joyfactory.coims.domain;

import lombok.Data;

import javax.persistence.*;

/**
 * Created by Joinsu on 2018-08-31.
 */
@Entity
public class CaseTypeFee {

    @Id
    @Column(name = "FEE_ID")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(length = 10)
    private double fee = 0.00;

    @ManyToOne( cascade = CascadeType.PERSIST)
    @JoinColumn( name = "COMPANY_ID", nullable = false)
    private Company company;

    @Column(length = 10, nullable = false)
    private Long caseTypeId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public double getFee() {
        return fee;
    }

    public void setFee(double fee) {
        this.fee = fee;
    }

    public Company getCompany() {
        return company;
    }

    public void setCompany(Company company) {
        if( this.company != null){
            this.company.getCaseTypeFees().remove( this);
        }

        this.company = company;

        if( !this.company.getCaseTypeFees().contains( this)){
            this.company.getCaseTypeFees().add( this);
        }
    }

    public Long getCaseTypeId() {
        return caseTypeId;
    }

    public void setCaseTypeId(Long caseTypeId) {
        this.caseTypeId = caseTypeId;
    }
}

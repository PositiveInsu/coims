package ca.joyfactory.coims.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by Joinsu on 2018-12-10.
 */
@Entity
@Getter
public class ClientCase {

    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "CASE_ID")
    private Long id;

    @ManyToOne
    @JoinColumn( name = "CASE_TYPE_ID", nullable = false)
    private CaseType caseType;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "CASE_FEE_ID", nullable = false)
    private ClientCaseFee caseFee;

    @OneToMany( mappedBy = "clientCase", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties( "clientCase")
    private List<ClientCaseDocument> caseDocumentList = new ArrayList<>();

    @OneToMany( mappedBy = "clientCase", cascade = CascadeType.ALL)
    @JsonIgnoreProperties("clientCase")
    private List<History> historyList = new ArrayList<>();

    @OneToMany( mappedBy = "clientCase", cascade = CascadeType.ALL)
    @JsonIgnoreProperties("clientCase")
    private List<Note> noteList = new ArrayList<>();

    @OneToMany( mappedBy = "clientCase", cascade = CascadeType.ALL)
    @JsonIgnoreProperties("clientCase")
    private List<Receipt> receiptList;

    @ManyToOne
    @JoinColumn( name = "CASE_STATUS_ID", nullable = false)
    private CaseStatus caseStatus;

    @ManyToOne( cascade = CascadeType.PERSIST)
    @JoinColumn( name = "USER_ID", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn( name = "COMPANY_ID", nullable = false)
    private Company company;

    @Column( name = "CASE_NO", length = 8, nullable = false)
    private String caseNo;

    @Column( name = "CASE_GRADE", length = 10, nullable = false)
    @Enumerated(EnumType.STRING)
    private CaseGrade caseGrade;

    @Column( name = "UCI_NO", length = 12)
    private Integer uciNo;

    @Column( name = "FILE_NO", length = 12)
    private String fileNo;

    @Column( name = "PAY_STATUS")
    @Enumerated(EnumType.STRING)
    private PayStatus payStatus;

    @Column( name = "RESULT", length = 12)
    private CaseResult result;

    @Column( name = "CREATED_DATE")
    @Temporal( TemporalType.TIMESTAMP)
    private Date createdDate;

    @Column( name = "APPLIED_DATE")
    @Temporal( TemporalType.TIMESTAMP)
    private Date appliedDate;

    @Column( name = "FILE_NO_DATE")
    @Temporal( TemporalType.TIMESTAMP)
    private Date fileNoDate;

    @Column( name = "RESULT_DATE")
    @Temporal( TemporalType.TIMESTAMP)
    private Date resultDate;

    @OneToMany( mappedBy = "clientCase", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties( "clientCase")
    private List<ClientCaseStatus> clientCaseStatusList = new ArrayList<>();

    @Version
    private Integer version;

    public void setId(Long id) {
        this.id = id;
    }

    public void setCaseType(CaseType caseType) {
        this.caseType = caseType;
    }

    public void setCaseFee(ClientCaseFee caseFee) {
        this.caseFee = caseFee;
    }

    public void setCaseDocumentList(List<ClientCaseDocument> caseDocumentList) {
        this.caseDocumentList = caseDocumentList;
    }

    public void setHistoryList(List<History> historyList) {
        this.historyList = historyList;
    }

    public void setNoteList(List<Note> noteList) {
        this.noteList = noteList;
    }

    public void setReceiptList(List<Receipt> receiptList) {
        this.receiptList = receiptList;
    }

    public void setCaseStatus(CaseStatus caseStatus) {
        this.caseStatus = caseStatus;
    }

    public void setUser(User user) {
        if( this.user != null){
            this.user.getClientCases().remove( this);
        }

        this.user = user;

        if( !this.user.getClientCases().contains( this)){
            this.user.getClientCases().add( this);
        }
    }

    public void setCompany(Company company) {
        this.company = company;
    }

    public void setCaseNo(String caseNo) {
        this.caseNo = caseNo;
    }

    public void setCaseGrade(CaseGrade caseGrade) {
        this.caseGrade = caseGrade;
    }

    public void setUciNo(Integer uciNo) {
        this.uciNo = uciNo;
    }

    public void setFileNo(String fileNo) {
        this.fileNo = fileNo;
    }

    public void setPayStatus(PayStatus payStatus) {
        this.payStatus = payStatus;
    }

    public void setResult(CaseResult result) {
        this.result = result;
    }

    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }

    public void setAppliedDate(Date appliedDate) {
        this.appliedDate = appliedDate;
    }

    public void setFileNoDate(Date fileNoDate) {
        this.fileNoDate = fileNoDate;
    }

    public void setResultDate(Date resultDate) {
        this.resultDate = resultDate;
    }

    public void setVersion(Integer version) {
        this.version = version;
    }

    public void setClientCaseStatusList(List<ClientCaseStatus> clientCaseStatusList) {
        this.clientCaseStatusList = clientCaseStatusList;
    }

    public void addClientCaseStatus( ClientCaseStatus clientcaseStatus){
        clientcaseStatus.setClientCase( this);
        this.clientCaseStatusList.add( clientcaseStatus);
    }
}

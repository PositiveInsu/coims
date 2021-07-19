package ca.joyfactory.coims.domain;

import lombok.Getter;

import javax.persistence.*;
import java.util.Date;

/**
 * Created by Joinsu on 2018-12-11.
 */
@Entity
@Getter
public class Receipt {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "RECEIPT_ID")
    private Long id;

    @Column( name = "RECEIPT_NO", length = 15)
    private String receiptNo;

    @Column( name = "PAID_BY", length = 30)
    private String paidBy;

    @Column( name = "RECEIPT_DATE")
    @Temporal( TemporalType.TIMESTAMP)
    private Date receiptDate;

    @Column( name = "RECEIVED_FEE")
    private double receivedFee;

    @Column( name = "PAY_METHOD")
    private PayMethod payMethod;

    @Column(name = "DESCRIPTION")
    private String description;

    @OneToOne
    @JoinColumn( name = "FILE_PATH_ID")
    private FilePath filePath;

    @ManyToOne
    @JoinColumn(name = "CASE_ID")
    private ClientCase clientCase;

    public void setClientCase(ClientCase clientCase) {
        this.clientCase = clientCase;

        if( !clientCase.getReceiptList().contains( this)){
            clientCase.getReceiptList().add( this);
        }
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setReceiptNo(String receiptNo) {
        this.receiptNo = receiptNo;
    }

    public void setPaidBy(String paidBy) {
        this.paidBy = paidBy;
    }

    public void setReceiptDate(Date receiptDate) {
        this.receiptDate = receiptDate;
    }

    public void setReceivedFee(double receivedFee) {
        this.receivedFee = receivedFee;
    }

    public void setPayMethod(PayMethod payMethod) {
        this.payMethod = payMethod;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setFilePath(FilePath filePath) {
        this.filePath = filePath;
    }
}

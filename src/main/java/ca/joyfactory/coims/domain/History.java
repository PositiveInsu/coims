package ca.joyfactory.coims.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

/**
 * Created by Joinsu on 2018-12-11.
 */
@Entity
@Getter
public class History {

    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "HISTORY_ID")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn( name = "CASE_ID")
    private ClientCase clientCase;

    @Column( length = 15)
    private String userName;

    private String history;

    @Temporal( TemporalType.TIMESTAMP)
    private Date createdDate;

    public void setClientCase(ClientCase clientCase) {
        this.clientCase = clientCase;

        if( !clientCase.getHistoryList().contains( this)){
            clientCase.getHistoryList().add( this);
        }
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public void setHistory(String history) {
        this.history = history;
    }

    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }
}

package ca.joyfactory.coims.domain;

import lombok.Getter;
import org.hibernate.annotations.Cascade;

import javax.persistence.*;

/**
 * Created by Joinsu on 2018-12-10.
 */
@Getter
@Entity
public class ClientCaseDocument {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "CASE_DOCUMENT_ID")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn( name = "CASE_ID")
    private ClientCase clientCase;

    @ManyToOne
    @JoinColumn( name = "DOCUMENT_ID")
    private Document document;

    @OneToOne( cascade = CascadeType.ALL)
    @JoinColumn( name = "FILE_PATH_ID")
    private FilePath filePath;

    public void setId(Long id) {
        this.id = id;
    }

    public void setClientCase(ClientCase clientCase) {
        this.clientCase = clientCase;

        if( !clientCase.getCaseDocumentList().contains( this)){
            clientCase.getCaseDocumentList().add( this);
        }
    }

    public void setDocument(Document document) {
        this.document = document;
    }

    public void setFilePath(FilePath filePath) {
        this.filePath = filePath;
    }
}

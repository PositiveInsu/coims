package ca.joyfactory.coims.domain;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

/**
 * Created by Joinsu on 2018-09-26.
 */
@Entity
@Getter
@Setter
@Table(name = "DOCUMENT")
public class Document {

    public Document() {
    }

    public Document(String name, DocumentType category, Long companyId, String code) {
        this.name = name;
        this.category = category;
        this.companyId = companyId;
        this.code = code;
    }

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column( name = "DOCUMENT_ID")
    private long id;

    @Column( length = 50)
    private String name;

    @Column( length = 10)
    private String code;

    @Column( length = 10)
    private DocumentType category;

    @Column( nullable = false)
    private Long companyId;
}

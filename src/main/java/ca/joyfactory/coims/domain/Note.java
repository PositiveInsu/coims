package ca.joyfactory.coims.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;

import javax.persistence.*;
import java.util.List;

/**
 * Created by Joinsu on 2018-12-11.
 */
@Entity
@Getter
public class Note {

    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "NOTE_ID")
    private Long id;

    @Column(name = "MESSAGE")
    @Lob
    private String message;

    @ManyToOne
    @JoinColumn(name = "CASE_ID")
    private ClientCase clientCase;

    @OneToMany( mappedBy = "note", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties( "note")
    private List<NoteFilePath> noteFilePathList;

    public void setClientCase(ClientCase clientCase) {
        this.clientCase = clientCase;

        if( !clientCase.getNoteList().contains( this)){
            clientCase.getNoteList().add( this);
        }
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}

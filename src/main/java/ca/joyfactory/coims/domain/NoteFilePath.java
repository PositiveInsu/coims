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
@Table(name = "NOTE_FILE_PATH")
public class NoteFilePath {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "NOTE_FILE_PATH_ID")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn( name = "NOTE_ID")
    private Note note;

    @ManyToOne
    @JoinColumn( name = "FILE_PATH_ID")
    private FilePath filePath;
}

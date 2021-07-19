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
public class FilePath {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "FILE_PATH_ID")
    private Long id;

    @Column(name = "FILE_PATH", nullable = false)
    private String filePath;

    @Column(name = "ORIGIN_NAME", nullable = false)
    private String originName;
}

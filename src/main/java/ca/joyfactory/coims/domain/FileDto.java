package ca.joyfactory.coims.domain;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

/**
 * Created by Joinsu on 2019-05-04.
 */
public class FileDto {
    @Data
    public static class ForDocumentFile {
        public ForDocumentFile(MultipartFile file, long caseId, long docId) {
            this.file = file;
            this.caseId = caseId;
            this.docId = docId;
        }

        private MultipartFile file;
        private long caseId;
        private long docId;
    }

    @Data
    public static class ForAfterStore{
        private String originalName;
        private String filePath;
    }
}

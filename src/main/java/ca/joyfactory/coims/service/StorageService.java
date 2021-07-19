package ca.joyfactory.coims.service;

import ca.joyfactory.coims.common.CommonUtil;
import ca.joyfactory.coims.domain.*;
import ca.joyfactory.coims.exception.StorageException;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;

/**
 * Created by Joinsu on 2019-05-04.
 */
@Component
public class StorageService {

    @Autowired
    ClientCaseService clientCaseService;

    @Autowired
    DocumentService documentService;

    private Path storagePath;

    public StorageService(String storagePath) {
        this.storagePath = Paths.get(storagePath);
    }

    public FileDto.ForAfterStore store(MultipartFile file, ClientCase clientCase, String docName) {
        FileDto.ForAfterStore result = new FileDto.ForAfterStore();

        String docFileName = CommonUtil.changeDocFileName(file, clientCase, docName);
        String filename = getRandomName();

        try {
            if (file.isEmpty()) {
                throw new StorageException(" Failed to upload due to empty file. [File Name] " + filename);
            }
            if (filename.contains("..")) {
                // This is a security check
                throw new StorageException("Cannot store file with relative path outside current directory. [File Name] " + filename);
            }
            try (InputStream inputStream = file.getInputStream()) {
                Path filePath = this.storagePath.resolve(filename);
                Files.copy(inputStream, filePath, StandardCopyOption.REPLACE_EXISTING);

                result.setOriginalName(docFileName);
                result.setFilePath(filePath.toString());
            }
        } catch (IOException e) {
            throw new StorageException(e, "[File Name] " + filename);
        }
        return result;
    }

    public String getRandomName() {
        UUID randomGenerator = UUID.randomUUID();
        String generatedString = randomGenerator.toString();
        return generatedString;
    }

    private boolean isExistFile(ClientCaseDocument caseDoc) {
        return caseDoc.getFilePath() != null;
    }

    private boolean isEqualDocId(ClientCaseDocument caseDoc, long docId) {
        long existDocId = caseDoc.getDocument().getId();
        if (existDocId == docId) {
            return true;
        }
        return false;
    }

    public byte[] getFileByCaseIdAndDocId(Long caseId, Long docId) {
        ClientCase clientCase = this.clientCaseService.findById(caseId);
        List<ClientCaseDocument> caseDocList = clientCase.getCaseDocumentList();

        ByteArrayOutputStream bos = new ByteArrayOutputStream();
        for (ClientCaseDocument caseDoc : caseDocList) {
            if (isExistFile(caseDoc) && isEqualDocId(caseDoc, docId)) {
                return getByteArrayFromStorageFile( caseDoc.getFilePath().getFilePath(), bos);
            }
        }
        throw new StorageException( "Document file not found. [CaseID] " + caseId + " [DocId] " + docId);
    }

    private byte[] getByteArrayFromStorageFile(String filePath, ByteArrayOutputStream bos) {
        try {
            File file = new File( filePath);
            FileInputStream fis = new FileInputStream(file);
            int nRead;
            byte[] data = new byte[1024];
            while ((nRead = fis.read(data, 0, data.length)) != -1) {
                bos.write(data, 0, nRead);
            }
            bos.flush();
        } catch (FileNotFoundException e) {
            throw new StorageException( e, "[File Path] " + filePath);
        } catch (IOException e) {
            throw new StorageException( e, "[File Path] " + filePath);
        }
        return bos.toByteArray();
    }

    public boolean delete( String filePath) {
        File file = new File( filePath);
        return file.delete();
    }
}

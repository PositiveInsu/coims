package ca.joyfactory.coims.config;

import ca.joyfactory.coims.common.InitClientCase;
import ca.joyfactory.coims.common.InitDocumentList;
import ca.joyfactory.coims.common.InitUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

/**
 * Created by Joinsu on 2018-08-14.
 */
@Component
public class InitData implements ApplicationRunner{

    @Autowired
    InitDocumentList initDocumentList;

    @Autowired
    InitUser inituser;

    @Autowired
    InitClientCase initClientCase;

    @Override
    public void run(ApplicationArguments applicationArguments) throws Exception {
        inituser.init();
        initDocumentList.init();
        initClientCase.init();
    }
}

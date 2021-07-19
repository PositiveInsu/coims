package ca.joyfactory.coims.config;

import ca.joyfactory.coims.service.StorageService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;

import javax.annotation.Resource;

/**
 * Created by Joinsu on 2018-08-14.
 */
@Configuration
public class CoimsConfig {

    @Resource
    private Environment env;

    @Bean
    public ModelMapper modelMapper(){
        return new ModelMapper();
    }

    @Bean
    public StorageService storageService() {
        return new StorageService( env.getProperty( "coims.storage.path"));
    }

}

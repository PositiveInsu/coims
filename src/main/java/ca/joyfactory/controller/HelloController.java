package ca.joyfactory.controller;

import ch.qos.logback.classic.LoggerContext;
import ch.qos.logback.core.util.StatusPrinter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

/**
 * Created by Joinsu on 2017-03-17.
 */
@RestController
public class HelloController {
    Logger logger = LoggerFactory.getLogger( HelloController.class);

    @RequestMapping("/resource")
    public Map<String,Object> home() {
        logger.debug("[Restfull] call /resource");
        LoggerContext li = (LoggerContext)LoggerFactory.getILoggerFactory();
        StatusPrinter.print(li);

        Map<String,Object> model = new HashMap<String,Object>();
        model.put("id", UUID.randomUUID().toString());
        model.put("content", "Hello World");
        return model;
    }

    @RequestMapping("/user")
    public Principal user(Principal user) {
        return user;
    }

    @RequestMapping("/login")
    public void test(){
        System.out.println( "login insert!");
    }
}

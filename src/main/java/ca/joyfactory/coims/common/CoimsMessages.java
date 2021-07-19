package ca.joyfactory.coims.common;

import org.springframework.stereotype.Component;

/**
 * Created by Joinsu on 2018-04-03.
 */
@Component
public class CoimsMessages {

    public static final String NOT_FOUND_USER = "User not found. Request Argument is : ";
    public static final String DUPLICATE_USER = "This user is already exist. Request Argument is : ";

    public static final String NOT_FOUND_DATA = "Data not found. Request information is :";
    public static final String FILE_CONTROL_EXCEPTION = "File control error. Request information is : ";
    public static final String ARGUMENT_ERROR = "Wrong argument information. Request Argument is : ";
    public static final String STORAGE_EXCEPTION = "Storage operation error. Request information is: ";
}

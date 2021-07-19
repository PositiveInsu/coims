package ca.joyfactory.coims.controller;

import ca.joyfactory.coims.domain.*;
import ca.joyfactory.coims.exception.NotFoundDataException;
import ca.joyfactory.coims.security.UserDetailsImpl;
import ca.joyfactory.coims.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

/**
 * Created by Joinsu on 2017-08-17.
 */
@RestController
@RequestMapping("/public")
public class PublicController {

    @Autowired
    UserService userService;

    @Autowired
    RoleService roleService;

    @Autowired
    CaseTypeFeeService caseTypeFeeService;

    @Autowired
    CaseNoService caseNoService;

    @RequestMapping( value = "/is-authenticated-user", method = RequestMethod.POST)
    public ResponseEntity isAuthenticatedUser( @RequestBody String email, Authentication auth){

        boolean isAuthenticatedUser = false;
        UserDetailsImpl udi = null;

        if( email.length() > 4 && auth != null){
            udi = (UserDetailsImpl)auth.getPrincipal();
            if( udi.getUsername().equals( email)){
                isAuthenticatedUser = true;
                // TODO 다른 auth가 이미 로그인 되어 있다면 로그 아웃을 호출해야 함.
                return new ResponseEntity( isAuthenticatedUser, HttpStatus.ACCEPTED);
            }
        }
        return new ResponseEntity( isAuthenticatedUser, HttpStatus.NOT_ACCEPTABLE);
    }

    @RequestMapping( value = "/login-user", method = RequestMethod.GET)
    public ResponseEntity loginUser(Authentication auth){

        UserDetailsImpl udi = null;
        UserDto.ResponseSimpleUser dto = null;

        if( auth != null){
            udi = (UserDetailsImpl)auth.getPrincipal();
        }

        if( udi.isEnabled()){
            dto = new UserDto.ResponseSimpleUser();
            dto.setEmail( udi.getUsername());
        }

        return new ResponseEntity( dto, HttpStatus.OK);
    }

    @RequestMapping( value = "/add-consultant", method =  RequestMethod.PUT)
    public ResponseEntity addConsultant( @RequestBody User user){

        User addedUser = addNewConsultant( user);
        checkNullData( addedUser);

        setDefaultDataForCompany( addedUser.getCompany().getId());

        UserDto.ResponseSimpleUser dto = new UserDto.ResponseSimpleUser();
        dto.setEmail( addedUser.getEmail());

        return new ResponseEntity( dto, HttpStatus.CREATED);
    }

    private void setDefaultDataForCompany(Long companyId) {
        addCaseTypeFeeList( companyId);
        addUniqueCaseNo( companyId);
    }

    private void addCaseTypeFeeList(Long companyId) {
        caseTypeFeeService.addDefaultCaseTypeFeeList( companyId);
    }

    private void addUniqueCaseNo(Long companyId) {
        caseNoService.addNewCaseNo( companyId);
    }

    private void checkNullData( User user) {
        if( user == null){
            throw new NotFoundDataException( "User is null.");
        }
    }

    private User addNewConsultant( User user) {
        Date nowDate = new Date();
        user = setConsultantRole( user);
        user.setType( UserType.BOSS);
        user.setStatus( UserStatus.PENDING);
        user.getCompany().setCreatedDate( nowDate);
        user.getCompany().setLastModifiedDate( nowDate);

        return userService.addUser( user);
    }

    private User setConsultantRole(User user) {
        user.setRole( roleService.findRole( RoleType.USER));
        user.setRole( roleService.findRole( RoleType.MANAGER));
        return user;
    }

    @RequestMapping( value = "/is-duplicate-user", method = RequestMethod.POST)
    public ResponseEntity<Boolean> isDuplicateUser( @RequestBody String email){
        return new ResponseEntity( userService.isDuplicateUserByEmail( email), HttpStatus.OK);
    }

    @RequestMapping( value="/is-duplicate-member-id", method = RequestMethod.POST)
    public ResponseEntity<Boolean> isDuplicateMemberID( @RequestBody String memberID){
        return new ResponseEntity( userService.isDuplicateMemberID( memberID), HttpStatus.OK);
    }
}

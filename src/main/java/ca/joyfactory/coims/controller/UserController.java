package ca.joyfactory.coims.controller;

import ca.joyfactory.coims.common.CommonUtil;
import ca.joyfactory.coims.domain.*;
import ca.joyfactory.coims.exception.NotFoundUserException;
import ca.joyfactory.coims.service.CompanyService;
import ca.joyfactory.coims.service.RoleService;
import ca.joyfactory.coims.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Joinsu on 2018-07-30.
 */
@Controller
@RequestMapping("/user")
public class UserController {

    @Autowired
    UserService userService;

    @Autowired
    RoleService roleService;

    @Autowired
    CompanyService companyService;

    @Autowired
    ModelMapper modelMapper;

    @RequestMapping( value = "/find-user", method = RequestMethod.POST)
    public ResponseEntity<User> findUser( @RequestBody String email){
        User user = userService.findUserByEmail( email);
        if( user == null){
            throw new NotFoundUserException( email);
        }else{
            user.setPassword("");
            return ResponseEntity.ok( user);
        }
    }

    @RequestMapping( value = "/find-client-user", method = RequestMethod.POST)
    public ResponseEntity<List<UserDto.clientUser>> findClientUser( @RequestBody String email){
        List<UserDto.clientUser> clientUserList = new ArrayList<>();
        List<User> foundUserList = userService.findClientByEmail( email);
        for( User user : foundUserList){
            clientUserList.add( modelMapper.map( user, UserDto.clientUser.class));
        }
        return ResponseEntity.ok( clientUserList);
    }

    @RequestMapping( value = "/find-staff-users-by-company-id", method = RequestMethod.POST)
    public ResponseEntity<PageDto> findUsersByCompanyId( @RequestBody PageDto.WithCompanyId pageDto){

        Pageable pageRequest = CommonUtil.getPageRequest( pageDto.getPageRequest());
        Page<User> response = userService.findStaffByCompanyId( Long.valueOf( pageDto.getCompanyId()), pageRequest);

        PageDto responseDto = new PageDto();
        responseDto.setContent( new ArrayList<UserDto.staffInfoUser>());
        for( User user : response.getContent()){
            responseDto.getContent().add( modelMapper.map( user, UserDto.staffInfoUser.class));
        }
        responseDto.setTotalPage( response.getTotalPages());

        return new ResponseEntity( responseDto, HttpStatus.OK);
    }

    @RequestMapping( value = "/add-staff", method = RequestMethod.PUT)
    public ResponseEntity<User> addStaff( @RequestBody User user){
        user.setRole( roleService.findRole( RoleType.USER));
        user.setStatus( UserStatus.ACTIVE);
        user.setCompany( getCompanyInfo( user));
        User addedUser = userService.addUser( user);
        return new ResponseEntity<User>( addedUser, HttpStatus.OK);
    }

    @RequestMapping( value = "/modify-user", method = RequestMethod.PUT)
    public ResponseEntity<User> modifyUser( @RequestBody User user){
        User modifiedUser = userService.modifyUser( user);
        return new ResponseEntity( modifiedUser, HttpStatus.OK);
    }

    @RequestMapping( value = "/modify-client", method = RequestMethod.PUT)
    public ResponseEntity<User> modifyClient( @RequestBody User user){
        User modifiedUser = userService.modifyClient( user);
        return new ResponseEntity( modifiedUser, HttpStatus.OK);
    }

    @RequestMapping( value = "/is-exist-client-name", method = RequestMethod.POST)
    public ResponseEntity<Boolean> isExistClientName(@RequestBody User user){
        Boolean result = userService.isExistClientName( user);
        return new ResponseEntity( result, HttpStatus.OK);
    }

    private Company getCompanyInfo(User user) {
        return companyService.findById( user.getCompany().getId());
    }
}

package ca.joyfactory.coims.service;

import ca.joyfactory.coims.domain.Company;
import ca.joyfactory.coims.domain.RoleType;
import ca.joyfactory.coims.domain.User;
import ca.joyfactory.coims.domain.UserType;
import ca.joyfactory.coims.exception.DuplicateUserException;
import ca.joyfactory.coims.exception.NotFoundUserException;
import ca.joyfactory.coims.repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;

/**
 * Created by Joinsu on 2017-10-03.
 */
@Service
@Transactional
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleService roleService;

    @Autowired
    private CompanyService companyService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private Environment env;

    @Autowired
    ModelMapper modelMapper;

    public User addUser(User user, RoleType roleType, Long companyId){
        Company company = companyService.findById( companyId);
        user.setCompany( company);
        return addUser( user, roleType);
    }

    public User addUser(User user, RoleType roleType){
        user.setRole( roleService.findRole( RoleType.USER));
        user.setRole( roleService.findRole( roleType));
        return addUser( user);
    }

    public User addUser( User user){

        if( isDuplicateUserByEmail( user.getEmail())){
            throw new DuplicateUserException( user.getEmail());
        }else{
            user = setDateInfo( user);
            user.setPassword( passwordEncoder.encode( user.getPassword()));
            User addedUser = userRepository.save( user);
            return addedUser;
        }
    }

    public User setDateInfo(User user) {
        Date nowDate = new Date();
        user.setCreatedDate( nowDate);
        user.setLastModifiedDate( nowDate);
        return user;
    }

    public User modifyUser( User user){
        User foundUser = userRepository.findById( user.getId()).get();
        ExceptionService.checkNullData( foundUser, "[User ID] " + user.getId());
        setUserData( foundUser, user);
        User savedUser = userRepository.save( foundUser);
        return savedUser;
    }

    private void setUserData(User foundUser, User user) {
        foundUser.setfName( user.getfName());
        foundUser.setlName( user.getlName());
        foundUser.setEmail( user.getEmail());
        foundUser.setPhoneNo( user.getPhoneNo());

        if( user.getPassword() != null){
            foundUser.setPassword( passwordEncoder.encode( user.getPassword()));
        }

        foundUser.setType( user.getType());
        if( foundUser.getType() != user.getType()){
            setUserRole( foundUser, user.getType());
        }
    }

    private void setUserRole(User foundUser, UserType type) {
        if( type == UserType.BOSS || type == UserType.MANAGER){
            foundUser.setRole( roleService.findRole( RoleType.USER));
            foundUser.setRole( roleService.findRole( RoleType.MANAGER));
        }else{
            foundUser.setRole( roleService.findRole( RoleType.USER));
        }
    }

    public User findUserById( Long userId) {
        return this.userRepository.findById( userId).orElseThrow( () -> new NotFoundUserException( userId.toString()));
    }

    public User findUserByEmail( String email) {
        return userRepository.findByEmail( email);
    }

    public User findClientByEmailAndBirthDate(String email, Date date){
        return userRepository.findByEmailAndBirthDate( email, date);
    }

    public List<User> findClientByEmail(String email) {
        return userRepository.findAllByEmailAndType( email, UserType.CLIENT);
    }

    public boolean isDuplicateUserByEmail( String email){
        boolean flag = false;

        List<User> foundUserList = userRepository.findAllByEmail( email);
        for( User foundUser : foundUserList){
            if( !isClient( foundUser)){
                flag = true;
                break;
            }
        }
        return flag;
    }

    private boolean isClient(User foundUser) {
        if( isNotNullUser( foundUser) && (foundUser.getType() == UserType.CLIENT)){
            return true;
        }else{
            return false;
        }
    }

    public boolean isDuplicateMemberID( String memberID) {
        User foundUser = userRepository.findByMemberId( memberID);
        return isNotNullUser( foundUser);
    }

    public boolean isNotNullUser(User foundUser) {
        boolean flag = false;

        if( foundUser != null){
            flag = true;
        }

        return flag;
    }

    public boolean deleteUserById( Long id) {
        boolean flag = true;
        userRepository.deleteById( id);
        return flag;
    }

    public Page<User> findStaffByCompanyId(Long id, Pageable pageRequest) {
        Collection<UserType> staffTypeCollection = new ArrayList<>();
        staffTypeCollection.add( UserType.BOSS);
        staffTypeCollection.add( UserType.MANAGER);
        staffTypeCollection.add( UserType.STAFF);
        return userRepository.findAllByCompanyIdAndTypeIn( id, staffTypeCollection, pageRequest);
    }

    public User findCeoByCompanyId(Long companyId){
        return userRepository.findByCompanyIdAndType( companyId, UserType.BOSS);
    }

    public String getClientDefaultPassword(){
        return passwordEncoder.encode( env.getProperty( "coims.client.default-password"));
    }

    public User modifyClient (User user) {
        User foundUser = userRepository.findById( user.getId()).get();
        ExceptionService.checkNullData( foundUser, "[User ID] " + user.getId());
        setClientData( foundUser, user);
        User savedUser = userRepository.save( foundUser);
        return savedUser;
    }

    private void setClientData(User foundUser, User user) {
        foundUser.setfName( user.getfName());
        foundUser.setlName( user.getlName());
        foundUser.setEmail( user.getEmail());
        foundUser.setPhoneNo( user.getPhoneNo());
        foundUser.setCountry( user.getCountry());
        foundUser.setProvince( user.getProvince());
        foundUser.setCity( user.getCity());
        foundUser.setStreet( user.getStreet());
        foundUser.setPostal( user.getPostal());
        foundUser.setBirthDate( user.getBirthDate());
    }

    public Boolean isExistClientName(User user) {
        Boolean flag = false;
        List<User> foundUserList = this.userRepository.findAllByEmail( user.getEmail());
        ExceptionService.checkNullData( foundUserList, "[User Email] " + user.getEmail());
        for( User foundUser: foundUserList){
            if( getUserFullName( foundUser).equals( getUserFullName(user)) && foundUser.getId() != user.getId()){
                flag = true;
            }
        }
        return flag;
    }

    private String getUserFullName(User foundUser) {
        return foundUser.getfName() + " " + foundUser.getlName();
    }
}

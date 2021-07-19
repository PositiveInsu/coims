package ca.joyfactory.coims.controller;

import ca.joyfactory.coims.domain.Company;
import ca.joyfactory.coims.domain.CompanyDto;
import ca.joyfactory.coims.service.CompanyService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * Created by Joinsu on 2018-08-31.
 */
@Controller
@RequestMapping("/company")
public class CompanyController {

    @Autowired
    private CompanyService companyService;

    @Autowired
    private ModelMapper modelMapper;

    @RequestMapping( value = "/modify-company", method = RequestMethod.PUT)
    public ResponseEntity<CompanyDto> modifyUser(@RequestBody Company company){
        CompanyDto.WithoutUser companyDto = modelMapper.map( companyService.modifyCompany( company), CompanyDto.WithoutUser.class);
        return new ResponseEntity( companyDto, HttpStatus.OK);
    }

}

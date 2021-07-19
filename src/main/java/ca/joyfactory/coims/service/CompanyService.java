package ca.joyfactory.coims.service;

import ca.joyfactory.coims.domain.Company;
import ca.joyfactory.coims.repository.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

/**
 * Created by Joinsu on 2018-08-10.
 */
@Service
@Transactional
public class CompanyService {

    @Autowired
    private CompanyRepository companyRepository;

    public Company addCompany( Company company){
        return this.companyRepository.save( company);
    }

    public Company findByName( String name){
        Company foundCompany = this.companyRepository.findByName( name);
        ExceptionService.checkNullData( foundCompany, "[Company Name] " + name);
        return foundCompany;
    }

    public Company findById(long id){
        Company foundCompany = this.companyRepository.findById( id).get();
        ExceptionService.checkNullData( foundCompany, "[Company ID] " + id);
        return foundCompany;
    }

    public Company modifyCompany( Company company) {
        Company foundCompany = companyRepository.findById( company.getId()).get();
        ExceptionService.checkNullData( foundCompany, "[Company ID] " + company.getId());
        setCompanyData( foundCompany, company);
        Company modifiedCompany = companyRepository.save( foundCompany);
        return modifiedCompany;
    }

    private void setCompanyData( Company foundCompany, Company company) {
        foundCompany.setName( company.getName());
        foundCompany.setCountry( company.getCountry());
        foundCompany.setProvince( company.getProvince());
        foundCompany.setCity( company.getCity());
        foundCompany.setStreet( company.getStreet());
        foundCompany.setPostal( company.getPostal());
        foundCompany.setEmail( company.getEmail());
        foundCompany.setPhone( company.getPhone());
        foundCompany.setFax( company.getFax());
        foundCompany.setWebsite( company.getWebsite());
        foundCompany.setGstNo( company.getGstNo());
    }
}

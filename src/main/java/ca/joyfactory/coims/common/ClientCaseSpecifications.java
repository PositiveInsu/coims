package ca.joyfactory.coims.common;

import ca.joyfactory.coims.domain.*;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

import javax.persistence.criteria.Join;
import javax.persistence.criteria.JoinType;
import java.util.Calendar;
import java.util.GregorianCalendar;

/**
 * Created by Joinsu on 2019-04-26.
 */
@Component
public class ClientCaseSpecifications {

    public static Specification<ClientCase> hasCompany( Company company) {
        return (Specification<ClientCase>) (root, criteriaQuery, criteriaBuilder) -> {
            if( company == null){
                return null;
            }
            return criteriaBuilder.equal( root.get("company"), company);
        };
    }

    public static Specification<ClientCase> hasUser( String fName) {
        return (Specification<ClientCase>) (root, criteriaQuery, criteriaBuilder) -> {
            if( fName.isEmpty()){
                return null;
            }
            Join<ClientCase, User> m = root.join( "user", JoinType.INNER);
            return criteriaBuilder.equal( m.get("fName"), fName.toUpperCase());
        };
    }

    public static Specification<ClientCase> hasUCINo( Integer uciNo) {
        return (Specification<ClientCase>) (root, criteriaQuery, criteriaBuilder) -> {
            if( uciNo == null){
                return null;
            }
            return criteriaBuilder.equal( root.get("uciNo"), uciNo);
        };
    }

    public static Specification<ClientCase> hasFileNo( String fileNo) {
        return (Specification<ClientCase>) (root, criteriaQuery, criteriaBuilder) -> {
            if( fileNo.isEmpty()){
                return null;
            }
            return criteriaBuilder.equal( root.get("fileNo"), fileNo);
        };
    }

    public static Specification<ClientCase> hasCaseNo( String caseNo) {
        return (Specification<ClientCase>) (root, criteriaQuery, criteriaBuilder) -> {
            if( caseNo.isEmpty()){
                return null;
            }
            return criteriaBuilder.equal( root.get("caseNo"), caseNo);
        };
    }

    public static Specification<ClientCase> hasCaseType(CaseType caseType) {
        return (Specification<ClientCase>) (root, criteriaQuery, criteriaBuilder) -> {
            if( caseType == null){
                return null;
            }
            return criteriaBuilder.equal( root.get("caseType"), caseType);
        };
    }

    public static Specification<ClientCase> hasCaseStatus(CaseStatus caseStatus) {
        return (Specification<ClientCase>) (root, criteriaQuery, criteriaBuilder) -> {
            if( caseStatus == null){
                return null;
            }
            return criteriaBuilder.equal( root.get("caseStatus"), caseStatus);
        };
    }

    public static Specification<ClientCase> hasOverYear(Integer caseYear) {
        return (Specification<ClientCase>) (root, criteriaQuery, criteriaBuilder) -> {
            if( caseYear == null){
                return null;
            }
            Calendar date = new GregorianCalendar( caseYear, 01, 01);

            return criteriaBuilder.greaterThan( root.get("createdDate"), date.getTime());
        };
    }

    public static Specification<ClientCase> hasLessYear(Integer caseYear) {
        return (Specification<ClientCase>) (root, criteriaQuery, criteriaBuilder) -> {
            if( caseYear == null){
                return null;
            }
            Calendar date = new GregorianCalendar( caseYear + 1, 01, 01);

            return criteriaBuilder.lessThan( root.get("createdDate"), date.getTime());
        };
    }

    public static Specification<ClientCase> hasCaseGrade(CaseGrade caseGrade) {
        return (Specification<ClientCase>) (root, criteriaQuery, criteriaBuilder) -> {
            if( caseGrade == null){
                return null;
            }
            return criteriaBuilder.equal( root.get("caseGrade"), caseGrade);
        };
    }
}

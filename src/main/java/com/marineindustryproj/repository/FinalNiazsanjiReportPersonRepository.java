package com.marineindustryproj.repository;

import com.marineindustryproj.domain.FinalNiazsanjiReportPerson;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the FinalNiazsanjiReportPerson entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FinalNiazsanjiReportPersonRepository extends JpaRepository<FinalNiazsanjiReportPerson, Long>, JpaSpecificationExecutor<FinalNiazsanjiReportPerson> {

}

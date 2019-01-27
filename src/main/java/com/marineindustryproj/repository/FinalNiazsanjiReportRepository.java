package com.marineindustryproj.repository;

import com.marineindustryproj.domain.FinalNiazsanjiReport;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the FinalNiazsanjiReport entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FinalNiazsanjiReportRepository extends JpaRepository<FinalNiazsanjiReport, Long>, JpaSpecificationExecutor<FinalNiazsanjiReport> {

    @Query(value = "select distinct final_niazsanji_report from FinalNiazsanjiReport final_niazsanji_report left join fetch final_niazsanji_report.documents",
        countQuery = "select count(distinct final_niazsanji_report) from FinalNiazsanjiReport final_niazsanji_report")
    Page<FinalNiazsanjiReport> findAllWithEagerRelationships(Pageable pageable);

    @Query(value = "select distinct final_niazsanji_report from FinalNiazsanjiReport final_niazsanji_report left join fetch final_niazsanji_report.documents")
    List<FinalNiazsanjiReport> findAllWithEagerRelationships();

    @Query("select final_niazsanji_report from FinalNiazsanjiReport final_niazsanji_report left join fetch final_niazsanji_report.documents where final_niazsanji_report.id =:id")
    Optional<FinalNiazsanjiReport> findOneWithEagerRelationships(@Param("id") Long id);

}

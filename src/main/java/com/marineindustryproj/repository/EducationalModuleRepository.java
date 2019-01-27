package com.marineindustryproj.repository;

import com.marineindustryproj.domain.EducationalModule;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the EducationalModule entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EducationalModuleRepository extends JpaRepository<EducationalModule, Long>, JpaSpecificationExecutor<EducationalModule> {

    @Query(value = "select distinct educational_module from EducationalModule educational_module left join fetch educational_module.scientificWorkGroups left join fetch educational_module.documents left join fetch educational_module.educationalCenters left join fetch educational_module.goals left join fetch educational_module.resources left join fetch educational_module.teachers",
        countQuery = "select count(distinct educational_module) from EducationalModule educational_module")
    Page<EducationalModule> findAllWithEagerRelationships(Pageable pageable);

    @Query(value = "select distinct educational_module from EducationalModule educational_module left join fetch educational_module.scientificWorkGroups left join fetch educational_module.documents left join fetch educational_module.educationalCenters left join fetch educational_module.goals left join fetch educational_module.resources left join fetch educational_module.teachers")
    List<EducationalModule> findAllWithEagerRelationships();

    @Query("select educational_module from EducationalModule educational_module left join fetch educational_module.scientificWorkGroups left join fetch educational_module.documents left join fetch educational_module.educationalCenters left join fetch educational_module.goals left join fetch educational_module.resources left join fetch educational_module.teachers where educational_module.id =:id")
    Optional<EducationalModule> findOneWithEagerRelationships(@Param("id") Long id);

}

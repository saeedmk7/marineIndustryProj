package com.marineindustryproj.repository;

import com.marineindustryproj.domain.OrganizationChart;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the OrganizationChart entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OrganizationChartRepository extends JpaRepository<OrganizationChart, Long>, JpaSpecificationExecutor<OrganizationChart> {

}

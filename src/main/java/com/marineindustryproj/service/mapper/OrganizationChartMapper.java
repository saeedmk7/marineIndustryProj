package com.marineindustryproj.service.mapper;

import com.marineindustryproj.domain.*;
import com.marineindustryproj.service.dto.OrganizationChartDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity OrganizationChart and its DTO OrganizationChartDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface OrganizationChartMapper extends EntityMapper<OrganizationChartDTO, OrganizationChart> {

    @Mapping(source = "parent.id", target = "parentId")
    @Mapping(source = "parent.title", target = "parentTitle")
    OrganizationChartDTO toDto(OrganizationChart organizationChart);

    @Mapping(target = "people", ignore = true)
    @Mapping(target = "organizationCharts", ignore = true)
    @Mapping(target = "requestOrganizationNiazsanjis", ignore = true)
    @Mapping(target = "finalOrganizationNiazsanjis", ignore = true)
    @Mapping(target = "organizationChartAuthorities", ignore = true)
    @Mapping(target = "niazsanjiFardis", ignore = true)
    @Mapping(target = "requestNiazsanjiFardis", ignore = true)
    @Mapping(source = "parentId", target = "parent")
    OrganizationChart toEntity(OrganizationChartDTO organizationChartDTO);

    default OrganizationChart fromId(Long id) {
        if (id == null) {
            return null;
        }
        OrganizationChart organizationChart = new OrganizationChart();
        organizationChart.setId(id);
        return organizationChart;
    }
}

package com.marineindustryproj.service.mapper;

import com.marineindustryproj.domain.*;
import com.marineindustryproj.service.dto.NiazsanjiFardiDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity NiazsanjiFardi and its DTO NiazsanjiFardiDTO.
 */
@Mapper(componentModel = "spring", uses = {DocumentMapper.class, RequestNiazsanjiFardiMapper.class, EducationalModuleMapper.class, PersonMapper.class, OrganizationChartMapper.class})
public interface NiazsanjiFardiMapper extends EntityMapper<NiazsanjiFardiDTO, NiazsanjiFardi> {

    @Mapping(source = "requestNiazsanjiFardi.id", target = "requestNiazsanjiFardiId")
    @Mapping(source = "requestNiazsanjiFardi.code", target = "requestNiazsanjiFardiCode")
    @Mapping(source = "educationalModule.id", target = "educationalModuleId")
    @Mapping(source = "educationalModule.title", target = "educationalModuleTitle")
    @Mapping(source = "person.id", target = "personId")
    @Mapping(source = "person.family", target = "personFamily")
    @Mapping(source = "organizationChart.id", target = "organizationChartId")
    @Mapping(source = "organizationChart.title", target = "organizationChartTitle")
    NiazsanjiFardiDTO toDto(NiazsanjiFardi niazsanjiFardi);

    @Mapping(source = "requestNiazsanjiFardiId", target = "requestNiazsanjiFardi")
    @Mapping(source = "educationalModuleId", target = "educationalModule")
    @Mapping(source = "personId", target = "person")
    @Mapping(source = "organizationChartId", target = "organizationChart")
    NiazsanjiFardi toEntity(NiazsanjiFardiDTO niazsanjiFardiDTO);

    default NiazsanjiFardi fromId(Long id) {
        if (id == null) {
            return null;
        }
        NiazsanjiFardi niazsanjiFardi = new NiazsanjiFardi();
        niazsanjiFardi.setId(id);
        return niazsanjiFardi;
    }
}

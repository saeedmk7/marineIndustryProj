package com.marineindustryproj.service.mapper;

import com.marineindustryproj.domain.*;
import com.marineindustryproj.service.dto.FinalNiazsanjiReportDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity FinalNiazsanjiReport and its DTO FinalNiazsanjiReportDTO.
 */
@Mapper(componentModel = "spring", uses = {DocumentMapper.class, EducationalModuleMapper.class})
public interface FinalNiazsanjiReportMapper extends EntityMapper<FinalNiazsanjiReportDTO, FinalNiazsanjiReport> {

    @Mapping(source = "educationalModule.id", target = "educationalModuleId")
    @Mapping(source = "educationalModule.title", target = "educationalModuleTitle")
    FinalNiazsanjiReportDTO toDto(FinalNiazsanjiReport finalNiazsanjiReport);

    @Mapping(target = "finalNiazsanjiReportPeople", ignore = true)
    @Mapping(target = "designAndPlannings", ignore = true)
    @Mapping(target = "runPhases", ignore = true)
    @Mapping(target = "polls", ignore = true)
    @Mapping(source = "educationalModuleId", target = "educationalModule")
    FinalNiazsanjiReport toEntity(FinalNiazsanjiReportDTO finalNiazsanjiReportDTO);

    default FinalNiazsanjiReport fromId(Long id) {
        if (id == null) {
            return null;
        }
        FinalNiazsanjiReport finalNiazsanjiReport = new FinalNiazsanjiReport();
        finalNiazsanjiReport.setId(id);
        return finalNiazsanjiReport;
    }
}

package com.marineindustryproj.service;

import com.marineindustryproj.service.dto.FinalNiazsanjiReportDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing FinalNiazsanjiReport.
 */
public interface FinalNiazsanjiReportService {

    /**
     * Save a finalNiazsanjiReport.
     *
     * @param finalNiazsanjiReportDTO the entity to save
     * @return the persisted entity
     */
    FinalNiazsanjiReportDTO save(FinalNiazsanjiReportDTO finalNiazsanjiReportDTO);
    /**
     * Save a finalNiazsanjiReport.
     *
     * @param finalNiazsanjiReportDTO the entity to save
     * @return the persisted entity
     */
    FinalNiazsanjiReportDTO saveAndComplete(FinalNiazsanjiReportDTO finalNiazsanjiReportDTO) throws Exception;
    /**
     * Get all the finalNiazsanjiReports.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<FinalNiazsanjiReportDTO> findAll(Pageable pageable);

    /**
     * Get all the FinalNiazsanjiReport with eager load of many-to-many relationships.
     *
     * @return the list of entities
     */
    Page<FinalNiazsanjiReportDTO> findAllWithEagerRelationships(Pageable pageable);
    
    /**
     * Get the "id" finalNiazsanjiReport.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<FinalNiazsanjiReportDTO> findOne(Long id);

    /**
     * Delete the "id" finalNiazsanjiReport.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}

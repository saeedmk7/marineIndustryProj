package com.marineindustryproj.service;

import com.marineindustryproj.service.dto.FinalNiazsanjiReportPersonDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing FinalNiazsanjiReportPerson.
 */
public interface FinalNiazsanjiReportPersonService {

    /**
     * Save a finalNiazsanjiReportPerson.
     *
     * @param finalNiazsanjiReportPersonDTO the entity to save
     * @return the persisted entity
     */
    FinalNiazsanjiReportPersonDTO save(FinalNiazsanjiReportPersonDTO finalNiazsanjiReportPersonDTO);

    /**
     * Get all the finalNiazsanjiReportPeople.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<FinalNiazsanjiReportPersonDTO> findAll(Pageable pageable);


    /**
     * Get the "id" finalNiazsanjiReportPerson.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<FinalNiazsanjiReportPersonDTO> findOne(Long id);

    /**
     * Delete the "id" finalNiazsanjiReportPerson.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}

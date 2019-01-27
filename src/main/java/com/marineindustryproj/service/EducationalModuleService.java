package com.marineindustryproj.service;

import com.marineindustryproj.service.dto.EducationalModuleDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing EducationalModule.
 */
public interface EducationalModuleService {

    /**
     * Save a educationalModule.
     *
     * @param educationalModuleDTO the entity to save
     * @return the persisted entity
     */
    EducationalModuleDTO save(EducationalModuleDTO educationalModuleDTO);

    /**
     * Get all the educationalModules.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<EducationalModuleDTO> findAll(Pageable pageable);

    /**
     * Get all the EducationalModule with eager load of many-to-many relationships.
     *
     * @return the list of entities
     */
    Page<EducationalModuleDTO> findAllWithEagerRelationships(Pageable pageable);
    
    /**
     * Get the "id" educationalModule.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<EducationalModuleDTO> findOne(Long id);

    /**
     * Delete the "id" educationalModule.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}

package com.marineindustryproj.service.impl;

import com.marineindustryproj.domain.NiazsanjiFardi;
import com.marineindustryproj.domain.enumeration.EducationalModuleType;
import com.marineindustryproj.repository.NiazsanjiFardiRepository;
import com.marineindustryproj.security.SecurityUtils;
import com.marineindustryproj.service.RequestNiazsanjiFardiService;
import com.marineindustryproj.domain.RequestNiazsanjiFardi;
import com.marineindustryproj.repository.RequestNiazsanjiFardiRepository;
import com.marineindustryproj.service.dto.NiazsanjiFardiDTO;
import com.marineindustryproj.service.dto.RequestNiazsanjiFardiDTO;
import com.marineindustryproj.service.mapper.RequestNiazsanjiFardiMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.ZonedDateTime;
import java.util.Optional;

/**
 * Service Implementation for managing RequestNiazsanjiFardi.
 */
@Service
@Transactional
public class RequestNiazsanjiFardiServiceImpl implements RequestNiazsanjiFardiService {

    private final Logger log = LoggerFactory.getLogger(RequestNiazsanjiFardiServiceImpl.class);

    private final RequestNiazsanjiFardiRepository requestNiazsanjiFardiRepository;

    private final NiazsanjiFardiRepository niazsanjiFardiRepository;

    private final RequestNiazsanjiFardiMapper requestNiazsanjiFardiMapper;

    public RequestNiazsanjiFardiServiceImpl(RequestNiazsanjiFardiRepository requestNiazsanjiFardiRepository,
                                            NiazsanjiFardiRepository niazsanjiFardiRepository,
                                            RequestNiazsanjiFardiMapper requestNiazsanjiFardiMapper) {
        this.requestNiazsanjiFardiRepository = requestNiazsanjiFardiRepository;
        this.niazsanjiFardiRepository = niazsanjiFardiRepository;
        this.requestNiazsanjiFardiMapper = requestNiazsanjiFardiMapper;
    }

    /**
     * Save a requestNiazsanjiFardi.
     *
     * @param requestNiazsanjiFardiDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public RequestNiazsanjiFardiDTO save(RequestNiazsanjiFardiDTO requestNiazsanjiFardiDTO) {
        log.debug("Request to save RequestNiazsanjiFardi : {}", requestNiazsanjiFardiDTO);

        RequestNiazsanjiFardi requestNiazsanjiFardi = requestNiazsanjiFardiMapper.toEntity(requestNiazsanjiFardiDTO);
        requestNiazsanjiFardi = requestNiazsanjiFardiRepository.save(requestNiazsanjiFardi);
        return requestNiazsanjiFardiMapper.toDto(requestNiazsanjiFardi);
    }

    /**
     * Finalize a requestNiazsanjiFardi.
     *
     * @param requestNiazsanjiFardiDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public RequestNiazsanjiFardiDTO finalize(RequestNiazsanjiFardiDTO requestNiazsanjiFardiDTO) {
        log.debug("Request to save RequestNiazsanjiFardi : {}", requestNiazsanjiFardiDTO);

        RequestNiazsanjiFardi requestNiazsanjiFardi = requestNiazsanjiFardiMapper.toEntity(requestNiazsanjiFardiDTO);

        if(requestNiazsanjiFardi.getAllEducationalModule() != null)
        {
            NiazsanjiFardi niazsanjiFardi = new NiazsanjiFardi();
            niazsanjiFardi.setCreateDate(ZonedDateTime.now());
            niazsanjiFardi.setCreateUserLogin(SecurityUtils.getCurrentUserLogin().get());
            niazsanjiFardi.setDocuments(requestNiazsanjiFardi.getDocuments());
            niazsanjiFardi.setArchived(false);

            niazsanjiFardi.setOrganizationChart(requestNiazsanjiFardi.getOrganizationChart());
            niazsanjiFardi.setPerson(requestNiazsanjiFardi.getPerson());
            niazsanjiFardi.setRequestNiazsanjiFardi(requestNiazsanjiFardi);
            niazsanjiFardi.setDescription(requestNiazsanjiFardi.getDescription());
            niazsanjiFardi.setCode(requestNiazsanjiFardi.getCode());

            niazsanjiFardi.setEducationalModuleType(EducationalModuleType.ALL);
            niazsanjiFardi.setEducationalModule(requestNiazsanjiFardi.getAllEducationalModule());
            niazsanjiFardi.setPriceCost(requestNiazsanjiFardi.getCostAllEducationalModule());
            niazsanjiFardiRepository.save(niazsanjiFardi);
        }
        if(requestNiazsanjiFardi.getApprovedEducationalModule() != null)
        {
            NiazsanjiFardi niazsanjiFardi = new NiazsanjiFardi();
            niazsanjiFardi.setCreateDate(ZonedDateTime.now());
            niazsanjiFardi.setCreateUserLogin(SecurityUtils.getCurrentUserLogin().get());
            niazsanjiFardi.setDocuments(requestNiazsanjiFardi.getDocuments());
            niazsanjiFardi.setArchived(false);

            niazsanjiFardi.setOrganizationChart(requestNiazsanjiFardi.getOrganizationChart());
            niazsanjiFardi.setPerson(requestNiazsanjiFardi.getPerson());
            niazsanjiFardi.setRequestNiazsanjiFardi(requestNiazsanjiFardi);
            niazsanjiFardi.setDescription(requestNiazsanjiFardi.getDescription());
            niazsanjiFardi.setCode(requestNiazsanjiFardi.getCode());

            niazsanjiFardi.setEducationalModuleType(EducationalModuleType.APPROVED);
            niazsanjiFardi.setEducationalModule(requestNiazsanjiFardi.getApprovedEducationalModule());
            niazsanjiFardi.setPriceCost(requestNiazsanjiFardi.getCostApprovedEducationalModule());
            niazsanjiFardiRepository.save(niazsanjiFardi);
        }

        requestNiazsanjiFardi = requestNiazsanjiFardiRepository.save(requestNiazsanjiFardi);
        return requestNiazsanjiFardiMapper.toDto(requestNiazsanjiFardi);
    }

    /**
     * Get all the requestNiazsanjiFardis.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<RequestNiazsanjiFardiDTO> findAll(Pageable pageable) {
        log.debug("Request to get all RequestNiazsanjiFardis");
        return requestNiazsanjiFardiRepository.findAll(pageable)
            .map(requestNiazsanjiFardiMapper::toDto);
    }

    /**
     * Get all the RequestNiazsanjiFardi with eager load of many-to-many relationships.
     *
     * @return the list of entities
     */
    public Page<RequestNiazsanjiFardiDTO> findAllWithEagerRelationships(Pageable pageable) {
        return requestNiazsanjiFardiRepository.findAllWithEagerRelationships(pageable).map(requestNiazsanjiFardiMapper::toDto);
    }
    

    /**
     * Get one requestNiazsanjiFardi by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<RequestNiazsanjiFardiDTO> findOne(Long id) {
        log.debug("Request to get RequestNiazsanjiFardi : {}", id);
        return requestNiazsanjiFardiRepository.findOneWithEagerRelationships(id)
            .map(requestNiazsanjiFardiMapper::toDto);
    }

    /**
     * Delete the requestNiazsanjiFardi by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete RequestNiazsanjiFardi : {}", id);
        requestNiazsanjiFardiRepository.deleteById(id);
    }
}

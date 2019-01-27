package com.marineindustryproj.service.impl;

import com.marineindustryproj.service.RequestOrganizationNiazsanjiService;
import com.marineindustryproj.domain.RequestOrganizationNiazsanji;
import com.marineindustryproj.repository.RequestOrganizationNiazsanjiRepository;
import com.marineindustryproj.service.dto.RequestOrganizationNiazsanjiDTO;
import com.marineindustryproj.service.mapper.RequestOrganizationNiazsanjiMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing RequestOrganizationNiazsanji.
 */
@Service
@Transactional
public class RequestOrganizationNiazsanjiServiceImpl implements RequestOrganizationNiazsanjiService {

    private final Logger log = LoggerFactory.getLogger(RequestOrganizationNiazsanjiServiceImpl.class);

    private final RequestOrganizationNiazsanjiRepository requestOrganizationNiazsanjiRepository;

    private final RequestOrganizationNiazsanjiMapper requestOrganizationNiazsanjiMapper;

    public RequestOrganizationNiazsanjiServiceImpl(RequestOrganizationNiazsanjiRepository requestOrganizationNiazsanjiRepository, RequestOrganizationNiazsanjiMapper requestOrganizationNiazsanjiMapper) {
        this.requestOrganizationNiazsanjiRepository = requestOrganizationNiazsanjiRepository;
        this.requestOrganizationNiazsanjiMapper = requestOrganizationNiazsanjiMapper;
    }

    /**
     * Save a requestOrganizationNiazsanji.
     *
     * @param requestOrganizationNiazsanjiDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public RequestOrganizationNiazsanjiDTO save(RequestOrganizationNiazsanjiDTO requestOrganizationNiazsanjiDTO) {
        log.debug("Request to save RequestOrganizationNiazsanji : {}", requestOrganizationNiazsanjiDTO);

        RequestOrganizationNiazsanji requestOrganizationNiazsanji = requestOrganizationNiazsanjiMapper.toEntity(requestOrganizationNiazsanjiDTO);
        requestOrganizationNiazsanji = requestOrganizationNiazsanjiRepository.save(requestOrganizationNiazsanji);
        return requestOrganizationNiazsanjiMapper.toDto(requestOrganizationNiazsanji);
    }

    /**
     * Get all the requestOrganizationNiazsanjis.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<RequestOrganizationNiazsanjiDTO> findAll(Pageable pageable) {
        log.debug("Request to get all RequestOrganizationNiazsanjis");
        return requestOrganizationNiazsanjiRepository.findAll(pageable)
            .map(requestOrganizationNiazsanjiMapper::toDto);
    }

    /**
     * Get all the RequestOrganizationNiazsanji with eager load of many-to-many relationships.
     *
     * @return the list of entities
     */
    public Page<RequestOrganizationNiazsanjiDTO> findAllWithEagerRelationships(Pageable pageable) {
        return requestOrganizationNiazsanjiRepository.findAllWithEagerRelationships(pageable).map(requestOrganizationNiazsanjiMapper::toDto);
    }
    

    /**
     * Get one requestOrganizationNiazsanji by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<RequestOrganizationNiazsanjiDTO> findOne(Long id) {
        log.debug("Request to get RequestOrganizationNiazsanji : {}", id);
        return requestOrganizationNiazsanjiRepository.findOneWithEagerRelationships(id)
            .map(requestOrganizationNiazsanjiMapper::toDto);
    }

    /**
     * Delete the requestOrganizationNiazsanji by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete RequestOrganizationNiazsanji : {}", id);
        requestOrganizationNiazsanjiRepository.deleteById(id);
    }
}

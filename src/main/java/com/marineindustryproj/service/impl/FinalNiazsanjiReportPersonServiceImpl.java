package com.marineindustryproj.service.impl;

import com.marineindustryproj.service.FinalNiazsanjiReportPersonService;
import com.marineindustryproj.domain.FinalNiazsanjiReportPerson;
import com.marineindustryproj.repository.FinalNiazsanjiReportPersonRepository;
import com.marineindustryproj.service.dto.FinalNiazsanjiReportPersonDTO;
import com.marineindustryproj.service.mapper.FinalNiazsanjiReportPersonMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing FinalNiazsanjiReportPerson.
 */
@Service
@Transactional
public class FinalNiazsanjiReportPersonServiceImpl implements FinalNiazsanjiReportPersonService {

    private final Logger log = LoggerFactory.getLogger(FinalNiazsanjiReportPersonServiceImpl.class);

    private final FinalNiazsanjiReportPersonRepository finalNiazsanjiReportPersonRepository;

    private final FinalNiazsanjiReportPersonMapper finalNiazsanjiReportPersonMapper;

    public FinalNiazsanjiReportPersonServiceImpl(FinalNiazsanjiReportPersonRepository finalNiazsanjiReportPersonRepository, FinalNiazsanjiReportPersonMapper finalNiazsanjiReportPersonMapper) {
        this.finalNiazsanjiReportPersonRepository = finalNiazsanjiReportPersonRepository;
        this.finalNiazsanjiReportPersonMapper = finalNiazsanjiReportPersonMapper;
    }

    /**
     * Save a finalNiazsanjiReportPerson.
     *
     * @param finalNiazsanjiReportPersonDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public FinalNiazsanjiReportPersonDTO save(FinalNiazsanjiReportPersonDTO finalNiazsanjiReportPersonDTO) {
        log.debug("Request to save FinalNiazsanjiReportPerson : {}", finalNiazsanjiReportPersonDTO);

        FinalNiazsanjiReportPerson finalNiazsanjiReportPerson = finalNiazsanjiReportPersonMapper.toEntity(finalNiazsanjiReportPersonDTO);
        finalNiazsanjiReportPerson = finalNiazsanjiReportPersonRepository.save(finalNiazsanjiReportPerson);
        return finalNiazsanjiReportPersonMapper.toDto(finalNiazsanjiReportPerson);
    }

    /**
     * Get all the finalNiazsanjiReportPeople.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<FinalNiazsanjiReportPersonDTO> findAll(Pageable pageable) {
        log.debug("Request to get all FinalNiazsanjiReportPeople");
        return finalNiazsanjiReportPersonRepository.findAll(pageable)
            .map(finalNiazsanjiReportPersonMapper::toDto);
    }


    /**
     * Get one finalNiazsanjiReportPerson by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<FinalNiazsanjiReportPersonDTO> findOne(Long id) {
        log.debug("Request to get FinalNiazsanjiReportPerson : {}", id);
        return finalNiazsanjiReportPersonRepository.findById(id)
            .map(finalNiazsanjiReportPersonMapper::toDto);
    }

    /**
     * Delete the finalNiazsanjiReportPerson by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete FinalNiazsanjiReportPerson : {}", id);
        finalNiazsanjiReportPersonRepository.deleteById(id);
    }
}

package com.marineindustryproj.service.impl;

import com.marineindustryproj.service.OrganizationChartService;
import com.marineindustryproj.domain.OrganizationChart;
import com.marineindustryproj.repository.OrganizationChartRepository;
import com.marineindustryproj.service.dto.OrganizationChartDTO;
import com.marineindustryproj.service.mapper.OrganizationChartMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing OrganizationChart.
 */
@Service
@Transactional
public class OrganizationChartServiceImpl implements OrganizationChartService {

    private final Logger log = LoggerFactory.getLogger(OrganizationChartServiceImpl.class);

    private final OrganizationChartRepository organizationChartRepository;

    private final OrganizationChartMapper organizationChartMapper;

    public OrganizationChartServiceImpl(OrganizationChartRepository organizationChartRepository, OrganizationChartMapper organizationChartMapper) {
        this.organizationChartRepository = organizationChartRepository;
        this.organizationChartMapper = organizationChartMapper;
    }

    /**
     * Save a organizationChart.
     *
     * @param organizationChartDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public OrganizationChartDTO save(OrganizationChartDTO organizationChartDTO) {
        log.debug("Request to save OrganizationChart : {}", organizationChartDTO);

        OrganizationChart organizationChart = organizationChartMapper.toEntity(organizationChartDTO);
        organizationChart = organizationChartRepository.save(organizationChart);
        return organizationChartMapper.toDto(organizationChart);
    }

    /**
     * Get all the organizationCharts.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<OrganizationChartDTO> findAll() {
        log.debug("Request to get all OrganizationCharts");
        return organizationChartRepository.findAll().stream()
            .map(organizationChartMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one organizationChart by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<OrganizationChartDTO> findOne(Long id) {
        log.debug("Request to get OrganizationChart : {}", id);
        return organizationChartRepository.findById(id)
            .map(organizationChartMapper::toDto);
    }

    /**
     * Delete the organizationChart by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete OrganizationChart : {}", id);
        organizationChartRepository.deleteById(id);
    }
}

package com.marineindustryproj.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.marineindustryproj.domain.TeachingApproach;
import com.marineindustryproj.security.SecurityUtils;
import com.marineindustryproj.service.TeachingApproachService;
import com.marineindustryproj.service.dto.TeachApproachDTO;
import com.marineindustryproj.web.rest.errors.BadRequestAlertException;
import com.marineindustryproj.web.rest.util.HeaderUtil;
import com.marineindustryproj.web.rest.util.PaginationUtil;
import com.marineindustryproj.service.dto.TeachingApproachDTO;
import com.marineindustryproj.service.dto.TeachingApproachCriteria;
import com.marineindustryproj.service.TeachingApproachQueryService;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing TeachingApproach.
 */
@RestController
@RequestMapping("/api")
public class TeachingApproachResource {

    private final Logger log = LoggerFactory.getLogger(TeachingApproachResource.class);

    private static final String ENTITY_NAME = "teachingApproach";

    private final TeachingApproachService teachingApproachService;

    private final TeachingApproachQueryService teachingApproachQueryService;

    public TeachingApproachResource(TeachingApproachService teachingApproachService, TeachingApproachQueryService teachingApproachQueryService) {
        this.teachingApproachService = teachingApproachService;
        this.teachingApproachQueryService = teachingApproachQueryService;
    }

    /**
     * POST  /teaching-approaches : Create a new teachingApproach.
     *
     * @param teachingApproachDTO the teachingApproachDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new teachingApproachDTO, or with status 400 (Bad Request) if the teachingApproach has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/teaching-approaches")
    @Timed
    public ResponseEntity<TeachingApproachDTO> createTeachingApproach(@Valid @RequestBody TeachingApproachDTO teachingApproachDTO) throws URISyntaxException {
        log.debug("REST request to save TeachingApproach : {}", teachingApproachDTO);
        if (teachingApproachDTO.getId() != null) {
            throw new BadRequestAlertException("A new teachingApproach cannot already have an ID", ENTITY_NAME, "idexists");
        }
        teachingApproachDTO.setCreateDate(ZonedDateTime.now());
        teachingApproachDTO.setCreateUserLogin(SecurityUtils.getCurrentUserLogin().get());
        TeachingApproachDTO result = teachingApproachService.save(teachingApproachDTO);
        return ResponseEntity.created(new URI("/api/teaching-approaches/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /teaching-approaches : Updates an existing teachingApproach.
     *
     * @param teachingApproachDTO the teachingApproachDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated teachingApproachDTO,
     * or with status 400 (Bad Request) if the teachingApproachDTO is not valid,
     * or with status 500 (Internal Server Error) if the teachingApproachDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/teaching-approaches")
    @Timed
    public ResponseEntity<TeachingApproachDTO> updateTeachingApproach(@Valid @RequestBody TeachingApproachDTO teachingApproachDTO) throws URISyntaxException {
        log.debug("REST request to update TeachingApproach : {}", teachingApproachDTO);
        if (teachingApproachDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TeachingApproachDTO teachingApproach = teachingApproachService.findOne(teachingApproachDTO.getId()).get();

        teachingApproachDTO.setCreateUserLogin(teachingApproach.getCreateUserLogin());
        teachingApproachDTO.setCreateDate(teachingApproach.getCreateDate());
        teachingApproachDTO.setModifyUserLogin(SecurityUtils.getCurrentUserLogin().get());
        teachingApproachDTO.setModifyDate(ZonedDateTime.now());
        TeachingApproachDTO result = teachingApproachService.save(teachingApproachDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, teachingApproachDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /teaching-approaches : get all the teachingApproaches.
     *
     * @param pageable the pagination information
     * @param criteria the criterias which the requested entities should match
     * @return the ResponseEntity with status 200 (OK) and the list of teachingApproaches in body
     */
    @GetMapping("/teaching-approaches")
    @Timed
    public ResponseEntity<List<TeachingApproachDTO>> getAllTeachingApproaches(TeachingApproachCriteria criteria, Pageable pageable) {
        log.debug("REST request to get TeachingApproaches by criteria: {}", criteria);
        Page<TeachingApproachDTO> page = teachingApproachQueryService.findByCriteria(criteria, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/teaching-approaches");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
    * GET  /teaching-approaches/count : count all the teachingApproaches.
    *
    * @param criteria the criterias which the requested entities should match
    * @return the ResponseEntity with status 200 (OK) and the count in body
    */
    @GetMapping("/teaching-approaches/count")
    @Timed
    public ResponseEntity<Long> countTeachingApproaches (TeachingApproachCriteria criteria) {
        log.debug("REST request to count TeachingApproaches by criteria: {}", criteria);
        return ResponseEntity.ok().body(teachingApproachQueryService.countByCriteria(criteria));
    }

    /**
     * GET  /teaching-approaches/:id : get the "id" teachingApproach.
     *
     * @param id the id of the teachingApproachDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the teachingApproachDTO, or with status 404 (Not Found)
     */
    @GetMapping("/teaching-approaches/{id}")
    @Timed
    public ResponseEntity<TeachingApproachDTO> getTeachingApproach(@PathVariable Long id) {
        log.debug("REST request to get TeachingApproach : {}", id);
        Optional<TeachingApproachDTO> teachingApproachDTO = teachingApproachService.findOne(id);
        return ResponseUtil.wrapOrNotFound(teachingApproachDTO);
    }

    /**
     * DELETE  /teaching-approaches/:id : delete the "id" teachingApproach.
     *
     * @param id the id of the teachingApproachDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/teaching-approaches/{id}")
    @Timed
    public ResponseEntity<Void> deleteTeachingApproach(@PathVariable Long id) {
        log.debug("REST request to delete TeachingApproach : {}", id);
        teachingApproachService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}

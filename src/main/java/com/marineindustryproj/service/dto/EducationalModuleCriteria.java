package com.marineindustryproj.service.dto;

import java.io.Serializable;
import java.util.Objects;
import io.github.jhipster.service.filter.BooleanFilter;
import io.github.jhipster.service.filter.DoubleFilter;
import io.github.jhipster.service.filter.Filter;
import io.github.jhipster.service.filter.FloatFilter;
import io.github.jhipster.service.filter.IntegerFilter;
import io.github.jhipster.service.filter.LongFilter;
import io.github.jhipster.service.filter.StringFilter;
import io.github.jhipster.service.filter.ZonedDateTimeFilter;

/**
 * Criteria class for the EducationalModule entity. This class is used in EducationalModuleResource to
 * receive all the possible filtering options from the Http GET request parameters.
 * For example the following could be a valid requests:
 * <code> /educational-modules?id.greaterThan=5&amp;attr1.contains=something&amp;attr2.specified=false</code>
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
public class EducationalModuleCriteria implements Serializable {

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private LongFilter code;

    private StringFilter title;

    private IntegerFilter learningTimeTheorical;

    private IntegerFilter learningTimePractical;

    private StringFilter version;

    private StringFilter innerCode;

    private StringFilter centralizedCode;

    private StringFilter moreDescription;

    private StringFilter recommendedBy;

    private StringFilter educationalModuleHeadlines;

    private StringFilter prerequisite;

    private StringFilter drafters;

    private IntegerFilter educationalModuleLevel;

    private IntegerFilter educationalModuleGroup;

    private IntegerFilter educationalModuleHour;

    private ZonedDateTimeFilter timePassed;

    private ZonedDateTimeFilter credit;

    private StringFilter createUserLogin;

    private ZonedDateTimeFilter createDate;

    private StringFilter modifyUserLogin;

    private ZonedDateTimeFilter modifyDate;

    private BooleanFilter archived;

    private StringFilter archivedUserLogin;

    private ZonedDateTimeFilter archivedDate;

    private IntegerFilter status;

    private LongFilter educationalModuleJobId;

    private LongFilter requestOrganizationNiazsanjiId;

    private LongFilter finalOrganizationNiazsanjiId;

    private LongFilter finalNiazsanjiReportId;

    private LongFilter niazsanjiFardiId;

    private LongFilter approvedRequestNiazsanjiFardiId;

    private LongFilter allRequestNiazsanjiFardiId;

    private LongFilter scientificWorkGroupId;

    private LongFilter documentId;

    private LongFilter educationalCenterId;

    private LongFilter goalId;

    private LongFilter resourceId;

    private LongFilter teacherId;

    private LongFilter requestEducationalModuleId;

    private LongFilter securityLevelId;

    private LongFilter skillableLevelOfSkillId;

    private LongFilter evaluationMethodId;

    private LongFilter organizationId;

    private LongFilter niazsanjiGroupId;

    public LongFilter getId() {
        return id;
    }

    public void setId(LongFilter id) {
        this.id = id;
    }

    public LongFilter getCode() {
        return code;
    }

    public void setCode(LongFilter code) {
        this.code = code;
    }

    public StringFilter getTitle() {
        return title;
    }

    public void setTitle(StringFilter title) {
        this.title = title;
    }

    public IntegerFilter getLearningTimeTheorical() {
        return learningTimeTheorical;
    }

    public void setLearningTimeTheorical(IntegerFilter learningTimeTheorical) {
        this.learningTimeTheorical = learningTimeTheorical;
    }

    public IntegerFilter getLearningTimePractical() {
        return learningTimePractical;
    }

    public void setLearningTimePractical(IntegerFilter learningTimePractical) {
        this.learningTimePractical = learningTimePractical;
    }

    public StringFilter getVersion() {
        return version;
    }

    public void setVersion(StringFilter version) {
        this.version = version;
    }

    public StringFilter getInnerCode() {
        return innerCode;
    }

    public void setInnerCode(StringFilter innerCode) {
        this.innerCode = innerCode;
    }

    public StringFilter getCentralizedCode() {
        return centralizedCode;
    }

    public void setCentralizedCode(StringFilter centralizedCode) {
        this.centralizedCode = centralizedCode;
    }

    public StringFilter getMoreDescription() {
        return moreDescription;
    }

    public void setMoreDescription(StringFilter moreDescription) {
        this.moreDescription = moreDescription;
    }

    public StringFilter getRecommendedBy() {
        return recommendedBy;
    }

    public void setRecommendedBy(StringFilter recommendedBy) {
        this.recommendedBy = recommendedBy;
    }

    public StringFilter getEducationalModuleHeadlines() {
        return educationalModuleHeadlines;
    }

    public void setEducationalModuleHeadlines(StringFilter educationalModuleHeadlines) {
        this.educationalModuleHeadlines = educationalModuleHeadlines;
    }

    public StringFilter getPrerequisite() {
        return prerequisite;
    }

    public void setPrerequisite(StringFilter prerequisite) {
        this.prerequisite = prerequisite;
    }

    public StringFilter getDrafters() {
        return drafters;
    }

    public void setDrafters(StringFilter drafters) {
        this.drafters = drafters;
    }

    public IntegerFilter getEducationalModuleLevel() {
        return educationalModuleLevel;
    }

    public void setEducationalModuleLevel(IntegerFilter educationalModuleLevel) {
        this.educationalModuleLevel = educationalModuleLevel;
    }

    public IntegerFilter getEducationalModuleGroup() {
        return educationalModuleGroup;
    }

    public void setEducationalModuleGroup(IntegerFilter educationalModuleGroup) {
        this.educationalModuleGroup = educationalModuleGroup;
    }

    public IntegerFilter getEducationalModuleHour() {
        return educationalModuleHour;
    }

    public void setEducationalModuleHour(IntegerFilter educationalModuleHour) {
        this.educationalModuleHour = educationalModuleHour;
    }

    public ZonedDateTimeFilter getTimePassed() {
        return timePassed;
    }

    public void setTimePassed(ZonedDateTimeFilter timePassed) {
        this.timePassed = timePassed;
    }

    public ZonedDateTimeFilter getCredit() {
        return credit;
    }

    public void setCredit(ZonedDateTimeFilter credit) {
        this.credit = credit;
    }

    public StringFilter getCreateUserLogin() {
        return createUserLogin;
    }

    public void setCreateUserLogin(StringFilter createUserLogin) {
        this.createUserLogin = createUserLogin;
    }

    public ZonedDateTimeFilter getCreateDate() {
        return createDate;
    }

    public void setCreateDate(ZonedDateTimeFilter createDate) {
        this.createDate = createDate;
    }

    public StringFilter getModifyUserLogin() {
        return modifyUserLogin;
    }

    public void setModifyUserLogin(StringFilter modifyUserLogin) {
        this.modifyUserLogin = modifyUserLogin;
    }

    public ZonedDateTimeFilter getModifyDate() {
        return modifyDate;
    }

    public void setModifyDate(ZonedDateTimeFilter modifyDate) {
        this.modifyDate = modifyDate;
    }

    public BooleanFilter getArchived() {
        return archived;
    }

    public void setArchived(BooleanFilter archived) {
        this.archived = archived;
    }

    public StringFilter getArchivedUserLogin() {
        return archivedUserLogin;
    }

    public void setArchivedUserLogin(StringFilter archivedUserLogin) {
        this.archivedUserLogin = archivedUserLogin;
    }

    public ZonedDateTimeFilter getArchivedDate() {
        return archivedDate;
    }

    public void setArchivedDate(ZonedDateTimeFilter archivedDate) {
        this.archivedDate = archivedDate;
    }

    public IntegerFilter getStatus() {
        return status;
    }

    public void setStatus(IntegerFilter status) {
        this.status = status;
    }

    public LongFilter getEducationalModuleJobId() {
        return educationalModuleJobId;
    }

    public void setEducationalModuleJobId(LongFilter educationalModuleJobId) {
        this.educationalModuleJobId = educationalModuleJobId;
    }

    public LongFilter getRequestOrganizationNiazsanjiId() {
        return requestOrganizationNiazsanjiId;
    }

    public void setRequestOrganizationNiazsanjiId(LongFilter requestOrganizationNiazsanjiId) {
        this.requestOrganizationNiazsanjiId = requestOrganizationNiazsanjiId;
    }

    public LongFilter getFinalOrganizationNiazsanjiId() {
        return finalOrganizationNiazsanjiId;
    }

    public void setFinalOrganizationNiazsanjiId(LongFilter finalOrganizationNiazsanjiId) {
        this.finalOrganizationNiazsanjiId = finalOrganizationNiazsanjiId;
    }

    public LongFilter getFinalNiazsanjiReportId() {
        return finalNiazsanjiReportId;
    }

    public void setFinalNiazsanjiReportId(LongFilter finalNiazsanjiReportId) {
        this.finalNiazsanjiReportId = finalNiazsanjiReportId;
    }

    public LongFilter getNiazsanjiFardiId() {
        return niazsanjiFardiId;
    }

    public void setNiazsanjiFardiId(LongFilter niazsanjiFardiId) {
        this.niazsanjiFardiId = niazsanjiFardiId;
    }

    public LongFilter getApprovedRequestNiazsanjiFardiId() {
        return approvedRequestNiazsanjiFardiId;
    }

    public void setApprovedRequestNiazsanjiFardiId(LongFilter approvedRequestNiazsanjiFardiId) {
        this.approvedRequestNiazsanjiFardiId = approvedRequestNiazsanjiFardiId;
    }

    public LongFilter getAllRequestNiazsanjiFardiId() {
        return allRequestNiazsanjiFardiId;
    }

    public void setAllRequestNiazsanjiFardiId(LongFilter allRequestNiazsanjiFardiId) {
        this.allRequestNiazsanjiFardiId = allRequestNiazsanjiFardiId;
    }

    public LongFilter getScientificWorkGroupId() {
        return scientificWorkGroupId;
    }

    public void setScientificWorkGroupId(LongFilter scientificWorkGroupId) {
        this.scientificWorkGroupId = scientificWorkGroupId;
    }

    public LongFilter getDocumentId() {
        return documentId;
    }

    public void setDocumentId(LongFilter documentId) {
        this.documentId = documentId;
    }

    public LongFilter getEducationalCenterId() {
        return educationalCenterId;
    }

    public void setEducationalCenterId(LongFilter educationalCenterId) {
        this.educationalCenterId = educationalCenterId;
    }

    public LongFilter getGoalId() {
        return goalId;
    }

    public void setGoalId(LongFilter goalId) {
        this.goalId = goalId;
    }

    public LongFilter getResourceId() {
        return resourceId;
    }

    public void setResourceId(LongFilter resourceId) {
        this.resourceId = resourceId;
    }

    public LongFilter getTeacherId() {
        return teacherId;
    }

    public void setTeacherId(LongFilter teacherId) {
        this.teacherId = teacherId;
    }

    public LongFilter getRequestEducationalModuleId() {
        return requestEducationalModuleId;
    }

    public void setRequestEducationalModuleId(LongFilter requestEducationalModuleId) {
        this.requestEducationalModuleId = requestEducationalModuleId;
    }

    public LongFilter getSecurityLevelId() {
        return securityLevelId;
    }

    public void setSecurityLevelId(LongFilter securityLevelId) {
        this.securityLevelId = securityLevelId;
    }

    public LongFilter getSkillableLevelOfSkillId() {
        return skillableLevelOfSkillId;
    }

    public void setSkillableLevelOfSkillId(LongFilter skillableLevelOfSkillId) {
        this.skillableLevelOfSkillId = skillableLevelOfSkillId;
    }

    public LongFilter getEvaluationMethodId() {
        return evaluationMethodId;
    }

    public void setEvaluationMethodId(LongFilter evaluationMethodId) {
        this.evaluationMethodId = evaluationMethodId;
    }

    public LongFilter getOrganizationId() {
        return organizationId;
    }

    public void setOrganizationId(LongFilter organizationId) {
        this.organizationId = organizationId;
    }

    public LongFilter getNiazsanjiGroupId() {
        return niazsanjiGroupId;
    }

    public void setNiazsanjiGroupId(LongFilter niazsanjiGroupId) {
        this.niazsanjiGroupId = niazsanjiGroupId;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        final EducationalModuleCriteria that = (EducationalModuleCriteria) o;
        return
            Objects.equals(id, that.id) &&
            Objects.equals(code, that.code) &&
            Objects.equals(title, that.title) &&
            Objects.equals(learningTimeTheorical, that.learningTimeTheorical) &&
            Objects.equals(learningTimePractical, that.learningTimePractical) &&
            Objects.equals(version, that.version) &&
            Objects.equals(innerCode, that.innerCode) &&
            Objects.equals(centralizedCode, that.centralizedCode) &&
            Objects.equals(moreDescription, that.moreDescription) &&
            Objects.equals(recommendedBy, that.recommendedBy) &&
            Objects.equals(educationalModuleHeadlines, that.educationalModuleHeadlines) &&
            Objects.equals(prerequisite, that.prerequisite) &&
            Objects.equals(drafters, that.drafters) &&
            Objects.equals(educationalModuleLevel, that.educationalModuleLevel) &&
            Objects.equals(educationalModuleGroup, that.educationalModuleGroup) &&
            Objects.equals(educationalModuleHour, that.educationalModuleHour) &&
            Objects.equals(timePassed, that.timePassed) &&
            Objects.equals(credit, that.credit) &&
            Objects.equals(createUserLogin, that.createUserLogin) &&
            Objects.equals(createDate, that.createDate) &&
            Objects.equals(modifyUserLogin, that.modifyUserLogin) &&
            Objects.equals(modifyDate, that.modifyDate) &&
            Objects.equals(archived, that.archived) &&
            Objects.equals(archivedUserLogin, that.archivedUserLogin) &&
            Objects.equals(archivedDate, that.archivedDate) &&
            Objects.equals(status, that.status) &&
            Objects.equals(educationalModuleJobId, that.educationalModuleJobId) &&
            Objects.equals(requestOrganizationNiazsanjiId, that.requestOrganizationNiazsanjiId) &&
            Objects.equals(finalOrganizationNiazsanjiId, that.finalOrganizationNiazsanjiId) &&
            Objects.equals(finalNiazsanjiReportId, that.finalNiazsanjiReportId) &&
            Objects.equals(niazsanjiFardiId, that.niazsanjiFardiId) &&
            Objects.equals(approvedRequestNiazsanjiFardiId, that.approvedRequestNiazsanjiFardiId) &&
            Objects.equals(allRequestNiazsanjiFardiId, that.allRequestNiazsanjiFardiId) &&
            Objects.equals(scientificWorkGroupId, that.scientificWorkGroupId) &&
            Objects.equals(documentId, that.documentId) &&
            Objects.equals(educationalCenterId, that.educationalCenterId) &&
            Objects.equals(goalId, that.goalId) &&
            Objects.equals(resourceId, that.resourceId) &&
            Objects.equals(teacherId, that.teacherId) &&
            Objects.equals(requestEducationalModuleId, that.requestEducationalModuleId) &&
            Objects.equals(securityLevelId, that.securityLevelId) &&
            Objects.equals(skillableLevelOfSkillId, that.skillableLevelOfSkillId) &&
            Objects.equals(evaluationMethodId, that.evaluationMethodId) &&
            Objects.equals(organizationId, that.organizationId) &&
            Objects.equals(niazsanjiGroupId, that.niazsanjiGroupId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(
        id,
        code,
        title,
        learningTimeTheorical,
        learningTimePractical,
        version,
        innerCode,
        centralizedCode,
        moreDescription,
        recommendedBy,
        educationalModuleHeadlines,
        prerequisite,
        drafters,
        educationalModuleLevel,
        educationalModuleGroup,
        educationalModuleHour,
        timePassed,
        credit,
        createUserLogin,
        createDate,
        modifyUserLogin,
        modifyDate,
        archived,
        archivedUserLogin,
        archivedDate,
        status,
        educationalModuleJobId,
        requestOrganizationNiazsanjiId,
        finalOrganizationNiazsanjiId,
        finalNiazsanjiReportId,
        niazsanjiFardiId,
        approvedRequestNiazsanjiFardiId,
        allRequestNiazsanjiFardiId,
        scientificWorkGroupId,
        documentId,
        educationalCenterId,
        goalId,
        resourceId,
        teacherId,
        requestEducationalModuleId,
        securityLevelId,
        skillableLevelOfSkillId,
        evaluationMethodId,
        organizationId,
        niazsanjiGroupId
        );
    }

    @Override
    public String toString() {
        return "EducationalModuleCriteria{" +
                (id != null ? "id=" + id + ", " : "") +
                (code != null ? "code=" + code + ", " : "") +
                (title != null ? "title=" + title + ", " : "") +
                (learningTimeTheorical != null ? "learningTimeTheorical=" + learningTimeTheorical + ", " : "") +
                (learningTimePractical != null ? "learningTimePractical=" + learningTimePractical + ", " : "") +
                (version != null ? "version=" + version + ", " : "") +
                (innerCode != null ? "innerCode=" + innerCode + ", " : "") +
                (centralizedCode != null ? "centralizedCode=" + centralizedCode + ", " : "") +
                (moreDescription != null ? "moreDescription=" + moreDescription + ", " : "") +
                (recommendedBy != null ? "recommendedBy=" + recommendedBy + ", " : "") +
                (educationalModuleHeadlines != null ? "educationalModuleHeadlines=" + educationalModuleHeadlines + ", " : "") +
                (prerequisite != null ? "prerequisite=" + prerequisite + ", " : "") +
                (drafters != null ? "drafters=" + drafters + ", " : "") +
                (educationalModuleLevel != null ? "educationalModuleLevel=" + educationalModuleLevel + ", " : "") +
                (educationalModuleGroup != null ? "educationalModuleGroup=" + educationalModuleGroup + ", " : "") +
                (educationalModuleHour != null ? "educationalModuleHour=" + educationalModuleHour + ", " : "") +
                (timePassed != null ? "timePassed=" + timePassed + ", " : "") +
                (credit != null ? "credit=" + credit + ", " : "") +
                (createUserLogin != null ? "createUserLogin=" + createUserLogin + ", " : "") +
                (createDate != null ? "createDate=" + createDate + ", " : "") +
                (modifyUserLogin != null ? "modifyUserLogin=" + modifyUserLogin + ", " : "") +
                (modifyDate != null ? "modifyDate=" + modifyDate + ", " : "") +
                (archived != null ? "archived=" + archived + ", " : "") +
                (archivedUserLogin != null ? "archivedUserLogin=" + archivedUserLogin + ", " : "") +
                (archivedDate != null ? "archivedDate=" + archivedDate + ", " : "") +
                (status != null ? "status=" + status + ", " : "") +
                (educationalModuleJobId != null ? "educationalModuleJobId=" + educationalModuleJobId + ", " : "") +
                (requestOrganizationNiazsanjiId != null ? "requestOrganizationNiazsanjiId=" + requestOrganizationNiazsanjiId + ", " : "") +
                (finalOrganizationNiazsanjiId != null ? "finalOrganizationNiazsanjiId=" + finalOrganizationNiazsanjiId + ", " : "") +
                (finalNiazsanjiReportId != null ? "finalNiazsanjiReportId=" + finalNiazsanjiReportId + ", " : "") +
                (niazsanjiFardiId != null ? "niazsanjiFardiId=" + niazsanjiFardiId + ", " : "") +
                (approvedRequestNiazsanjiFardiId != null ? "approvedRequestNiazsanjiFardiId=" + approvedRequestNiazsanjiFardiId + ", " : "") +
                (allRequestNiazsanjiFardiId != null ? "allRequestNiazsanjiFardiId=" + allRequestNiazsanjiFardiId + ", " : "") +
                (scientificWorkGroupId != null ? "scientificWorkGroupId=" + scientificWorkGroupId + ", " : "") +
                (documentId != null ? "documentId=" + documentId + ", " : "") +
                (educationalCenterId != null ? "educationalCenterId=" + educationalCenterId + ", " : "") +
                (goalId != null ? "goalId=" + goalId + ", " : "") +
                (resourceId != null ? "resourceId=" + resourceId + ", " : "") +
                (teacherId != null ? "teacherId=" + teacherId + ", " : "") +
                (requestEducationalModuleId != null ? "requestEducationalModuleId=" + requestEducationalModuleId + ", " : "") +
                (securityLevelId != null ? "securityLevelId=" + securityLevelId + ", " : "") +
                (skillableLevelOfSkillId != null ? "skillableLevelOfSkillId=" + skillableLevelOfSkillId + ", " : "") +
                (evaluationMethodId != null ? "evaluationMethodId=" + evaluationMethodId + ", " : "") +
                (organizationId != null ? "organizationId=" + organizationId + ", " : "") +
                (niazsanjiGroupId != null ? "niazsanjiGroupId=" + niazsanjiGroupId + ", " : "") +
            "}";
    }

}

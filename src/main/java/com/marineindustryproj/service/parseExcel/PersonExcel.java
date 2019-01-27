package com.marineindustryproj.service.parseExcel;

import com.marineindustryproj.service.EmploymentTypeService;
import com.marineindustryproj.service.FieldOfStudyService;
import com.marineindustryproj.service.JobService;
import com.marineindustryproj.service.OrganizationChartService;
import com.marineindustryproj.service.PersonService;
import com.marineindustryproj.service.QualificationService;
import com.marineindustryproj.service.WorkGroupService;
import com.marineindustryproj.service.WorkIndustryService;
import com.marineindustryproj.service.dto.EmploymentTypeDTO;
import com.marineindustryproj.service.dto.FieldOfStudyDTO;
import com.marineindustryproj.service.dto.JobDTO;
import com.marineindustryproj.service.dto.OrganizationChartDTO;
import com.marineindustryproj.service.dto.PersonDTO;
import com.marineindustryproj.service.dto.QualificationDTO;
import com.marineindustryproj.service.dto.WorkGroupDTO;
import com.marineindustryproj.service.dto.WorkIndustryDTO;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.converter.Converter;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.ZoneId;

import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
public class PersonExcel {

    private static QualificationService qualificationService = null;

    private static FieldOfStudyService fieldOfStudyService = null;

    private static EmploymentTypeService employmentTypeService = null;

    private static WorkGroupService workGroupService = null;

    private static WorkIndustryService workIndustryService = null;

    private static JobService jobService = null;

    private static OrganizationChartService organizationChartService = null;

    private static PersonService personService = null;

    private final Path rootLocation = Paths.get("upload-dir");
    private PersonDTO personDTO;

    @Autowired
    public PersonExcel(QualificationService qualificationService, FieldOfStudyService fieldOfStudyService, EmploymentTypeService employmentTypeService, WorkGroupService workGroupService, WorkIndustryService workIndustryService, JobService jobService, OrganizationChartService organizationChartService, PersonService personService) {
        this.qualificationService = qualificationService;
        this.fieldOfStudyService = fieldOfStudyService;
        this.employmentTypeService = employmentTypeService;
        this.workGroupService = workGroupService;
        this.workIndustryService = workIndustryService;
        this.jobService = jobService;
        this.organizationChartService = organizationChartService;
        this.personService = personService;
    }
    public PersonExcel(){}


    public StringBuilder parsePerson(String fileName) throws Exception {
        StringBuilder sb = new StringBuilder();
        try {

            FileInputStream excelFile = new FileInputStream(new File(this.rootLocation.resolve(fileName).toAbsolutePath().toString()));
            Workbook workbook = new XSSFWorkbook(excelFile);
            Sheet datatypeSheet = workbook.getSheet("person");
            Iterator<Row> iterator = datatypeSheet.iterator();
            List<PersonDTO> personDTOS = new ArrayList<>();

            Page<QualificationDTO> qualificationDTOS = qualificationService.findAll(PageRequest.of(0, Integer.MAX_VALUE));

            List<KeyValueDTO> qualificationKeyValue = qualificationDTOS.map(qualificationDTO -> new KeyValueDTO(qualificationDTO.getId(), qualificationDTO.getTitle())).getContent();

            Page<FieldOfStudyDTO> fieldOfStudyDTOS = fieldOfStudyService.findAll(PageRequest.of(0, Integer.MAX_VALUE));

            List<KeyValueDTO> fieldOfStudyKeyValue = fieldOfStudyDTOS.map(fieldOfStudyDTO -> new KeyValueDTO(fieldOfStudyDTO.getId(),fieldOfStudyDTO.getTitle())).getContent();

            Page<EmploymentTypeDTO> employmentTypeDTOS = employmentTypeService.findAll(PageRequest.of(0, Integer.MAX_VALUE));

            List<KeyValueDTO> employmentTypeKeyValue = employmentTypeDTOS.map(employmentTypeDTO -> new KeyValueDTO(employmentTypeDTO.getId(),employmentTypeDTO.getTitle())).getContent();


            Page<WorkGroupDTO> workGroupDTOS = workGroupService.findAll(PageRequest.of(0, Integer.MAX_VALUE));

            List<KeyValueDTO> workGroupKeyValue = workGroupDTOS.map(workGroupDTO -> new KeyValueDTO(workGroupDTO.getId(),workGroupDTO.getTitle())).getContent();

            Page<WorkIndustryDTO> workIndustryDTOS = workIndustryService.findAll(PageRequest.of(0, Integer.MAX_VALUE));

            List<KeyValueDTO> workIndustryKeyValue = workIndustryDTOS.map(workIndustryDTO -> new KeyValueDTO(workIndustryDTO.getId(),workIndustryDTO.getTitle())).getContent();

            Page<JobDTO> jobDTOS = jobService.findAll(PageRequest.of(0, Integer.MAX_VALUE));

            List<KeyValueDTO> jobKeyValue = jobDTOS.map(jobDTO -> new KeyValueDTO(jobDTO.getId(),jobDTO.getTitle())).getContent();

            List<OrganizationChartDTO> organizationChartDTOS = organizationChartService.findAll();
            /*List<KeyValueDTO> organizationChartKeyValue = organizationChartDTOS.stream().*/

            /*List<KeyValueDTO> organizationChartKeyValue = organizationChartDTOS.stream().map(new Converter<OrganizationChartDTO, KeyValueDTO>() {
                @Override
                public KeyValueDTO convert(OrganizationChartDTO organizationChartDTO) {
                    KeyValueDTO model = new KeyValueDTO();
                    model.setId(organizationChartDTO.getId());
                    model.setTitle(organizationChartDTO.getTitle().replace(" ",""));
                    return model;
                }
            });*/


            while (iterator.hasNext()) {


                Row currentRow = iterator.next();
                int rowNum = currentRow.getRowNum();
                if(rowNum == 0)
                    continue;
                Iterator<Cell> cellIterator = currentRow.iterator();
                personDTO = new PersonDTO();
                while (cellIterator.hasNext()) {

                    Cell currentCell = cellIterator.next();
                    int columnNum = currentCell.getColumnIndex();

                    switch (columnNum)
                    {
                        case 0: //name
                            personDTO.setName(currentCell.getStringCellValue());
                            break;
                        case 1: //family
                            personDTO.setFamily(currentCell.getStringCellValue());
                            break;
                        case 2: //fatherName
                            personDTO.setFatherName(currentCell.getStringCellValue());
                            break;
                        case 3: //certificateNumber
                            personDTO.setCertificateNumber(currentCell.getStringCellValue());
                            break;
                        case 4: //nationalId-string
                            String nationalId = currentCell.getStringCellValue();
                            if(nationalId.length() != 10) {
                                sb.append("کدملی در ردیف " + (rowNum + 1) + " و در ستون " + (columnNum + 1) + " اشتباه وارد شده است.");
                                return sb;
                            }
                            personDTO.setNationalId(nationalId);
                            break;
                        case 5: //birthDate-date
                            Date birthDate = currentCell.getDateCellValue();
                            personDTO.setBirthDate(birthDate.toInstant().atZone(ZoneId.systemDefault()));
                            break;
                        case 6:// personelCode-string
                            personDTO.setPersonelCode(currentCell.getStringCellValue());
                            break;
                        case 7: //employmentDate-date
                            Date employmentDate = currentCell.getDateCellValue();
                            personDTO.setEmploymentDate(employmentDate.toInstant().atZone(ZoneId.systemDefault()));
                            break;
                        case 8: //lastQualification-Qualification
                            String lastQualification = currentCell.getStringCellValue().replace(" ","");
                            Optional<KeyValueDTO> lastQualificationOptional = qualificationKeyValue.stream().filter(a -> lastQualification.equals(a.getTitle())).findFirst();
                            Long lastQualificationId = lastQualificationOptional.isPresent() ?  lastQualificationOptional.get().getId() : 0;
                            personDTO.setLastQualificationId(lastQualificationId);
                            break;
                        case 9: //lastFieldOfStudy-FieldOfStudy
                            String lastFieldOfStudy = currentCell.getStringCellValue().replace(" ","");
                            Optional<KeyValueDTO> lastFieldOfStudyOptional = fieldOfStudyKeyValue.stream().filter(a -> lastFieldOfStudy.equals(a.getTitle())).findFirst();
                            Long lastFieldOfStudyId = lastFieldOfStudyOptional.isPresent() ? lastFieldOfStudyOptional.get().getId() : 0;
                            personDTO.setLastFieldOfStudyId(lastFieldOfStudyId);
                            break;
                        case 10: //employmentType-EmploymentType
                            String employmentType = currentCell.getStringCellValue().replace(" ","");

                            Optional<KeyValueDTO> employmentTypeOptional = employmentTypeKeyValue.stream().filter(a -> employmentType.equals(a.getTitle())).findFirst();
                            Long employmentTypeId = employmentTypeOptional.isPresent() ? employmentTypeOptional.get().getId() : 0;
                            personDTO.setEmploymentTypeId(employmentTypeId);
                            break;
                        case 11: //workGroup-WorkGroup
                            String workGroup = currentCell.getStringCellValue().replace(" ","");
                            Optional<KeyValueDTO> workGroupOptional = workGroupKeyValue.stream().filter(a -> workGroup.equals(a.getTitle())).findFirst();
                            Long workGroupId = workGroupOptional.isPresent() ? workGroupOptional.get().getId() : 0;
                            personDTO.setWorkGroupId(workGroupId);
                            break;
                        case 12: //workIndustry-WorkIndustry
                            String workIndustry = currentCell.getStringCellValue().replace(" ","");
                            Optional<KeyValueDTO> workIndustryOptional = workIndustryKeyValue.stream().filter(a -> workIndustry.equals(a.getTitle())).findFirst();
                            Long workIndustryId = workIndustryOptional.isPresent() ? workIndustryOptional.get().getId() : 0;
                            personDTO.setWorkIndustryId(workIndustryId);
                            break;
                        case 13: //job-Job
                            String job = currentCell.getStringCellValue().replace(" ","");
                            Optional<KeyValueDTO> jobOptional = jobKeyValue.stream().filter(a -> job.equals(a.getTitle())).findFirst();
                            Long jobId = jobOptional.isPresent() ? jobOptional.get().getId() : 0;
                            personDTO.setJobId(jobId);
                            break;
                        case 14: //practicaljob-Job
                            String practicaljob = currentCell.getStringCellValue().replace(" ","");
                            Optional<KeyValueDTO> practicaljobOptional = jobKeyValue.stream().filter(a -> practicaljob.equals(a.getTitle())).findFirst();
                            Long practicaljobId = practicaljobOptional.isPresent() ? practicaljobOptional.get().getId() : 0;
                            personDTO.setPracticaljobId(practicaljobId);
                            break;
                        case 15: //organizationChart-OrganizationChart
                            String organizationChart = currentCell.getStringCellValue().replace(" ","");
                            Optional<OrganizationChartDTO> organizationChartOptional = organizationChartDTOS.stream().filter(a -> organizationChart.equals(a.getTitle().replace(" ",""))).findFirst();
                            Long organizationChartId = organizationChartOptional.isPresent() ? organizationChartOptional.get().getId() : 0;
                            personDTO.setOrganizationChartId(organizationChartId);
                            break;
                        default:
                            break;
                            //personDTO.setLastQualificationTitle();
                    }

                }
                personDTOS.add(personDTO);


            }
            for (final PersonDTO personDTO : personDTOS) {
                personService.save(personDTO);
            }
            return sb;
        } catch (FileNotFoundException e) {
            sb.append(e.getMessage());
        } catch (IOException e) {
            sb.append(e.getMessage());
        }
        return sb;
    }

}


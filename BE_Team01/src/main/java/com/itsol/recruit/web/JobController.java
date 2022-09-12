package com.itsol.recruit.web;

import com.itsol.recruit.core.Constants;
import com.itsol.recruit.dto.JobDTO;
import com.itsol.recruit.dto.JobRegisterDTO;
import com.itsol.recruit.dto.ReasonDTO;
import com.itsol.recruit.dto.StatusJobDTO;

import com.itsol.recruit.entity.*;
import com.itsol.recruit.filter.JobFilter;
import com.itsol.recruit.filter.JobRgfilter;
import com.itsol.recruit.service.JobService;

import com.itsol.recruit.web.vm.JobFieldVM;
import com.itsol.recruit.web.vm.PageVM;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = Constants.Api.Path.PUBLIC)
public class JobController {
    public final JobService jobService;

    public JobController(JobService jobService) {
        this.jobService = jobService;
    }

    @PostMapping("/job/all")
    public ResponseEntity<List<JobDTO>> getAllDESC(@RequestBody PageVM pageVM , @RequestParam(value = "search", required = false ) String search, JobFilter jobFilter,
                                                   @RequestParam(value = "sortBy", required = false) String sortBy){

        Page<JobDTO> page = jobService.getAllJob(pageVM, search, sortBy, jobFilter);
        return ResponseEntity.ok().body(page.getContent());
    }

    @GetMapping("/job/{id}")
    public ResponseEntity<Optional<Job>> getById(@PathVariable Long id) {
        return ResponseEntity.ok().body(jobService.findById(id));
    }

    @PostMapping("/job/add")
    public ResponseEntity<ResponseObject> add(@Valid @RequestBody JobDTO jobDTO) {
        if (jobService.findJobByName(jobDTO.getName()) != null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    new ResponseObject(HttpStatus.BAD_REQUEST, "Job đã tồn tại", ""));
        }
        return ResponseEntity.ok().body(new ResponseObject(HttpStatus.OK, "thêm mới job thành công", jobService.addJob(jobDTO)));
    }

    @DeleteMapping("/job/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        jobService.deleteById(id);
        return ResponseEntity.ok().body("successfull");
    }

    @PutMapping("/job/update")
    public ResponseEntity<ResponseObject> updateCategory(@RequestBody JobDTO jobDTO) {
        Job job = jobService.updateById(jobDTO);
        if (job == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    new ResponseObject(HttpStatus.BAD_REQUEST, "Job không tồn tại", ""));
        }
        return ResponseEntity.ok().body(new ResponseObject(HttpStatus.OK, "Cập nhật Job thành công", jobService.updateById(jobDTO)));
    }

    @PostMapping("/job/search")
    public ResponseEntity<List<JobDTO>> getAllJobs(@RequestBody PageVM pageVM, @RequestParam(value = "search",
            required = false) String search, @RequestParam(value = "sortBy",
            required = false) String sortBy) {
        Page<JobDTO> page = jobService.getAllJobs(pageVM, search, sortBy);
        return ResponseEntity.ok().body(page.getContent());
    }

    @PutMapping("/job/updateStatus")
    public ResponseEntity<ResponseObject> updateStatus(@RequestBody StatusJobDTO statusJobDTO) {
        Job job = jobService.updateStatus(statusJobDTO);
        if (job == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    new ResponseObject(HttpStatus.BAD_REQUEST, "Job không tồn tại", ""));
        }
        return ResponseEntity.ok().body(new ResponseObject(HttpStatus.OK, "cập nhật trạng thái thành công", jobService.updateStatus(statusJobDTO)));
    }

    @PutMapping("/job/updateReason")
    public ResponseEntity<ResponseObject> updateReason(@RequestBody ReasonDTO reasonDTO) {
        Job job = jobService.updateReason(reasonDTO);
        if (job == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    new ResponseObject(HttpStatus.BAD_REQUEST, "Job không tồn tại", ""));
        }
        return ResponseEntity.ok().body(new ResponseObject(HttpStatus.OK, "cập nhật trạng thái thành công", jobService.updateReason(reasonDTO)));
    }

    @GetMapping("job/selct")
    public ResponseEntity<JobFieldVM> getFieldSelect(){
        return ResponseEntity.ok().body(jobService.getFieldSelect());
    }

    @GetMapping("job/publishing")
    public int countJobPublish() {
        return jobService.countJobPublished();
    }

    @GetMapping("job/jobDueSoon")
    public int countAllJobDueSoon() {
        return jobService.countAllJobDueSoon();
    }

    @GetMapping("job/views")
    public int countViewsJob() {
        return jobService.countViewjob();
    }

    @GetMapping("job/needs/month")
    public int countJobNeeds(@RequestParam("month") int month) {
        return jobService.countJobNeedManStepMonth(month);
    }

    @GetMapping("job/updating/views")
    public void updateviews(@RequestParam("id") Long id){
         jobService.updateViewBy(id);
    }

    @GetMapping("job/academiclevel")
    public List<AcademicLevel> getAllAclevel(){
        return jobService.getAllAcademiclevel();
    }
    @GetMapping("job/Workingform")
    public List<WorkingForm> getAllWorkingForm(){
        return jobService.getAllWorkingform();
    }

    @GetMapping("job/jobposition")
    public List<JobPosition> getAllJobposition(){
        return jobService.getAllJobPosition();
    }

    @GetMapping("job/rank")
    public List<Rank> getAllRank(){
        return jobService.getAllRank();
    }

    @GetMapping("job/statusjob")
    public List<StatusJob> getAllStatusJob(){
        return jobService.getAllAStatusJobs();
    }

}




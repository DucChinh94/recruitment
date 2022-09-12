package com.itsol.recruit.service.impl;

import com.itsol.recruit.dto.BookInterviewDto;
import com.itsol.recruit.dto.JobRegisterDTO;
import com.itsol.recruit.dto.StatusJobRegisterDTO;
import com.itsol.recruit.entity.Job;
import com.itsol.recruit.entity.JobRegister;
import com.itsol.recruit.entity.StatusJobRegister;
import com.itsol.recruit.filter.JobRgfilter;
import com.itsol.recruit.repository.JobRegisterRepository;
import com.itsol.recruit.repository.StatusJobRegisterRepository;
import com.itsol.recruit.service.JobRegisterService;
import com.itsol.recruit.service.mapper.JobRegisterMapper;
import com.itsol.recruit.specification.JobRegisterSpecification;
import com.itsol.recruit.web.vm.PageVM;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.transaction.Transactional;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Optional;
@Service
@Transactional

public class JobRegisterServiceImp implements JobRegisterService {

    @Autowired
    public JobRegisterMapper jobRegisterMapper;
    @Autowired
    public JobRegisterRepository jobRegisterRepository;
    @Autowired
    public StatusJobRegisterRepository statusJobRegisterRepository;

    @Autowired
    public JavaMailSender javaMailSender;

    @Override
    public  Page<JobRegisterDTO> getAllJobRegister(PageVM pageVM, String search, String sortBy, JobRgfilter jobRgfilter) {
        Pageable firstPageWithTwoElements;
        if(sortBy == null){
            firstPageWithTwoElements = PageRequest.of(pageVM.getPageNumber(), pageVM.getPageSize());
        }else {
            firstPageWithTwoElements = PageRequest.of(pageVM.getPageNumber(), pageVM.getPageSize(), Sort.by(sortBy));
        }
        Specification<JobRegister> where = JobRegisterSpecification.buildWhere(search, jobRgfilter);
        return  jobRegisterRepository.findAll(where,firstPageWithTwoElements).map(jobRegisterMapper::toDto);

    }

    @Override
    public Optional<JobRegister> findById(Long id) {
        return jobRegisterRepository.findById(id);
    }

    @Override
    public JobRegister addJobRegister(JobRegisterDTO dto) {
        JobRegister jobRegister = jobRegisterMapper.toEntity(dto);
        return jobRegisterRepository.save(jobRegister);

    }

    @Override
    public JobRegisterDTO save(JobRegisterDTO jobRegisterDTO) {
//        return jobRegisterRepository.save(jobRegisterDTO);
        return null;
    }


    @Override
    public void deleteById(Long id) {
        jobRegisterRepository.deleteById(id);
    }

    @Override
    public JobRegister updateById(JobRegisterDTO jobRegisterDTO) {
        Optional<JobRegister> jobRegisterOptional = jobRegisterRepository.findById(jobRegisterDTO.getId());
        if (jobRegisterOptional.isPresent()){
            JobRegister jobRegister = jobRegisterMapper.toEntity(jobRegisterDTO);
            jobRegisterRepository.save(jobRegister);
            jobRegister.setId(jobRegisterDTO.getId());
            return jobRegisterOptional.get();
        }
        return null;
    }

//    @Override
//    public Job updateStatus(StatusJobDTO statusJobDTO) {
//        Job job = jobRepository.findById(statusJobDTO.getJobId()).get();
//        job.setStatusJob(statusJobRepository.findStatusById(statusJobDTO.getStatusId()));
//        return jobRepository.save(job);
//    }

    @Override
    public JobRegister updateStatusJobRegister(StatusJobRegisterDTO statusJobRegisterDTO) {
        JobRegister jobRegister = jobRegisterRepository.findById(statusJobRegisterDTO.getJobRegisterId()).get();
        jobRegister.setStatusJobRegister(statusJobRegisterRepository.findStatusById(statusJobRegisterDTO.getStatusJobRegisterId()));
        jobRegister.setReason(statusJobRegisterDTO.getReason());

        if(statusJobRegisterDTO.getJobRegisterId() == 4){
            Job job = jobRegister.getJob();
            job.setQtyPerson(job.getQtyPerson()-1);
            jobRegister.setJob(job);
        }
        return jobRegisterRepository.save(jobRegister);
    }

    public Page<JobRegisterDTO> findAlD(Pageable pageable){
        return (Page<JobRegisterDTO>) jobRegisterRepository.findAll((Sort) pageable).stream().map(jobRegisterMapper::toDto);
    }

    @Override
    public int countAll() {
        return jobRegisterRepository.countAll();
    }

    @Override
    public int countJobRegByStatus(Long statusId, String smallDate, String bigDate) {
        return jobRegisterRepository.countJobRegisterByStatus(statusId, smallDate,  bigDate);
    }

    @Override
    public int countSuccessfullJobReg(int param) {
        return jobRegisterRepository.countSuccessfullJobReg(param);
    }

    @Override
    public JobRegister bookInterView(BookInterviewDto dto) throws ParseException {
        JobRegister jobRegister = jobRegisterRepository.findById(dto.getId()).get();
        jobRegister.setMethodInterview(dto.getMethodInterview());
        jobRegister.setAddressInterview(dto.getAddressInterview());
        StatusJobRegister statusJobRegister = new StatusJobRegister(4L, "đang phỏng vấn", "đang phỏng vấn", false);
        jobRegister.setStatusJobRegister(statusJobRegister);
        String date = dto.getDateInterview();
    String dateInterviewFix = date.split("-")[2].split("T")[0]
            + "-" + date.split("-")[1] + '-' + date.split("-")[0]
            + ' ' + date.split("-")[2].split("T")[1] + ":00";
        Date simpleDateFormat = new SimpleDateFormat("dd-mm-yyyy hh:mm:ss").parse(dateInterviewFix);
        jobRegister.setDateInterview(simpleDateFormat);

        MimeMessage mimeMessage
                = javaMailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper;
        try {
            mimeMessageHelper
                    = new MimeMessageHelper(mimeMessage, true);
            mimeMessageHelper.setFrom("hulkhulk1245@gmail.com");
            mimeMessageHelper.setTo(jobRegister.getUser().getEmail());
            mimeMessageHelper.setText("Dear anh/chị "+ jobRegister.getUser().getName() + ",\n" +
                    "\n" +
                    "Công ty ITSOL rất vui và vinh hạnh khi nhận được hồ sơ ứng tuyển của anh/chị vào vị trí "+ jobRegister.getJob().getName()+"." +
                    " Chúng tôi đã nhận được CV của anh/chị và mong muốn có một cuộc phỏng vấn để trao đổi trực tiếp về kiến thức cũng như công việc mà anh/chị đã ứng tuyển.\n" +
                    "\n" +
                    "Thời gian phỏng vấn dự kiến vào lúc "+ dateInterviewFix.split(" ")[1] +" vào ngày " +dateInterviewFix.split(" ")[0] +" qua công cụ "
                    +dto.getAddressInterview()+ " " +
                    "(chúng tôi sẽ gửi lại link sau khi anh/chị xác nhận đồng ý phỏng vấn bằng các reply lại mail này).\n" +
                    "\n" +
                    "Chúng tôi rất hy vọng anh/chị sớm phản hồi và mong rằng chúng ta sẽ được hợp tác cùng nhau trong tương lai.\n" +
                    "\n" +
                    "Mọi thắc mắc xin vui lòng liên hệ tới anh Nguyen Van A, SĐT: 0912345678 trong giờ hành chính để được giải đáp.\n" +
                    "\n" +
                    "Thanks & best regards,\n" +
                    "ITSOL JSC\n" +
                    "Head office: Tầng 3, tòa nhà 3A, ngõ 82, phố Duy Tân, phường Dịch Vọng Hậu, quận Cầu Giấy, Hà Nội\n" +
                    "Hotline: 0123456789\n");
            mimeMessageHelper.setSubject("Thư mời phỏng vấn");
            javaMailSender.send(mimeMessage);
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
        return jobRegisterRepository.save(jobRegister);
    }

}

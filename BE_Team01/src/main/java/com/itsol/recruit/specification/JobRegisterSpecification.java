package com.itsol.recruit.specification;

import com.itsol.recruit.entity.JobRegister;
import com.itsol.recruit.filter.JobRgfilter;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;

public class JobRegisterSpecification {
    public static Specification<JobRegister> buildWhere(String search, JobRgfilter jobRgfilter){
        Specification<JobRegister> where = null;

        if (!StringUtils.isEmpty(search)) {
            search = search.trim();
            CustomJobRegisterSpecification name = new CustomJobRegisterSpecification("name", search);
//            CustomJobRegisterSpecification dateInterview  = new CustomJobRegisterSpecification("dateInterview", search);
//            CustomJobRegisterSpecification dateRegister = new CustomJobRegisterSpecification("dateRegister", search);
//            CustomJobRegisterSpecification typeInterview = new CustomJobRegisterSpecification("typeInterview", search);

            where = Specification.where(name);
        }

        if (jobRgfilter != null && !StringUtils.isEmpty(jobRgfilter.getStatus())) {
            CustomJobRegisterSpecification status = new CustomJobRegisterSpecification("status", jobRgfilter.getStatus() );
            if (where == null) where = status;
            else where = where.and(status);
        }

        if (jobRgfilter != null && jobRgfilter.getMinDate() != null) {
            CustomJobRegisterSpecification minDate = new CustomJobRegisterSpecification("minDate", jobRgfilter.getMinDate());
            if (where == null) where = minDate;
            else where = where.and(minDate);
        }

        if (jobRgfilter != null && jobRgfilter.getMaxDate() != null) {
            CustomJobRegisterSpecification maxDate = new CustomJobRegisterSpecification("maxDate", jobRgfilter.getMaxDate());
            if (where == null) where = maxDate;
            else where = where.and(maxDate);
        }

        return where;
    }
}

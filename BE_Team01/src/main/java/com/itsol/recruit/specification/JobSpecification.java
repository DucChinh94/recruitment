package com.itsol.recruit.specification;
import com.itsol.recruit.entity.Job;
import com.itsol.recruit.filter.JobFilter;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;

public class JobSpecification {

    public static Specification<Job> buildWhere(String search, JobFilter jobFilter){
        Specification<Job> where = null;

        if (!StringUtils.isEmpty(search)) {
            search = search.trim();
            CustomSpecificationJob name = new CustomSpecificationJob("name", search);

            where = Specification.where(name);
        }

        if (jobFilter != null && !StringUtils.isEmpty(jobFilter.getStatusJob())) {
            CustomSpecificationJob status = new CustomSpecificationJob("statusJob", jobFilter.getStatusJob() );
            if (where == null) where = status;
            else where = where.and(status);
        }

        if (jobFilter != null && jobFilter.getMinsalary()>0) {
            CustomSpecificationJob minsalary = new CustomSpecificationJob("minsalary", jobFilter.getMinsalary());
            if (where == null) where = minsalary;
            else where = where.and(minsalary);
        }

        if (jobFilter != null && jobFilter.getMaxSalary()>0) {
            CustomSpecificationJob maxsalary = new CustomSpecificationJob("maxsalary", jobFilter.getMaxSalary());
            if (where == null) where = maxsalary;
            else where = where.and(maxsalary);
        }


        return where;
    }
}

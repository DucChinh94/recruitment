package com.itsol.recruit.web.vm;

import lombok.Data;
import org.springframework.data.domain.Sort;

@Data
public class PageVM {
    int pageSize;
    int pageNumber;
}

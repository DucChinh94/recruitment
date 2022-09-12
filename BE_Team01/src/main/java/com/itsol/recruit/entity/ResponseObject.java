package com.itsol.recruit.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.http.HttpStatus;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ResponseObject {
     HttpStatus httpStatus;
     String message;
     Object obj;

    public ResponseObject(String message, Object obj) {
        this.message = message;
        this.obj = obj;
    }
}

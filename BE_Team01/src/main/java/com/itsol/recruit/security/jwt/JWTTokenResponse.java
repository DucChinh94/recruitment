package com.itsol.recruit.security.jwt;

import com.itsol.recruit.entity.User;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class JWTTokenResponse {
    String jwt;
    User user;
}

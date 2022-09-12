package com.itsol.recruit.service;


import com.itsol.recruit.dto.UserDTO;
import com.itsol.recruit.entity.ResponseObject;
import com.itsol.recruit.entity.User;
import com.itsol.recruit.security.jwt.JWTTokenResponse;
import com.itsol.recruit.web.vm.LoginVM;

import javax.mail.MessagingException;

public interface AuthenticateService {
    public User signup(UserDTO dto);

    ResponseObject changePassword(String username, String newPasswors, String currentpass);

    String sendOtpToGmail(String gmail);

    void takeNewPassword(String otpTaken, String newPassword);
    JWTTokenResponse login(LoginVM loginVM);
}

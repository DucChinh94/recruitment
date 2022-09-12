package com.itsol.recruit.web.auth;

import com.itsol.recruit.core.Constants;
import com.itsol.recruit.dto.UserDTO;
import com.itsol.recruit.entity.ResponseObject;
import com.itsol.recruit.entity.User;
import com.itsol.recruit.repository.OTPRepository;
import com.itsol.recruit.service.AuthenticateService;
import com.itsol.recruit.service.UserService;
import com.itsol.recruit.web.vm.LoginVM;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Date;

@RestController
@RequestMapping(value = Constants.Api.Path.AUTH)
@Api(tags = "Auth")
@CrossOrigin(origins = "*", maxAge = 3600)
public class AuthenticateController {

    private final AuthenticateService authenticateService;

    private final UserService userService;

    @Autowired
    OTPRepository otpRepository;

    public AuthenticateController(AuthenticateService authenticateService, UserService userService) {
        this.authenticateService = authenticateService;

        this.userService = userService;

    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@Valid @RequestBody UserDTO dto) {

        if (userService.findUserByUserName(dto.getUserName()) != null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    new ResponseObject(HttpStatus.BAD_REQUEST, "Username đã tồn tại", ""));
        } else if (userService.findUserByEmail(dto.getEmail()) != null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    new ResponseObject(HttpStatus.BAD_REQUEST, "Email đã tồn tại", ""));
        } else if (userService.findByPhonenumber(dto.getPhoneNumber()) != null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    new ResponseObject(HttpStatus.BAD_REQUEST, "Phone đã tồn tại", ""));
        }
        return ResponseEntity.ok().body(new ResponseObject(HttpStatus.OK, "Đăng kí thành công", authenticateService.signup(dto)));
    }

    /*
    Login api
     */
    @PostMapping("/login")
    public ResponseEntity<?> authenticateAdmin(@Valid @RequestBody LoginVM loginVM) {


        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        User user =userService.findUserByUserName(loginVM.getUserName());
        if (user == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    new ResponseObject(HttpStatus.BAD_REQUEST, "Tài khoản không tồn tại", ""));
        } else if (!passwordEncoder.matches(loginVM.getPassword(), userService.findUserByUserName(loginVM.getUserName()).getPassword())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    new ResponseObject(HttpStatus.BAD_REQUEST, "Sai thông tin mật khẩu", ""));
        } else if (user.isActive() == false) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                    new ResponseObject(HttpStatus.UNAUTHORIZED, "Tài khoản chưa active", ""));
        }
        return ResponseEntity.ok().body(authenticateService.login(loginVM));

    }

    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestParam("username") String username, @RequestParam("password") String pass, @RequestParam("curpassword") String currentpass) {
        return ResponseEntity.ok().body(authenticateService.changePassword(username, pass,currentpass));
    }

    @PreAuthorize("permitAll()")
    @PostMapping("/opt-generaing")
    public ResponseEntity<ResponseObject> sendOtpToEmail(@RequestParam("email") String email) {
        if (userService.findUserByEmail(email) == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    new ResponseObject(HttpStatus.BAD_REQUEST, "Email không tồn tại", ""));
        }
        return ResponseEntity.ok().body(
                new ResponseObject(HttpStatus.OK, "Gửi Otp thành công", authenticateService.sendOtpToGmail(email)));
    }

    @PreAuthorize("permitAll()")
    @PostMapping("/newPass-setting")
    public ResponseEntity<?> resetPassword(@RequestParam("opt") String optGen, @RequestParam("password") String password) {
        if (otpRepository.findByCode(optGen) == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    new ResponseObject(HttpStatus.BAD_REQUEST, "Otp không đúng!", ""));
        } else if (otpRepository.findByCode(optGen).getIssueAt() < new Date().getTime()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    new ResponseObject(HttpStatus.BAD_REQUEST, "Otp này đã hết hạn!", ""));
        }
        authenticateService.takeNewPassword(optGen, password);
        return ResponseEntity.ok().body(HttpStatus.OK);
    }
}

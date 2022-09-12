package com.itsol.recruit.web;

import com.itsol.recruit.core.Constants;
import com.itsol.recruit.dto.UserDTO;
import com.itsol.recruit.entity.ResponseObject;
import com.itsol.recruit.entity.Role;
import com.itsol.recruit.entity.User;
import com.itsol.recruit.service.UserService;
import com.itsol.recruit.web.vm.PageVM;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = Constants.Api.Path.PUBLIC)

public class UserController {

    public final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping(value = "/user")
    public ResponseEntity<List<User>> getAllUser() {
        return ResponseEntity.ok().body(userService.getAllUser());
    }

    @GetMapping(value = "/user/{id}")
    public ResponseEntity<User> findUserById(@RequestParam("id") Long id) {

        return ResponseEntity.ok().body(userService.findById(id));
    }

    @PreAuthorize("permitAll()")
    @GetMapping(value = "active_account")
    public ResponseEntity<?> activeAccount(@RequestParam("id") Long id) {
        userService.activeAccount(id);
        return ResponseEntity.ok().body("ok");
    }

    @PostMapping("/user-lists")
    public ResponseEntity<List<UserDTO>> getAllUsers(@RequestBody PageVM pageVM, @RequestParam(value = "search",
            required = false) String search,@RequestParam(value = "sortBy",
            required = false) String sortBy) {
        Page<UserDTO> page = userService.getAllUsers(pageVM, search, sortBy);
        return ResponseEntity.ok().body(page.getContent());
    }

    @PutMapping("user-deleting")
    public ResponseEntity<ResponseObject> deActiveUser(@RequestParam("username") String username){
        User user = userService.findUserByUserName(username);
        if(user == null){
            return ResponseEntity.badRequest().body((new ResponseObject(HttpStatus.BAD_REQUEST
                    , "Username không tồn tại", "")));
        } else if (!user.getRoles().contains(new Role(2L,"ROLE_JE", "ROLE_JE", false))) {
            return ResponseEntity.badRequest().body((new ResponseObject(HttpStatus.BAD_REQUEST
                    , "Username này không phải JE", "")));
        }
        userService.deActiveUser(username);
        return ResponseEntity.ok().body((new ResponseObject(HttpStatus.OK
                , "Deactive thành công", "")));
    }

    @PostMapping("user-insertion")
    public ResponseEntity<ResponseObject> addNewJE(@RequestBody UserDTO dto){
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
        userService.createNewUser(dto);
        return ResponseEntity.ok().body(new ResponseObject(HttpStatus.OK, "Tạo JE mới thành công", ""));
    }

    @PutMapping("user-updating")
    public ResponseEntity<ResponseObject> updateUser(@RequestBody UserDTO dto, @RequestParam("username") String username) {
        if (userService.findUserByUserName(dto.getUserName()) != null && !dto.getUserName().equals(username)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    new ResponseObject(HttpStatus.BAD_REQUEST, "Username đã tồn tại", ""));
        } else if (userService.findUserByEmail(dto.getEmail()) != null && !userService.findUserByUserName(username).getEmail().equals(dto.getEmail())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    new ResponseObject(HttpStatus.BAD_REQUEST, "Email đã tồn tại", ""));
        } else if (userService.findUserByEmail(dto.getPhoneNumber()) != null && !userService.findUserByUserName(username).getPhoneNumber().equals(dto.getPhoneNumber())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    new ResponseObject(HttpStatus.BAD_REQUEST, "Phone đã tồn tại", ""));
        }
        userService.updateUser(username,dto);
        return ResponseEntity.ok().body(new ResponseObject(HttpStatus.OK, "Cập nhật thông tin JE thành công", ""));
    }

    @PutMapping("user/updating")
    public ResponseEntity<ResponseObject> updateinfo(@RequestBody UserDTO dto, @RequestParam("username") String email){
        if (userService.findUserByEmail(dto.getEmail()) != null && !userService.findUserByUserName(email).getEmail().equals(dto.getEmail())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    new ResponseObject(HttpStatus.BAD_REQUEST, "Email đã tồn tại", ""));
        } else if (userService.findByPhonenumber(dto.getPhoneNumber()) != null && !userService.findUserByUserName(email).getPhoneNumber().equals(dto.getPhoneNumber())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    new ResponseObject(HttpStatus.BAD_REQUEST, "Phone đã tồn tại", ""));
        }
      userService.updateUserByUsername(email,dto);
         return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject(HttpStatus.OK, "OK", ""));
    }
}

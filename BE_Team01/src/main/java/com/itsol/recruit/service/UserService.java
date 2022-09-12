package com.itsol.recruit.service;

import com.itsol.recruit.dto.UserDTO;
import com.itsol.recruit.entity.User;
import com.itsol.recruit.web.vm.PageVM;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface UserService {

    public List<User> getAllUser();

    public User findById(Long id);

    public User findUserByUserName(String userName);

    public boolean isExistedUser(String userName);
    public boolean isExistedUserByEmail(String Email);

    public User findUserByEmail(String email);

    void sendConfirmUserRegistrationViaEmail(String email);

    void activeAccount(Long id);

    String generateOTP(User user);

    User findByPhonenumber(String phone);

    Page<UserDTO>getAllUsers(PageVM pageVM, String search,String sortBy);

    void deActiveUser(String username);

    void createNewUser(UserDTO userDTO);

    void updateUser(String name,UserDTO userDTO);

    void updateUserByUsername(String email, UserDTO userDTO);

}

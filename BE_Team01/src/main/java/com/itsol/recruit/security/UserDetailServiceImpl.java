package com.itsol.recruit.security;


import com.itsol.recruit.entity.Role;
import com.itsol.recruit.entity.User;
import com.itsol.recruit.repository.UserRepository;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE)
@Component("userDetailsService")
public class UserDetailServiceImpl implements UserDetailsService {


    public final UserRepository userRepositoryJpa;

    public UserDetailServiceImpl(UserRepository userRepositoryJpa) {
        this.userRepositoryJpa = userRepositoryJpa;
    }

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        User user = userRepositoryJpa.findByUserName(username);

        if (user == null) {
            throw new UsernameNotFoundException("username not found");
        }

        if (!user.isActive()) {
            throw new UserNotActivatedException("User " + username + " was not activated");
        }

        List<GrantedAuthority> grantedAuthorities
                = user.getRoles().stream().map(authority -> new SimpleGrantedAuthority(authority.getCode())).collect(Collectors.toList());

        return new org.springframework.security.core.userdetails.User(user.getUserName(), user.getPassword(), grantedAuthorities);

    }

//    private org.springframework.security.core.userdetails.User createSpringSecurityUser(String userName, User user) {
//        if (!user.isActive()) {
//            throw new UserNotActivatedException("User " + userName + " was not activated");
//        }
//         List<GrantedAuthority> grantedAuthorities
//                 = user.getRoles().stream().map(authority -> new SimpleGrantedAuthority(authority.getCode())).collect(Collectors.toList());
//        // có thể thay thế bằng đoạn code bên dưới cho dễ hiểu
////        Set<GrantedAuthority> grantedAuthorities = new HashSet<>();
////        Set<Role> roles = user.getRoles();
////        for (Role role : roles) {
////            grantedAuthorities.add(new SimpleGrantedAuthority(role.getCode()));
////        }
//        return new org.springframework.security.core.userdetails.User(user.getUserName(), user.getPassword(), grantedAuthorities);
//    }
}

package com.itsol.recruit.service.impl;

import com.itsol.recruit.entity.Profiles;
import com.itsol.recruit.entity.User;
import com.itsol.recruit.repository.ProfileRepository;
import com.itsol.recruit.repository.UserRepository;
import com.itsol.recruit.service.ProfilesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class ProfileServiceImpl implements ProfilesService {

    @Autowired
    ProfileRepository profileRepository;
    @Autowired
    UserRepository userRepository;


    @Override
    public Profiles getProfileByUsername(String username) {
        User user = userRepository.findByUserName(username);
        return profileRepository.findByUser(user);
    }
}

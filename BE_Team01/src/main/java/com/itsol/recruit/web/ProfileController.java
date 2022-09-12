package com.itsol.recruit.web;

import com.itsol.recruit.core.Constants;
import com.itsol.recruit.entity.Profiles;
import com.itsol.recruit.entity.ResponseObject;
import com.itsol.recruit.service.ProfilesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = Constants.Api.Path.PUBLIC)
public class ProfileController {
    @Autowired
    ProfilesService profilesService;

    @GetMapping("/user/getuser/{username}")
    public ResponseEntity<ResponseObject> getProfiles(@PathVariable String username){
        return ResponseEntity.ok(new ResponseObject("",profilesService.getProfileByUsername(username)));
    }
}

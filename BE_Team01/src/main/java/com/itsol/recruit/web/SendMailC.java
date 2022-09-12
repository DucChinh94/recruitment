package com.itsol.recruit.web;

import com.itsol.recruit.event.MailService;
import com.itsol.recruit.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "sendmail")
public class SendMailC {

    @Autowired
    UserService userService;

    @Autowired
    MailService mailService;

    @PostMapping
    public void sendmail(){
//        mailService.send("haininhnguyen1305@gmail.com","hulkhulk1245@gmail.com")

        userService.sendConfirmUserRegistrationViaEmail("haininhnguyen1305@gmail.com");
    }


}

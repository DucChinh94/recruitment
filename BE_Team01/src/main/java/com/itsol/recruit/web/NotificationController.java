package com.itsol.recruit.web;

import com.itsol.recruit.entity.Notifications;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class NotificationController {

    @Autowired
    private SimpMessagingTemplate template;

    private Notifications notifications = new Notifications();

    @GetMapping("/notify")
    public String getNotification() {

notifications.setContent("ninh po do");
        template.convertAndSend("/topic/notification", notifications);

        return "Notifications successfully sent to Angular !";
    }
}

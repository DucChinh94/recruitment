package com.itsol.recruit.event;

import com.itsol.recruit.entity.User;
import com.itsol.recruit.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Component
@Slf4j
public class MailService implements IMailService{

	@Autowired
	private UserService userService;

	@Autowired
	private JavaMailSender javaMailSender;

	@Override
	public void sendRegistrationUserConfirm(String email) {
		User user = userService.findUserByEmail(email);

		String confirmationUrl =
				"http://localhost:4200/transtolink";


		String subject = "Account registration confirmation.";


		sendEmail(email, subject, confirmationUrl);
	}

	private void sendEmail(final String recipientEmail, final String subject, final String content) {


		MimeMessage message = javaMailSender.createMimeMessage();
		MimeMessageHelper helper = null;
		try {
			helper = new MimeMessageHelper(message, true);
			helper.setSubject(subject);
			helper.setFrom("hulkhulk1245@gmail.com");
			helper.setTo(recipientEmail);
			helper.setText("<a href='" + content + "'>" +"Click here to confirm"+ "</a>", true);

			javaMailSender.send(message);
		} catch (MessagingException e) {
			throw new RuntimeException(e);
		}


	}
}

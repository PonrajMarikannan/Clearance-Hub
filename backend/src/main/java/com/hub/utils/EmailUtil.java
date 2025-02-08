package com.hub.utils;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hub.constants.EmailConstants;
import com.hub.dao.AuthenticationDao;

import jakarta.persistence.EntityManager;

@Service
@Transactional
public class EmailUtil {

	private JavaMailSender mailSender;
	private AuthenticationDao authenticationDao;
	private EntityManager entityManager;

	public EmailUtil(JavaMailSender mailSender, AuthenticationDao authenticationDao, EntityManager entityManager) {
		super();
		this.mailSender = mailSender;
		this.authenticationDao = authenticationDao;
		this.entityManager = entityManager;
	}

	public void sendLoginCredentials(String toEmail, String subject, String password) {
		
		SimpleMailMessage message = new SimpleMailMessage();
		
		message.setTo(toEmail);
		message.setSubject(EmailConstants.LOGIN_CREDENTIALS_SUBJECT);
		message.setText(String.format(EmailConstants.LOGIN_CREDENTIALS_BODY_TEMPLATE, toEmail, password));

		mailSender.send(message);
	}
	
	
}

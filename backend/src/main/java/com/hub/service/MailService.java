package com.hub.service;

import jakarta.mail.MessagingException;

public interface MailService {
	
	public void sendOtp(String toMail, String otp) throws MessagingException;
	
	public String genOtp();
 
}
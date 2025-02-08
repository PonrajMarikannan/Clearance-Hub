package com.hub.exception;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalException extends Throwable {

	private static final long serialVersionUID = 1L;

	@ExceptionHandler(AdminException.class)
	public ResponseEntity<String> handleFaileToAddAdminException(EmailException ex) {
		return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
	}

	@ExceptionHandler(EmailException.class)
	public ResponseEntity<String> handleClientEmailNotFoundException(EmailException ex) {
		return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
	}

	@ExceptionHandler(AuthenticationException.class)
	public ResponseEntity<Map<String, String>> handleAuthenticationException(AuthenticationException ex) {
		Map<String, String> responseMap = new HashMap<>();
		responseMap.put("error", ex.getMessage());
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseMap);
	}

	@ExceptionHandler(InvalidOtpException.class)
	public ResponseEntity<String> handleInvalidOtpException(InvalidOtpException ex) {
		return ResponseEntity.badRequest().body(ex.getMessage()); 
	}

	@ExceptionHandler(OtpExpiredException.class)
	public ResponseEntity<String> handleOtpExpiredException(OtpExpiredException ex) {
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ex.getMessage()); 
	}

	@ExceptionHandler(ResourceNotFoundException.class)
	public ResponseEntity<String> handleResourceNotFoundException(ResourceNotFoundException ex) {
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
	}

}

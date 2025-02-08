package com.hub.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hub.constants.APIConstants;
import com.hub.dto.LoginResponse;
import com.hub.model.User;
import com.hub.service.AuthenticationService;
import com.hub.utils.JwtUtils;

@RestController
@RequestMapping(APIConstants.BASE_URL)
public class AuthenticationController {

	private AuthenticationService authService;

	public AuthenticationController(AuthenticationService authService) {
		super();
		this.authService = authService;
	}

	@PostMapping(APIConstants.CHECK_LOGIN_CREDENTIALS)
	public ResponseEntity<?> loginUser(@RequestBody User user) {
		try {
			LoginResponse loginResponse = authService.validate(user.getEmail(), user.getPassword());
			if (loginResponse.getStatus().equals("Failure")) {
				return ResponseEntity.ok(loginResponse);
			} else {
				JwtUtils jwtUtil = new JwtUtils();
				String token = jwtUtil.generateToken(loginResponse);
				Map<String, String> responseMap = new HashMap<>();
				responseMap.put("token", token);
				return ResponseEntity.ok(responseMap);
			}
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Server error. Please try again later.");
		}
	}

	@PostMapping(APIConstants.CREATE_LOGIN_CREDENTIALS)
	public String createUser(@RequestBody User user) {
		try {
			String result = authService.createUser(user);
			return result;
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return "Failure";
		}
	}

    @GetMapping(APIConstants.GET_USER)
	public User getUserById(@PathVariable("id") int id) {
		return authService.getUser(id);
	}
    
    @GetMapping(APIConstants.GET_ALL_USER)
    public List<User> getAllUser() {
    	return authService.getAllUser();
    }

//    @PutMapping("/updatePass")
//    public String updatePassword(
//            @RequestParam("userId") int  userId,
//            @RequestParam("currentPassword") String currentPassword,
//            @RequestParam("newPassword") String newPassword,
//            @RequestParam("confirmNewPassword") String confirmNewPassword) {
//
//        String msg;
//    	BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();
//
//        User user =  serviceimpl.getUser(userId);
//        String old = user.getPassword();
//        try {
//	        if(bcrypt.matches(currentPassword, old)){
//	        	String encryptPassword = bcrypt.encode(newPassword);
//	        	user.setPassword(encryptPassword);
//	        	serviceimpl.updatePassword(user);
//				msg="Success";
//	        }
//	        else {
//	        	msg=" Password Does not Match!";
//	        }
//        }
//		catch(Exception e) {
//			msg="Failure";
//		}
//		return msg;
//	}

//    @GetMapping("/updatePass")
//    public ResponseEntity<User> updatePassword(
//       ) {
//        // Your logic to update the password
//        return ResponseEntity.ok(/* Return updated user or appropriate response */);
//    }

//    @PostMapping("/mail")
//    public ResponseEntity<String> sendCustomEmail(@RequestBody EmailRequest emailRequest) {
//        try {
//        	String content = String.format(
//        		    "Dear %s,\n\n" +
//        		    "Your account has been successfully created with CustomsGate.\n\n" +
//        		    "Here are your login credentials:\n" +
//        		    "Email: %s\n" +
//        		    "Password: %s\n\n" +
//        		    "For security reasons, we recommend changing your password after logging in for the first time. To do this, please follow these steps:\n" +
//        		    "1. Log in to your account using the credentials provided.\n" +
//        		    "2. Go to the Change Password in Sidebar.\n" +
//        		    "3. Change your password.\n" +
//        		    "4. Follow the instructions to set a new password.\n\n" +
//        		    "If you have any questions or need assistance, feel free to contact our support team.\n\n" +
//        		    "Best regards,\n" +
//        		    "The CustomsGate Team",
//        		    emailRequest.getEmail().split("@")[0],
//        		    emailRequest.getEmail(),
//        		    emailRequest.getPassword()
//        		);
//
//            String subject = "Successfully Account Creation";
//            mailservice.sendEmail(emailRequest.getEmail(), subject, content);
//            return ResponseEntity.ok("MailSend");
//        } catch (Exception e) {
//            e.printStackTrace(); 
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to send email");
//        }
//    }

}

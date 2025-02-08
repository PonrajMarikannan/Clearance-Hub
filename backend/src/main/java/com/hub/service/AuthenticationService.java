package com.hub.service;

import java.util.List;

import com.hub.dto.LoginResponse;
import com.hub.model.User;

public interface AuthenticationService {
	
	LoginResponse validate(String email, String password); // Check the User Credientials
    String createUser(User user); // Create a User
    List<User> getAllUser(); // Get all Users
    User getUser(int id); 
    
    User findUserByEmail(String email);
	void updatePassword(User user);
	
}

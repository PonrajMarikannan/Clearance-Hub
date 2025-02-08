package com.hub.dao;

import java.util.List;

import com.hub.model.User;

public interface AuthenticationDao {
	
	User findByEmail(String email); // Method to find Email
    void createUser(User user); // Method to create a User
    List<User>findAllUser(); // Method to get all users
    
	User findById(int id);
	void update(User user);
}


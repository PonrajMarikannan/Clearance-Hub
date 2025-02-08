package com.hub.dto;

public class LoginResponse {
	
	private int userId;
	private String email;
	private String status;
    private String role;
	public int getUserId() {
		return userId;
	}
	public void setUserId(int userId) {
		this.userId = userId;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	public LoginResponse(int userId, String email, String status, String role) {
		super();
		this.userId = userId;
		this.email = email;
		this.status = status;
		this.role = role;
	}
	
	
	public LoginResponse(String status) {
		super();
		this.status = status;
	}
	public LoginResponse() {
		super();
	}
    
  
}
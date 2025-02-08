package com.hub.serviceimplementation;

import java.util.List;

import org.springframework.stereotype.Service;

import com.hub.constants.EmailConstants;
import com.hub.constants.MessageConstants;
import com.hub.dao.AuthenticationDao;
import com.hub.dto.LoginResponse;
import com.hub.model.User;
import com.hub.service.AuthenticationService;
import com.hub.utils.EmailUtil;
import com.hub.utils.PasswordGenerate;


@Service
public class AuthenticationServiceImpl implements AuthenticationService {

    private AuthenticationDao authDao;
    private PasswordGenerate passwordGenerate;
    private EmailUtil emailUtil;
    
    public AuthenticationServiceImpl(AuthenticationDao authDao, PasswordGenerate passwordGenerate,
			EmailUtil emailUtil) {
		super();
		this.authDao = authDao;
		this.passwordGenerate = passwordGenerate;
		this.emailUtil = emailUtil;
	}

	public String createUser(User user) {
		if (user.getRole() == null || user.getRole().isEmpty()) {
            user.setRole("client");
        } else {
        	String password = passwordGenerate.generateRandomPassword();
        	user.setPassword(password);
        }
		User response = authDao.findByEmail(user.getEmail());
		if(response==null) {
			if(user.getRole().equals("client")) {
				authDao.createUser(user);				
			} else {
				String subject = EmailConstants.LOGIN_CREDENTIALS_SUBJECT;
				authDao.createUser(user);
				emailUtil.sendLoginCredentials(user.getEmail(), subject, user.getPassword());				
			}
			return MessageConstants.USER_CREATED;
		} else {
			return MessageConstants.EMAIL_EXIST;
		}
    }


	@Override
    public User findUserByEmail(String email) {
        return authDao.findByEmail(email);
    }
    
    @Override
	public User getUser(int id) {
		return authDao.findById(id);
	}

	public void updatePassword(User user) {
		authDao.update(user);
	}

	@Override
	public LoginResponse validate(String email, String password) {
		User user = authDao.findByEmail(email);
		if(user!=null && user.getPassword().equals(password)) {
			return new LoginResponse(user.getUserId(),user.getEmail(),"Success", user.getRole());
		} else {
			return new LoginResponse("Failure");
		}
		
	}

	@Override
	public List<User> getAllUser() {
		return authDao.findAllUser();
	} 
}

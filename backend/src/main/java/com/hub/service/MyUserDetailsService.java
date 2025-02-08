package com.hub.service;


import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import com.hub.dao.AuthenticationDao;
import com.hub.dto.UserPrincipal;
import com.hub.model.User;

@Service
public class MyUserDetailsService implements UserDetailsService {

	private  AuthenticationDao authenticationDao;

	public MyUserDetailsService(AuthenticationDao authenticationDao) {
		super();
		this.authenticationDao = authenticationDao;
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = authenticationDao.findByEmail(username);

		if (user != null) {
			return new UserPrincipal(user.getEmail(), user.getPassword());
		} else {
			throw new UsernameNotFoundException("User with email " + username + " not found");
		}
	}

	private UserDetails CustomUserDetails(String userEmail, String passwordHash) {
		return null;
	}

}

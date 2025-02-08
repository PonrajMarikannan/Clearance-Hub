package com.hub.config;

import java.io.IOException;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.hub.service.MyUserDetailsService;
import com.hub.utils.JwtUtils;

import io.jsonwebtoken.security.SignatureException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtFilter extends OncePerRequestFilter {

	private JwtUtils jwtUtils;
	private final MyUserDetailsService jwtUserDetailsService;

	public JwtFilter(JwtUtils jwtUtils, MyUserDetailsService jwtUserDetailsService) {
		super();
		this.jwtUtils = jwtUtils;
		this.jwtUserDetailsService = jwtUserDetailsService;
	}

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {

		final String requestTokenHeader = request.getHeader("Authorization");
		String username = null;
		String jwtToken = null;

		if (requestTokenHeader != null && requestTokenHeader.startsWith("Bearer ")) {
			jwtToken = requestTokenHeader.substring(7); // Extract JWT token

			try {
				username = jwtUtils.extractUserName(jwtToken);
				System.out.println("Extracted username: " + username);
			} catch (SignatureException e) {
				// Log token and exception details for debugging
				System.err.println("JWT signature does not match: " + e.getMessage());
				System.err.println("JWT Token: " + jwtToken);
				response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid JWT Token");
				return; // Skip further processing
			} catch (Exception e) {
				System.err.println("Error extracting username: " + e.getMessage());
				response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid JWT Token");
				return; // Skip further processing
			}
		}

		if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
			UserDetails userDetails = this.jwtUserDetailsService.loadUserByUsername(username);
			System.out.println("Loaded user details: " + userDetails.getUsername());

			if (jwtUtils.validateToken(jwtToken, userDetails)) {
				UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
						userDetails, null, userDetails.getAuthorities());
				authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
				SecurityContextHolder.getContext().setAuthentication(authenticationToken);
			} else {
				response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid JWT Token");
				return; // Skip further processing
			}
		}

		filterChain.doFilter(request, response);
	}
}

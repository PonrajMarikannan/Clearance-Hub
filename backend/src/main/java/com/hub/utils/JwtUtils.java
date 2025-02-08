package com.hub.utils;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import javax.crypto.SecretKey;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.hub.dto.LoginResponse;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;

@Service
public class JwtUtils {
	
	private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);

	private String SECRET_KEY = "843567893696976453275974432697R634976R738467TR678T34865R6834R8763T478378637664538745673865783678548735687R3";

	private SecretKey generateSecretKey() {
		try {
			byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
			return Keys.hmacShaKeyFor(keyBytes);
		} catch (Exception e) {
			logger.error("Error generating secret key", e);
			throw new RuntimeException("Failed to generate secret key", e);
		}
	}

	public String generateToken(LoginResponse response) {
		Map<String, Object> claims = new HashMap<>();

		claims.put("status", response.getStatus());
		claims.put("id", response.getUserId());
		claims.put("role", response.getRole());
		claims.put("email", response.getEmail());
		
		logger.info(Jwts.builder().claims(claims).subject(response.getEmail()).issuedAt(new Date(System.currentTimeMillis()))
				.expiration(new Date(System.currentTimeMillis() + 24 * 60 * 60 * 1000)) // One day expiration
				.signWith(generateSecretKey()).compact());

		return Jwts.builder().claims(claims).subject(response.getEmail()).issuedAt(new Date(System.currentTimeMillis()))
				.expiration(new Date(System.currentTimeMillis() + 24 * 60 * 60 * 1000)) // One day expiration
				.signWith(generateSecretKey()).compact();
	}

	public boolean validateToken(String token, UserDetails userDetails) {
	    try {
	        final String userName = extractUserName(token);
	        return (userName.equals(userDetails.getUsername()) && !isTokenExpired(token));
	    } catch (ExpiredJwtException e) {
	        logger.error("Token has expired", e);
	        return false;
	    } catch (JwtException e) {
	        logger.error("Token validation failed", e);
	        return false;
	    }
	}


	public String extractUserName(String token) {
		try {
			return extractClaim(token, Claims::getSubject);
		} catch (Exception e) {
			logger.error("Error extracting username from token", e);
			throw new RuntimeException("Error extracting username", e);
		}
	}

	private <T> T extractClaim(String token, Function<Claims, T> claimResolver) {
		final Claims claims = extractAllClaims(token);
		return claimResolver.apply(claims);
	}

public Claims extractAllClaims(String token) {
    try {
        return Jwts.parser()
                .setSigningKey(getSignInKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    } catch (ExpiredJwtException e) {
        logger.error("Token has expired: {}", e.getMessage());
        throw e; // Rethrow so it can be handled appropriately in higher layers
    } catch (JwtException e) {
        logger.error("Error parsing token: {}", e.getMessage());
        throw new RuntimeException("Invalid token", e);
    }
}

	private SecretKey getSignInKey() {
		byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY); // Assuming jwtSigningKey is a base64 encoded secret
		return Keys.hmacShaKeyFor(keyBytes);
	}

	private boolean isTokenExpired(String token) {
		try {
			return extractExpiration(token).before(new Date());
		} catch (Exception e) {
			logger.error("Error checking token expiration", e);
			return true;
		}
	}

	private Date extractExpiration(String token) {
		return extractClaim(token, Claims::getExpiration);
	}

	// Detailed token parsing for debugging
	public void debugTokenParsing(String token) {
		try {
			Claims claims = Jwts.parser().verifyWith(generateSecretKey()).build().parseSignedClaims(token).getPayload();

			logger.debug("Token Debug Information:");
			logger.debug("Subject: {}", claims.getSubject());
			logger.debug("Issued At: {}", claims.getIssuedAt());
			logger.debug("Expiration: {}", claims.getExpiration());

			// Log all custom claims
			claims.entrySet().forEach(entry -> logger.debug("Claim - {}: {}", entry.getKey(), entry.getValue()));
		} catch (Exception e) {
			logger.error("Detailed token parsing failed", e);
		}
	}
}
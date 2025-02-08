package com.hub.utils;

import java.security.SecureRandom;

import org.springframework.stereotype.Service;

@Service
public class PasswordGenerate {

    public String generateRandomPassword() {
        int length = 6; // Fixed length for the password
        
        String upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        String lowerCase = "abcdefghijklmnopqrstuvwxyz";
        String numbers = "0123456789";
        String specialCharacters = "!@#$%^&*()-_=+<>?";
        
        // Combine all characters
        String allCharacters = upperCase + lowerCase + numbers + specialCharacters;
        SecureRandom random = new SecureRandom();
       
        // Ensure that the password contains at least one character from each category
        StringBuilder password = new StringBuilder(length);
        password.append(upperCase.charAt(random.nextInt(upperCase.length())));
        password.append(lowerCase.charAt(random.nextInt(lowerCase.length())));
        password.append(numbers.charAt(random.nextInt(numbers.length())));
        password.append(specialCharacters.charAt(random.nextInt(specialCharacters.length())));

        // Fill the rest of the password length with random characters from all categories
        for (int i = 4; i < length; i++) {
            password.append(allCharacters.charAt(random.nextInt(allCharacters.length())));
        }

        // Shuffle the password to avoid any predictable patterns
        return shuffleString(password.toString());
    }

    // Helper method to shuffle the characters in the password
    private String shuffleString(String input) {
        char[] characters = input.toCharArray();
        SecureRandom random = new SecureRandom();

        for (int i = 0; i < characters.length; i++) {
            int randomIndex = random.nextInt(characters.length);
            char temp = characters[i];
            characters[i] = characters[randomIndex];
            characters[randomIndex] = temp;
        }

        return new String(characters);
    }
}
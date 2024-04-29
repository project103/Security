package com.Security.SecondHandBookStore.service;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;

public class HashedService {

    public static String generateHash(String data, String algorithm) throws NoSuchAlgorithmException {
        MessageDigest digest = MessageDigest.getInstance(algorithm);
        digest.reset();
        byte[] hash = digest.digest(data.getBytes());
        return bytesToStringHex(hash);
    }

    private final static char[] hexArray = "0123456789ABCDEF".toCharArray();

    public static String bytesToStringHex(byte[] bytes) {
        char[] hexChars = new char[bytes.length * 2];
        for (int i = 0; i < bytes.length; i++) {
            int text = bytes[i] & 0xFF;
            hexChars[i * 2] = hexArray[text >>> 4];
            hexChars[i * 2 + 1] = hexArray[text & 0x0F];
        }
        return new String(hexChars);
    }
}

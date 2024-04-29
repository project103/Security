package com.Security.SecondHandBookStore;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.cognizant.SecondHandBookStore.service.encryptdecryptService;
import com.cognizant.SecondHandBookStore.service.HashedService;

import java.security.NoSuchAlgorithmException;

@SpringBootApplication
public class SecondHandBookStoreApplication {

	public static void main(String[] args) throws NoSuchAlgorithmException {
		SpringApplication.run(SecondHandBookStoreApplication.class, args);
		System.out.println("kimo");
		String test = ("test");
		System.out.println("plain text :-"+test);
		encryptdecryptService Service = new encryptdecryptService();
		HashedService hash12 = new HashedService();

		String encry1 = Service.encrypt(test);
		System.out.println("encrypted data :- "+encry1);
		String decry = Service.decrypt(encry1,"YourSecretKey123");
		System.out.println("decrypted data :-  "+decry);

		String passwordhashed = HashedService.generateHash(test,"md5" );
		System.out.println("hashed data :- "+passwordhashed);

    }



}
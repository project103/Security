package com.cognizant.SecondHandBookStore;

import com.cognizant.SecondHandBookStore.service.UserService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import com.cognizant.SecondHandBookStore.service.UserServiceImpl;
import com.cognizant.SecondHandBookStore.service.encryptdecryptService;
@SpringBootApplication
public class SecondHandBookStoreApplication {

	public static void main(String[] args) {
		SpringApplication.run(SecondHandBookStoreApplication.class, args);
		System.out.println("kimo");
		String test = ("test");
		System.out.println("plain text :-"+test);
		encryptdecryptService Service = new encryptdecryptService();
	
		String encry1 = Service.encrypt(test);
		System.out.println("encrypted data :- "+encry1);
		String decry = Service.decrypt(encry1,"YourSecretKey123");
		System.out.println("decrypted data :- "+decry);
    }



}
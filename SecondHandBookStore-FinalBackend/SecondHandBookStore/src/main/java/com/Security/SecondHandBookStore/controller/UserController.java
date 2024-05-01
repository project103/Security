package com.Security.SecondHandBookStore.controller;

import com.Security.SecondHandBookStore.service.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Security.SecondHandBookStore.entity.User;
import com.Security.SecondHandBookStore.responseAndRequest.UserRequest;
import jakarta.validation.Valid;

import java.security.NoSuchAlgorithmException;

@RestController
@RequestMapping(path = "/api/v1/user/")
@CrossOrigin
public class UserController {
	
	@Autowired
	private UserService userService;
	@Autowired
	private encryptdecryptService cryptocraphy ;
	@Autowired
	private JwtService jwtService;
	private HashedService hashedService;


	private UserServiceImpl userServiceImpl;

	@GetMapping(path = "/{id}")
	public User getUser(@PathVariable Long id) {
		User user = userService.getUser(id);
		String encryptedAddress = cryptocraphy.decrypt(user.getAddress(),"YourSecretKey123");
		String encryptedName = cryptocraphy.decrypt(user.getName(),"YourSecretKey123");
		String encryptedEmail = cryptocraphy.decrypt(user.getEmail(),"YourSecretKey123");
		String encryptedphoneno = cryptocraphy.decrypt(user.getPhoneNo(),"YourSecretKey123");
		user.setName(encryptedName);
		user.setEmail(encryptedEmail);
		user.setAddress(encryptedAddress);
		user.setPhoneNo(encryptedphoneno);
		return user;
	}
	
	
	
	@GetMapping(path="/email/{email}")
	public User getUserByEmail(@PathVariable String email) {
	User user =userService.getUserByEmail(email);
		String encryptedAddress = cryptocraphy.decrypt(user.getAddress(),"YourSecretKey123");
		String encryptedName = cryptocraphy.decrypt(user.getName(),"YourSecretKey123");
		String encryptedEmail = cryptocraphy.decrypt(user.getEmail(),"YourSecretKey123");
		String encryptedphoneno = cryptocraphy.decrypt(user.getPhoneNo(),"YourSecretKey123");
		user.setName(encryptedName);
		user.setEmail(encryptedEmail);
		user.setAddress(encryptedAddress);
		user.setPhoneNo(encryptedphoneno);
		return user;

	}
	@PostMapping(path ="/sign-in")
	public User getUserByEmailAndPassword(@RequestBody UserRequest userRequest) throws NoSuchAlgorithmException {

		userRequest.setEmail( cryptocraphy.encrypt(userRequest.getEmail()));
		String passwordhashed = HashedService.generateHash(userRequest.getPassword(),"md5" );
		userRequest.setPassword( passwordhashed);
		//String Token =jwtService.generateToken(userRequest.getEmail());
		// {test : for encryption and hashed}
//		System.out.println("password hashed is :- "+passwordhashed);
//		System.out.println("email hashed is :- "+  userRequest.getEmail());
		//System.out.println(Token);

		User user =  userService.getUserByEmailAndPassword(userRequest );
		String encryptedAddress = cryptocraphy.decrypt(user.getAddress(),"YourSecretKey123");
		String encryptedName = cryptocraphy.decrypt(user.getName(),"YourSecretKey123");
		String encryptedEmail = cryptocraphy.decrypt(user.getEmail(),"YourSecretKey123");
		String encryptedphoneno = cryptocraphy.decrypt(user.getPhoneNo(),"YourSecretKey123");
		user.setName(encryptedName);
		user.setEmail(encryptedEmail);
		user.setAddress(encryptedAddress);
		user.setPhoneNo(encryptedphoneno);
		return user;

	}


	@PostMapping(path = "/sign-up")
	public User createUser(@RequestBody User user) throws NoSuchAlgorithmException {

		String encryptedAddress = cryptocraphy.encrypt(user.getAddress());
		String encryptedName = cryptocraphy.encrypt(user.getName());
		String encryptedEmail = cryptocraphy.encrypt(user.getEmail());
		String encryptedphoneno = cryptocraphy.encrypt(user.getPhoneNo());
		String passwordhashed = HashedService.generateHash(user.getPassword(),"md5" );
		user.setName(encryptedName);
		user.setEmail(encryptedEmail);
		user.setAddress(encryptedAddress);
		user.setPassword(passwordhashed);
		user.setPhoneNo(encryptedphoneno);

		return userService.createUser(user);
	}
	
	
	@PutMapping(path = "/update/{id}")
	public User updateUser(@PathVariable Long id,@Valid @RequestBody User user) {
		String encryptedAddress = cryptocraphy.decrypt(user.getAddress(),"YourSecretKey123");
		String encryptedName = cryptocraphy.decrypt(user.getName(),"YourSecretKey123");
		String encryptedEmail = cryptocraphy.decrypt(user.getEmail(),"YourSecretKey123");
		String encryptedphoneno = cryptocraphy.decrypt(user.getPhoneNo(),"YourSecretKey123");
		user.setName(encryptedName);
		user.setEmail(encryptedEmail);
		user.setAddress(encryptedAddress);
		user.setPhoneNo(encryptedphoneno);
		return userService.updateUser(id, user);
	}
	
	
	@DeleteMapping(path = "/delete/{id}")
	public String deleteUser(@PathVariable Long id) {
		return userService.deleteUser(id);
	}
	
	

}

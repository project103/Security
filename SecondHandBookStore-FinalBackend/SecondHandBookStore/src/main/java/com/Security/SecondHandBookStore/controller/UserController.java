package com.cognizant.SecondHandBookStore.controller;

import com.cognizant.SecondHandBookStore.service.UserServiceImpl;
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
import com.cognizant.SecondHandBookStore.service.HashedService;

import com.cognizant.SecondHandBookStore.entity.User;
import com.cognizant.SecondHandBookStore.responseAndRequest.UserRequest;
import com.cognizant.SecondHandBookStore.service.UserService;
import com.cognizant.SecondHandBookStore.service.encryptdecryptService;
import jakarta.validation.Valid;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;

@RestController
@RequestMapping(path = "/api/v1/user/")
@CrossOrigin
public class UserController {
	
	@Autowired
	private UserService userService;
	@Autowired
	private encryptdecryptService cryptocraphy ;
	private HashedService hashedService;


	Logger logger = LoggerFactory.getLogger(UserController.class);
	private UserServiceImpl userServiceImpl;

	@GetMapping(path = "/{id}")
	public User getUser(@PathVariable Long id) {
		logger.info("get The User of Id :" + id);
		return userService.getUser(id);
	}
	
	
	
	@GetMapping(path="/email/{email}")
	public User getUserByEmail(@PathVariable String email) {
		logger.info("get The User of email :" + email);
		return userService.getUserByEmail(email);
	}

	@PostMapping(path ="/sign-in")
	public User getUserByEmailAndPassword(@RequestBody UserRequest userRequest) throws NoSuchAlgorithmException {
		userRequest.setEmail( cryptocraphy.encrypt(userRequest.getEmail()));
		String passwordhashed = HashedService.generateHash(userRequest.getPassword(),"md5" );
		userRequest.setPassword( passwordhashed);

		// {test : for encryption and hashed}
//		System.out.println("password hashed is :- "+passwordhashed);
//		System.out.println("email hashed is :- "+  userRequest.getEmail());

		logger.info("get The User of email and password");
		return userService.getUserByEmailAndPassword(userRequest);

	}


	@PostMapping(path = "/sign-up")
	public User createUser(@Valid @RequestBody User user) throws NoSuchAlgorithmException {
		logger.info("create the new user");

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
		logger.info("update the existing user");

		return userService.updateUser(id, user);
	}
	
	
	@DeleteMapping(path = "/delete/{id}")
	public String deleteUser(@PathVariable Long id) {
		logger.info("Delete The User");
		return userService.deleteUser(id);
	}
	
	

}

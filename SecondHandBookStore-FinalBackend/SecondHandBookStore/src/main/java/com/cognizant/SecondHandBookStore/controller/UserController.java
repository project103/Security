package com.cognizant.SecondHandBookStore.controller;

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

import com.cognizant.SecondHandBookStore.entity.User;
import com.cognizant.SecondHandBookStore.responseAndRequest.UserRequest;
import com.cognizant.SecondHandBookStore.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping(path = "/api/v1/user/")
@CrossOrigin
public class UserController {
	
	@Autowired
	private UserService userService;
	
	Logger logger = LoggerFactory.getLogger(UserController.class);
	
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
	public User getUserByEmailAndPassword(@RequestBody UserRequest userRequest){
		logger.info("get The User of email and password");
		return userService.getUserByEmailAndPassword(userRequest);
		
	}
	
	
	@PostMapping(path = "/sign-up")
	public User createUser(@Valid @RequestBody User user){
		logger.info("create the new user");
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

package com.Security.SecondHandBookStore.service;

import com.Security.SecondHandBookStore.entity.User;
import com.Security.SecondHandBookStore.responseAndRequest.UserRequest;

public interface UserService {
	
	User getUser(Long id);
	
	User getUserByEmail(String email);
	
	User getUserByEmailAndPassword(UserRequest userDAO);
	
	User createUser(User user);
	
	User updateUser(Long id,User user);
	
	String deleteUser(Long id);

}

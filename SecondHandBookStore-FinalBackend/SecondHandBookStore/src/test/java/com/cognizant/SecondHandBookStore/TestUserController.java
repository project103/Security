package com.cognizant.SecondHandBookStore;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;

import com.cognizant.SecondHandBookStore.controller.UserController;
import com.cognizant.SecondHandBookStore.entity.User;
import com.cognizant.SecondHandBookStore.responseAndRequest.UserRequest;
import com.cognizant.SecondHandBookStore.service.UserService;

import java.security.NoSuchAlgorithmException;

@ExtendWith(MockitoExtension.class)
@SpringBootTest
public class TestUserController {
	
	@Mock
	private UserService userService;
	
	@InjectMocks
	private UserController userController;
	
	@Test
	public void testGetUser() {
		Long userId = 1L;
		
		User expectedUser = User.builder()
				.id(userId)
				.name("Aditya Chandrikapure")
				.email("aditya@gmail.com")
				.phoneNo("1234567891")
				.address("Gondia, Maharashtra")
				.password("Aditya@123")
				.build();
		
		when(userService.getUser(userId)).thenReturn(expectedUser);
		
		User responseProduct = userController.getUser(userId);
		
		assertEquals(expectedUser, responseProduct);
		
	}
	
	@Test
	public void testGetUserByEmail() {
		String email = "aditya@gmail.com";
		
		User expectedUser = User.builder()
				.id(1L)
				.name("Aditya Chandrikapure")
				.email(email)
				.phoneNo("1234567891")
				.address("Gondia, Maharashtra")
				.password("Aditya@123")
				.build();
		
		when(userService.getUserByEmail(email)).thenReturn(expectedUser);
		
		User responseProduct = userController.getUserByEmail(email);
		
		assertEquals(expectedUser, responseProduct);
	}
	
	@Test
	public void testGetUserByEmailAndPassword() {
		UserRequest userRequest = UserRequest.builder()
					.email("aditya@gmail.com")
					.password("Aditya@123")
					.build();
		
		User expectedUser = User.builder()
				.id(1L)
				.name("Aditya Chandrikapure")
				.email("aditya@gmail.com")
				.phoneNo("1234567891")
				.address("Gondia, Maharashtra")
				.password("Aditya@123")
				.build();
		
		when(userService.getUserByEmailAndPassword(userRequest)).thenReturn(expectedUser);
		
		User responseProduct = userController.getUserByEmailAndPassword(userRequest);
		
		assertEquals(expectedUser, responseProduct);
		
		
	}
	
	@Test
	public void testCreateUser() throws NoSuchAlgorithmException {
		User expectedUser = User.builder()
				.id(1L)
				.name("Aditya Chandrikapure")
				.email("aditya@gmail.com")
				.phoneNo("1234567891")
				.address("Gondia, Maharashtra")
				.password("Aditya@123")
				.build();
		
		User user = User.builder()
				.name("Aditya Chandrikapure")
				.email("aditya@gmail.com")
				.phoneNo("1234567891")
				.address("Gondia, Maharashtra")
				.password("Aditya@123")
				.build();
		
		when(userService.createUser(user)).thenReturn(expectedUser);
		
		User responseProduct = userController.createUser(user);
		
		assertEquals(expectedUser, responseProduct);
	}
	
	
	@Test
	public void testUpdateUser() {
		
		Long userId = 1L;
		
		User expectedUser = User.builder()
				.id(1L)
				.name("Aditya Chandrikapure 3")
				.email("aditya@gmail.com")
				.phoneNo("1234567890")
				.address("Gondia, Maharashtra")
				.password("Aditya@123")
				.build();
		
		User user = User.builder()
				.name("Aditya Chandrikapure 3")
				.email("aditya@gmail.com")
				.phoneNo("1234567890")
				.address("Gondia, Maharashtra")
				.password("Aditya@123")
				.build();
		
		when(userService.updateUser(userId,user)).thenReturn(expectedUser);
		
		User responseProduct = userController.updateUser(userId,user);
		
		assertEquals(expectedUser, responseProduct);
	}
	
	
	
	@Test
	public void testDeleteUser() {
		Long userId = 1L;

		when(userService.deleteUser(userId)).thenReturn("User deleted");

		String response = userController.deleteUser(userId);

		assertEquals("User deleted", response);

		verify(userService).deleteUser(userId);
		
	}
	
	
	
}

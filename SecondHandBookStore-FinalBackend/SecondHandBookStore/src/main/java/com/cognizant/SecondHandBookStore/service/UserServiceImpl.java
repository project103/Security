package com.cognizant.SecondHandBookStore.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.cognizant.SecondHandBookStore.service.encryptdecryptService;
import com.cognizant.SecondHandBookStore.entity.Cart;
import com.cognizant.SecondHandBookStore.entity.User;
import com.cognizant.SecondHandBookStore.exception.UserNotFoundException;
import com.cognizant.SecondHandBookStore.repository.CartRepository;
import com.cognizant.SecondHandBookStore.repository.UserRepository;
import com.cognizant.SecondHandBookStore.responseAndRequest.UserRequest;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;

@Service
public class UserServiceImpl implements UserService{

	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private CartRepository cartRepository;
	
	Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

	
	@Override
	public User getUser(Long id) {
		User user = userRepository.findById(id)
				.orElseThrow(() ->  new UserNotFoundException("User Not Found of Id : " + id));
		logger.info("Get the user by id :" + id);
		return user;
	}

	
	
	@Override
	public User getUserByEmail(String email) {
		User user = userRepository.findByEmail(email);
		if(user == null) {
			throw new UserNotFoundException("User Not Found of Email : " + email);
		}
		logger.info("Get the user by email :" + email);
		return user;
	}


	@Override
	public User getUserByEmailAndPassword(UserRequest userRequest) {
		User user = userRepository.findByEmailAndPassword(userRequest.getEmail(),userRequest.getPassword());
		if(user == null) {
			throw new UserNotFoundException("User Not Found of Email : " + userRequest.getEmail());
		}
		logger.info("Get the user by email and password");
		return user;
	}
	

	@Override
	public User createUser(User user) {
		User createUser = userRepository.save(user);
		Cart createCart = new Cart();
		createCart.setUser(createUser);
		createCart.setTotalPrice(0);
		cartRepository.save(createCart);
		logger.info("Created the user");
		return createUser;
	}
	

	@Override
	public User updateUser(Long id,User user) {
		User existedUser = getUser(id);
		if(user.getName() != null) {
			existedUser.setName(user.getName());			
		}
		
		if(user.getEmail() != null) {
			existedUser.setEmail(user.getEmail());			
		}
		
		if(user.getPhoneNo() != null) {
			existedUser.setPhoneNo(user.getPhoneNo());			
		}
		
		if(user.getAddress() != null) {
			existedUser.setAddress(user.getAddress());
		}
		
		
		User save = userRepository.save(existedUser);
		
		logger.info("User get updated");
		
		return save;
	}

	@Override
	public String deleteUser(Long id) {
		User user = getUser(id);
		Cart cart = cartRepository.findByUserId(user.getId());
		cartRepository.delete(cart);
		userRepository.delete(user);
		logger.info("User is Deleted!");
		return String.format("User %d is Deleted!", id);
	}

	private static final String SECRET_KEY = "YourSecretKey123"; // Change this to your secret key

	public  String encrypt(String address) {
		try {
			SecretKeySpec secretKeySpec = new SecretKeySpec(SECRET_KEY.getBytes(), "AES");
			Cipher cipher = Cipher.getInstance("AES");
			cipher.init(Cipher.ENCRYPT_MODE, secretKeySpec);
			byte[] encryptedBytes = cipher.doFinal(address.getBytes());
			return Base64.getEncoder().encodeToString(encryptedBytes);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}


}

package com.Security.SecondHandBookStore.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class CartNotFoundException extends RuntimeException {
	
	private static final long serialVersionUID = 1L;
	
	Logger logger = LoggerFactory.getLogger(CartNotFoundException.class);
	
	public CartNotFoundException(String message) {
		super(message);
		logger.error("Cart Not Found!");
	}

}

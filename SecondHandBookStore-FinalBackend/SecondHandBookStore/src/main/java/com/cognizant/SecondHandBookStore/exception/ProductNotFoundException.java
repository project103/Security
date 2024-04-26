package com.cognizant.SecondHandBookStore.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND)
public class ProductNotFoundException extends RuntimeException {
	
	Logger logger = LoggerFactory.getLogger(ProductNotFoundException.class);
	
	private static final long serialVersionUID = 1L;

	public ProductNotFoundException(String message) {
		super(message);
		logger.error("Product Not Found!");
	}

}

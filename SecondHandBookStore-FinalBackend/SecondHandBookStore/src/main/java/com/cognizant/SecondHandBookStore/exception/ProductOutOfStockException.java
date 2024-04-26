package com.cognizant.SecondHandBookStore.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ProductOutOfStockException extends RuntimeException {
	
	private static final long serialVersionUID = 1L;
	
	Logger logger = LoggerFactory.getLogger(ProductOutOfStockException.class);

	public ProductOutOfStockException(String message) {
		super(message);
		logger.warn("Product out of Stock");
	}

}

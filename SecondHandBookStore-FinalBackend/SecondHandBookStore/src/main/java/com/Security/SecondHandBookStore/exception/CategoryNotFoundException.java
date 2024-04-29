package com.Security.SecondHandBookStore.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;


@ResponseStatus(code = HttpStatus.NOT_FOUND)
public class CategoryNotFoundException extends RuntimeException {
	
	Logger logger = LoggerFactory.getLogger(CategoryNotFoundException.class);
	
	private static final long serialVersionUID = 1L;

	public CategoryNotFoundException(String message) {
		super(message);
		logger.error("Category Not Found");
	}

}

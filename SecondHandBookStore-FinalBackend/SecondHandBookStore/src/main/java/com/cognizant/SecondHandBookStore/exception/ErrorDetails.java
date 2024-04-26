package com.cognizant.SecondHandBookStore.exception;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@NoArgsConstructor
@AllArgsConstructor
@Data
public class ErrorDetails {
	
	private LocalDateTime timestamp;

	private String message;
	
	private String details;
}
